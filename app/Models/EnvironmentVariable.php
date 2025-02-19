<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class EnvironmentVariable extends Model
{
    protected $fillable = [
        'group_id',
        'key',
        'value',
        'is_active',
    ];

    public function group() {
        return $this->belongsTo(Group::class);
    }

    public function hasUserAccess($user) {
        return $this->group->hasUserAccess($user);
    }
}
