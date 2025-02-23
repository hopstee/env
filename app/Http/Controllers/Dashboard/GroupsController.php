<?php

namespace App\Http\Controllers\Dashboard;

use App\Http\Controllers\Controller;
use App\Models\Group;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Redirect;

class GroupsController extends Controller
{
    public function store(Request $request)
    {
        $request->validate([
            'name'      => 'required',
            'color'     => 'required',
            'team_id'   => 'required',
        ]);

        $group = Group::create([
            'name' => $request->name,
            'color' => $request->color,
            'team_id' => $request->team_id,
        ]);

        $group->grantPermission($request->user()->id, true, true);

        return Redirect::back();
    }

    public function destroy(Request $request)
    {
        Group::where('id', $request->group_id)->delete();
    }
}
