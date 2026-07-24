<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="UTF-8">
    <title>Modifier un événement</title>
    <script src="https://cdn.tailwindcss.com"></script>
</head>

<body class="bg-gray-100">

<div class="max-w-3xl mx-auto mt-10 bg-white shadow rounded-xl p-8">

    <h1 class="text-3xl font-bold mb-6">
        Modifier un événement
    </h1>

    <form action="{{ route('gererEnv.update', $evenement->id) }}" method="POST">

        @csrf
        @method('PUT')

        <div class="mb-4">
            <label class="font-semibold">Titre</label>

            <input
                type="text"
                name="titre"
                value="{{ old('titre', $evenement->titre) }}"
                class="w-full border rounded-lg p-2">
        </div>

        <div class="mb-4">
            <label class="font-semibold">Description</label>

            <textarea
                name="description"
                class="w-full border rounded-lg p-2">{{ old('description', $evenement->description) }}</textarea>
        </div>

        <div class="mb-4">
            <label class="font-semibold">Date</label>

            <input
                type="date"
                name="date"
                value="{{ old('date', $evenement->date) }}"
                class="w-full border rounded-lg p-2">
        </div>

        <div class="mb-4">
            <label class="font-semibold">Lieu</label>

            <input
                type="text"
                name="lieu"
                value="{{ old('lieu', $evenement->lieu) }}"
                class="w-full border rounded-lg p-2">
        </div>

        <div class="mb-4">
            <label class="font-semibold">Capacité</label>

            <input
                type="number"
                name="capaciteMax"
                value="{{ old('capaciteMax', $evenement->capaciteMax) }}"
                class="w-full border rounded-lg p-2">
        </div>

        <div class="mb-4">
            <label class="font-semibold">Prix</label>

            <input
                type="number"
                step="0.01"
                name="prix"
                value="{{ old('prix', $evenement->prix) }}"
                class="w-full border rounded-lg p-2">
        </div>

        <button
            class="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg">

            Modifier
        </button>

    </form>

</div>

</body>
</html>
