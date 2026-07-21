<?php

use App\Http\Controllers\EvenementController;
use Illuminate\Support\Facades\Route;

Route::middleware('auth')->group(function(){
    Route::resource('/admin/evenements',EvenementController::class);
});
