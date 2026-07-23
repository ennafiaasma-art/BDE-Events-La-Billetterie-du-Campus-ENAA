<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Événements disponibles</title>

    <script src="https://cdn.tailwindcss.com"></script>
</head>

<body class="bg-gray-100">

<div class="max-w-7xl mx-auto py-10 px-6">

    <div class="flex justify-between items-center mb-8">

        <div>
            <h1 class="text-3xl font-bold text-gray-800">
                📅 Événements disponibles pour le moment
            </h1>

            <p class="text-gray-500 mt-2">
                Découvrez les événements organisés par le BDE.
            </p>
        </div>

        <a href="{{ route('dashbordEtu') }}"
           class="bg-blue-600 hover:bg-blue-700 text-white px-5 py-3 rounded-lg">
            Retour au Dashboard
        </a>

    </div>

    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">

        @forelse($evenements as $evenement)

        <div class="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition">



            <div class="p-6">

                <h2 class="text-xl font-bold text-gray-800">
                    {{ $evenement->titre }}
                </h2>

                <p class="text-gray-600 mt-3">
                    {{ Str::limit($evenement->description,100) }}
                </p>

                <div class="mt-5 space-y-2">

                    <p>
                        📅
                        <span class="font-semibold">
                            {{ \Carbon\Carbon::parse($evenement->date)->format('d/m/Y') }}
                        </span>
                    </p>

                    <p>
                        📍
                        {{ $evenement->lieu }}
                    </p>

                    <p>
                        💰
                        {{ $evenement->prix }} DH
                    </p>

                    <p>
                        👥
                        {{ $evenement->capaciteMax - $evenement->reservations->count() }}
                        places restantes
                    </p>

                </div>

                <div class="mt-6">



                   @php
    $dejaReserve = $reservations->contains('evenement_id', $evenement->id);
@endphp

@if($dejaReserve)

<button
    class="bg-gray-400 text-white px-4 py-2 rounded cursor-not-allowed"
    disabled>
    Déjà réservé
</button>

@else

<form action="{{ route('reservations.store', $evenement->id) }}" method="POST">
    @csrf

    <button
        class="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded">
        Réserver
    </button>
</form>

@endif

                </div>

            </div>

        </div>

        @empty

        <div class="col-span-3">

            <div class="bg-white rounded-xl shadow p-10 text-center">

                <h2 class="text-2xl font-bold text-gray-700">
                    Aucun événement disponible
                </h2>

                <p class="text-gray-500 mt-3">
                    Revenez plus tard.
                </p>

            </div>

        </div>

        @endforelse

    </div>

</div>

</body>
</html>
