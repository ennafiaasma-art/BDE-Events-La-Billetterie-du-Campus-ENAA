<?php

namespace Database\Seeders;
use App\Models\User;
use Illuminate\Support\Facades\Hash;

use Illuminate\Database\Seeder;

class UserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void{
        User::updateOrCreate(['email' => 'admin@enaa.ma',],

        ['name' => 'Administrateur',
        'password' => Hash::make('password123'),
        'role' => 'admin',]);

        User::updateOrCreate(
    ['email' => 'etudiant@enaa.ma'],
    [
        'name' => 'Étudiant Test',
        'password' => Hash::make('password123'),
        'role' => 'etudiant',
    ]
);}
}
