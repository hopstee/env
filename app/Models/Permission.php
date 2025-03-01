<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Permission extends Model
{
    protected $fillable = [
        'user_id',
        'group_id',
        'can_read',
        'can_write',
    ];

    public function user()
    {
        return $this->belongsTo(User::class, 'user_id');
    }
}
