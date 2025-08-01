<?php

use App\Http\Controllers\Dashboard\ApiKeysController;
use App\Http\Controllers\Dashboard\EnvironmentVariablesController;
use App\Http\Controllers\Dashboard\GroupsController;
use App\Http\Controllers\Dashboard\InvitationsController;
use App\Http\Controllers\Dashboard\TeamsController;
use App\Http\Controllers\Dashboard\MembersController;
use App\Http\Controllers\Profile\ProfileController;
use App\Http\Controllers\Dashboard\SettingsController;
use App\Http\Controllers\Dashboard\SysLogsController;
use App\Http\Middleware\CheckAdminAccess;
use App\Http\Middleware\CheckTeamAccess;
use App\Http\Middleware\RedirectToTeam;
use App\Http\Middleware\ShareTeamsData;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
});

Route::get('/avatars/{filename}', function ($filename) {
    return response()->file(Storage::disk('public')->path('avatars/' . $filename));
});

Route::prefix('error')->group(function () {
    Route::get('admin-access-only', function () {
        return Inertia::render('Errors/AdminAccessOnly');
    })->name('adminAccessOnly');
});

Route::middleware('auth')->group(function () {
    Route::prefix('t')->middleware([
        'verified',
        RedirectToTeam::class,
        ShareTeamsData::class,
    ])->group(function () {
        Route::get('/', function () {
            return redirect()->route('t.active', ['team' => session('selected_team_id')]);
        })->name('t');

        Route::prefix('{team}')->middleware([CheckTeamAccess::class])->group(function () {
            Route::get('/', [TeamsController::class, 'show'])->name('t.active');
            Route::get('/groups', [GroupsController::class, 'show'])->name('t.groups');

            Route::middleware([
                CheckAdminAccess::class,
            ])->group(function () {
                Route::get('/members', [MembersController::class, 'show'])->name('t.members');
                Route::get('/invitations', [InvitationsController::class, 'show'])->name('t.invitations');
                Route::get('/api-keys', [ApiKeysController::class, 'show'])->name('t.api-keys');
                Route::get('/sys-logs', [SysLogsController::class, 'show'])->name('t.sys-logs');
            });
        });
    });

    Route::prefix('team')->group(function () {
        Route::post('/', [TeamsController::class, 'store'])->name('team.create');
        Route::delete('/{team}', [TeamsController::class, 'destroy'])->name('team.destroy');
    });

    Route::prefix('group')->group(function () {
        Route::post('/', [GroupsController::class, 'store'])->name('group.create');
        Route::post('/{group}', [GroupsController::class, 'update'])->name('group.update');
        Route::post('/{group}/toggle-favorite', [GroupsController::class, 'toggleFavorite'])->name('group.toggle-favorite');
        Route::post('/{group}/update-users', [GroupsController::class, 'updateGroupUsers'])->name('group.update-users');
        Route::delete('/{group}', [GroupsController::class, 'destroy'])->name('group.destroy');
    });

    Route::prefix('environmebt-variables')->group(function () {
        Route::post('/', [EnvironmentVariablesController::class, 'store'])->name('environmebt-variables.create');
        Route::post('/{variable}', [EnvironmentVariablesController::class, 'update'])->name('environmebt-variables.update');
        Route::delete('/{variable}', [EnvironmentVariablesController::class, 'destroy'])->name('environmebt-variables.destroy');
    });

    Route::prefix('members')->group(function () {
        Route::put('/role/{user}', [MembersController::class, 'updateRole'])->name('members.update-role');
        Route::delete('/{user}', [MembersController::class, 'destroy'])->name('members.destroy');
    });

    Route::prefix('profile')->group(function () {
        Route::get('/', [ProfileController::class, 'edit'])->name('profile.edit');
        Route::patch('/', [ProfileController::class, 'update'])->name('profile.update');
        Route::delete('/', [ProfileController::class, 'destroy'])->name('profile.destroy');
    });

    Route::prefix('invitations')->group(function () {
        Route::get('/accept/{token}', [InvitationsController::class, 'accept'])->name('invitations.accept');
        
        Route::post('/send', [InvitationsController::class, 'send'])->name('invitations.send');
        
        Route::post('/confirm/{token}', [InvitationsController::class, 'confirm'])->name('invitations.confirm');
        Route::post('/decline/{token}', [InvitationsController::class, 'decline'])->name('invitations.decline');
        
        Route::post('/revoked/{invitation}', [InvitationsController::class, 'revoke'])->name('invitations.revoke');
    });

    Route::prefix('api-keys')->group(function () {
        Route::get('/', [ApiKeysController::class, 'usersApiKeys'])->name('api-keys.users-api-keys');
        Route::post('/', [ApiKeysController::class, 'store'])->name('api-keys.create');
        Route::post('/{apiKey}', [ApiKeysController::class, 'update'])->name('api-keys.update');
        Route::post('/{apiKey}/regen', [ApiKeysController::class, 'regenerate'])->name('api-keys.regen');
        Route::delete('/{apiKey}', [ApiKeysController::class, 'destroy'])->name('api-keys.destroy');
    });

    Route::prefix('settings')->group(function () {
        Route::get('/', [SettingsController::class, 'usersSettings'])->name('settings.users-settings');
        Route::post('/', [SettingsController::class, 'updateNotifications'])->name('settings.update-notifications');
    });
});

require __DIR__ . '/auth.php';
