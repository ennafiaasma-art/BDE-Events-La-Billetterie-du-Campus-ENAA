<?php

namespace App\Http\Controllers;


use App\Models\Evenement;
use App\Models\Reservation;
use App\Models\Ticket;

class EtudiantController extends Controller
{

    public function dashboard(){

    $evenements=Evenement::with('reservations')->get();
    $reservations=Reservation::where('etudiant_id',auth()->id())->get();
    $tickets=Ticket::whereHas('reservation',function($query){
        $query->where('etudiant_id',auth()->id());
    })->get();

    return view('dashbordEtu', compact(
        'evenements',
        'reservations',
        'tickets'
    ));

    }

}
