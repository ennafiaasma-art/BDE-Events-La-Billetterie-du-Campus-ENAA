<?php

namespace App\Http\Controllers\api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Evenement;

class EvenementController extends Controller
{
    public function index()
    {
        $evenements = Evenement::all();

        return response()->json([
            'success' => true,
            'data' => $evenements
        ]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'description' => 'required|string',
            'date' => 'required|date',
            'place' => 'required|string|max:255',
            'price' => 'required|numeric|min:0',
            'capaciteMax' => 'required|integer|min:1',
        ]);

        $evenement = Evenement::create($validated);

        return response()->json([
            'message' => 'Événement créé avec succès',
            'data' => $evenement
        ], 201);
    }
}
