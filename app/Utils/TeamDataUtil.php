<?php

namespace App\Utils;

use App\Models\Role;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class TeamDataUtil
{
    public static function shareSelectedTeamData(Request $request)
    {
        $user = $request->user();

        $teams = $user->teams;
        $teamId = session('selected_team_id') ?? $teams[0]->id;

        $favoriteGroups = $user->getAccessibleGroups($teamId, true)->orderBy('added_to_favorites_at', 'asc')->get();

        $roles = Role::all();

        Inertia::share([
            'selectedTeamId'    => $teamId,
            'teams'             => $teams,
            'favoriteGroups'    => $favoriteGroups,
            'roles'             => $roles,
            'notifications'     => Auth::user()->unreadNotifications,
        ]);
    }
}