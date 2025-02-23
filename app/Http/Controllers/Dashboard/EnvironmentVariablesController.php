<?php

namespace App\Http\Controllers\Dashboard;

use App\Http\Controllers\Controller;
use App\Models\EnvironmentVariable;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Redirect;

class EnvironmentVariablesController extends Controller
{
    public function store(Request $request)
    {
        $request->validate([
            "key"       => "required|string",
            "value"     => "required|string",
            "group_id"  => "required|string",
        ]);

        EnvironmentVariable::create([
            "key"       => $request->key,
            "value"     => $request->value,
            "group_id"  => $request->group_id,
        ]);

        return Redirect::back();
    }

    public function destroy(Request $request)
    {
        EnvironmentVariable::where('id', $request->env_id)->delete();
    }
}
