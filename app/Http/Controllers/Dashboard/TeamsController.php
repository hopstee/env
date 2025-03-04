<?php

namespace App\Http\Controllers\Dashboard;

use App\Http\Controllers\Controller;
use App\Models\Team;
use App\Models\User;
use App\Utils\TeamDataUtil;
use Illuminate\Http\Request;
use Inertia\Inertia;

class TeamsController extends Controller
{
    public function show(Request $request, Team $team)
    {
        $teamId = $team->id;
        if (!session('selected_team_id')) {
            session(['selected_team_id' => $teamId]);
        }

        $user = $request->user();

        $groups = GroupsController::getGroups($teamId, true);

        $filters = $request->only(['g', 'page', 'perPage', 'query', 'sort']);
        $variablesData = $user->getEnvironmentVariables($teamId, $filters);

        TeamDataUtil::shareSelectedTeamData($request);

        return Inertia::render(
            'Dashboard/Workspace/Show',
            [
                'groups'        => $groups,
                'variablesData' => $variablesData,
                'filters'       => $filters,
            ]
        );
    }

    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required',
            'type' => 'required',
        ]);

        self::createTeam(
            $request->name,
            $request->type,
            'cookie',
            $request->user()->id,
            1,
        );

        return back();
    }

    public function destroy(Team $team)
    {
        $team->delete();
    }

    public static function createInitialTeam(string $name, int $userId, int $roleId = 1): Team
    {
        return self::createTeam(
            "$name's Team",
            'Personal',
            'cookie',
            $userId,
            $roleId,
            true,
        );
    }

    private static function createTeam(
        string $name,
        string $type,
        string $icon,
        int $userId,
        int $roleId,
        bool $personalTeam = false,
    ): Team
    {
        $team = Team::create([
            'name'          => $name,
            'type'          => $type,
            'icon'          => $icon,
            'owner_id'      => $userId,
            'personal_team' => $personalTeam,
        ]);

        $team->addUser($userId, $roleId);
        session(["selected_tea_id" => $team->id]);

        return $team;
    }

    public function getTeams(Request $request)
    {
        return Team::all()->where('user_id', $request->user()->id)->orderBy('created_at', 'desc');
    }

    public function selectTeam(Request $request)
    {
        $request->validate([
            'team_id' => 'required|exists:teams,id',
        ]);

        session(['selected_team_id' => $request->team_id]);

        return response()->json(['message' => 'Team selected successfully']);
    }
}
