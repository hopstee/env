<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class EnvField extends Model
{
    protected $fillable = [
        'env_key',
        'env_value',
        'env_id',
        'is_archived',
    ];

    public function users()
    {
        return $this->belongsToMany(User::class, 'env_field_users');
    }
}
