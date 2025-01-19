<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Env extends Model
{
    public $incrementing = false;
    
    protected $keyType = 'string';
    protected $primaryKey = 'id';

    protected $fillable = [
        'name',
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

    public function users(): HasMany
    {
        return $this->hasMany(EnvUser::class, 'env_id');
    }

    public function envUsers(): HasMany
    {
        return $this->hasMany(EnvUser::class, 'env_id');
    }
}
