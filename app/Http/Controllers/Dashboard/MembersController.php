<?php

namespace App\Http\Controllers\Dashboard;

use App\Http\Controllers\Controller;
use App\Models\Access;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class MembersController extends Controller
{
    public function show(Request $request): Response
    {
        $teamId = session('selected_team_id');
        $members = Access::where('accessable_id', $teamId)->get();

        return Inertia::render('Dashboard/Teams/Members/Show', [
            'members' => $members->load('user'),
        ]);
    }
}
