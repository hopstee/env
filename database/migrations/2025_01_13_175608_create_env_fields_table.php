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
        Schema::create('env_fields', function (Blueprint $table) {
            $table->id();
            $table->string('env_key', 20);
            $table->string('env_value', 100);
            $table->string('env_id');
            $table->foreign('env_id')->references('id')->on('envs')->onDelete('cascade');
            $table->timestamp('archived_at')->nullable();
            $table->timestamps();
        });

        Schema::create('env_field_users', function (Blueprint $table) {
            $table->id();
            $table->foreignId('env_field_id')->constrained('env_fields')->onDelete('cascade');
            $table->foreignId('user_id')->constrained('users')->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('env_field_users');
        Schema::dropIfExists('env_fields');
    }
};
