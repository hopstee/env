<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Pagination\LengthAwarePaginator;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;

class Team extends Model
{
    public $incrementing = false;

    protected $keyType = 'string';
    protected $primaryKey = 'id';

    protected $fillable = [
        'name',
        'type',
        'icon',
        'owner_id',
        'personal_team',
    ];

    protected static function boot()
    {
        parent::boot();

        static::creating(function ($model) {
            if (empty($model->id)) {
                $model->id = uniqid();
            }
        });
    }

    public function scopeCurrent(Builder $query): Team
    {
        return $query->where('id', session('selected_team_id'))->first();
    }

    public function users(): BelongsToMany
    {
        return $this->belongsToMany(User::class, 'team_users')
            ->withPivot('created_at')
            ->leftJoin('roles', 'team_users.role_id', '=', 'roles.id')
            ->leftJoin('teams', 'team_users.team_id', '=', 'teams.id')
            ->select(
                'users.id as user_id',
                'users.name as user_name',
                'users.email as user_email',
                'users.avatar as user_avatar',
                'roles.id as role_id',
                'roles.name as role_name',
                'team_users.role_id as pivot_role_id',
                'teams.owner_id as team_owner_id',
                DB::raw('CASE WHEN teams.owner_id = users.id THEN true ELSE false END as is_owner'),
            );
    }

    public function groups(): HasMany
    {
        return $this->hasMany(Group::class);
    }

    public function hasAdmin($user)
    {
        return $this->users()->where('user_id', $user->id)->where('roles.value', 'admin')->exists();
    }

    public function hasUser($user): bool
    {
        return $this->users()->where('user_id', $user->id)->exists();
    }

    public function addUser($userId, $roleId): void
    {
        $this->users()->attach($userId, ['role_id' => $roleId]);
    }

    public function invitations(bool $withForeignData = false): HasMany
    {
        if ($withForeignData) {
            return $this->hasMany(Invitation::class, 'team_id')
                ->with(['invitedBy', 'role']);
        }

        return $this->hasMany(Invitation::class, 'team_id');
    }

    public function apiKeys(): HasMany
    {
        return $this->hasMany(ApiKey::class);
    }

    public function apiKeysWithUsers($filters)
    {
        $perPageOptions = [10, 25, 50, 100];

        $selectedUserId = array_key_exists('u', $filters) ? $filters['u'] : '';

        $apiKeysQuery = $this->hasMany(ApiKey::class, 'team_id')
            ->with('user');

        if (!empty($selectedUserId)) {
            $apiKeysQuery->where('api_keys.user_id', $selectedUserId);
        }

        $apiKeys = $apiKeysQuery->get();

        $perPage = array_key_exists('perPage', $filters) ? (int)$filters['perPage'] : $perPageOptions[0];
        $totalItems = $apiKeys->count();
        $lastPage = max(1, (int) ceil($totalItems / $perPage));

        $page = array_key_exists('page', $filters) ? (int)$filters['page'] : 1;
        if ($page > $lastPage) {
            $page = $lastPage;
        }

        $paginated = new LengthAwarePaginator(
            $apiKeys->forPage($page, $perPage)->values()->toArray(),
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
