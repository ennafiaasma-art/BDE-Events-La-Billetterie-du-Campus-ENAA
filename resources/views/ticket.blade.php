<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Mes Tickets</title>
    <script src="https://cdn.tailwindcss.com"></script>
</head>

<body class="bg-gray-100">

<div class="max-w-7xl mx-auto py-10 px-6">

    <!-- Header -->
    <div class="flex justify-between items-center mb-8">

        <div>
            <h1 class="text-3xl font-bold text-gray-800">
                🎟️ Mes Tickets
            </h1>

            <p class="text-gray-500 mt-2">
                Retrouvez tous vos tickets de réservation.
            </p>
        </div>

        <a href="{{ route('dashbordEtu') }}"
           class="bg-blue-600 hover:bg-blue-700 text-white px-5 py-3 rounded-lg">
            ← Retour
        </a>

    </div>

    <!-- Liste des tickets -->
    <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-6">

        @forelse($tickets as $ticket)

        <div class="bg-white rounded-2xl shadow-lg p-6 hover:shadow-xl transition">

            <div class="flex justify-between items-center">

                <h2 class="text-xl font-bold text-gray-800">
                    Ticket
                </h2>

                <span class="bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm">
                    Valide
                </span>

            </div>

            <hr class="my-4">

            <div class="space-y-3">

                <p>
                    <span class="font-semibold">🎫 Numéro :</span><br>
                    {{ $ticket->numero }}
                </p>

                <p>
                    <span class="font-semibold">🔑 Code :</span><br>
                    {{ $ticket->code }}
                </p>

                <p>
                    <span class="font-semibold">📅 Événement :</span><br>
                    {{ $ticket->reservation->evenement->titre }}
                </p>

                <p>
                    <span class="font-semibold">📍 Lieu :</span><br>
                    {{ $ticket->reservation->evenement->lieu }}
                </p>

                <p>
                    <span class="font-semibold">🗓 Date :</span><br>
                    {{ \Carbon\Carbon::parse($ticket->reservation->evenement->date)->format('d/m/Y') }}
                </p>

            </div>

            <div class="mt-6">

                <button
                    class="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg">
                    Télécharger le ticket
                </button>

            </div>

        </div>

        @empty

        <div class="col-span-3">

            <div class="bg-white rounded-xl shadow p-10 text-center">

                <h2 class="text-2xl font-bold text-gray-700">
                    Aucun ticket disponible
                </h2>

                <p class="text-gray-500 mt-3">
                    Vous n'avez pas encore réservé d'événement.
                </p>

            </div>

        </div>

        @endforelse

    </div>

</div>

</body>
</html>
