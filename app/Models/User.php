<?php

namespace App\Models;

// use Illuminate\Contracts\Auth\MustVerifyEmail;

use Illuminate\Database\Eloquent\Collection;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;

class User extends Authenticatable
{
    /** @use HasFactory<\Database\Factories\UserFactory> */
    use HasFactory, Notifiable;

    /**
     * The attributes that are mass assignable.
     *
     * @var list<string>
     */
    protected $fillable = [
        'name',
        'email',
        'password',
    ];

    /**
     * The attributes that should be hidden for serialization.
     *
     * @var list<string>
     */
    protected $hidden = [
        'password',
        'remember_token',
    ];

    /**
     * Get the attributes that should be cast.
     *
     * @return array<string, string>
     */
    protected function casts(): array
    {
        return [
            'email_verified_at' => 'datetime',
            'password' => 'hashed',
        ];
    }

    public function teams(): BelongsToMany
    {
        return $this->belongsToMany(Team::class, 'team_users');
    }

    public function projects(): BelongsToMany
    {
        return $this->belongsToMany(Project::class, 'project_users');
    }

    public function accessibleProjectsByTeam(string $teamId): BelongsToMany
    {
        return $this->projects()->whereHas('team', function ($query) use ($teamId) {
            $query->where('id', $teamId);
        });
    }

    public function accessibleProjectsWithUsersByTeam(string $teamId): BelongsToMany
    {
        return $this->projects()
            ->whereHas('team', function ($query) use ($teamId) {
                $query->where('id', $teamId);
            })
            ->with(['users'])
            ->withCount('users');
    }

    public function hasAccessToTeam(string $teamId): bool
    {
        return $this->teams()->where('team_id', $teamId)->exists();
    }

    public function hasAccessToProjectInTeam(string $projectId, string $teamId): bool
    {
        return $this->projects()->where('projects.id', $projectId)->whereHas('team', function ($query) use ($teamId) {
            $query->where('teams.id', $teamId);
        })->exists();
    }

    public function accessibleEnvsByProject(string $teamId, string $projectId)
    {
        return $this->hasManyThrough(
            Env::class,
            ProjectEnv::class,
            'project_id',
            'id',
            'id',
            'env_id'
        )->whereHas('envUsers', function ($query) use ($teamId) {
            $query->where('user_id', $this->id);
        })->where('project_id', $projectId);
    }
}
