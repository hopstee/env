<?php

namespace App\Http\Controllers\Dashboard;

use App\Http\Controllers\Controller;
use App\Models\ApiKey;
use App\Models\Team;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use Inertia\Inertia;

class ApiKeysController extends Controller
{
    public function show(Request $request, Team $team)
    {
        $filters = $request->only(['u', 'page', 'perPage']);
        $apiKeysWithUsers = $team->apiKeysWithUsers($filters);

        $users = $team->users()->get();
        $users = $users->map(function ($user) {
            return [
                'id'        => $user->user_id,
                'name'      => $user->user_name,
                'email'     => $user->user_email,
                'avatar'    => $user->user_avatar,
                'link'      => request()->fullUrlWithQuery(['u' => $user->user_id]),
            ];
        });

        $users->prepend([
            'id'        => null,
            'name'      => 'All users',
            'email'     => null,
            'avatar'    => null,
            'link'      => request()->fullUrlWithQuery(['u' => null]),
        ]);

        return Inertia::render(
            'Dashboard/ApiKeys/Show',
            [
                'apiKeys'   => $apiKeysWithUsers,
                'users'     => $users,
                'filters'   => $filters,
            ]
        );
    }
    
    public function store(Request $request)
    {
        $request->validate([
            'team_id' => 'required|exists:teams,id',
            'user_id' => 'required|exists:users,id',
            'expires_at' => 'nullable|date|after:now',
        ]);

        ApiKey::create([
            'team_id' => $request->team_id,
            'user_id' => $request->user_id,
            'expires_at' => $request->expires_at ? Carbon::parse($request->expires_at) : null,
        ]);

        return back();
    }

    public function update(Request $request, ApiKey $apiKey)
    {
        $request->validate([
            'is_active' => 'required|boolean',
        ]);

        $apiKey->update([
            'is_active' => $request->is_active,
        ]);

        return back();
    }

    public function regenerate(ApiKey $apiKey)
    {
        $apiKey->is_active = false;
        $apiKey->save();

        ApiKey::create([
            'team_id' => $apiKey->team_id,
            'user_id' => $apiKey->user_id,
            'expires_at' => $apiKey->expires_at ? Carbon::parse($apiKey->expires_at)->addMonth() : null,
        ]);

        return back();
    }

    public function destroy(ApiKey $apiKey)
    {
        $apiKey->delete();
    }
}
