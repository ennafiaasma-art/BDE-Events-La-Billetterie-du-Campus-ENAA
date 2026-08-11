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
         $token = $user->createToken('react-token')->plainTextToken;


        return response()->json([
             'success' => true,
            'message' => 'Connexion réussie',
            'user' => $user,
            'token' => $token,
        ],200);
    }

    public function logout(Request $request)
    {
        $request->user()->currentAccessToken()?->delete();

        return response()->json([
            'success' => true,
            'message' => 'Déconnexion réussie'
        ]);
    }
}
