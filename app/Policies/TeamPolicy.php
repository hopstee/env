<?php

namespace App\Policies;

use App\Models\Team;
use App\Models\User;
use Illuminate\Auth\Access\HandlesAuthorization;

class TeamPolicy
{
    use HandlesAuthorization;

    /**
     * Create a new policy instance.
     */
    public function __construct() {}

    /**
     * Check if user have access to the team
     *
     * @param  \App\Models\User  $user
     * @param  \App\Models\Team  $team
     * @return bool
     */
    public function view(User $user, Team $team)
    {
        return $user->hasAccessToTeam($team);
    }

    /**
     * Check if user has admin access to the team
     *
     * @param  \App\Models\User  $user
     * @param  \App\Models\Team  $team
     * @return bool
     */
    public function admin(User $user, Team $team)
    {
        return $team->users()->where('user_id', $user->id)->where('role', 'admin')->exists();
    }
}
