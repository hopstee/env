<?php

namespace App\Http\Controllers\Dashboard;

use App\Http\Controllers\Controller;
use App\Models\Group;
use App\Models\Team;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Redirect;
use Inertia\Inertia;

class GroupsController extends Controller
{
    public function show(Request $request, Team $team)
    {
        $groups = $this->getGroups($team->id);

        return Inertia::render(
            'Dashboard/Groups/Show',
            [
                'groups' => $groups,
            ]
        );
    }

    public function store(Request $request)
    {
        $request->validate([
            'name'      => 'required',
            'color'     => 'required',
            'team_id'   => 'required',
        ]);

        $group = Group::create([
            'name' => $request->name,
            'color' => $request->color,
            'team_id' => $request->team_id,
        ]);

        $group->grantPermission($request->user()->id, true, true);

        return Redirect::back();
    }

    public function update(Request $request, Group $group)
    {
        $validated = $request->validate([
            'name'  => 'required|string',
            'color' => 'required|string',
        ]);

        $group->update([
            'name'  => $validated['name'],
            'color' => $validated['color'],
        ]);

        return back();
    }

    public function destroy(Request $request)
    {
        Group::where('id', $request->group_id)->delete();
    }

    public static function getGroups(string $teamId, bool $addDefault = false)
    {
        $user = auth()->user();

        $groups = $user->getAccessibleGroups($teamId)->get();
        $groups = $groups->map(function ($group) {
            return [
                'id'          => $group->id,
                'name'        => $group->name,
                'color'       => $group->color,
                'is_favorite' => $group->is_favorite,
                'link'        => request()->fullUrlWithQuery(['g' => $group->id]),
            ];
        });

        if ($addDefault) {
            $groups->prepend([
                'id'          => null,
                'name'        => 'All groups',
                'color'       => 'GRAY_700',
                'is_favorite' => false,
                'link'        => request()->fullUrlWithQuery(['g' => null]),
            ]);
        }

        return $groups;
    }
}
