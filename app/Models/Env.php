<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Env extends Model
{
    public $incrementing = false;

    protected $keyType = 'string';
    protected $primaryKey = 'id';

    protected $fillable = [
        'name',
        'project_id',
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
        return $this->belongsToMany(EnvUser::class, 'env_users');
    }

    public function project(): BelongsTo
    {
        return $this->belongsTo(Project::class);
    }

    public function fields(): HasMany
    {
        return $this->hasMany(EnvField::class);
    }

    public function getFieldsWithAvailability(int $userId)
    {
        return $this->fields()
            ->with('users')
            ->get()
            ->map(function ($field) use ($userId) {
                $field->is_available = $field->users->contains('id', $userId);
                unset($field->users);
                return $field;
            });
    }
}
