<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class EnvFieldUser extends Model
{
    public $timestamps = false;
    
    protected $fillable = [
        'env_field_id',
        'user_id',
    ];
}
