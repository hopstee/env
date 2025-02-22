<?php

use App\Http\Controllers\Dashboard\EnvFieldsController;
use App\Http\Controllers\Dashboard\EnvsController;
use App\Http\Controllers\Dashboard\GroupsController as DashboardGroupsController;
use App\Http\Controllers\Groups\GroupsController;
use App\Http\Controllers\Dashboard\InvitationsController;
use App\Http\Controllers\Dashboard\TeamsController;
use App\Http\Controllers\Dashboard\MembersController;
use App\Http\Controllers\Profile\ProfileController;
use App\Http\Controllers\Project\ProjectsController;
use App\Http\Controllers\Dashboard\SettingsController;
use App\Http\Middleware\CheckProjectAccess;
use App\Http\Middleware\CheckTeamAccess;
use App\Http\Middleware\GenerateBreadcrumbs;
use App\Http\Middleware\RedirectToTeam;
use App\Http\Middleware\ShareTeamsData;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
});

Route::middleware('auth')->group(function () {
    Route::prefix('t')->middleware([
        'verified',
        RedirectToTeam::class,
        ShareTeamsData::class,
        GenerateBreadcrumbs::class,
    ])->group(function () {
        Route::get('/', function () {
            return redirect()->route('t', ['team_id' => session('selected_team_id')]);
        })->name('t');

        Route::prefix('{team_id}')->middleware([CheckTeamAccess::class])->group(function () {
            Route::get('/', [TeamsController::class, 'show'])->name('t.active');

            Route::get('/members', [MembersController::class, 'show'])->name('t.members');

            Route::get('/settings', [SettingsController::class, 'show'])->name('t.settings');

            Route::prefix('invitations')->group(function () {
               
            });
        });
    });

    Route::prefix('team')->group(function () {
        Route::post('/', [TeamsController::class, 'store'])->name('team.create');
        Route::delete('/{team_id}', [TeamsController::class, 'destroy'])->name('team.destroy');
    });

    Route::prefix('group')->group(function () {
        Route::post('/', [DashboardGroupsController::class, 'store'])->name('group.create');
        // Route::delete('/{project_id}', [ProjectsController::class, 'destroy'])->name('project.destroy');
        // Route::delete('/', [ProjectsController::class, 'destroyMany'])->name('project.destroy-many');
        // Route::post('/projects/{project}/archiveToggle', [ProjectsController::class, 'archiveToggle'])->name('project.archiveToggle');
        // Route::post('/projects/archive', [ProjectsController::class, 'archiveMany'])->name('project.archive-many');
        // Route::post('/projects/{project}/favToggle', [ProjectsController::class, 'favToggle'])->name('project.favToggle');
    });

    // Route::prefix('env')->group(function () {
    //     Route::post('/', [EnvsController::class, 'store'])->name('env.create');
    //     Route::delete('/{env_id}', [EnvsController::class, 'destroy'])->name('env.destroy');

    //     Route::put('/{env_id}/fields', [EnvFieldsController::class, 'update'])->name('env-field.update');
    // });

    Route::prefix('profile')->group(function () {
        Route::get('/', [ProfileController::class, 'edit'])->name('profile.edit');
        Route::patch('/', [ProfileController::class, 'update'])->name('profile.update');
        Route::delete('/', [ProfileController::class, 'destroy'])->name('profile.destroy');
    });

    Route::prefix('invitations')->group(function () {
        Route::get('/accept/{token}', [InvitationsController::class, 'show'])->name('invitations.show');

        Route::post('/send', [InvitationsController::class, 'send'])->name('invitations.send');
        
        Route::post('/confirm/{token}', [InvitationsController::class, 'confirm'])->name('invitations.confirm');
        Route::post('/decline/{token}', [InvitationsController::class, 'decline'])->name('invitations.decline');
    });
});

require __DIR__ . '/auth.php';
