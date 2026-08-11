import { useEffect, useState } from "react";
import api from "../services/api";

function MyReservations() {
    const [reservations, setReservations] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [deletingId, setDeletingId] = useState(null);
    useEffect(() => {
        getReservations();
    }, []);

    const getReservations = async () => {
        try {
            const response = await api.get("/mes-reservations");

            console.log("Réservations :", response.data);

            setReservations(response.data.data || []);

        } catch (error) {
            console.error("Erreur :", error);

            if (error.response?.status === 401) {
                setError("Votre session a expiré. Veuillez vous reconnecter.");
            } else {
                setError("Impossible de récupérer vos réservations.");
            }
        } finally {
            setLoading(false);
        }
    };
    const cancelReservation = async (id) => {

    const confirmed = window.confirm(
        "Êtes-vous sûr de vouloir annuler cette réservation ?"
    );

    if (!confirmed) {
        return;
    }

    try {

        setDeletingId(id);

        await api.delete(`/reservations/${id}`);

        // Retirer la réservation de l'affichage
        setReservations((prev) =>
            prev.filter((reservation) => reservation.id !== id)
        );

    } catch (error) {

        console.error(error);

        alert(
            error.response?.data?.message ||
            "Impossible d'annuler la réservation."
        );

    } finally {
        setDeletingId(null);
    }
};

    return (
        <div className="min-h-screen bg-slate-100">

            {/* NAVBAR */}
            <nav className="bg-white border-b border-slate-200">
                <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">

                    <h1 className="text-2xl font-bold text-blue-600">
                         BDE Events
                    </h1>

                    <span className="text-sm text-slate-500">
                        Espace étudiant
                    </span>

                </div>
            </nav>

            {/* CONTENT */}
            <main className="max-w-7xl mx-auto px-6 py-10">

                <div className="mb-8">
                    <h2 className="text-3xl font-bold text-slate-800">
                        Mes réservations
                    </h2>

                    <p className="mt-2 text-slate-500">
                        Retrouvez ici toutes vos réservations.
                    </p>
                </div>

                {/* LOADING */}
                {loading && (
                    <div className="bg-white rounded-2xl p-10 text-center shadow-sm">
                        <div className="text-4xl animate-pulse">

                        </div>

                        <p className="mt-4 text-slate-500">
                            Chargement de vos réservations...
                        </p>
                    </div>
                )}

                {/* ERROR */}
                {!loading && error && (
                    <div className="p-5 rounded-2xl bg-red-50 border border-red-200 text-red-700">
                        <p className="font-semibold">
                            Erreur
                        </p>

                        <p className="mt-1">
                            {error}
                        </p>
                    </div>
                )}

                {/* EMPTY */}
                {!loading && !error && reservations.length === 0 && (
                    <div className="bg-white rounded-2xl p-10 text-center shadow-sm">

                        <div className="text-6xl">
                            🎫
                        </div>

                        <h3 className="mt-5 text-xl font-bold text-slate-800">
                            Aucune réservation
                        </h3>

                        <p className="mt-2 text-slate-500">
                            Vous n'avez pas encore réservé d'événement.
                        </p>

                    </div>
                )}

                {/* RESERVATIONS */}
                {!loading && !error && reservations.length > 0 && (

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">

                        {reservations.map((reservation) => (

                            <div
                                key={reservation.id}
                                className="bg-white rounded-2xl shadow-sm hover:shadow-md transition overflow-hidden"
                            >

                                {/* HEADER */}
                                <div className="p-6">

                                    <div className="flex justify-between items-start gap-4">

                                        <div>

                                            <p className="text-sm text-slate-400">
                                                Réservation #{reservation.id}
                                            </p>

                                            <h3 className="mt-2 text-xl font-bold text-slate-800">
                                                {reservation.evenement?.titre ||
                                                    "Événement"}
                                            </h3>

                                        </div>

                                        <span className="shrink-0 px-3 py-1 rounded-full bg-green-100 text-green-700 text-xs font-semibold">
                                            Confirmée
                                        </span>

                                    </div>

                                    {/* INFORMATIONS */}
                                    <div className="mt-6 space-y-3 text-sm text-slate-600">

                                        <div className="flex gap-3">
                                            <span>📅</span>

                                            <span>
                                                {reservation.evenement?.date ||
                                                    reservation.dateReservation}
                                            </span>
                                        </div>

                                        <div className="flex gap-3">
                                            <span>📍</span>

                                            <span>
                                                {reservation.evenement?.lieu ||
                                                    "Lieu non disponible"}
                                            </span>
                                        </div>

                                        <div className="flex gap-3">

                                            <span>
                                                {reservation.codeReservation}
                                            </span>


                                        </div>

                                    </div>
                                    <button
    onClick={() => cancelReservation(reservation.id)}
    disabled={deletingId === reservation.id}
    className="mt-5 w-full py-3 rounded-xl border border-red-200 text-red-600 font-semibold hover:bg-red-50 transition disabled:opacity-50"
>
    {deletingId === reservation.id
        ? "Annulation..."
        : "Annuler la réservation"}
</button>

                                </div>

                                {/* FOOTER */}
                                <div className="border-t border-slate-100 px-6 py-4 bg-slate-50">

                                    <p className="text-xs text-slate-400">
                                        Réservation effectuée le
                                    </p>

                                    <p className="text-sm font-semibold text-slate-700 mt-1">
                                        {reservation.dateReservation}
                                    </p>

                                </div>

                            </div>

                        ))}

                    </div>

                )}

            </main>
        </div>
    );
}

export default MyReservations;
