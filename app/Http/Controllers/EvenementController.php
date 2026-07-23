<?php

namespace App\Http\Controllers;

use App\Models\Evenement;
use Illuminate\Http\Request;

class EvenementController extends Controller
{
    /**
     * Display a listing of the resource.
     */
   public function index()
{
    $evenements = Evenement::with('reservations')->get();

    return view('evenement', compact('evenements'));
}

    /**
     * Show the form for creating a new resource.
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
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        if(auth()->user()->role != "admin")
    {
        abort(403);
    }
     $request->validate([

        'titre'=>'required',
        'description'=>'required',
        'date'=>'required|date',
        'lieu'=>'required',
        'prix'=>'required|numeric|min:0',
        'capaciteMax'=>'required|integer|min:1'

    ]);
    Evenement::create([

        'titre'=>$request->titre,
        'description'=>$request->description,
        'date'=>$request->date,
        'lieu'=>$request->lieu,
        'prix'=>$request->prix,
        'capaciteMax'=>$request->capaciteMax,

        'admin_id'=>auth()->id()

    ]);

    return redirect()->route('evenements.index')
                     ->with('success','Événement créé avec succès');
}

        //


    /**
     * Display the specified resource.
     */
    public function show(Evenement $evenement)
    {
        //
        $evenement=Evenement::withCount('capaciteMax')->get();
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Evenement $evenement)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Evenement $evenement)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Evenement $evenement)
    {
        //
    }

}
