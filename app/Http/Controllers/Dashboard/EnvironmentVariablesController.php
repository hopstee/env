<?php

namespace App\Http\Controllers\Dashboard;

use App\Http\Controllers\Controller;
use App\Models\EnvironmentVariable;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Redirect;

class EnvironmentVariablesController extends Controller
{
    public function store(Request $request)
    {
        $validated = $request->validate([
            'key'       => 'required|string',
            'value'     => 'nullable',
            'group_id'  => 'required|string',
        ]);

        EnvironmentVariable::create([
            'key'       => $validated['key'],
            'value'     => $validated['value'],
            'group_id'  => $validated['group_id'],
        ]);

        return back();
    }

    public function update(Request $request, EnvironmentVariable $variable)
    {
        $validated = $request->validate([
            'key'       => 'required|string',
            'value'     => 'string',
            'group_id'  => 'required|string',
        ]);

        $variable->update([
            'key'       => $validated['key'],
            'value'     => $validated['value'],
            'group_id'  => $validated['group_id'],
        ]);

        return back();
    }

    public function destroy(Request $request)
    {
        EnvironmentVariable::where('id', $request->env_id)->delete();
    }
}
