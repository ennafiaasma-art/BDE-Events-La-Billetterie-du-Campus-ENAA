<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthentificationController;

Route::post('/login', [AuthentificationController::class, 'login']);
Route::post('/logout', [AuthentificationController::class, 'logout']);
