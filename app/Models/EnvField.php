<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class EnvField extends Model
{
    protected $fillable = [
        'env_key',
        'env_value',
        'env_id',
        'archived_at',
    ];
}
