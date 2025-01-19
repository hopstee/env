<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('teams', function (Blueprint $table) {
            // $table->string('id')->default(uniqid())->primary();
            $table->string('id')->primary();
            $table->string('name', 50);
            $table->string('type', 50);
            $table->string('icon', 30);
            $table->boolean('personal_team')->default(false);
            $table->timestamps();
        });

        Schema::create('team_users', function (Blueprint $table) {
            $table->id();
            $table->string('team_id');
            $table->foreign('team_id')->references('id')->on('teams')->onDelete('cascade');
            $table->foreignId('user_id')->constrained('users')->onDelete('cascade');
            $table->foreignId('role_id')->constrained('roles')->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('team_users');
        Schema::dropIfExists('teams');
    }
};
