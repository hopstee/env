<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class ProjectEnv extends Model
{
    public $timestamps = false;

    protected $fillable = [
        'project_id',
        'env_id',
    ];

    public function project()
    {
        return $this->belongsTo(Project::class, 'project_id');
    }

    public function env()
    {
        return $this->belongsTo(Env::class, 'env_id');
    }
}
