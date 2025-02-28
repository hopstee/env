<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Database\Eloquent\Relations\HasMany;

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

    public function users(): BelongsToMany
    {
        return $this->belongsToMany(User::class, 'team_users')
            // // ->withPivot('*')
            // ->withTimestamps()
            // ->leftJoin('users', 'team_users.user_id', '=', 'users.id')
            // ->leftJoin('roles', 'team_users.role_id', '=', 'roles.id')
            // ->addSelect('users.*', 'roles.*');
            ->withPivot('*') // Если нужны поля из team_users
            ->withTimestamps()
            ->leftJoin('roles', 'team_users.role_id', '=', 'roles.id')
            ->select('users.*', 'roles.name as role_name', 'team_users.role_id');
    }

    public function groups(): HasMany
    {
        return $this->hasMany(Group::class);
    }

    public function hasAdmin($user)
    {
        return $this->users()->where('user_id', $user->id)->where('role_id', 'admin')->exists();
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
}
