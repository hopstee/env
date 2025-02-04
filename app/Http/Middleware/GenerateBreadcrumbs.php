<?php

namespace App\Http\Middleware;

use App\Models\Env;
use App\Models\Project;
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
        $defaultActiveBreadcrumb = [...$defaultBreadcrumb, 'url' => route('t.active', request('team_id'))];

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

                $project = Project::find($projectId);
                $projectName = "$project->icon $project->name";

                $breadcrumbs = [
                    $defaultActiveBreadcrumb,
                    ['name' => $projectName],
                ];
                break;

            case 'e.show':
                $projectId = request('project_id');
                $project = Project::find($projectId);
                $projectName = "$project->icon $project->name";

                $envId = request('env_id');
                $env = Env::find($envId);
                $envName = $env->name;

                $breadcrumbs = [
                    $defaultActiveBreadcrumb,
                    ['name' => $projectName, 'url' => route('p.workspace', ['team_id' => request('team_id'), 'project_id' => $projectId])],
                    ['name' => $envName],
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
