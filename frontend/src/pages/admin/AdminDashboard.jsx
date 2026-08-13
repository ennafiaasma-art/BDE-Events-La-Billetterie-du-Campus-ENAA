import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../services/api";

function AdminDashboard() {

    const navigate = useNavigate();

    const [evenements, setEvenements] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    const user = JSON.parse(localStorage.getItem("user"));

    useEffect(() => {
        getEvenements();
    }, []);

    const getEvenements = async () => {
        try {

            const response = await api.get("/evenements");

            console.log("Événements :", response.data);

            setEvenements(response.data.data || []);

        } catch (error) {

            console.error(error);

            setError(
                error.response?.data?.message ||
                "Impossible de récupérer les événements."
            );

        } finally {
            setLoading(false);
        }
    };

    const handleLogout = async () => {

        try {
            await api.post("/logout");
        } catch (error) {
            console.error(error);
        }

        localStorage.removeItem("token");
        localStorage.removeItem("user");

        navigate("/");
    };

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-slate-100">
                <p className="text-slate-500 text-lg">
                    Chargement...
                </p>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-slate-100">

            {/* NAVBAR */}

            <nav className="bg-blue-700 text-white shadow">

                <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">

                    <div>
                        <h1 className="text-2xl font-bold">
                            BDE Events
                        </h1>

                        <p className="text-sm text-blue-200">
                            Administration
                        </p>
                    </div>

                    <div className="flex items-center gap-5">

                        <div className="text-right">

                            <p className="font-semibold">
                                {user?.name}
                            </p>

                            <p className="text-sm text-blue-200">
                                {user?.email}
                            </p>

                        </div>

                        <button
                            onClick={handleLogout}
                            className="bg-red-500 hover:bg-red-600 px-4 py-2 rounded-lg"
                        >
                            Déconnexion
                        </button>

                    </div>

                </div>

            </nav>

            {/* CONTENU */}

            <main className="max-w-7xl mx-auto px-6 py-10">

                <div className="flex justify-between items-center">

                    <div>

                        <h2 className="text-3xl font-bold text-slate-800">
                            Dashboard Admin
                        </h2>

                        <p className="mt-2 text-slate-500">
                            Gérez les événements du campus.
                        </p>

                    </div>

                    <button
                        onClick={() =>
                            navigate("/admin/evenements/create")
                        }
                        className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-3 rounded-xl font-semibold"
                    >
                        + Créer un événement
                    </button>

                </div>

                {/* STATISTIQUE */}

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">

                    <div className="bg-white rounded-2xl shadow-sm p-6">

                        <p className="text-slate-500">
                            Total événements
                        </p>

                        <p className="text-4xl font-bold text-blue-600 mt-3">
                            {evenements.length}
                        </p>

                    </div>

                    <div className="bg-white rounded-2xl shadow-sm p-6">

                        <p className="text-slate-500">
                            Événements disponibles
                        </p>

                        <p className="text-4xl font-bold text-green-600 mt-3">
                            {evenements.length}
                        </p>

                    </div>

                    <div className="bg-white rounded-2xl shadow-sm p-6">

                        <p className="text-slate-500">
                            Administrateur connecté
                        </p>

                        <p className="text-xl font-bold text-slate-800 mt-3">
                            {user?.name}
                        </p>

                    </div>

                </div>

                {/* ERREUR */}

                {error && (
                    <div className="mt-8 bg-red-50 text-red-600 p-4 rounded-xl">
                        {error}
                    </div>
                )}

                {/* TABLEAU */}

                <div className="bg-white rounded-2xl shadow-sm mt-10 overflow-hidden">

                    <div className="p-6 border-b">

                        <h3 className="text-xl font-bold text-slate-800">
                            Gestion des événements
                        </h3>

                    </div>

                    {evenements.length === 0 ? (

                        <div className="p-10 text-center text-slate-500">
                            Aucun événement disponible.
                        </div>

                    ) : (

                        <div className="overflow-x-auto">

                            <table className="w-full">

                                <thead className="bg-slate-50">

                                    <tr>

                                        <th className="text-left p-4">
                                            Titre
                                        </th>

                                        <th className="text-left p-4">
                                            Date
                                        </th>

                                        <th className="text-left p-4">
                                            Lieu
                                        </th>

                                        <th className="text-left p-4">
                                            Prix
                                        </th>

                                        <th className="text-left p-4">
                                            Capacité
                                        </th>

                                        <th className="text-center p-4">
                                            Actions
                                        </th>

                                    </tr>

                                </thead>

                                <tbody>

                                    {evenements.map((evenement) => (

                                        <tr
                                            key={evenement.id}
                                            className="border-t hover:bg-slate-50"
                                        >

                                            <td className="p-4 font-semibold">
                                                {evenement.titre}
                                            </td>

                                            <td className="p-4">
                                                {evenement.date}
                                            </td>

                                            <td className="p-4">
                                                {evenement.lieu}
                                            </td>

                                            <td className="p-4">
                                                {evenement.prix} DH
                                            </td>

                                            <td className="p-4">
                                                {evenement.capaciteMax}
                                            </td>

                                            <td className="p-4">

                                                <div className="flex justify-center gap-2">

                                                    <button
                                                        onClick={() =>
                                                            navigate(
                                                                `/admin/evenements/modifier/${evenement.id}`
                                                            )
                                                        }
                                                        className="bg-green-600 hover:bg-green-700 text-white px-3 py-2 rounded-lg"
                                                    >
                                                        Modifier
                                                    </button>

                                                    <button
                                                        onClick={() =>
                                                            navigate(
                                                                `/admin/evenements/supprimer/${evenement.id}`
                                                            )
                                                        }
                                                        className="bg-red-600 hover:bg-red-700 text-white px-3 py-2 rounded-lg"
                                                    >
                                                        Supprimer
                                                    </button>

                                                </div>

                                            </td>

                                        </tr>

                                    ))}

                                </tbody>

                            </table>

                        </div>

                    )}

                </div>

            </main>

        </div>
    );
}

export default AdminDashboard;
