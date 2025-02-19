<?php

namespace App\Http\Middleware;

use App\Models\Team;
use Closure;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
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
                $hasAccess = $user->hasAccessToTeam($teamId);

                if ($hasAccess) {
                    return redirect()->to('/t/' . $teamId);
                }
            }

            $team = $user->teams()->first();
            if ($team) {
                session(['selected_team_id' => $team->id]);
                return redirect()->to('/t/' . $team->id);
            }

            return abort(404, 'Team not found');
        }

        return $next($request);
    }
}
