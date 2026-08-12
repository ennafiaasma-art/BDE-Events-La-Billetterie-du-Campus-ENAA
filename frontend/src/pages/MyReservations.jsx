import { useEffect, useState } from "react";
import api from "../services/api";

/*
  DESIGN NOTE
  -----------
  Same visual identity as StudentDashboard.jsx / MyTicket.jsx: ink-violet / paper
  / coral / mint, Space Grotesk for display, IBM Plex Mono for codes & data —
  so the three pages read as one product.

  Fonts (add once, e.g. in index.html <head>):
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@500;600;700&family=IBM+Plex+Mono:wght@500&family=Inter:wght@400;500;600&display=swap" rel="stylesheet">

  LOGIC NOTE
  ----------
  No functional changes. Same state (reservations, loading, error, deletingId),
  same getReservations(), same cancelReservation() incl. window.confirm / alert,
  same effect, same conditions for loading / error / empty / list.
*/

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

    const fontStyles = (
        <style>{`
            .font-display { font-family: 'Space Grotesk', 'Inter', system-ui, sans-serif; }
            .font-mono-tix { font-family: 'IBM Plex Mono', ui-monospace, monospace; }
        `}</style>
    );

    return (
        <div
            className="min-h-screen bg-[#F6F4FB] text-[#14132B]"
            style={{ fontFamily: "'Inter', system-ui, sans-serif" }}
        >
            {fontStyles}

            {/* NAVBAR */}
            <nav className="bg-[#14132B]">
                <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">

                    <div className="flex items-center gap-3">
                        <div className="w-9 h-9 rounded-lg bg-[#FF6B57] flex items-center justify-center font-display font-bold text-white text-sm">
                            B
                        </div>
                        <h1 className="font-display text-lg font-semibold text-white">
                            BDE Events
                        </h1>
                    </div>

                    <span className="text-xs font-mono-tix text-white/40 tracking-wide uppercase">
                        Espace étudiant
                    </span>

                </div>
            </nav>

            {/* CONTENT */}
            <main className="max-w-7xl mx-auto px-6 py-10">

                <div className="mb-8 flex items-baseline justify-between flex-wrap gap-2">
                    <div>
                        <h2 className="font-display text-3xl font-semibold text-[#14132B]">
                            Mes réservations
                        </h2>

                        <p className="mt-1 text-[#8B87A6]">
                            Retrouvez ici toutes vos réservations.
                        </p>
                    </div>

                    {!loading && !error && reservations.length > 0 && (
                        <span className="font-mono-tix text-xs text-[#8B87A6] tracking-wide">
                            {String(reservations.length).padStart(2, "0")} au total
                        </span>
                    )}
                </div>

                {/* LOADING */}
                {loading && (
                    <div className="bg-white rounded-2xl p-12 text-center shadow-sm border border-[#E7E4F2]">
                        <div className="mx-auto w-8 h-8 border-2 border-[#5B4FE8]/20 border-t-[#5B4FE8] rounded-full animate-spin" />

                        <p className="mt-4 text-[#8B87A6] text-sm font-mono-tix">
                            Chargement de vos réservations…
                        </p>
                    </div>
                )}

                {/* ERROR */}
                {!loading && error && (
                    <div className="p-5 rounded-2xl bg-[#E4574F]/10 border border-[#E4574F]/20 text-[#C43F38]">
                        <p className="font-display font-semibold">
                            Erreur
                        </p>

                        <p className="mt-1 text-sm">
                            {error}
                        </p>
                    </div>
                )}

                {/* EMPTY */}
                {!loading && !error && reservations.length === 0 && (
                    <div className="bg-white rounded-2xl p-12 text-center shadow-sm border border-[#E7E4F2]">

                        <div className="mx-auto w-16 h-16 rounded-full bg-[#5B4FE8]/10 flex items-center justify-center">
                            <span className="text-2xl">🎫</span>
                        </div>

                        <h3 className="mt-5 font-display text-xl font-semibold text-[#14132B]">
                            Aucune réservation
                        </h3>

                        <p className="mt-2 text-[#8B87A6] text-sm">
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
                                className="bg-white rounded-2xl shadow-sm border border-[#E7E4F2] hover:shadow-md hover:-translate-y-0.5 transition overflow-hidden"
                            >

                                {/* HEADER */}
                                <div className="p-6">

                                    <div className="flex justify-between items-start gap-4">

                                        <div>

                                            <p className="text-xs font-mono-tix text-[#8B87A6] uppercase tracking-wide">
                                                Réservation #{reservation.id}
                                            </p>

                                            <h3 className="mt-2 font-display text-xl font-semibold text-[#14132B]">
                                                {reservation.evenement?.titre ||
                                                    "Événement"}
                                            </h3>

                                        </div>

                                        <span className="shrink-0 inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#2FBF8F]/10 text-[#1C8F68] text-xs font-semibold">
                                            <span className="w-1.5 h-1.5 rounded-full bg-[#2FBF8F]" />
                                            Confirmée
                                        </span>

                                    </div>

                                    {/* INFORMATIONS */}
                                    <div className="mt-6 space-y-3 text-sm text-[#4B4869]">

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

                                            <span className="font-mono-tix text-xs bg-[#F6F4FB] rounded-lg px-2.5 py-1 text-[#14132B]">
                                                {reservation.codeReservation}
                                            </span>

                                        </div>

                                    </div>

                                    <button
                                        onClick={() => cancelReservation(reservation.id)}
                                        disabled={deletingId === reservation.id}
                                        className="mt-5 w-full py-3 rounded-xl border border-[#E4574F]/30 text-[#C43F38] font-semibold text-sm hover:bg-[#E4574F]/5 transition disabled:opacity-50"
                                    >
                                        {deletingId === reservation.id
                                            ? "Annulation…"
                                            : "Annuler la réservation"}
                                    </button>

                                </div>

                                {/* FOOTER */}
                                <div className="border-t border-dashed border-[#E7E4F2] px-6 py-4 bg-[#F6F4FB]">

                                    <p className="text-[11px] text-[#8B87A6] uppercase tracking-wide">
                                        Réservation effectuée le
                                    </p>

                                    <p className="text-sm font-mono-tix font-semibold text-[#14132B] mt-1">
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
