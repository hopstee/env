<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class ProjectUser extends Model
{
    public $timestamps = false;
    
    protected $fillable = [
        'project_id',
        'user_id',
        'role_id',
    ];
}
