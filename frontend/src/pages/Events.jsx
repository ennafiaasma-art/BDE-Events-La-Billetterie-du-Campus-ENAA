import { useEffect, useState } from "react";
import api from "../services/api";

function Events() {
    const [evenements, setEvenements] = useState([]);
    const [reservations, setReservations] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [message, setMessage] = useState("");
    const [loadingReservation, setLoadingReservation] = useState(null);

    // Charger événements + réservations
    useEffect(() => {
        getEvents();
        getReservations();
    }, []);

    // Récupérer les événements
    const getEvents = async () => {
        try {
            const response = await api.get("/evenements");

            console.log("Événements :", response.data);

            setEvenements(response.data.data || []);

        } catch (error) {
            console.error("Erreur événements :", error);

            setError(
                "Impossible de récupérer les événements."
            );
        } finally {
            setLoading(false);
        }
    };

    // Récupérer les réservations de l'utilisateur
    const getReservations = async () => {
        try {
            const response = await api.get("/mes-reservations");

            console.log("Mes réservations :", response.data);

            setReservations(response.data.data || []);

        } catch (error) {
            console.error(
                "Erreur réservations :",
                error
            );
        }
    };

    // Vérifier si l'événement est déjà réservé
    const dejaReserve = (evenementId) => {
        return reservations.some(
            (reservation) =>
                Number(reservation.evenement_id) ===
                Number(evenementId)
        );
    };

    // Réserver un événement
    const reserver = async (evenementId) => {
        const user = JSON.parse(
            localStorage.getItem("user")
        );

        if (!user) {
            setMessage(
                "Vous devez être connecté pour réserver."
            );
            return;
        }

        try {
            setLoadingReservation(evenementId);
            setMessage("");

            await api.post("/reservations", {
                codeReservation:"BDE-" + Date.now(),

                dateReservation: new Date().toISOString().split("T")[0],

                evenement_id: evenementId,

                etudiant_id: user.id,
            });

            setMessage(
                "Réservation effectuée avec succès !"
            );

            // Actualiser les réservations
            await getReservations();

        } catch (error) {
            console.error(
                "Erreur réservation :",
                error
            );

            if (error.response?.data?.message) {
                setMessage(
                    error.response.data.message
                );
            } else {
                setMessage(
                    "Erreur lors de la réservation."
                );
            }

        } finally {
            setLoadingReservation(null);
        }
    };

    // Chargement
    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-slate-100">
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
                        🎟️ BDE Events
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

                {/* Message */}
                {message && (
                    <div className="mt-6 p-4 bg-blue-50 text-blue-700 rounded-xl">
                        {message}
                    </div>
                )}

                {/* Erreur */}
                {error && (
                    <div className="mt-6 p-4 bg-red-50 text-red-600 rounded-xl">
                        {error}
                    </div>
                )}

                {/* Aucun événement */}
                {!error &&
                    evenements.length === 0 && (
                        <div className="mt-8 bg-white p-8 rounded-2xl text-center shadow">
                            <p className="text-slate-500">
                                Aucun événement disponible.
                            </p>
                        </div>
                    )}

                {/* Events */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">

                    {evenements.map((evenement) => {

                        const reserve = dejaReserve(
                            evenement.id
                        );

                        return (
                            <div
                                key={evenement.id}
                                className="bg-white rounded-2xl shadow-sm p-6 hover:shadow-lg transition"
                            >

                                {/* Titre + prix */}
                                <div className="flex justify-between items-start gap-4">

                                    <h3 className="text-xl font-bold text-slate-800">
                                        {evenement.titre}
                                    </h3>

                                    <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm font-semibold whitespace-nowrap">
                                        {evenement.prix} DH
                                    </span>

                                </div>

                                {/* Description */}
                                <p className="mt-4 text-slate-600">
                                    {evenement.description}
                                </p>

                                {/* Informations */}
                                <div className="mt-5 space-y-2 text-sm text-slate-600">

                                    <p>
                                        📅 {evenement.date}
                                    </p>

                                    <p>
                                        📍 {evenement.lieu}
                                    </p>

                                    <p>
                                        👥 Capacité :{" "}
                                        {evenement.capaciteMax}
                                    </p>

                                </div>

                                {/* Bouton réservation */}
                                {reserve ? (

                                    <button
                                        disabled
                                        className="mt-5 w-full bg-gray-400 text-white py-3 rounded-xl cursor-not-allowed"
                                    >
                                        ✓ Déjà réservé
                                    </button>

                                ) : (

                                    <button
                                        onClick={() =>
                                            reserver(
                                                evenement.id
                                            )
                                        }
                                        disabled={
                                            loadingReservation ===
                                            evenement.id
                                        }
                                        className="mt-5 w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-xl font-semibold transition disabled:opacity-60"
                                    >
                                        {loadingReservation ===
                                        evenement.id
                                            ? "Réservation..."
                                            : "🎫 Réserver"}
                                    </button>

                                )}

                            </div>
                        );
                    })}

                </div>

            </main>

        </div>
    );
}

export default Events;
