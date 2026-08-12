import { useEffect, useState } from "react";
import api from "../services/api";

/*
  DESIGN NOTE
  -----------
  Same visual identity as StudentDashboard.jsx: ink-violet / paper / coral / mint,
  Space Grotesk for display, IBM Plex Mono for codes & data, dashed "tear line"
  and perforation to keep the ticket-stub metaphor consistent across pages.

  Fonts (add once, e.g. in index.html <head>):
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@500;600;700&family=IBM+Plex+Mono:wght@500&family=Inter:wght@400;500;600&display=swap" rel="stylesheet">

  LOGIC NOTE
  ----------
  No functional changes. Same state (tickets, loading, error), same getTickets(),
  same effect, same conditions for loading / error / empty / list.
*/

function MyTickets() {
    const [tickets, setTickets] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        getTickets();
    }, []);

    const getTickets = async () => {
        try {
            const response = await api.get("/tickets");

            console.log("Tickets API :", response.data);

            setTickets(response.data.data || []);
        } catch (error) {
            console.error("Erreur tickets :", error);

            if (error.response?.status === 401) {
                setError("Votre session a expiré. Veuillez vous reconnecter.");
            } else {
                setError("Impossible de récupérer vos tickets.");
            }
        } finally {
            setLoading(false);
        }
    };

    const fontStyles = (
        <style>{`
            .font-display { font-family: 'Space Grotesk', 'Inter', system-ui, sans-serif; }
            .font-mono-tix { font-family: 'IBM Plex Mono', ui-monospace, monospace; }
            .stub-perforation {
                background-image: radial-gradient(circle, #F6F4FB 2.5px, transparent 2.6px);
                background-size: 14px 14px;
                background-position: center;
            }
            .stub-notch::before, .stub-notch::after {
                content: "";
                position: absolute;
                width: 16px;
                height: 16px;
                background: #F6F4FB;
                border-radius: 9999px;
                top: 100px;
            }
            .stub-notch::before { left: -8px; }
            .stub-notch::after { right: -8px; }
        `}</style>
    );

    if (loading) {
        return (
            <div
                className="min-h-screen bg-[#F6F4FB] flex items-center justify-center"
                style={{ fontFamily: "'Inter', system-ui, sans-serif" }}
            >
                {fontStyles}
                <div className="flex flex-col items-center gap-3">
                    <div className="w-8 h-8 border-2 border-[#5B4FE8]/20 border-t-[#5B4FE8] rounded-full animate-spin" />
                    <p className="text-[#8B87A6] text-sm font-mono-tix">
                        Chargement de vos tickets…
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
                        Mes tickets
                    </h2>
                    {!error && (
                        <span className="font-mono-tix text-xs text-[#8B87A6] tracking-wide">
                            {String(tickets.length).padStart(2, "0")} au total
                        </span>
                    )}
                </div>

                <p className="mt-1 text-[#8B87A6]">
                    Retrouvez ici tous vos tickets d'événements.
                </p>

                {/* Erreur */}
                {error && (
                    <div className="mt-8 p-4 rounded-xl bg-[#E4574F]/10 text-[#C43F38] border border-[#E4574F]/20 text-sm font-medium">
                        {error}
                    </div>
                )}

                {/* Aucun ticket */}
                {!error && tickets.length === 0 && (
                    <div className="mt-8 bg-white rounded-2xl shadow-sm border border-[#E7E4F2] p-12 text-center">

                        <div className="mx-auto w-16 h-16 rounded-full bg-[#5B4FE8]/10 flex items-center justify-center">
                            <span className="text-2xl">🎫</span>
                        </div>

                        <h3 className="mt-5 font-display text-xl font-semibold text-[#14132B]">
                            Aucun ticket pour le moment
                        </h3>

                        <p className="mt-2 text-[#8B87A6] text-sm">
                            Réservez un événement pour voir apparaître votre ticket ici.
                        </p>

                    </div>
                )}

                {/* Liste des tickets */}
                {!error && tickets.length > 0 && (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">

                        {tickets.map((ticket) => (

                            <div
                                key={ticket.id}
                                className="stub-notch relative bg-white rounded-2xl shadow-sm border border-[#E7E4F2] overflow-hidden hover:shadow-md hover:-translate-y-0.5 transition"
                            >

                                {/* Header ticket */}
                                <div className="bg-[#14132B] text-white p-5 relative">

                                    <div className="flex justify-between items-start">

                                        <div>
                                            <p className="text-white/40 text-[11px] font-mono-tix uppercase tracking-wider">
                                                Ticket
                                            </p>

                                            <h3 className="font-display text-xl font-semibold mt-1">
                                                {ticket.numero}
                                            </h3>
                                        </div>

                                        <span className="text-2xl leading-none">🎟️</span>

                                    </div>

                                </div>

                                {/* Ligne perforée / déchirure */}
                                <div className="h-4 stub-perforation" />

                                {/* Corps */}
                                <div className="px-6 pb-6 pt-2">

                                    {/* Code */}
                                    <div className="mb-5">

                                        <p className="text-xs text-[#8B87A6] uppercase tracking-wide">
                                            Code du ticket
                                        </p>

                                        <p className="font-mono-tix font-semibold text-[#14132B] mt-1 text-sm bg-[#F6F4FB] rounded-lg px-3 py-2 inline-block">
                                            {ticket.code}
                                        </p>

                                    </div>

                                    {/* Événement */}
                                    <div className="mb-4">

                                        <p className="text-xs text-[#8B87A6] uppercase tracking-wide">
                                            Événement
                                        </p>

                                        <p className="font-semibold text-[#14132B] mt-1">
                                            {ticket.reservation?.evenement?.titre ||
                                                "Événement"}
                                        </p>

                                    </div>

                                    <div className="grid grid-cols-2 gap-4 mb-4">

                                        {/* Date */}
                                        <div>

                                            <p className="text-xs text-[#8B87A6] uppercase tracking-wide">
                                                📅 Date
                                            </p>

                                            <p className="text-[#4B4869] mt-1 text-sm">
                                                {ticket.reservation?.evenement?.date ||
                                                    "Non disponible"}
                                            </p>

                                        </div>

                                        {/* Lieu */}
                                        <div>

                                            <p className="text-xs text-[#8B87A6] uppercase tracking-wide">
                                                📍 Lieu
                                            </p>

                                            <p className="text-[#4B4869] mt-1 text-sm">
                                                {ticket.reservation?.evenement?.lieu ||
                                                    "Non disponible"}
                                            </p>

                                        </div>

                                    </div>

                                    {/* Statut */}
                                    <div className="pt-4 border-t border-dashed border-[#E7E4F2]">

                                        <span className="inline-flex items-center gap-1.5 bg-[#2FBF8F]/10 text-[#1C8F68] px-3 py-1.5 rounded-full text-xs font-semibold">
                                            <span className="w-1.5 h-1.5 rounded-full bg-[#2FBF8F]" />
                                            Ticket valide
                                        </span>

                                    </div>

                                </div>

                            </div>

                        ))}

                    </div>
                )}

            </main>

        </div>
    );
}

export default MyTickets;
