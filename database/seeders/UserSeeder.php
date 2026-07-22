<?php

namespace Database\Seeders;
use app\Models\User;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class UserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
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
