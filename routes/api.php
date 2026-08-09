<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\api\AuthentificationController;
use App\Http\Controllers\api\EvenementController;

Route::post('/login', [AuthentificationController::class, 'login']);
Route::post('/logout', [AuthentificationController::class, 'logout']);

Route::get('/evenements', [EvenementController::class, 'index']);
Route::post('/evenements', [EvenementController::class, 'store']);


Route::post('/evenements', [EvenementController::class, 'store']);
Route::put('/evenements/{id}', [EvenementController::class, 'update']);
Route::delete('/evenements/{id}', [EvenementController::class, 'destroy']);
