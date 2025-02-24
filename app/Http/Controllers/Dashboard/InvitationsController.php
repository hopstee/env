<?php

namespace App\Http\Controllers\Dashboard;

use App\Http\Controllers\Controller;
use App\Mail\InvitationMail;
use App\Models\Invitation;
use App\Models\Role;
use App\Models\Team;
use App\Models\User;
use App\Notifications\InvitationNotifications;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\Mail;
use Inertia\Inertia;

class InvitationsController extends Controller
{
    public function show(Request $request, $token)
    {
        $invitation = Invitation::where('token', $token)->first();

        if (!$invitation) {
            abort(404, 'Приглашение не найдено');
        }

        if ($invitation->status === 'accepted') {
            session(['selected_team_id' => $invitation->accessable_id]);
            return redirect()->route('t');
        }

        return Inertia::render('Dashboard/Invitations/Show', [
            'invitation' => $invitation->load('accessable'),
        ]);
    }

    public function send(Request $request)
    {
        $validatedData = $request->validate([
            'team'      => 'required|string',
            'role'      => 'required|string|exists:roles,value',
            'emails'    => 'required|array',
            'emails.*'  => 'required|email',
        ]);

        $team = Team::findOrFail($validatedData['team']);

        $role = Role::where('value', $validatedData['role'])->firstOrFail();

        $invitations = [];
        $skippedEmails = [];

        $user = $request->user();
        foreach ($validatedData['emails'] as $email) {
            $existingUser = User::where('email', $email)->first();

            if ($existingUser && $team->users()->where('id', $existingUser->id)->exists()) {
                $skippedEmails[] = $email;
                continue;
            }

            $token = Str::random(64);

            $invitation = new Invitation([
                'email'      => $email,
                'token'      => $token,
                'role_id'    => $role->id,
                'status'     => 'pending',
                'invited_by' => $user->id,
                'expires_at' => now()->addDays(2),
            ]);
            $team->invitations()->save($invitation);
            $invitation->load('accessable');

            $invitations[] = $invitation;

            if ($existingUser) {
                $existingUser->notify(new InvitationNotifications($invitation));
            } else {
                Mail::to($email)->send(new InvitationMail($invitation));
            }
        }
    }

    public function confirm(Request $request, string $token)
    {
        $invitation = Invitation::where('token', $token)->first();
        if (!$invitation) {
            abort(404, 'Invitation not found');
        }

        if ($invitation->status !== 'pending') {
            return redirect()->back()->withErrors(['message' => 'Invitation already processed.']);
        }

        $user = $request->user();
        if ($user->email !== $invitation->email) {
            return redirect()->back()->withErrors(['message' => 'This invitation is not for you.']);
        }

        $invitation->update(['status' => 'accepted']);

        $accessable = $invitation->accessable;
        if ($accessable) {
            $accessable->accesses()->create([
                'user_id' => $user->id,
                'role_id' => $invitation->role_id,
            ]);
        }
        
        return redirect()->route('t')
            ->with('success', 'Invitation has been accepted.');
    }

    public function decline(Request $request, string $token)
    {
        $invitation = Invitation::where('token', $token)->first();

        if (!$invitation) {
            abort(404, 'Invitation not found');
        }

        $invitation->update(['status' => 'declined']);

        return redirect()->route('t')
            ->with('info', 'Invitation declined.');
    }
}
