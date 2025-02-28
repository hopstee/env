<?php

namespace App\Http\Controllers\Dashboard;

use App\Http\Controllers\Controller;
use App\Models\Access;
use App\Models\Team;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use Inertia\Inertia;
use Inertia\Response;

class MembersController extends Controller
{
    public function show(Team $team): Response
    {
        $members = $team->users()->get();

        return Inertia::render('Dashboard/Members/Show', [
            'members' => $members,
        ]);
    }

    public function updateRole(Request $request, User $user)
    {
        $team = Team::current();

        $validated = $request->validate([
            'role_id' => 'required|exists:roles,id',
        ]);
    
        $authUser = $request->user();
        $isAdmin = $team->users()->where('user_id', $authUser->id)->wherePivot('role_id', 1)->exists();
    
        if (!$isAdmin) {
            return back()->with('message', 'Unauthorized');
        }
    
        $team->users()->updateExistingPivot($user->id, ['role_id' => $validated['role_id']]);
    
        return back()->with('message', 'User role updated successfully');
    }

    public function destroy(Request $request, User $user)
    {
        $team = Team::current();

        $authUser = $request->user();
        $isAdmin = $team->users()->where('user_id', $authUser->id)->wherePivot('role_id', 1)->exists();

        if (!$isAdmin) {
            return back()->with('message', 'Unauthorized');
        }

        if ($team->owner_id === $user->id) {
            $team->update(['owner_id' => $authUser->id]);
        }

        $team->users()->detach($user->id);

        return back()->with('message', 'Member removed successfully');
    }
}
