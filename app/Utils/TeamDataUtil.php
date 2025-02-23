<?php

namespace App\Utils;

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

        $favoriteGroups = $user->getAccessibleGroups($teamId, true)->get()->toArray();

        $roles = json_decode(Role::all(), true);
        $groupedRoles = [
            'team'    => [],
            'project' => [],
            'env'     => [],
        ];

        foreach ($roles as $role) {
            switch ($role['value']) {
                case 'team_admin':
                    $groupedRoles['team'][] = self::filterRoleFields($role);
                    break;

                case 'project_admin':
                    $groupedRoles['project'][] = self::filterRoleFields($role);
                    break;

                case 'env_admin':
                    $groupedRoles['env'][] = self::filterRoleFields($role);
                    break;

                case 'viewer':
                    $filteredViewer = self::filterRoleFields($role);
                    $groupedRoles['team'][] = $filteredViewer;
                    $groupedRoles['project'][] = $filteredViewer;
                    $groupedRoles['env'][] = $filteredViewer;
                    break;
            }
        }

        Inertia::share([
            'selectedTeamId'    => $teamId,
            'teams'             => $teams,
            'favoriteGroups'    => $favoriteGroups,
            'roles'             => $groupedRoles,
        ]);
    }

    private static function filterRoleFields(array $role): array {
        return array_intersect_key($role, array_flip(['id', 'name', 'value']));
    }
}