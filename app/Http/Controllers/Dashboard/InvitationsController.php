<?php

namespace App\Http\Controllers\Dashboard;

use App\Http\Controllers\Controller;
use App\Mail\InvitationMail;
use App\Models\Invitation;
use App\Models\Role;
use App\Models\Team;
use App\Models\TeamUser;
use App\Models\User;
use App\Notifications\InvitationNotifications;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\Mail;
use Inertia\Inertia;

class InvitationsController extends Controller
{
    public function show(Team $team)
    {
        $invitations = $team->invitations(true)->get();

        return Inertia::render('Dashboard/Invitations/Show', [
            'invitations' => $invitations,
        ]);
    }

    public function accept(Request $request, $token)
    {
        $invitation = Invitation::where('token', $token)->with(['team', 'role'])->first();

        if (!$invitation) {
            abort(404, 'Приглашение не найдено');
        }

        if ($invitation->status === 'accepted') {
            session(['selected_team_id' => $invitation->team_id]);
            return redirect()->route('t');
        }

        return Inertia::render('Confirmation/Invitation', [
            'invitation' => $invitation,
        ]);
    }

    public function send(Request $request)
    {
        $validatedData = $request->validate([
            'team_id'   => 'required|string|exists:teams,id',
            'role'      => 'required|string|exists:roles,value',
            'email'     => 'required|email',
        ]);

        $team = Team::findOrFail($validatedData['team_id']);
        $role = Role::where('value', $validatedData['role'])->firstOrFail();
        $email = $validatedData['email'];
        $user = $request->user();

        $token = Str::random(64);
        $invitation = new Invitation([
            'email'         => $email,
            'token'         => $token,
            'team_id'       => $team->id,
            'role_id'       => $role->id,
            'status'        => 'pending',
            'invited_by'    => $user->id,
            'expires_at'    => now()->addDays(2),
        ]);

        $existingUser = User::where('email', $email)->first();
        if ($existingUser) {
            $existingUser->notify(new InvitationNotifications($invitation, $team));
        } else {
            Mail::to($email)->send(new InvitationMail($invitation, $team));
        }

        $team->invitations()->save($invitation);

        return back();
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

        TeamUser::create([
            'team_id'   => $invitation->team_id,
            'user_id'   => $user->id,
            'role_id'   => $invitation->role_id,
        ]);

        return redirect()->route('t.active', $invitation->team_id)
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

    public function revoke(Invitation $invitation)
    {
        $invitation->update(['status' => 'revoked']);

        return back();
    }
}
