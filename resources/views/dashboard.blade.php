<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Dashboard</title>
    <script src="https://cdn.tailwindcss.com"></script>
</head>
<body class="bg-gray-50 text-gray-800">

    <div class="flex min-h-screen">

        {{-- Sidebar --}}
        <aside class="hidden md:flex md:flex-col w-64 shrink-0 bg-white border-r border-gray-200">
            <div class="h-16 flex items-center px-6 border-b border-gray-200">
                <span class="text-xl font-bold text-blue-600">BDE Admin</span>
            </div>

            <nav class="flex-1 px-4 py-6 space-y-1">
                <a href="#" class="flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium bg-blue-50 text-blue-600">
                    <svg class="w-5 h-5" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M3 12l9-9 9 9M5 10v10a1 1 0 001 1h4a1 1 0 001-1v-4a1 1 0 011-1h0a1 1 0 011 1v4a1 1 0 001 1h4a1 1 0 001-1V10"/>
                    </svg>
                    Dashboard
                </a>

                <a href="{{ route('evenements.index') }}" class="flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium text-gray-600 hover:bg-gray-100 hover:text-gray-900 transition">
                    <svg class="w-5 h-5" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M8 7V3m8 4V3M3 11h18M5 5h14a2 2 0 012 2v12a2 2 0 01-2 2H5a2 2 0 01-2-2V7a2 2 0 012-2z"/>
                    </svg>
                    Événements
                </a>

                <a href="#" class="flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium text-gray-600 hover:bg-gray-100 hover:text-gray-900 transition">
                    <svg class="w-5 h-5" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/>
                    </svg>
                    Réservations
                </a>

                <a href="#" class="flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium text-gray-600 hover:bg-gray-100 hover:text-gray-900 transition">
                    <svg class="w-5 h-5" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
                    </svg>
                    Tickets
                </a>

                <a href="#" class="flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium text-gray-600 hover:bg-gray-100 hover:text-gray-900 transition">
                    <svg class="w-5 h-5" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M17 20h5v-2a4 4 0 00-3-3.87M9 20H4v-2a4 4 0 013-3.87m6-1.13a4 4 0 100-8 4 4 0 000 8zm6 4v-1a4 4 0 00-3-3.87m-9 0A4 4 0 003 19v1"/>
                    </svg>
                    Utilisateurs
                </a>
            </nav>

            <div class="px-4 py-6 border-t border-gray-200">
                <form action="{{ route('logout') }}" method="POST">
                    @csrf
                    <button type="submit" class="w-full flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium text-gray-600 hover:bg-red-50 hover:text-red-600 transition">
                        <svg class="w-5 h-5" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"/>
                        </svg>
                        Déconnexion
                    </button>
                </form>
            </div>
        </aside>

        {{-- Main --}}
        <div class="flex-1 flex flex-col min-w-0">

            {{-- Navbar --}}
            <header class="h-16 bg-white border-b border-gray-200 flex items-center justify-between px-6">
                <h1 class="text-lg font-semibold text-gray-800">Dashboard</h1>

                <div class="flex items-center gap-3">
                    <div class="text-right hidden sm:block">
                        <p class="text-sm font-medium text-gray-800">{{ auth()->user()->name }}</p>
                        <p class="text-xs text-gray-500 capitalize">{{ auth()->user()->role }}</p>
                    </div>
                    <div class="w-10 h-10 rounded-full bg-blue-600 text-white flex items-center justify-center font-semibold">
                        {{ strtoupper(substr(auth()->user()->name, 0, 1)) }}
                    </div>
                </div>
            </header>

            <main class="flex-1 p-6 space-y-6">

                {{-- Welcome section --}}
                <section class="bg-white rounded-xl shadow-lg p-6">
                    <h3 class="text-xl font-semibold text-gray-800">Bienvenue, {{ auth()->user()->name }}</h3>
                    <div class="flex flex-wrap gap-x-8 gap-y-1 mt-2 text-sm text-gray-500">
                        <p>Email : {{ auth()->user()->email }}</p>
                        <p>Rôle : <span class="capitalize">{{ auth()->user()->role }}</span></p>
                    </div>
                </section>

                {{-- Stat cards (valeurs fictives) --}}
                <section class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">

                    <div class="bg-white rounded-xl shadow-lg p-6 flex items-center justify-between">
                        <div>
                            <p class="text-sm text-gray-500">Événements</p>
                            <p class="text-2xl font-bold text-gray-800 mt-1">12</p>
                        </div>
                        <div class="w-12 h-12 rounded-xl bg-blue-100 text-blue-600 flex items-center justify-center">
                            <svg class="w-6 h-6" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" d="M8 7V3m8 4V3M3 11h18M5 5h14a2 2 0 012 2v12a2 2 0 01-2 2H5a2 2 0 01-2-2V7a2 2 0 012-2z"/>
                            </svg>
                        </div>
                    </div>

                    <div class="bg-white rounded-xl shadow-lg p-6 flex items-center justify-between">
                        <div>
                            <p class="text-sm text-gray-500">Réservations</p>
                            <p class="text-2xl font-bold text-gray-800 mt-1">145</p>
                        </div>
                        <div class="w-12 h-12 rounded-xl bg-blue-100 text-blue-600 flex items-center justify-center">
                            <svg class="w-6 h-6" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/>
                            </svg>
                        </div>
                    </div>

                    <div class="bg-white rounded-xl shadow-lg p-6 flex items-center justify-between">
                        <div>
                            <p class="text-sm text-gray-500">Tickets</p>
                            <p class="text-2xl font-bold text-gray-800 mt-1">{{}}</p>
                        </div>
                        <div class="w-12 h-12 rounded-xl bg-blue-100 text-blue-600 flex items-center justify-center">
                            <svg class="w-6 h-6" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
                            </svg>
                        </div>
                    </div>

                    <div class="bg-white rounded-xl shadow-lg p-6 flex items-center justify-between">
                        <div>
                            <p class="text-sm text-gray-500">Étudiants</p>
                            <p class="text-2xl font-bold text-gray-800 mt-1">{{ auth()->user()->count() }}</p>
                        </div>
                        <div class="w-12 h-12 rounded-xl bg-blue-100 text-blue-600 flex items-center justify-center">
                            <svg class="w-6 h-6" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" d="M17 20h5v-2a4 4 0 00-3-3.87M9 20H4v-2a4 4 0 013-3.87m6-1.13a4 4 0 100-8 4 4 0 000 8zm6 4v-1a4 4 0 00-3-3.87m-9 0A4 4 0 003 19v1"/>
                            </svg>
                        </div>
                    </div>
                </section>

                {{-- Espace selon rôle (logique originale conservée) --}}
                @if(auth()->user()->role == 'admin')

                    <section class="bg-white rounded-xl shadow-lg p-6">
                        <h2 class="text-lg font-semibold text-gray-800 mb-4">Espace Administrateur</h2>

                        <a href="{{ route('evenements.index') }}"
                           class="inline-flex items-center gap-2 rounded-xl bg-blue-600 px-4 py-2.5 text-sm font-medium text-white shadow hover:bg-blue-700 transition">
                            <svg class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" d="M8 7V3m8 4V3M3 11h18M5 5h14a2 2 0 012 2v12a2 2 0 01-2 2H5a2 2 0 01-2-2V7a2 2 0 012-2z"/>
                            </svg>
                            Gérer les événements
                        </a>
                    </section>

                @else

                    <section class="bg-white rounded-xl shadow-lg p-6">
                        <h2 class="text-lg font-semibold text-gray-800 mb-4">Espace Étudiant</h2>

                        <a href="#"
                           class="inline-flex items-center gap-2 rounded-xl bg-blue-600 px-4 py-2.5 text-sm font-medium text-white shadow hover:bg-blue-700 transition">
                            Voir les événements
                        </a>
                    </section>

                @endif

                {{-- Grande carte Gestion des événements --}}
                <section class="bg-white rounded-xl shadow-lg p-6">
                    <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                        <div>
                            <h2 class="text-lg font-semibold text-gray-800">Gestion des événements</h2>
                            <p class="text-sm text-gray-500 mt-1">Créez et suivez les événements organisés par le BDE.</p>
                        </div>

                        <a href="{{ route('evenements.index') }}"
                           class="inline-flex items-center justify-center gap-2 rounded-xl bg-blue-600 px-5 py-2.5 text-sm font-medium text-white shadow hover:bg-blue-700 transition shrink-0">
                            <svg class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" d="M12 4v16m8-8H4"/>
                            </svg>
                            Ajouter un événement
                        </a>
                    </div>
                </section>

            </main>
        </div>
    </div>

</body>
</html>
