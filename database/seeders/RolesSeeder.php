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
            'name' => 'Admin',
            'value' => 'admin',
        ]);

        Role::factory()->create([
            'name' => 'Member',
            'value' => 'member',
        ]);
    }
}
