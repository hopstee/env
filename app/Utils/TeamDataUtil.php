<?php

namespace App\Utils;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use Inertia\Inertia;

class TeamDataUtil
{
    public static function shareSelectedTeamData(Request $request)
    {
        $teams = $request->user()->teams;
        $teamId = session('selected_team_id') ?? $teams[0]->id;
        $projects = $request->user()->accessibleProjectsByTeam($teamId)->get()->toArray();

        Log::info("update team data", ["teamId" => $teamId]);

        Inertia::share([
            'selectedTeamId'    => $teamId,
            'teams'             => $teams,
            'projects'          => $projects,
        ]);
    }
}