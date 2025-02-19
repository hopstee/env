<?php

namespace App\Providers;

use App\Models\EnvironmentVariable;
use App\Models\Group;
use App\Models\Team;
use App\Policies\EnvironmentVariablePolicy;
use App\Policies\EnvPolicy;
use App\Policies\GroupPolicy;
use App\Policies\ProjectPolicy;
use App\Policies\TeamPolicy;
use Illuminate\Database\Eloquent\Relations\Relation;
use Illuminate\Support\Facades\Gate;
use Illuminate\Support\Facades\Vite;
use Illuminate\Support\ServiceProvider;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     */
    public function register(): void
    {
        //
    }

    /**
     * Bootstrap any application services.
     */
    public function boot(): void
    {
        Vite::prefetch(concurrency: 3);

        Relation::morphMap([
            'team'                  => Team::class,
            'groups'                => Group::class,
            'environment_variables' => EnvironmentVariable::class,
        ]);

        Gate::policy(Team::class, TeamPolicy::class);
        Gate::policy(Group::class, GroupPolicy::class);
        Gate::policy(EnvironmentVariable::class, EnvironmentVariablePolicy::class);
    }
}
