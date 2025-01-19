<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use Symfony\Component\HttpFoundation\Response;

class RedirectToTeam
{
    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    public function handle(Request $request, Closure $next): Response
    {
        if ($request->is('t') || $request->is('t/')) {
            $user = $request->user();
            if (!$user) {
                return abort(403, 'Unauthorized access');
            }

            $teamId = session('selected_team_id');
            if ($teamId) {
                $team = $user->teams('id')->where('teams.id', $teamId)->first();

                if ($team) {
                    return redirect()->to('/t/' . $team->id);
                }
            }

            $team = $user->teams('id')->first();
            if ($team) {
                session(['selected_team_id' => $team->id]);
                return redirect()->to('/t/' . $team->id);
            }

            return abort(404, 'Team not found');
        }

        return $next($request);
    }
}
