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
        Schema::create('envs', function (Blueprint $table) {
            // $table->string('id')->default(uniqid())->primary();
            $table->string('id')->primary();
            $table->string('name');
            $table->string('project_id');
            $table->foreign('project_id')->references('id')->on('projects')->onDelete('cascade');
            $table->timestamps();
        });

        Schema::create('env_users', function (Blueprint $table) {
            $table->id();
            $table->string('env_id');
            $table->foreign('env_id')->references('id')->on('envs')->onDelete('cascade');
            $table->foreignId('user_id')->constrained('users')->onDelete('cascade');
            $table->foreignId('role_id')->constrained('roles')->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('env_users');
        Schema::dropIfExists('envs');
    }
};
