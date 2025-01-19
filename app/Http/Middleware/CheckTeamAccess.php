<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use Symfony\Component\HttpFoundation\Response;

class CheckTeamAccess
{
    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    public function handle(Request $request, Closure $next): Response
    {
        $teamId = $request->route('team_id');

        $hasAccess = $request->user()->hasAccessToTeam($teamId);
        if ($hasAccess) {
            session(['selected_team_id' => $teamId]);
        }

        if (!$hasAccess) {
            $selectedTeamId = session('selected_team_id');
            if ($selectedTeamId) {
                return redirect()->to('/t/'. $selectedTeamId);
            }

            $team = $request->user()->teams()->first();
            if ($team) {
                return redirect()->to('/t/' . $team->id);
            }

            return redirect('/')->withErrors(['access_denied' => 'You have no access to this team']);
        }

        return $next($request);
    }
}
