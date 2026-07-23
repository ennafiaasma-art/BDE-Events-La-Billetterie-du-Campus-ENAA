<?php

namespace App\Http\Controllers;


use App\Models\Evenement;
use App\Models\Reservation;
use App\Models\Ticket;

class EtudiantController extends Controller
{

    public function dashboard(){

    $evenements=Evenement::whith('reservations')->get();
    $reservations=Reservation::where('etudient_id',auth()->id())->get();
    $tickets=Ticket::whereHas('reservation',function($query){
        $query->where('etudient_id',auth()->id());
    })->get();

    return view('dashbordEtu', compact(
        'evenements',
        'reservations',
        'tickets'
    ));

    }

}
