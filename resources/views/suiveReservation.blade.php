<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="UTF-8">
    <title>Toutes les Réservations</title>
    <script src="https://cdn.tailwindcss.com"></script>
</head>
<body class="bg-gray-100">

<div class="max-w-7xl mx-auto py-10 px-6">

    <div class="flex justify-between items-center mb-8">
        <div>
            <h1 class="text-3xl font-bold text-blue-700">
                Toutes les Réservations
            </h1>

            <p class="text-gray-500 mt-2">
                Liste de toutes les réservations des étudiants.
            </p>
        </div>

        <a href="{{ route('dashboard') }}"
           class="bg-blue-600 hover:bg-blue-700 text-white px-5 py-3 rounded-lg">
            Retour au Dashboard
        </a>
    </div>

    <div class="bg-white rounded-xl shadow overflow-hidden">

        <table class="w-full">

            <thead class="bg-blue-600 text-white">
                <tr>
                    <th class="p-4 text-left">Code</th>
                    <th class="p-4 text-left">Étudiant</th>
                    <th class="p-4 text-left">Email</th>
                    <th class="p-4 text-left">Événement</th>
                    <th class="p-4 text-left">Date réservation</th>
                    <th class="p-4 text-left">Ticket</th>
                </tr>
            </thead>

            <tbody>

            @forelse($reservations as $reservation)

                <tr class="border-b hover:bg-gray-50">

                    <td class="p-4 font-semibold">
                        {{ $reservation->codeReservation }}
                    </td>

                    <td class="p-4">
                        {{ $reservation->etudiant->name }}
                    </td>

                    <td class="p-4">
                        {{ $reservation->etudiant->email }}
                    </td>

                    <td class="p-4">
                        {{ $reservation->evenement->titre }}
                    </td>

                    <td class="p-4">
                        {{ $reservation->dateReservation }}
                    </td>

                    <td class="p-4">
                        {{ $reservation->ticket->numero ?? '-' }}
                    </td>

                </tr>

            @empty

                <tr>
                    <td colspan="6" class="text-center py-10 text-gray-500">
                        Aucune réservation trouvée.
                    </td>
                </tr>

            @endforelse

            </tbody>

        </table>

    </div>

</div>

</body>
</html>
