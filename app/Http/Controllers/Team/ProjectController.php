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
        ]);

        $teamId = session('selected_team_id');

        $project = Project::create([
            'icon'      => $request->icon,
            'name'      => $request->name,
            'team_id'   => $teamId,
        ]);

        ProjectUser::create([
            'project_id'    => $project->id,
            'user_id'       => $request->user()->id,
            'role_id'       => 1,
        ]);

        return Redirect::route('t.workspace', ['team_id' => session('selected_team_id')]);
    }

    public function destroy(Request $request)
    {
        Project::where('id', $request->project_id)->delete();
    }
}
