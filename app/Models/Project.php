<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;

class Project extends Model
{
    public $incrementing = false;

    protected $keyType = 'string';
    protected $primaryKey = 'id';

    protected $fillable = [
        'name',
        'description',
        'icon',
        'team_id',
        'is_archived',
        'archived_at',
        'is_fav'
    ];

    protected static function boot()
    {
        parent::boot();

        static::creating(function ($model) {
            if (empty($model->id)) {
                $model->id = uniqid();
            }
        });
    }

    public function users(): BelongsToMany
    {
        return $this->belongsToMany(User::class, 'project_users');
    }

    public function team(): BelongsTo
    {
        return $this->belongsTo(Team::class);
    }
    public function scopeArchived($query)
    {
        return $query->where('is_archived', true);
    }

    public function scopeActive($query)
    {
        return $query->where('is_archived', false);
    }

    // сделать тогл для архива и  фава тру/фолс

    public function archive()
    {
        $this->update([
            'is_archived' => true,
            'archived_at' => now(),
            'is_fav' => false,
        ]);
    }

    public function unarchive()
    {
        $this->update([
            'is_archived' => false,
            'archived_at' => null
        ]);
    }

    public function favToggle($status)
    {
        $this->update([
            'is_fav' => $status,
        ]);
    }
}
