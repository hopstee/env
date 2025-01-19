<?php

namespace App\Http\Controllers\Project;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ProjectsController extends Controller
{
    public function show(Request $request)
    {
        $envs = $request->user()->accessibleEnvsByProject($request->route('team_id'), $request->route('project_id'))->get()->toArray();

        return Inertia::render('Projects/Workspace', [
            'envs' => $envs,
        ]);
    }
}
