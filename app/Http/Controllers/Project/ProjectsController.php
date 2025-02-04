<?php

namespace App\Http\Controllers\Project;

use App\Http\Controllers\Controller;
use App\Models\Project;
use App\Models\ProjectUser;
use App\Models\Team;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Redirect;
use Inertia\Inertia;

class ProjectsController extends Controller
{
    public function redirectToTeam()
    {
        return Redirect::route('t', ['team_id' => session('selected_team_id')]);
    }

    public function show(Request $request, string $teamId, string $projectId)
    {
        $hasAccess = $request->user()->hasAccessToProjectInTeam($projectId, $teamId);
        if (!$hasAccess) {
            return Redirect::route('t', ['team_id' => $teamId]);
        }

        $envs = $request->user()->accessibleEnvsByProject($projectId)->get()->toArray();

        return Inertia::render('Projects/Workspace', [
            'envs' => $envs,
        ]);
    }


    public function store(Request $request)
    {
        $request->validate([
            'icon' => 'required',
            'name' => 'required',
        ]);

        $teamId = session('selected_team_id');

        $project = Project::create([
            'icon' => $request->icon,
            'name' => $request->name,
            'team_id' => $teamId,
        ]);

        ProjectUser::create([
            'project_id' => $project->id,
            'user_id' => $request->user()->id,
            'role_id' => 1,
        ]);

        return Redirect::route('t.active', ['team_id' => session('selected_team_id')]);
    }

    public function destroy($project_id)
    {
        Project::where('id', $project_id)->delete();
    }

    public function destroyMany(Request $request)
    {
        $projectIds = $request->input('ids');
        Project::whereIn('id', $projectIds)->delete();
    }

    public function archiveMany(Request $request)
    {
        $projectIds = $request->input('ids');
        $projects = Project::whereIn('id', $projectIds)->get();

        foreach ($projects as $project) {
            $project->archive();
        }
    }

    public function archiveToggle(Project $project, Request $request)
    {
        $is_archived = $request->input('is_archived');

        $project->update([
            'is_archived' => $is_archived,
            'is_fav' => false,
        ]);
    }

    public function favToggle(Project $project, Request $request)
    {
        $isFav = $request->input('is_fav');

        $project->update([
            'is_fav' => $isFav
        ]);
    }


}
