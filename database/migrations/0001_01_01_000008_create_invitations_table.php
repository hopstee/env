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
        Schema::create('invitations', function (Blueprint $table) {
            $table->id();
            $table->string('email', 255);
            $table->string('token', 64);
            $table->string('team_id');
            $table->foreignId('role_id')->constrained('roles')->onDelete('cascade');
            $table->enum('status', ['pending', 'accepted', 'expired', 'revoked', 'declined'])->default('pending');
            $table->foreignId('invited_by')->constrained('users')->onDelete('cascade');
            $table->timestamp('expires_at');
            $table->timestamps();
            $table->unique('token');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('invitations');
    }
};
