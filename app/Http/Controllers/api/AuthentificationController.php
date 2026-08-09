<?php

namespace App\Http\Controllers\api;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class AuthentificationController extends Controller
{
    public function login(Request $request)
    {
        $credentials = $request->validate([
            'email' => 'required|email',
            'password' => 'required',
        ]);

        if (!Auth::attempt($credentials)) {
            return response()->json([
                'message' => 'Email ou mot de passe incorrect'
            ], 401);
        }

        $user = Auth::user();

        return response()->json([
            'message' => 'Connexion réussie',
            'user' => $user,
        ]);
    }

    public function logout(Request $request)
    {
        Auth::logout();

        return response()->json([
            'message' => 'Déconnexion réussie'
        ]);
    }
}
