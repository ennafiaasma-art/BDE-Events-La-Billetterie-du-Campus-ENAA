<?php

namespace Database\Seeders;

use App\Models\Reservation;
use Illuminate\Database\Seeder;

class ReservationSeeder extends Seeder
{
    public function run(): void
    {
        Reservation::create([
            'codeReservation' => 'BDE-2026-0001',
            'dateReservation' => now(),
            'evenement_id' => 1,
            'etudiant_id' => 2,
        ]);
    }
}
