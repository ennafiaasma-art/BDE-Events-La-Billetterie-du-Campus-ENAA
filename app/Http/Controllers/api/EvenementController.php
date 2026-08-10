<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Evenement;
use Illuminate\Http\Request;

class EvenementController extends Controller
{
    // 1. Afficher tous les événements
    public function index()
    {
        $evenements = Evenement::all();

        return response()->json([
            'success' => true,
            'data' => $evenements
        ], 200);
    }

    // 2. Afficher un événement
    public function show($id)
    {
        $evenement = Evenement::find($id);

        if (!$evenement) {
            return response()->json([
                'success' => false,
                'message' => 'Événement introuvable'
            ], 404);
        }

        return response()->json([
            'success' => true,
            'data' => $evenement
        ], 200);
    }

    // 3. Créer un événement
    public function store(Request $request)
    {
        $request->validate([
            'titre' => 'required|string|max:255',
            'description' => 'required|string',
            'date' => 'required|date',
            'lieu' => 'required|string|max:255',
            'prix' => 'required|numeric|min:0',
            'capaciteMax' => 'required|integer|min:1',
            'admin_id' => 'required|exists:users,id',
        ]);

        $evenement = Evenement::create([
            'titre' => $request->titre,
            'description' => $request->description,
            'date' => $request->date,
            'lieu' => $request->lieu,
            'prix' => $request->prix,
            'capaciteMax' => $request->capaciteMax,
            'admin_id' => $request->admin_id,
        ]);

        return response()->json([
            'success' => true,
            'message' => 'Événement créé avec succès',
            'data' => $evenement
        ], 201);
    }

    // 4. Modifier un événement
    public function update(Request $request, $id)
    {
        $evenement = Evenement::find($id);

        if (!$evenement) {
            return response()->json([
                'success' => false,
                'message' => 'Événement introuvable'
            ], 404);
        }

        $request->validate([
            'titre' => 'sometimes|string|max:255',
            'description' => 'sometimes|string',
            'date' => 'sometimes|date',
            'lieu' => 'sometimes|string|max:255',
            'prix' => 'sometimes|numeric|min:0',
            'capaciteMax' => 'sometimes|integer|min:1',
            'admin_id' => 'sometimes|exists:users,id',
        ]);

        $evenement->update([
            'titre' => $request->titre ?? $evenement->titre,
            'description' => $request->description ?? $evenement->description,
            'date' => $request->date ?? $evenement->date,
            'lieu' => $request->lieu ?? $evenement->lieu,
            'prix' => $request->prix ?? $evenement->prix,
            'capaciteMax' => $request->capaciteMax ?? $evenement->capaciteMax,
            'admin_id' => $request->admin_id ?? $evenement->admin_id,
        ]);

        return response()->json([
            'success' => true,
            'message' => 'Événement modifié avec succès',
            'data' => $evenement
        ], 200);
    }

    // 5. Supprimer un événement
    public function destroy($id)
    {
        $evenement = Evenement::find($id);

        if (!$evenement) {
            return response()->json([
                'success' => false,
                'message' => 'Événement introuvable'
            ], 404);
        }

        $evenement->delete();

        return response()->json([
            'success' => true,
            'message' => 'Événement supprimé avec succès'
        ], 200);
    }
}
