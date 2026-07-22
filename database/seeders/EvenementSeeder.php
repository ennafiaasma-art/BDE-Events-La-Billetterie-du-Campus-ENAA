<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class UserSeeder extends Seeder
{
    public function run(): void
    {
        User::create([
            'nom' => 'Admin',
            'prenom' => 'BDE',
            'email' => 'admin@bde.com',
            'password' => Hash::make('12345678'),
            'role' => 'admin',
        ]);

        User::create([
            'nom' => 'Asma',
            'prenom' => 'Ennafia',
            'email' => 'asma@gmail.com',
            'password' => Hash::make('12345678'),
            'role' => 'etudiant',
        ]);
    }
}
