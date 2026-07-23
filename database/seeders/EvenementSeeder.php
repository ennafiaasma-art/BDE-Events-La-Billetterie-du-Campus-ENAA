<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Evenement;
use App\Models\User;

class EvenementSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
       $admin = User::where('role', 'admin')->first();

Evenement::create([
    'titre' => 'Hackathon BDE 2026',
    'description' => 'Compétition de développement web entre étudiants.',
    'date' => '2026-08-15',
    'lieu' => 'École Numérique Ahmed El Hansali',
    'capaciteMax' => 100,
    'admin_id' => $admin->id,
]);


    }
}
