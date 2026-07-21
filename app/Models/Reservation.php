<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

use Illuminate\Database\Eloquent\Factories\HasFactory;

class Reservation extends Model
{
    //
     use HasFactory;

    protected $fillable = [
        'codeReservation',
        'dateReservation',
        'evenement_id',
        'etudiant_id',
    ];
     public function evenement()
    {
        return $this->belongsTo(Evenement::class);
    }

    public function etudiant()
    {
        return $this->belongsTo(User::class, 'etudiant_id');
    }

    public function ticket()
    {
        return $this->hasOne(Ticket::class);
    }

}
