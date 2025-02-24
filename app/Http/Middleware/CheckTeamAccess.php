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
        $team = $request->route('team');
        $teamId = $team->id;

        $hasAccess = $request->user()->hasAccessToTeam($teamId);
        if ($hasAccess) {
            session(['selected_team_id' => $teamId]);
        }

        if (!$hasAccess) {
            if ($teamId) {
                return redirect()->to('/t/'. $teamId);
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
