<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class TeamUser extends Model
{
    public $timestamps = false;
    
    protected $fillable = [
        'team_id',
        'user_id',
        'role_id',
    ];
}
