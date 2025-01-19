<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Symfony\Component\HttpFoundation\Response;

class GenerateBreadcrumbs
{
    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    public function handle(Request $request, Closure $next): Response
    {
        Inertia::share('breadcrumbs', function () {
            return $this->generateBreadcrumbs(request()->route());
        });

        return $next($request);
    }

    private function generateBreadcrumbs($currentRoute)
    {
        $breadcrumbs = [];
        $defaultBreadcrumb = ['name' => 'Workspace'];
        $defaultActiveBreadcrumb = [...$defaultBreadcrumb, 'url' => route('t.workspace', request('team_id'))];

        switch ($currentRoute->getName()) {
            case 't.members':
                $breadcrumbs = [
                    $defaultActiveBreadcrumb,
                    ['name' => 'Team Members'],
                ];
                break;

            case 't.readme':
                $breadcrumbs = [
                    $defaultActiveBreadcrumb,
                    ['name' => 'Team Docs'],
                ];
                break;

            case 't.settings':
                $breadcrumbs = [
                    $defaultActiveBreadcrumb,
                    ['name' => 'Team Settings'],
                ];
                break;

            case 'p.workspace':
                $projectId = request('project_id');

                $breadcrumbs = [
                    $defaultActiveBreadcrumb,
                    ['name' => "Team $projectId"],
                ];
                break;

            default:
                $breadcrumbs = [
                    $defaultBreadcrumb,
                ];
        }

        return $breadcrumbs;
    }
}
