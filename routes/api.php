<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\api\AuthentificationController;
use App\Http\Controllers\api\EvenementController;
use App\Http\Controllers\Api\ReservationController;
use App\Http\Controllers\Api\TicketController;


Route::post('/login', [AuthentificationController::class, 'login']);
Route::post('/logout', [AuthentificationController::class, 'logout']);

Route::get('/evenements', [EvenementController::class, 'index']);
Route::post('/evenements', [EvenementController::class, 'store']);


Route::post('/evenements', [EvenementController::class, 'store']);
Route::put('/evenements/{id}', [EvenementController::class, 'update']);
Route::delete('/evenements/{id}', [EvenementController::class, 'destroy']);

Route::middleware('auth:sanctum')->group(function () {

    Route::get( '/mes-reservations', [ReservationController::class, 'mesReservations']
    );

});
Route::get('/reservations', [ReservationController::class, 'index']);
Route::get('/reservations/{id}', [ReservationController::class, 'show']);
Route::post('/reservations', [ReservationController::class, 'store']);
Route::put('/reservations/{id}', [ReservationController::class, 'update']);
Route::delete('/reservations/{id}', [ReservationController::class, 'destroy']);





Route::get('/tickets', [TicketController::class, 'index']);
Route::get('/tickets/{id}', [TicketController::class, 'show']);
Route::post('/tickets', [TicketController::class, 'store']);
Route::put('/tickets/{id}', [TicketController::class, 'update']);
Route::delete('/tickets/{id}', [TicketController::class, 'destroy']);
