<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Dashboard Étudiant</title>
    <script src="https://cdn.tailwindcss.com"></script>


</head>
<body class="bg-gray-100">

<div class="flex min-h-screen">

    <!-- Sidebar -->
    <aside class="w-64 bg-blue-700 text-white shadow-lg">

        <div class="p-6 text-center border-b border-blue-600">
            <h1 class="text-2xl font-bold">BDE</h1>
            <p class="text-sm text-blue-200">Dashboard Étudiant</p>
        </div>

        <nav class="mt-6">

            <a href="{{ route('evenement') }}" class="flex items-center px-6 py-3 hover:bg-blue-600 transition">
                📅
                <span class="ml-3">Événements </span>
            </a>

            <a href="{{ route('reservation') }}" class="flex items-center px-6 py-3 hover:bg-blue-600 transition">
                🎫
                <span class="ml-3">Mes Réservations</span>
            </a>

            <a href="{{ route('ticket') }}" class="flex items-center px-6 py-3 hover:bg-blue-600 transition">
                🎟️
                <span class="ml-3">Mes Tickets</span>
            </a>

        </nav>

    </aside>

    <!-- Content -->
    <main class="flex-1">

        <!-- Navbar -->
        <header class="bg-white shadow flex justify-between items-center px-8 py-4">

            <div>
                <h2 class="text-xl font-bold">
                    Bonjour {{ auth()->user()->name }} 👋
                </h2>

                <p class="text-gray-500">
                    {{ auth()->user()->email }}
                </p>
            </div>

            <form action="{{ route('logout') }}" method="POST">
                @csrf
                <button
                    class="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg">
                    Déconnexion
                </button>
            </form>

        </header>

        <div class="p-8">

            <!-- Cards -->
            <div class="grid md:grid-cols-3 gap-6">

                <div class="bg-white rounded-xl shadow p-6">
                    <h3 class="text-gray-500">Événements disponibles</h3>
                    <p class="text-4xl font-bold text-blue-600 mt-3">
                       {{ $evenements->count()}}
                    </p>
                </div>

                <div class="bg-white rounded-xl shadow p-6">
                    <h3 class="text-gray-500">Mes réservations</h3>
                    <p class="text-4xl font-bold text-blue-600 mt-3">
                        {{ $reservations->count() }}
                    </p>
                </div>

                <div class="bg-white rounded-xl shadow p-6">
                    <h3 class="text-gray-500">Mes tickets</h3>
                    <p class="text-4xl font-bold text-blue-600 mt-3">{{  $tickets->count()}}</p>

                </div>

            </div>

            <!-- Tableau -->
            <div class="bg-white rounded-xl shadow mt-10">

                <div class="p-6 border-b">
                    <h2 class="text-xl font-bold">
                        Prochains événements
                    </h2>
                </div>

                <table class="w-full">

                    <thead class="bg-gray-50">

                    <tr>

                        <th class="text-left p-4">Titre</th>
                        <th class="text-left p-4">Date</th>
                        <th class="text-left p-4">Lieu</th>
                        <th class="text-left p-4">Places restantes</th>
                        <th class="text-left p-4">Description</th>


                        <th class="text-center p-4">Action</th>

                    </tr>

                    </thead>

                    <tbody>

            @forelse($evenements as $evenement)

                        <tr class="border-t hover:bg-gray-50">

                            <td class="p-4">
                               {{  $evenement->titre}}
                            </td>

                               <td class="p-4">
                               {{  $evenement->date}}
                            </td>

                            <td class="p-4">
                             {{ $evenement->lieu }}
                            </td>

                            <td class="p-4">
                            {{ $evenement->capaciteMax }}
                            </td>
                              <td class="p-4">
                            {{ $evenement->description }}
                            </td>
                            <td class="text-center">

                                <a href="{{ route('evenement') }}"
                                   class="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700">
                                    Réserver
                                </a>

                            </td>

                        </tr>

            @empty

                        <tr>

                            <td colspan="5" class="text-center p-8 text-gray-500">
                                Aucun événement disponible.
                            </td>

                        </tr>


                    </tbody>

                </table>

            </div>

        </div>

    </main>

</div>
@endforelse
</body>
</html>
