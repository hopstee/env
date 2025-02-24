<?php

namespace App\Models;

// use Illuminate\Contracts\Auth\MustVerifyEmail;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Database\Eloquent\Relations\MorphToMany;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Illuminate\Pagination\LengthAwarePaginator;
use Illuminate\Support\Facades\Log;

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
        return $this->belongsToMany(Team::class, 'team_users')->withPivot('role_id');
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

    /**
     * @param array{
     *     g?: string,
     *     page?: int,
     *     perPage?: int,
     *     query?: string,
     * } $filters
     */
    public function getEnvironmentVariables(string $teamId, $filters)
    {
        $perPageOptions = [10, 25, 50, 100];

        $selectedGroupId = array_key_exists('g', $filters) ? $filters['g'] : '';

        $groupsQuery = $this->getAccessibleGroups($teamId)->with('environmentVariables');

        if (!empty($selectedGroupId)) {
            $groupsQuery->where('groups.id', $selectedGroupId);
        }

        $groups = $groupsQuery->get();

        $environmentVariables = $groups->flatMap(fn($group) => $group->environmentVariables->map(function ($env) use ($group) {
            return [
                'id'            => $env->id,
                'key'           => $env->key,
                'value'         => $env->value,
                'is_active'     => $env->is_active,
                'updated_at'    => $env->updated_at,
                'group_id'      => $group->id,
                'group_name'    => $group->name,
                'group_color'   => $group->color,
                'can_read'      => $group->pivot->can_read,
                'can_write'     => $group->pivot->can_write,
            ];
        }));

        $perPage = array_key_exists('perPage', $filters) ? (int)$filters['perPage'] : $perPageOptions[0];
        $totalItems = $environmentVariables->count();
        $lastPage = max(1, (int) ceil($totalItems / $perPage));

        $page = array_key_exists('page', $filters) ? (int)$filters['page'] : 1;
        if ($page > $lastPage) {
            $page = $lastPage;
        }

        $paginated = new LengthAwarePaginator(
            $environmentVariables->forPage($page, $perPage)->values()->toArray(),
            $totalItems,
            $perPage,
            $page,
            [
                'path'  => request()->url(),
                'query' => request()->query(),
            ]
        );

        $paginatedArray = $paginated->toArray();
        $paginatedArray['links'] = array_values(array_filter($paginatedArray['links'], function ($link) {
            return isset($link['label']) && !in_array($link['label'], ['&laquo; Previous', 'Next &raquo;']);
        }));

        $paginatedArray['per_page_options'] = collect($perPageOptions)->map(function ($option) use ($page) {
            return [
                'label' => $option,
                'link' => request()->fullUrlWithQuery(['perPage' => $option]),
            ];
        });

        return $paginatedArray;
    }
}
