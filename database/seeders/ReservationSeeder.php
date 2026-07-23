<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\User;
use App\Models\Evenement;
use App\Models\Reservation;

class ReservationSeeder extends Seeder
{
    public function run(): void
    {
        $etudiant = User::where('role', 'etudiant')->first();
        $evenement = Evenement::first();

        Reservation::create([
            'codeReservation' => 'BDE-2026-0001',
            'dateReservation' => now(),
            'evenement_id' => $evenement->id,
            'etudiant_id' => $etudiant->id,
        ]);
    }
}
