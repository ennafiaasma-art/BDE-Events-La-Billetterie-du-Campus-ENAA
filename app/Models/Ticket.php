<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Ticket extends Model
{
    protected $fillable=[
        'code',
        'numero',
        'resevation_id',

    ];
    public function reservation(){
        return $this->belongsTo(Reservation::class);
    }
    //
}
