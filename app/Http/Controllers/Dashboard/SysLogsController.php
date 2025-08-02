<?php

namespace App\Http\Controllers\Dashboard;

use App\Http\Controllers\Controller;
use App\Models\SysLog;
use App\Models\Team;
use Illuminate\Http\Request;
use Inertia\Inertia;

class SysLogsController extends Controller
{
    public function show(Request $request, Team $team)
    {
        $sysLogs = $team->sysLogs()->with(['team', 'user'])->get();
        return Inertia::render(
            'Dashboard/SysLogs/Show',
            [
                'sysLogs' => $sysLogs,
            ]
        );
    }

    public static function addLog(String $subject, String $team_id, String $user_id, array $payload)
    {
        SysLog::create([
            'subject' => $subject,
            'team_id' => $team_id,
            'user_id' => $user_id,
            'payload' => json_encode($payload),
        ]);
    }
}
