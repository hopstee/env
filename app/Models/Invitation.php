<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Invitation extends Model
{
    protected $fillable = [
        'email',
        'token',
        'team_id',
        'role_id',
        'status',
        'invited_by',
        'expires_at',
    ];

    public function team()
    {
        return $this->belongsTo(Team::class, 'team_id');
    }

    public function invitedBy()
    {
        return $this->belongsTo(User::class, 'invited_by');
    }

    public function role()
    {
        return $this->belongsTo(Role::class);
    }
}
