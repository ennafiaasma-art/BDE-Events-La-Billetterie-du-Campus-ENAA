<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Evenement extends Model
{
    use HasFactory;
    protected $fillable=[
        'titre',
        'description',
        'date',
        'lieu',
        'prix',
        'capaciteMax',
        'asdmin_id'
    ];
    public function admin(){
        return $this->belongsTo(User::class,'admon_id');
    }
    public function reservation(){
        return $this->hasMany(Reservation::class);
    }
    //
}
