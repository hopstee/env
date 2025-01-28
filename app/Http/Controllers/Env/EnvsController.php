<?php

namespace App\Http\Controllers\Env;

use App\Http\Controllers\Controller;
use App\Models\Env;
use App\Models\EnvUser;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Redirect;
use Inertia\Inertia;

class EnvsController extends Controller
{
    public function redirectToProject(Request $request, string $teamId, string $projectId)
    {
        return Redirect::route('p.workspace', ['team_id' => $teamId, 'project_id' => $projectId]);
    }

    public function show(Request $request, string $teamId, string $projectId, string $envId)
    {
        $userId = $request->user()->id;

        $env = Env::find($envId);
        if (!$env) {
            return $this->redirectToProject($request, $teamId, $projectId);
        }

        $fields = $env->getFieldsWithAvailability($userId)->toArray();
        return Inertia::render('Env/Show', [
            'initialFields' => $fields,
        ]);
    }

    public function store(Request $request)
    {
        $request->validate([
            'name'          => 'required',
            'project_id'    => 'required',
        ]);

        $env = Env::create([
            'name'          => $request->name,
            'project_id'    => $request->project_id,
        ]);

        EnvUser::create([
            'env_id'    => $env->id,
            'user_id'   => $request->user()->id,
            'role_id'   => 1,
        ]);

        return Redirect::route('p.workspace', ['team_id' => session('selected_team_id'), 'project_id' => $request->project_id]);
    }

    public function destroy(Request $request)
    {
        Env::where('id', $request->env_id)->delete();
    }
}
