<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Group extends Model
{
    public $incrementing = false;

    protected $keyType = 'string';
    protected $primaryKey = 'id';

    protected $fillable = [
        'name',
        'color',
        'team_id',
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

    public function favoritedByUsers()
    {
        return $this->belongsToMany(User::class, 'favorite_groups')->withTimestamps();
    }


    public function team(): BelongsTo
    {
        return $this->belongsTo(Team::class);
    }

    public function hasUserAccess($user): bool
    {
        return $this->team->hasUser($user);
    }

    public function environmentVariables()
    {
        return $this->hasMany(EnvironmentVariable::class, 'group_id');
    }

    public function permissions(): HasMany
    {
        return $this->hasMany(Permission::class, 'group_id');
    }

    public function grantPermission(int $userId, bool $canRead = true, bool $canWrite = false)
    {
        return $this->permissions()->updateOrCreate(
            ['user_id' => $userId, 'group_id' => $this->id],
            ['can_read' => $canRead, 'can_write' => $canWrite],
        );
    }

    public function apiKeys(): HasMany
    {
        return $this->hasMany(ApiKey::class);
    }
}
