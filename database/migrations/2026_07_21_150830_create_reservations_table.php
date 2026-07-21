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
        Schema::create('reservations', function (Blueprint $table) {
           
              $table->id();

            $table->string('codeReservation')->unique();

            $table->date('dateReservation');

            $table->foreignId('evenement_id')
                  ->constrained('evenements')
                  ->cascadeOnDelete();

            $table->foreignId('etudiant_id')
                  ->constrained('users')
                  ->cascadeOnDelete();

            $table->timestamps();

         $table->unique(['evenement_id', 'etudiant_id']);




        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('reservations');
    }
};
