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
        ]);
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
        ]);
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
            'capacite_max' => 'required|integer|min:1'
        ]);

        $evenement = Evenement::create($request->all());

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
            'capacite_max' => 'sometimes|integer|min:1'
        ]);

        $evenement->update($request->all());

        return response()->json([
            'success' => true,
            'message' => 'Événement modifié avec succès',
            'data' => $evenement
        ]);
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
        ]);
    }
}
