<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Evenement;
use App\Models\Reservation;
use App\Models\Ticket;
use Illuminate\Http\Request;

class ReservationController extends Controller
{
    // =====================================================
    // 1. AFFICHER TOUTES LES RÉSERVATIONS
    // =====================================================

    public function index()
    {
        $reservations = Reservation::with([
            'evenement',
            'ticket'
        ])->latest()->get();

        return response()->json([
            'success' => true,
            'data' => $reservations
        ], 200);
    }


    // =====================================================
    // 2. AFFICHER UNE RÉSERVATION
    // =====================================================

    public function show(Request $request, $id)
    {
        $reservation = Reservation::with([
            'evenement',
            'ticket'
        ])->find($id);

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


    // =====================================================
    // 3. CRÉER UNE RÉSERVATION + TICKET
    // =====================================================

    public function store(Request $request)
    {
        // Validation
        $request->validate([
            'evenement_id' => 'required|exists:evenements,id',
        ]);

        // Utilisateur connecté
        $user = $request->user();

        if (!$user) {
            return response()->json([
                'success' => false,
                'message' => 'Utilisateur non authentifié.'
            ], 401);
        }

        // Récupérer l'événement
        $evenement = Evenement::find($request->evenement_id);

        if (!$evenement) {
            return response()->json([
                'success' => false,
                'message' => 'Événement introuvable.'
            ], 404);
        }


        // -------------------------------------------------
        // Vérifier si l'utilisateur a déjà réservé
        // -------------------------------------------------

        $dejaReserve = Reservation::where(
            'evenement_id',
            $evenement->id
        )
        ->where(
            'etudiant_id',
            $user->id
        )
        ->exists();

        if ($dejaReserve) {
            return response()->json([
                'success' => false,
                'message' => 'Vous avez déjà réservé cet événement.'
            ], 409);
        }


        // -------------------------------------------------
        // Compter les réservations
        // -------------------------------------------------

        $nombreReservations = Reservation::where(
            'evenement_id',
            $evenement->id
        )->count();


        // -------------------------------------------------
        // Vérifier la capacité maximale
        // -------------------------------------------------

        if ($nombreReservations >= $evenement->capaciteMax) {

            return response()->json([
                'success' => false,
                'message' => 'Les places sont épuisées pour cet événement.'
            ], 409);
        }


        // -------------------------------------------------
        // Créer la réservation
        // -------------------------------------------------

        $reservation = Reservation::create([
            'codeReservation' => 'BDE-' . time() . rand(100, 999),
            'dateReservation' => now(),
            'evenement_id' => $evenement->id,
            'etudiant_id' => $user->id,
        ]);


        // -------------------------------------------------
        // Créer automatiquement le ticket
        // -------------------------------------------------

        $ticket = Ticket::create([
            'numero' => 'TICKET-' . time() . rand(100, 999),
            'code' => uniqid('TICKET-'),
            'reservation_id' => $reservation->id,
        ]);


        // -------------------------------------------------
        // Retourner réservation + ticket
        // -------------------------------------------------

        return response()->json([
            'success' => true,
            'message' => 'Réservation effectuée avec succès.',
            'data' => [
                'reservation' => $reservation,
                'ticket' => $ticket,
            ]
        ], 201);
    }


    // =====================================================
    // 4. MODIFIER UNE RÉSERVATION
    // =====================================================

    public function update(Request $request, $id)
    {
        $user = $request->user();

        if (!$user) {
            return response()->json([
                'success' => false,
                'message' => 'Utilisateur non authentifié.'
            ], 401);
        }

        // Récupérer la réservation
        $reservation = Reservation::find($id);

        if (!$reservation) {
            return response()->json([
                'success' => false,
                'message' => 'Réservation introuvable'
            ], 404);
        }


        // -------------------------------------------------
        // Vérifier que la réservation appartient
        // à l'utilisateur connecté
        // -------------------------------------------------

        if ($reservation->etudiant_id != $user->id) {

            return response()->json([
                'success' => false,
                'message' => 'Vous n\'êtes pas autorisé à modifier cette réservation.'
            ], 403);
        }


        // -------------------------------------------------
        // Validation
        // -------------------------------------------------

        $request->validate([
            'dateReservation' => 'sometimes|date',
            'evenement_id' => 'sometimes|exists:evenements,id',
        ]);


        // -------------------------------------------------
        // Si l'événement change
        // vérifier la capacité
        // -------------------------------------------------

        if (
            $request->has('evenement_id') &&
            $request->evenement_id != $reservation->evenement_id
        ) {

            $nouvelEvenement = Evenement::find(
                $request->evenement_id
            );

            // Vérifier si l'utilisateur a déjà réservé
            $dejaReserve = Reservation::where(
                'evenement_id',
                $nouvelEvenement->id
            )
            ->where(
                'etudiant_id',
                $user->id
            )
            ->where(
                'id',
                '!=',
                $reservation->id
            )
            ->exists();

            if ($dejaReserve) {

                return response()->json([
                    'success' => false,
                    'message' => 'Vous avez déjà réservé cet événement.'
                ], 409);
            }


            // Nombre de réservations
            $nombreReservations = Reservation::where(
                'evenement_id',
                $nouvelEvenement->id
            )->count();


            // Vérifier capacité
            if (
                $nombreReservations >=
                $nouvelEvenement->capaciteMax
            ) {

                return response()->json([
                    'success' => false,
                    'message' => 'Les places sont épuisées pour cet événement.'
                ], 409);
            }
        }


        // -------------------------------------------------
        // Modifier
        // -------------------------------------------------

        $reservation->update([
            'dateReservation' =>
                $request->dateReservation ??
                $reservation->dateReservation,

            'evenement_id' =>
                $request->evenement_id ??
                $reservation->evenement_id,
        ]);


        return response()->json([
            'success' => true,
            'message' => 'Réservation modifiée avec succès.',
            'data' => $reservation
        ], 200);
    }


    // =====================================================
    // 5. SUPPRIMER / ANNULER UNE RÉSERVATION
    // =====================================================

    public function destroy(Request $request, $id)
    {
        $user = $request->user();

        if (!$user) {
            return response()->json([
                'success' => false,
                'message' => 'Utilisateur non authentifié.'
            ], 401);
        }


        // Récupérer la réservation
        $reservation = Reservation::find($id);

        if (!$reservation) {
            return response()->json([
                'success' => false,
                'message' => 'Réservation introuvable'
            ], 404);
        }


        // Vérifier propriétaire
        if ($reservation->etudiant_id != $user->id) {

            return response()->json([
                'success' => false,
                'message' =>
                    'Vous n\'êtes pas autorisé à annuler cette réservation.'
            ], 403);
        }


        // Supprimer le ticket associé
        if ($reservation->ticket) {
            $reservation->ticket->delete();
        }


        // Supprimer la réservation
        $reservation->delete();


        return response()->json([
            'success' => true,
            'message' => 'Réservation annulée avec succès.'
        ], 200);
    }


    // =====================================================
    // 6. MES RÉSERVATIONS
    // =====================================================

    public function mesReservations(Request $request)
    {
        $user = $request->user();

        if (!$user) {
            return response()->json([
                'success' => false,
                'message' => 'Utilisateur non authentifié.'
            ], 401);
        }


        $reservations = Reservation::with([
            'evenement',
            'ticket'
        ])
        ->where(
            'etudiant_id',
            $user->id
        )
        ->latest()
        ->get();


        return response()->json([
            'success' => true,
            'data' => $reservations
        ], 200);
    }
}
