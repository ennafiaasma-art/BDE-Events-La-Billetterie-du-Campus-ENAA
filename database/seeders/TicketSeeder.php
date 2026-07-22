<?php

namespace Database\Seeders;

use App\Models\Ticket;
use Illuminate\Database\Seeder;

class TicketSeeder extends Seeder
{
    public function run(): void
    {
        Ticket::create([
            'code' => 'TKT-2026-0001',
            'reservation_id' => 1,
        ]);
    }
}
