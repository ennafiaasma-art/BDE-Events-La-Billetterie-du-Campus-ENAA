<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Ticket;
use Illuminate\Http\Request;

class TicketController extends Controller
{

    public function index(Request $request)
    {
        $tickets = Ticket::with([
            'reservation.evenement'
        ])
        ->whereHas('reservation', function ($query) use ($request) {
            $query->where('etudiant_id', $request->user()->id);
        })
        ->get();

        return response()->json([
            'success' => true,
            'data' => $tickets
        ], 200);
    }


    public function show(Request $request, $id)
    {
        $ticket = Ticket::with([
            'reservation.evenement'
        ])
        ->whereHas('reservation', function ($query) use ($request) {
            $query->where('etudiant_id', $request->user()->id);
        })
        ->find($id);

        if (!$ticket) {
            return response()->json([
                'success' => false,
                'message' => 'Ticket introuvable'
            ], 404);
        }

        return response()->json([
            'success' => true,
            'data' => $ticket
        ], 200);
    }



    public function store(Request $request)
    {
        $request->validate([
            'numero' => 'required|string|unique:tickets,numero',
            'code' => 'required|string|unique:tickets,code',
            'reservation_id' => 'required|exists:reservations,id',
        ]);

        $ticket = Ticket::create([
            'numero' => $request->numero,
            'code' => $request->code,
            'reservation_id' => $request->reservation_id,
        ]);

        return response()->json([
            'success' => true,
            'message' => 'Ticket créé avec succès',
            'data' => $ticket
        ], 201);
    }



    public function update(Request $request, $id)
    {
        $ticket = Ticket::find($id);

        if (!$ticket) {
            return response()->json([
                'success' => false,
                'message' => 'Ticket introuvable'
            ], 404);
        }

        $request->validate([
            'numero' => 'sometimes|string|unique:tickets,numero,' . $id,
            'code' => 'sometimes|string|unique:tickets,code,' . $id,
            'reservation_id' => 'sometimes|exists:reservations,id',
        ]);

        $ticket->update(
            $request->only([
                'numero',
                'code',
                'reservation_id'
            ])
        );

        return response()->json([
            'success' => true,
            'message' => 'Ticket modifié avec succès',
            'data' => $ticket
        ], 200);
    }



    public function destroy($id)
    {
        $ticket = Ticket::find($id);

        if (!$ticket) {
            return response()->json([
                'success' => false,
                'message' => 'Ticket introuvable'
            ], 404);
        }

        $ticket->delete();

        return response()->json([
            'success' => true,
            'message' => 'Ticket supprimé avec succès'
        ], 200);
    }
}
