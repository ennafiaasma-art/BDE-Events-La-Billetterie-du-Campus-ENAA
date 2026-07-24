<?php

namespace App\Http\Controllers;

use App\Models\Evenement;
use App\Models\Reservation;
use Illuminate\Http\Request;

class EvenementController extends Controller
{
    /**
     * Display a listing of the resource.
     */
   public function index()
{
    $evenements = Evenement::with('reservations')->orderBy('date','asc')->get();
    $reservations = Reservation::where('etudiant_id', auth()->id())->get();

    return view('evenement', compact('evenements','reservations'));
}

    /**
     * afficher la formulaire de creation.
     */
    public function create()
    {
         if(auth()->user()->role != "admin")
    {
        abort(403);
    }

    return view('admin.evenements.create');
        //
    }

    /**
     * enregistrer un nouvel evenements
     */
    public function store(Request $request)
    {
        if(auth()->user()->role != "admin")
    {
        abort(403);
    }
    $data= $request->validate([

        'titre'=>'required |string|max:255',
        'description'=>'required |string',
        'date'=>'required|date',
        'lieu'=>'required |string|max:255',
        'prix'=>'required|numeric|min:0',
        'capaciteMax'=>'required|integer|min:1'

    ]);
    $data['admin_id']=auth()->id();
    Evenement::create($data);
    return redirect()
    ->route('evenement')
    ->with('success','evenements crée avec succés');
    }







        //


    /**
     * afficher un evenements.
     */
    public function show(Evenement $evenement)
    {
        //
        return view('admin.evenements.show' , compact('evenement'));
    }

    /**
     * formailaire de modification
     */
    public function edit(Evenement $evenement)
    {
        if(auth()->user()->role != 'admin'){
            abort(403);
        }
        return view('admin.evenements.edit' , compact('evenement'));
    }

    /**
     * mattre a joure un evenement;
     */
    public function update(Request $request, Evenement $evenement)
    {
        if(auth()->user()->role !='admin'){
            abort(403);
        }
        $data=$request->validate( [
            'titre' => 'required|string|max:255',
            'description' => 'required|string',
            'date' => 'required|date',
            'lieu' => 'required|string|max:255',
            'prix' => 'required|numeric|min:0',
            'capaciteMax' => 'required|integer|min:1',
        ]);
        $evenement->update($data);
        return redirect()
        ->route('evenement')
        ->with('success','evenement modifie avec succes' );
    }

    /**
     * supprimer un evenenemnt:
     */
    public function destroy(Evenement $evenement)
    {
        if(auth()->user()->role != 'admin'){
            abort(403);
        }
       $evenement->delete();
       return redirect()
       ->route('evenement')
       ->with('succes' , 'evenement supprimer avec succés');
    }

}
