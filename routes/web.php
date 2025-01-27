<?php

use App\Http\Controllers\Team\TeamsController;
use App\Http\Controllers\Team\MembersController;
use App\Http\Controllers\Profile\ProfileController;
use App\Http\Controllers\Project\ProjectsController;
use App\Http\Controllers\Team\ProjectController;
use App\Http\Controllers\Team\ReadmeController;
use App\Http\Controllers\Team\SettingsController;
use App\Http\Middleware\CheckProjectAccess;
use App\Http\Middleware\CheckTeamAccess;
use App\Http\Middleware\GenerateBreadcrumbs;
use App\Http\Middleware\RedirectToTeam;
use App\Http\Middleware\ShareTeamsData;
use Illuminate\Foundation\Application;
use Illuminate\Http\Request;
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
            Route::get('/', [TeamsController::class, 'show'])->name('t.workspace');

            Route::get('/members', [MembersController::class, 'show'])->name('t.members');

            Route::get('/readme', [ReadmeController::class, 'show'])->name('t.readme');

            Route::get('/settings', [SettingsController::class, 'show'])->name('t.settings');

            Route::prefix('p')->group(function () {
                Route::get('/', function () {
                    return redirect()->route('t', ['team_id' => session('selected_team_id')]);
                })->name('p');

                Route::prefix('{project_id}')->middleware([CheckProjectAccess::class])->group(function () {
                    Route::get('/', [ProjectsController::class, 'show'])->name('p.workspace');
                });
            });
        });
    });

    Route::prefix('team')->group(function () {
        Route::post('/', [TeamsController::class, 'store'])->name('team.create');
        Route::delete('/{team_id}', [TeamsController::class, 'destroy'])->name('team.destroy');
    });

    Route::prefix('project')->group(function () {
        Route::post('/', [ProjectController::class, 'store'])->name('project.create');
        Route::delete('/{project_id}', [ProjectController::class, 'destroy'])->name('project.destroy');
        Route::delete('/', [ProjectController::class, 'destroyMany'])->name('project.destroy-many');
        Route::post('/projects/{project}/archive', [ProjectController::class, 'archive'])->name('project.archive');
        Route::post('/projects/archive', [ProjectController::class, 'archiveMany'])->name('project.archive-many');

    });

    Route::prefix('profile')->group(function () {
        Route::get('/', [ProfileController::class, 'edit'])->name('profile.edit');
        Route::patch('/', [ProfileController::class, 'update'])->name('profile.update');
        Route::delete('/', [ProfileController::class, 'destroy'])->name('profile.destroy');
    });
});

require __DIR__ . '/auth.php';
