<?php

namespace App\Http\Controllers\Env;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;

class EnvFieldsController extends Controller
{
    public function update(Request $request, string $envId)
    {
        $userId = $request->user()->id;

        $validated = $request->validate([
            'fields' => 'required|array',
            'fields.*.id' => 'required|int',
            'fields.*.env_key' => 'required|string',
            'fields.*.env_value' => 'required|string',
            'fields.*.is_archived' => 'required|boolean',
        ]);

        $newFields = collect($validated['fields']);

        DB::transaction(function () use ($envId, $userId, $newFields) {
            $existingFields = DB::table('env_fields')
                ->where('env_id', $envId)
                ->get(['id', 'env_key', 'env_value', 'is_archived'])
                ->keyBy('id');

            $keysToUpdateOrCreate = $newFields->pluck('id');

            $keysToDelete = $existingFields
                ->keys()
                ->diff($keysToUpdateOrCreate);

            if ($keysToDelete->isNotEmpty()) {
                // $fieldsToDelete = $existingFields->only($keysToDelete);

                // DB::table('env_field_users')
                //     ->whereIn('env_field_id', $fieldsToDelete->pluck('id'))
                //     ->delete();
                
                DB::table('env_fields')
                    // ->where('env_id', $envId)
                    // ->whereIn('env_key', $keysToDelete)
                    ->whereIn('id', $keysToDelete)
                    ->delete();
            }

            $newFields->each(function ($field) use ($existingFields, $envId, $userId) {
                if ($existingFields->has($field['id'])) {
                    DB::table('env_fields')
                        ->where('id', $existingFields[$field['id']]->id)
                        ->update(['env_value' => $field['env_value'], 'is_archived' => $field['is_archived']]);
                } else {
                    $fieldId = DB::table('env_fields')->insertGetId([
                        'env_id'        => $envId,
                        'env_key'       => $field['env_key'],
                        'env_value'     => $field['env_value'],
                        'is_archived'   => $field['is_archived']
                    ]);

                    DB::table('env_field_users')->insert([
                        'env_field_id' => $fieldId,
                        'user_id' => $userId,
                    ]);
                }
            });
        });
    }
}
