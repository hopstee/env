<?php

namespace App\Http\Controllers\Dashboard;

use App\Http\Controllers\Controller;
use App\Models\Access;
use App\Models\Team;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class MembersController extends Controller
{
    public function show(Team $team): Response
    {
        $members = $team->users()->get();

        return Inertia::render('Dashboard/Teams/Members/Show', [
            'members' => $members,
        ]);
    }
}
