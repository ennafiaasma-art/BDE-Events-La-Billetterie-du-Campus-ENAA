<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up()

    {

   Schema::create('evenements' , function(Blueprint $table){
    $table->id();
    $table->string('title');
    $table->text('description');
    $table->date('date');
    $table->string('lieu');
    $table->float('prix');
    $table->integer('capaciteMax');
    $table->timestamps();

   });
        //
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        //
    }
};
