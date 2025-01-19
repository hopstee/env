<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use Inertia\Inertia;
use Symfony\Component\HttpFoundation\Response;

class ShareTeamsData
{
    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    public function handle(Request $request, Closure $next): Response
    {
        $teams = $request->user()->teams;
        $teamId = session('selected_team_id') ?? $teams[0]->id;
        $projects = $request->user()->accessibleProjectsByTeam($teamId)->get()->toArray();

        Inertia::share([
            'selectedTeamId'    => $teamId,
            'teams'             => $teams,
            'projects'          => $projects,
        ]);

        return $next($request);
    }
}
