<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="UTF-8">
    <title>Mes Réservations</title>
    <script src="https://cdn.tailwindcss.com"></script>
</head>
<body class="bg-gray-100">

<div class="max-w-7xl mx-auto py-10 px-6">

    <div class="flex justify-between items-center mb-8">
        <div>
            <h1 class="text-3xl font-bold text-blue-700">
                Mes Réservations
            </h1>

            <p class="text-gray-500 mt-2">
                Retrouvez toutes vos réservations d'événements.
            </p>
        </div>

        <a href="{{ route('dashbordEtu') }}"
           class="bg-blue-600 hover:bg-blue-700 text-white px-5 py-3 rounded-lg">
            Retour au Dashboard
        </a>
    </div>

    <div class="bg-white rounded-xl shadow overflow-hidden">

        <table class="w-full">

            <thead class="bg-blue-600 text-white">

                <tr>
                    <th class="p-4 text-left">Code</th>
                    <th class="p-4 text-left">Événement</th>
                    <th class="p-4 text-left">Date événement</th>
                    <th class="p-4 text-left">Lieu</th>
                    <th class="p-4 text-left">Date réservation</th>
                    <th class="p-4 text-center">Statut</th>
                </tr>

            </thead>

            <tbody>

            @forelse($reservations as $reservation)

                <tr class="border-b hover:bg-gray-50">

                    <td class="p-4 font-semibold">
                        {{ $reservation->codeReservation }}
                    </td>

                    <td class="p-4">
                        {{ $reservation->evenement->titre }}
                    </td>

                    <td class="p-4">
                        {{ $reservation->evenement->date }}
                    </td>

                    <td class="p-4">
                        {{ $reservation->evenement->lieu }}
                    </td>

                    <td class="p-4">
                        {{ $reservation->dateReservation }}
                    </td>

                    <td class="p-4 text-center">
                        <span class="bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm">
                            Confirmée
                        </span>
                    </td>

                </tr>

            @empty

                <tr>
                    <td colspan="6" class="text-center py-10 text-gray-500">
                        Vous n'avez encore effectué aucune réservation.
                    </td>
                </tr>

            @endforelse

            </tbody>

        </table>

    </div>

</div>

</body>
</html>
