<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class EnvUser extends Model
{
    public $timestamps = false;
    
    protected $fillable = [
        'env_id',
        'user_id',
        'role_id',
    ];
}
