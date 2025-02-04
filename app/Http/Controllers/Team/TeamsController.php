<?php

namespace App\Http\Controllers\Team;

use App\Http\Controllers\Controller;
use App\Models\Team;
use App\Models\TeamUser;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Collection;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Redirect;
use Inertia\Inertia;

class TeamsController extends Controller
{
    public function show(Request $request, string $teamId)
    {
        $projects = $this->getProjects($request->user(), $teamId);
        session(['selected_team_id' => $teamId]);
        return Inertia::render(
            'Teams/Workspace/Show',
            [
                'projects' => $projects,
                'type' => 'active',
            ]
        );
    }

    public function showArchived(Request $request, string $teamId)
    {
        $projects = $this->getProjects($request->user(), $teamId, true);
        session(['selected_team_id' => $teamId]);
        Log::info('projectsList', ['projects' => $projects]);
        return Inertia::render(
            'Teams/Workspace/Show',
            [
                'projects' => $projects,
                'type' => 'archived',
            ]
        );
    }

    private function getProjects(User $user, string $teamId, bool $isArchived = false): Collection
    {
        return $user->accessibleProjectsWithUsersByTeam($teamId)
            ->where("is_archived", $isArchived)
            ->get()
            ->map(function ($project) {
                return [
                    'id' => $project->id,
                    'icon' => $project->icon,
                    'name' => $project->name,
                    'is_fav' => $project->is_fav,
                    'is_archived' => $project->is_archived,
                    'created_at' => $project->created_at,
                    'users_count' => $project->users_count,
                    'users' => $project->users->map(function ($user) {
                        return [
                            'id' => $user->id,
                            'name' => $user->name,
                            'email' => $user->email,
                        ];
                    }),
                ];
            });
    }
    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required',
            'type' => 'required',
        ]);

        $team = Team::create([
            'name' => $request->name,
            'type' => $request->type,
            'icon' => 'cookie',
        ]);

        TeamUser::create([
            'team_id' => $team->id,
            'user_id' => $request->user()->id,
            'role_id' => 1,
        ]);

        return Redirect::route('t.active', ['team_id' => $team->id]);
    }

    public function destroy(Request $request)
    {
        Team::where('id', $request->team_id)->delete();
    }

    public static function createInitialTeam(string $name, int $userId, int $roleId = 1): Team
    {
        $team = Team::create([
            'name' => "$name's Team",
            'type' => 'Personal',
            'icon' => 'cookie',
            'personal_team' => true,
        ]);

        TeamUser::create([
            'team_id' => $team->id,
            'user_id' => $userId,
            'role_id' => $roleId,
        ]);

        return $team;
    }

    public function getTeams(Request $request)
    {
        return Team::all()->where('user_id', $request->user()->id)->orderBy('created_at', 'desc');
    }

    public function selectTeam(Request $request)
    {
        $request->validate([
            'team_id' => 'required|exists:teams,id',
        ]);

        session(['selected_team_id' => $request->team_id]);

        return response()->json(['message' => 'Team selected successfully']);
    }
}
