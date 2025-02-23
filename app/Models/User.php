<?php

namespace App\Models;

// use Illuminate\Contracts\Auth\MustVerifyEmail;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Database\Eloquent\Relations\MorphToMany;
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
        return $this->belongsToMany(Team::class, 'team_users')->withPivot('role');
    }

    public function hasAccessToTeam(string $teamId): bool
    {
        return $this->teams()->where('teams.id', $teamId)->exists();
    }

    public function getAccessibleGroups(string $teamId, bool $isFavorite = false)
    {
        return $this->belongsToMany(Group::class, 'permissions')
            ->withPivot('can_read', 'can_write')
            ->where('groups.team_id', $teamId)
            ->where('permissions.can_read', true)
            ->when(
                $isFavorite,
                fn($query) =>
                $query->where('groups.is_favorite', true)
            );
    }

    public function getEnvironmentVariables(string $teamId)
    {
        return $this->getAccessibleGroups($teamId)
            ->with('environmentVariables')
            ->get()
            ->flatMap(fn($group) => $group->environmentVariables->map(function ($env) use ($group) {
                return [
                    'id'            => $env->id,
                    'key'           => $env->key,
                    'value'         => $env->value,
                    'is_active'     => $env->is_active,
                    'group_id'      => $group->id,
                    'group_name'    => $group->name,
                    'group_color'   => $group->color,
                    'can_read'      => $group->pivot->can_read,
                    'can_write'     => $group->pivot->can_write,
                ];
            }))
            ->all();
    }
}
