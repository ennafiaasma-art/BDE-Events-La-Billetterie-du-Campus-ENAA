<?php

namespace App\Http\Controllers;

use App\Models\Reservation;
use App\Models\Ticket;
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
    public function adminIndex(){
        $reservations = Reservation::with(['etudiant', 'evenement', 'ticket'])
        ->latest()
        ->get();

    return view('suiveReservation', compact('reservations'));
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

    $reservation=Reservation::create([
        'codeReservation' => 'BDE-' . time(),
        'dateReservation' => now(),
        'evenement_id' => $evenement_id,
        'etudiant_id' => auth()->id(),
    ]);
    // creer automatiquement les ticket
   $numero = 'TICKET-' . rand(1000, 9999);
$code = uniqid();

Ticket::create([
    'numero' => $numero,
    'code' => $code,
    'reservation_id' => $reservation->id,
]);

    return redirect()->route('ticket')->with('success', 'Réservation effectuée avec succès.');
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
