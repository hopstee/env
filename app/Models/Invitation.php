<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Invitation extends Model
{
    protected $fillable = [
        'email',
        'token',
        'accessable_id',
        'accessable_type',
        'role_id',
        'status',
        'invited_by',
        'expires_at',
    ];

    public function accessable()
    {
        return $this->morphTo();
    }

    public function role()
    {
        return $this->belongsTo(Role::class);
    }
}
