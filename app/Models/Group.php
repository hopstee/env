<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Group extends Model
{
    public $incrementing = false;

    protected $keyType = 'string';
    protected $primaryKey = 'id';

    protected $fillable = [
        'name',
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

    public function team() {
        return $this->belongsTo(Team::class);
    }

    public function variables() {
        return $this->hasMany(EnvironmentVariable::class);
    }
    
    public function hasUserAccess($user) {
        return $this->team->hasUser($user);
    }
}
