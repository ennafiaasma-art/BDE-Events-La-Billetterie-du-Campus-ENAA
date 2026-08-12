<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Reservation;
use Illuminate\Http\Request;
use App\Models\Ticket;


class ReservationController extends Controller
{
    // 1. Afficher toutes les réservations
    public function index()
    {
        $reservations = Reservation::all();

        return response()->json([
            'success' => true,
            'data' => $reservations
        ], 200);
    }

    // 2. Afficher une réservation
    public function show($id)
    {
        $reservation = Reservation::find($id);

        if (!$reservation) {
            return response()->json([
                'success' => false,
                'message' => 'Réservation introuvable'
            ], 404);
        }

        return response()->json([
            'success' => true,
            'data' => $reservation
        ], 200);
    }

    // 3. Créer une réservation
   public function store(Request $request)
    {
        $request->validate([
            'evenement_id' => 'required|exists:evenements,id',
        ]);

        // Vérifier si l'utilisateur a déjà réservé cet événement
        $dejaReserve = Reservation::where('etudiant_id', $request->user()->id)
            ->where('evenement_id', $request->evenement_id)
            ->exists();

        if ($dejaReserve) {
            return response()->json([
                'success' => false,
                'message' => 'Vous avez déjà réservé cet événement.'
            ], 409);
        }

        // Créer la réservation
        $reservation = Reservation::create([
            'codeReservation' => 'BDE-' . time() . rand(100, 999),
            'dateReservation' => now(),
            'evenement_id' => $request->evenement_id,
            'etudiant_id' => $request->user()->id,
        ]);

        // Créer automatiquement le ticket
        $ticket = Ticket::create([
            'numero' => 'TICKET-' . time() . rand(100, 999),
            'code' => uniqid('TICKET-'),
            'reservation_id' => $reservation->id,
        ]);

        // Retourner réservation + ticket
        return response()->json([
            'success' => true,
            'message' => 'Réservation effectuée avec succès.',
            'data' => [
                'reservation' => $reservation,
                'ticket' => $ticket,
            ]
        ], 201);
    }

    // 4. Modifier une réservation
    public function update(Request $request, $id)
    {
        $reservation = Reservation::find($id);

        if (!$reservation) {
            return response()->json([
                'success' => false,
                'message' => 'Réservation introuvable'
            ], 404);
        }

        $request->validate([
            'codeReservation' => 'sometimes|string|unique:reservations,codeReservation,' . $id,
            'dateReservation' => 'sometimes|date',
            'evenement_id' => 'sometimes|exists:evenements,id',
'etudiant_id' => $request->user()->id,
        ]);

        $reservation->update($request->only([
            'codeReservation',
            'dateReservation',
            'evenement_id',
            'etudiant_id'
        ]));

        return response()->json([
            'success' => true,
            'message' => 'Réservation modifiée avec succès',
            'data' => $reservation
        ], 200);
    }

    // 5. Supprimer une réservation
    public function destroy( Request $request,$id)
    {
        $reservation = Reservation::find($id);

        if (!$reservation) {
            return response()->json([
                'success' => false,
                'message' => 'Réservation introuvable'
            ], 404);
        }
         if ($reservation->etudiant_id != $request->user()->id) {
        return response()->json([
            'success' => false,
            'message' => 'Vous n\'êtes pas autorisé à annuler cette réservation'
        ], 403);
    }
     if ($reservation->ticket) {
        $reservation->ticket->delete();
    }

        $reservation->delete();

        return response()->json([
            'success' => true,
            'message' => 'Réservation supprimée avec succès'
        ], 200);
    }
   public function mesReservations(Request $request)
{
    $reservations = Reservation::with('evenement')
        ->where('etudiant_id', $request->user()->id)
        ->latest()
        ->get();

    return response()->json([
        'success' => true,
        'data' => $reservations
    ], 200);

}
}
