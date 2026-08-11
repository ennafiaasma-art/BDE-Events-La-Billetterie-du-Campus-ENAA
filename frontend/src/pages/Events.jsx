import { useEffect, useState } from "react";
import api from "../services/api";

function Events() {
    const [evenements, setEvenements] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        api.get("/evenements")
            .then((response) => {
                console.log("API :", response.data);

                setEvenements(response.data.data || []);
            })
            .catch((error) => {
                console.error("Erreur API :", error);
                setError("Impossible de récupérer les événements.");
            })
            .finally(() => {
                setLoading(false);
            });
    }, []);

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <p className="text-slate-500 text-lg">
                    Chargement des événements...
                </p>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-slate-100">

            {/* Navbar */}
            <nav className="bg-white border-b border-slate-200">
                <div className="max-w-7xl mx-auto px-6 py-4">

                    <h1 className="text-2xl font-bold text-blue-600">
                         BDE Events
                    </h1>

                </div>
            </nav>

            {/* Contenu */}
            <main className="max-w-7xl mx-auto px-6 py-10">

                <h2 className="text-3xl font-bold text-slate-800">
                    Événements du campus
                </h2>

                <p className="mt-2 text-slate-500">
                    Découvrez les prochains événements.
                </p>

                {/* Erreur */}
                {error && (
                    <div className="mt-6 p-4 bg-red-50 text-red-600 rounded-xl">
                        {error}
                    </div>
                )}

                {/* Aucun événement */}
                {!error && evenements.length === 0 && (
                    <div className="mt-8 bg-white p-8 rounded-2xl text-center shadow">
                        <p className="text-slate-500">
                            Aucun événement disponible.
                        </p>
                    </div>
                )}

                {/* Events */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">

                    {evenements.map((evenement) => (

                        <div
                            key={evenement.id}
                            className="bg-white rounded-2xl shadow-sm p-6 hover:shadow-lg transition"
                        >

                            <div className="flex justify-between items-start">

                                <h3 className="text-xl font-bold text-slate-800">
                                    {evenement.titre}
                                </h3>

                                <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm font-semibold">
                                    {evenement.prix} DH
                                </span>

                            </div>

                            <p className="mt-4 text-slate-600">
                                {evenement.description}
                            </p>

                            <div className="mt-5 space-y-2 text-sm text-slate-600">

                                <p>
                                    📅 {evenement.date}
                                </p>

                                <p>
                                    📍 {evenement.lieu}
                                </p>

                                <p>
                                    👥 Capacité : {evenement.capaciteMax}
                                </p>

                            </div>

                            <button
                                className="mt-6 w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-xl font-semibold transition"
                            >
                                Réserver
                            </button>

                        </div>

                    ))}

                </div>

            </main>
        </div>
    );
}

export default Events;
