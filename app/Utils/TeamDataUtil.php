<?php

namespace App\Utils;

use App\Http\Controllers\Dashboard\GroupsController;
use App\Models\Role;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use Inertia\Inertia;

class TeamDataUtil
{
    public static function shareSelectedTeamData(Request $request)
    {
        $user = $request->user();

        $teams = $user->teams;
        $teamId = session('selected_team_id') ?? $teams[0]->id;

        $favoriteGroups = $user->getAccessibleGroups($teamId, true)->get();

        $roles = Role::all();

        Inertia::share([
            'selectedTeamId'    => $teamId,
            'teams'             => $teams,
            'favoriteGroups'    => $favoriteGroups,
            'roles'             => $roles,
        ]);
    }

    private static function filterRoleFields(array $role): array {
        return array_intersect_key($role, array_flip(['id', 'name', 'value']));
    }
}