<?php

namespace App\Http\Controllers\Team;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class MembersController extends Controller
{
    /**
     * Show members table
     */
    public function show(Request $request): Response
    {
        return Inertia::render('Teams/Members');
    }
}
