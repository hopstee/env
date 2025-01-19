<?php

namespace App\Http\Middleware;

use App\Models\Project;
use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class CheckProjectAccess
{
    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    public function handle(Request $request, Closure $next): Response
    {
        $teamId = $request->route('team_id');
        $projectId = $request->route('project_id');

        $hasAccess = $request->user()->hasAccessToProjectInTeam($projectId, $teamId);

        if (!$hasAccess) {
            abort(403, 'Access denied to the requested project.');
        }

        return $next($request);
    }
}
