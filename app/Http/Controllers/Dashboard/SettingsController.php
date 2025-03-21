<?php

namespace App\Http\Controllers\Dashboard;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class SettingsController extends Controller
{
    public function usersSettings()
    {
        $user = auth()->user();
        $settings = $user->settings()->first();
        $settings = json_decode($settings['settings']);

        return response()->json([
            'success'   => true,
            'data'      => $settings,
        ]);
    }

    public function updateNotifications(Request $request)
    {
        $user = auth()->user();

        $validated = $request->validate([
            'notifications' => 'required|array',
            'notifications.add_to_group' => 'required|boolean',
            'notifications.add_to_team' => 'required|boolean',
            'notifications.remove_from_group' => 'required|boolean',
            'notifications.remove_from_team' => 'required|boolean',
            'notifications.role_change' => 'required|boolean',
            'notifications.variable_modified' => 'required|boolean',
        ]);

        $userSettings = $user->settings()->firstOrCreate(['user_id' => $user->id]);
        $settings = json_decode($userSettings->settings, true);

        $settings['notifications'] = $validated['notifications'];

        $userSettings->settings = json_encode($settings);
        $userSettings->save();

        return back();
    }
}
