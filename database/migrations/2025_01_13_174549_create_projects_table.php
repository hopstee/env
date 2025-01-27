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
        Schema::create('projects', function (Blueprint $table) {
            // $table->string('id')->default(uniqid())->primary();
            $table->string('id')->primary();
            $table->string('name', 50);
            $table->text('description')->nullable();
            $table->string('icon', 10);
            $table->string('team_id');
            $table->foreign('team_id')->references('id')->on('teams')->onDelete('cascade');
            $table->boolean('is_deleted')->default(false);
            $table->boolean('is_archived')->default(false);
            $table->timestamp('archived_at')->nullable();
            $table->timestamps();
        });

        Schema::create('project_users', function (Blueprint $table) {
            $table->id();
            $table->string('project_id');
            $table->foreign('project_id')->references('id')->on('projects')->onDelete('cascade');
            $table->foreignId('user_id')->constrained('users')->onDelete('cascade');
            $table->foreignId('role_id')->constrained('roles')->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('project_users');
        Schema::dropIfExists('team_projects');
        Schema::dropIfExists('projects');
    }
};