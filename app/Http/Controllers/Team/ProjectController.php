<?php

namespace App\Http\Controllers\Team;

use App\Http\Controllers\Controller;
use App\Models\Project;
use App\Models\ProjectUser;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Redirect;

class ProjectController extends Controller
{
    public function store(Request $request)
    {
        $request->validate([
            'icon' => 'required',
            'name' => 'required',
            'description' => 'required',
        ]);

        $teamId = session('selected_team_id');

        $project = Project::create([
            'icon' => $request->icon,
            'name' => $request->name,
            'description' => $request->description,
            'team_id' => $teamId,
        ]);

        ProjectUser::create([
            'project_id' => $project->id,
            'user_id' => $request->user()->id,
            'role_id' => 1,
        ]);

        return Redirect::route('t.workspace', ['team_id' => session('selected_team_id')]);
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

    public function archive(Project $project)
    {
        $project->archive();
    }

    public function unarchive(Project $project)
    {
        $project->unarchive();
    }

    public function archiveMany(Request $request)
    {
        $projectIds = $request->input('ids');
        $projects = Project::whereIn('id', $projectIds)->get();

        foreach ($projects as $project) {
            $project->archive();
        }
    }

    public function fav(Project $project)
    {
        $project->fav();
    }
    public function unfav(Project $project)
    {
        $project->unfav();
    }

}
