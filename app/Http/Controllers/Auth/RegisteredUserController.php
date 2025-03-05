<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Http\Controllers\Dashboard\TeamsController;
use App\Models\User;
use App\Utils\UserDataUtil;
use Illuminate\Auth\Events\Registered;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Log;
use Illuminate\Validation\Rules;
use Inertia\Inertia;
use Inertia\Response;

class RegisteredUserController extends Controller
{
    /**
     * Display the registration view.
     */
    public function create(): Response
    {
        return Inertia::render('Auth/Register');
    }

    /**
     * Handle an incoming registration request.
     *
     * @throws \Illuminate\Validation\ValidationException
     */
    public function store(Request $request): RedirectResponse
    {
        $request->validate([
            'name'      => 'required|string|max:255',
            'email'     => 'required|string|lowercase|email|max:255|unique:'.User::class,
            'password'  => ['required', 'confirmed', Rules\Password::defaults()],
            'gender'    => 'required|in:male,female',
        ]);

        $userData = UserDataUtil::generateUserData($request->name, $request->email);

        Log::info($userData);
        Log::info($userData['avatar']);

        $user = User::create([
            'name'      => $request->name,
            'email'     => $request->email,
            'password'  => Hash::make($request->password),
            'gender'    => $request->gender,
            'avatar'    => $userData ? $userData['avatar'] : null,
        ]);

        $team = TeamsController::createInitialTeam($user->name, $user->id);
        session(['selected_team_id' => $team->id]);

        event(new Registered($user));

        Auth::login($user);

        return redirect()->intended((route('t', absolute: false)));
    }
}
