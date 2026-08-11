<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Reservation;
use Illuminate\Http\Request;

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
            'codeReservation' => 'required|string|unique:reservations,codeReservation',
            'dateReservation' => 'required|date',
            'evenement_id' => 'required|exists:evenements,id',
            'etudiant_id' => 'required|exists:users,id',
        ]);

        $reservation = Reservation::create([
            'codeReservation' => $request->codeReservation,
            'dateReservation' => $request->dateReservation,
            'evenement_id' => $request->evenement_id,
            'etudiant_id' => $request->user()->id,
        ]);

        return response()->json([
            'success' => true,
            'message' => 'Réservation créée avec succès',
            'data' => $reservation
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
