<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Ajouter un événement</title>
    <script src="https://cdn.tailwindcss.com"></script>
</head>
<body class="bg-gray-100">

<div class="max-w-4xl mx-auto mt-10">

    <div class="bg-white shadow-lg rounded-xl p-8">

        <h1 class="text-3xl font-bold text-center text-blue-700 mb-8">
            Ajouter un événement
        </h1>

        @if ($errors->any())
            <div class="bg-red-100 text-red-700 p-4 rounded-lg mb-6">
                <ul class="list-disc ml-5">
                    @foreach ($errors->all() as $error)
                        <li>{{ $error }}</li>
                    @endforeach
                </ul>
            </div>
        @endif

        <form action="{{ route('gererEnv.store') }}" method="POST">

            @csrf

            <!-- Titre -->
            <div class="mb-5">
                <label class="block font-semibold mb-2">
                    Titre
                </label>

                <input
                    type="text"
                    name="titre"
                    value="{{ old('titre') }}"
                    class="w-full border rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-500"
                    placeholder="Ex : Journée d'intégration">
            </div>

            <!-- Description -->
            <div class="mb-5">
                <label class="block font-semibold mb-2">
                    Description
                </label>

                <textarea
                    name="description"
                    rows="5"
                    class="w-full border rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-500"
                    placeholder="Description de l'événement">{{ old('description') }}</textarea>
            </div>

            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">

                <!-- Date -->
                <div>
                    <label class="block font-semibold mb-2">
                        Date
                    </label>

                    <input
                        type="date"
                        name="date"
                        value="{{ old('date') }}"
                        class="w-full border rounded-lg px-4 py-3">
                </div>

                <!-- Lieu -->
                <div>
                    <label class="block font-semibold mb-2">
                        Lieu
                    </label>

                    <input
                        type="text"
                        name="lieu"
                        value="{{ old('lieu') }}"
                        class="w-full border rounded-lg px-4 py-3"
                        placeholder="Ex : Salle des conférences">
                </div>

                <!-- Prix -->
                <div>
                    <label class="block font-semibold mb-2">
                        Prix (DH)
                    </label>

                    <input
                        type="number"
                        step="0.01"
                        name="prix"
                        value="{{ old('prix') }}"
                        class="w-full border rounded-lg px-4 py-3"
                        placeholder="0">
                </div>

                <!-- Capacité -->
                <div>
                    <label class="block font-semibold mb-2">
                        Capacité maximale
                    </label>

                    <input
                        type="number"
                        name="capaciteMax"
                        value="{{ old('capaciteMax') }}"
                        class="w-full border rounded-lg px-4 py-3"
                        placeholder="100">
                </div>

            </div>

            <div class="flex justify-between mt-8">

                <a href="{{ route('dashboard') }}"
                   class="bg-gray-500 hover:bg-gray-600 text-white px-6 py-3 rounded-lg">
                    Retour
                </a>

                <button
                    type="submit"
                    class="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg">
                    Ajouter l'événement
                </button>

            </div>

        </form>

    </div>

</div>

</body>
</html>
