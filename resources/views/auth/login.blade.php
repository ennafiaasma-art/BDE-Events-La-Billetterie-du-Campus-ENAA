<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Connexion</title>
    <script src="https://cdn.tailwindcss.com"></script>
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700&display=swap" rel="stylesheet">
    <style>
        body { font-family: 'Poppins', sans-serif; }
    </style>
</head>
<body class="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-600 to-blue-500 p-5">

    <div class="w-full max-w-md bg-white rounded-2xl shadow-2xl overflow-hidden">

        <!-- Header -->
        <div class="bg-gradient-to-br from-purple-600 to-blue-500 py-10 px-8 text-center text-white">
            <div class="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center text-3xl mx-auto mb-4">
                🎓
            </div>
            <h2 class="text-2xl font-semibold mb-1">Connexion</h2>
            <p class="text-sm text-white/80">Portail des Événements Étudiants</p>
        </div>

        <!-- Body -->
        <div class="px-8 pt-8 pb-10">

            @if ($errors->any())
                <div class="bg-red-50 border-l-4 border-red-500 text-red-600 text-sm rounded-lg px-4 py-3 mb-5">
                    {{ $errors->first() }}
                </div>
            @endif

            <form action="{{ route('login.post') }}" method="POST" class="space-y-5">
                @csrf

                <div>
                    <label class="block text-sm font-medium text-gray-700 mb-2">Email</label>
                    <input
                        type="email"
                        name="email"
                        value="{{ old('email') }}"
                        required
                        placeholder="exemple@etudiant.fr"
                        class="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm outline-none transition focus:border-purple-600 focus:ring-4 focus:ring-purple-100"
                    >
                </div>

                <div>
                    <label class="block text-sm font-medium text-gray-700 mb-2">Mot de passe</label>
                    <input
                        type="password"
                        name="password"
                        required
                        placeholder="••••••••"
                        class="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm outline-none transition focus:border-purple-600 focus:ring-4 focus:ring-purple-100"
                    >
                </div>

                <button
                    type="submit"
                    class="w-full py-3.5 bg-gradient-to-br from-purple-600 to-blue-500 text-white font-semibold rounded-xl transition hover:opacity-90 hover:-translate-y-0.5 active:translate-y-0"
                >
                    Se connecter
                </button>
            </form>

            <p class="text-center text-sm text-gray-500 mt-6">
                Bienvenue sur votre espace événements 🎉
            </p>
        </div>
    </div>

</body>
</html>
