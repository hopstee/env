<?php

namespace Database\Seeders;

use App\Models\Role;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class RolesSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        Role::factory()->create([
            'name' => 'Superuser',
            'value' => 'superuser',
        ]);

        Role::factory()->create([
            'name' => 'Team admin',
            'value' => 'team_admin',
        ]);

        Role::factory()->create([
            'name' => 'Project admin',
            'value' => 'project_admin',
        ]);

        Role::factory()->create([
            'name' => 'Env admin',
            'value' => 'env_admin',
        ]);

        Role::factory()->create([
            'name' => 'Viewer',
            'value' => 'viewer',
        ]);
    }
}
