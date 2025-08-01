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
            $table->string('id')->primary();
            $table->string('name', 50);
            $table->string('type', 50);
            $table->string('icon', 30);
            $table->foreignId('owner_id')->constrained('users')->onDelete('cascade');
            $table->boolean('personal_team')->default(false);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('teams');
    }
};
