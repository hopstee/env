<?php

namespace App\Http\Controllers\Dashboard;

use App\Http\Controllers\Controller;
use App\Models\Group;
use App\Models\Permission;
use App\Models\Team;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Redirect;
use Inertia\Inertia;

class GroupsController extends Controller
{
    public function show(Team $team)
    {
        $team = Team::current();

        $groups = $this->getGroups($team->id, false, true);
        $teamUsers = $team->users()->get();

        return Inertia::render(
            'Dashboard/Groups/Show',
            [
                'groups'        => $groups,
                'teamUsers'     => $teamUsers,
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

    public function destroy(Group $group)
    {
        $group->delete();
    }

    public static function getGroups(string $teamId, bool $addDefault = false, bool $includeUsers = false)
    {
        $user = auth()->user();

        $groups = $user->getAccessibleGroups($teamId)->orderBy('group_created_at', 'desc')->get();
        $groups = $groups->map(function ($group) use ($includeUsers, $user) {
            $mappedGroup = [
                'id'          => $group->id,
                'name'        => $group->name,
                'color'       => $group->color,
                'is_favorite' => $group->is_favorite,
                'created_at'  => $group->group_created_at,
                'link'        => request()->fullUrlWithQuery(['g' => $group->id]),
                'editable'    => $group->permissions->contains(function ($permission) use ($user) {
                    return $permission->user->id === $user->id && (bool) $permission->can_write;
                }),
            ];

            if ($includeUsers) {
                $mappedGroup['users'] = $group->permissions->map(function ($permission) {
                    return [
                        'id'        => $permission->user->id,
                        'name'      => $permission->user->name,
                        'email'     => $permission->user->email,
                        'avatar'    => $permission->user->avatar,
                        'can_read'  => (bool) $permission->can_read,
                        'can_write' => (bool) $permission->can_write,
                    ];
                });
            }

            return $mappedGroup;
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

    public function toggleFavorite(Group $group, Request $request)
    {
        $user = $request->user();

        if ($user->favoriteGroups()->where('group_id', $group->id)->exists()) {
            $user->removeFavoriteGroup($group->id);
            return back();
        } else {
            $user->addFavoriteGroup($group->id, $group->team_id);
            return back();
        }
    }

    public function updateGroupUsers(Request $request, Group $group)
    {
        $users = collect($request->input('users', []));
        $usersArray = $users->keyBy('id')->toArray();

        $currentUsers = Permission::where('group_id', $group->id)
            ->get()
            ->mapWithKeys(fn($perm) => [$perm->user_id => ['can_read' => $perm->can_read, 'can_write' => $perm->can_write]])
            ->toArray();

        $usersToDelete = array_diff_key($currentUsers, $usersArray);
        $usersToAdd = array_diff_key($usersArray, $currentUsers);
        $usersToUpdate = array_filter($usersArray, function ($permissions, $userId) use ($currentUsers) {
            return isset($currentUsers[$userId]) &&
                ($currentUsers[$userId]['can_read'] !== $permissions['can_read'] ||
                    $currentUsers[$userId]['can_write'] !== $permissions['can_write']);
        }, ARRAY_FILTER_USE_BOTH);

        if (!empty($usersToDelete)) {
            Permission::where('group_id', $group->id)
                ->whereIn('user_id', array_keys($usersToDelete))
                ->delete();
        }

        if (!empty($usersToAdd)) {
            $insertData = [];
            foreach ($usersToAdd as $userId => $permissions) {
                $insertData[] = [
                    'group_id'    => $group->id,
                    'user_id'     => $userId,
                    'can_read'    => $permissions['can_read'],
                    'can_write'   => $permissions['can_write'],
                    'created_at'  => now(),
                    'updated_at'  => now(),
                ];
            }
            Permission::insert($insertData);
        }

        if (!empty($usersToUpdate)) {
            foreach ($usersToUpdate as $userId => $permissions) {
                Permission::where('group_id', $group->id)
                    ->where('user_id', $userId)
                    ->update([
                        'can_read'   => $permissions['can_read'],
                        'can_write'  => $permissions['can_write'],
                        'updated_at' => now(),
                    ]);
            }
        }

        return back()->with([
            'message' => 'Group users updated successfully.',
        ]);
    }
}
