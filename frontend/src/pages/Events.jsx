import { useEffect, useState } from "react";
import api from "../services/api";

/*
  DESIGN NOTE
  -----------
  Same visual identity as StudentDashboard.jsx / MyTicket.jsx / MyReservations.jsx:
  ink-violet / paper / coral / mint, Space Grotesk for display, IBM Plex Mono for
  codes, prices & data — so all four pages read as one product.

  Fonts (add once, e.g. in index.html <head>):
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@500;600;700&family=IBM+Plex+Mono:wght@500&family=Inter:wght@400;500;600&display=swap" rel="stylesheet">

  LOGIC NOTE
  ----------
  No functional changes. Same state (evenements, reservations, loading, error,
  message, loadingReservation), same getEvents() / getReservations() / dejaReserve()
  / reserver(), same effect, same conditions for loading / message / error / empty / list.
*/

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

            const response = await api.post("/reservations", {
                evenement_id: evenementId,
            });
            console.log("Réservation créée :", response.data);


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

    const fontStyles = (
        <style>{`
            .font-display { font-family: 'Space Grotesk', 'Inter', system-ui, sans-serif; }
            .font-mono-tix { font-family: 'IBM Plex Mono', ui-monospace, monospace; }
        `}</style>
    );

    // Chargement
    if (loading) {
        return (
            <div
                className="min-h-screen flex items-center justify-center bg-[#F6F4FB]"
                style={{ fontFamily: "'Inter', system-ui, sans-serif" }}
            >
                {fontStyles}
                <div className="flex flex-col items-center gap-3">
                    <div className="w-8 h-8 border-2 border-[#5B4FE8]/20 border-t-[#5B4FE8] rounded-full animate-spin" />
                    <p className="text-[#8B87A6] text-sm font-mono-tix">
                        Chargement des événements…
                    </p>
                </div>
            </div>
        );
    }

    return (
        <div
            className="min-h-screen bg-[#F6F4FB] text-[#14132B]"
            style={{ fontFamily: "'Inter', system-ui, sans-serif" }}
        >
            {fontStyles}

            {/* Navbar */}
            <nav className="bg-[#14132B]">
                <div className="max-w-7xl mx-auto px-6 py-4 flex items-center gap-3">
                    <div className="w-9 h-9 rounded-lg bg-[#FF6B57] flex items-center justify-center font-display font-bold text-white text-sm">
                        B
                    </div>
                    <h1 className="font-display text-lg font-semibold text-white">
                        BDE Events
                    </h1>
                </div>
            </nav>

            {/* Contenu */}
            <main className="max-w-7xl mx-auto px-6 py-10">

                <div className="flex items-baseline justify-between flex-wrap gap-2">
                    <h2 className="font-display text-3xl font-semibold text-[#14132B]">
                        Événements du campus
                    </h2>
                    {!error && (
                        <span className="font-mono-tix text-xs text-[#8B87A6] tracking-wide">
                            {String(evenements.length).padStart(2, "0")} au programme
                        </span>
                    )}
                </div>

                <p className="mt-1 text-[#8B87A6]">
                    Découvrez les prochains événements.
                </p>

                {/* Message */}
                {message && (
                    <div className="mt-6 p-4 bg-[#5B4FE8]/10 text-[#5B4FE8] border border-[#5B4FE8]/20 rounded-xl text-sm font-medium">
                        {message}
                    </div>
                )}

                {/* Erreur */}
                {error && (
                    <div className="mt-6 p-4 bg-[#E4574F]/10 text-[#C43F38] border border-[#E4574F]/20 rounded-xl text-sm font-medium">
                        {error}
                    </div>
                )}

                {/* Aucun événement */}
                {!error &&
                    evenements.length === 0 && (
                        <div className="mt-8 bg-white p-12 rounded-2xl text-center shadow-sm border border-[#E7E4F2]">
                            <div className="mx-auto w-16 h-16 rounded-full bg-[#5B4FE8]/10 flex items-center justify-center">
                                <span className="text-2xl">🎪</span>
                            </div>
                            <h3 className="mt-5 font-display text-xl font-semibold text-[#14132B]">
                                Aucun événement disponible
                            </h3>
                            <p className="mt-2 text-[#8B87A6] text-sm">
                                Reviens un peu plus tard, le programme se remplit vite.
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
                                className="bg-white rounded-2xl shadow-sm border border-[#E7E4F2] p-6 hover:shadow-md hover:-translate-y-0.5 transition"
                            >

                                {/* Titre + prix */}
                                <div className="flex justify-between items-start gap-4">

                                    <h3 className="font-display text-xl font-semibold text-[#14132B]">
                                        {evenement.titre}
                                    </h3>

                                    <span className="bg-[#FF6B57]/10 text-[#C43F38] px-3 py-1 rounded-full text-xs font-mono-tix font-semibold whitespace-nowrap">
                                        {evenement.prix} DH
                                    </span>

                                </div>

                                {/* Description */}
                                <p className="mt-3 text-sm text-[#4B4869]">
                                    {evenement.description}
                                </p>

                                {/* Informations */}
                                <div className="mt-5 space-y-2 text-sm text-[#4B4869] border-t border-dashed border-[#E7E4F2] pt-4">

                                    <p className="flex items-center gap-2">
                                        <span>📅</span> {evenement.date}
                                    </p>

                                    <p className="flex items-center gap-2">
                                        <span>📍</span> {evenement.lieu}
                                    </p>

                                    <p className="flex items-center gap-2">
                                        <span>👥</span> Capacité :{" "}
                                        <span className="font-mono-tix">{evenement.capaciteMax}</span>
                                    </p>

                                </div>

                                {/* Bouton réservation */}
                                {reserve ? (

                                    <button
                                        disabled
                                        className="mt-5 w-full bg-[#2FBF8F]/10 text-[#1C8F68] py-3 rounded-xl font-semibold text-sm cursor-not-allowed"
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
                                        className="mt-5 w-full bg-[#FF6B57] hover:bg-[#e85a47] text-white py-3 rounded-xl font-semibold text-sm transition disabled:opacity-60"
                                    >
                                        {loadingReservation ===
                                        evenement.id
                                            ? "Réservation…"
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
