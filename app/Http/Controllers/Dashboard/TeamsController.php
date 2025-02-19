<?php

namespace App\Http\Controllers\Dashboard;

use App\Http\Controllers\Controller;
use App\Models\Team;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Collection;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Redirect;
use Inertia\Inertia;

class TeamsController extends Controller
{
    public function show(Request $request, string $teamId)
    {
        session(['selected_team_id' => $teamId]);
        return Inertia::render(
            'Dashboard/Teams/Workspace/Show',
            [
                'projects' => [],
                'type' => 'active',
            ]
        );
    }

    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required',
            'type' => 'required',
        ]);

        $team = self::createTeam(
            $request->name,
            $request->type,
            'cookie',
            $request->user()->id,
            1,
        );

        return Redirect::route('t.active', ['team_id' => $team->id]);
    }

    public function destroy(Request $request)
    {
        Team::where('id', $request->team_id)->delete();
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
            'personal_team' => $personalTeam,
        ]);

        $team->addUser($userId, $roleId);

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
