<?php

namespace App\Http\Controllers;

use App\Models\Reservation;
use Illuminate\Http\Request;

class ReservationController extends Controller
{
    public function index()
    {
      $reservations=Reservation::with('evenement')
      ->where('etudiant_id',auth()->id())
      ->get();
      return view('reservation',compact('reservations'));
    }

    public function create()
    {
        //
    }


       public function store(Request $request, $evenement_id)
{
    $existe = Reservation::where('etudiant_id', auth()->id())
        ->where('evenement_id', $evenement_id)
        ->exists();

    if ($existe) {
        return back()->with('error', 'Vous avez déjà réservé cet événement.');
    }

    Reservation::create([
        'codeReservation' => 'BDE-' . time(),
        'dateReservation' => now(),
        'evenement_id' => $evenement_id,
        'etudiant_id' => auth()->id(),
    ]);

    return back()->with('success', 'Réservation effectuée avec succès.');
}


    public function show(Reservation $reservation)
    {
        //
    }

    public function edit(Reservation $reservation)
    {
        //
    }

    public function update(Request $request, Reservation $reservation)
    {
        //
    }

    public function destroy(Reservation $reservation)
    {
        //
    }
}
