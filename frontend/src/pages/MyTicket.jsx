import { useEffect, useState } from "react";
import api from "../services/api";

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

    if (loading) {
        return (
            <div className="min-h-screen bg-slate-100 flex items-center justify-center">
                <p className="text-slate-500 text-lg">
                    Chargement de vos tickets...
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
                    Mes tickets 🎟️
                </h2>

                <p className="mt-2 text-slate-500">
                    Retrouvez ici tous vos tickets d'événements.
                </p>

                {/* Erreur */}
                {error && (
                    <div className="mt-8 p-4 rounded-xl bg-red-50 text-red-600">
                        {error}
                    </div>
                )}

                {/* Aucun ticket */}
                {!error && tickets.length === 0 && (
                    <div className="mt-8 bg-white rounded-2xl shadow-sm p-10 text-center">

                        <div className="text-6xl">
                            🎫
                        </div>

                        <h3 className="mt-4 text-xl font-bold text-slate-800">
                            Aucun ticket
                        </h3>

                        <p className="mt-2 text-slate-500">
                            Vous n'avez pas encore de ticket.
                        </p>

                    </div>
                )}

                {/* Liste des tickets */}
                {!error && tickets.length > 0 && (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">

                        {tickets.map((ticket) => (

                            <div
                                key={ticket.id}
                                className="bg-white rounded-2xl shadow-sm overflow-hidden hover:shadow-lg transition"
                            >

                                {/* Header ticket */}
                                <div className="bg-blue-600 text-white p-5">

                                    <div className="flex justify-between items-center">

                                        <div>
                                            <p className="text-blue-200 text-sm">
                                                TICKET
                                            </p>

                                            <h3 className="text-xl font-bold mt-1">
                                                {ticket.numero}
                                            </h3>
                                        </div>

                                        <div className="text-4xl">
                                            🎟️
                                        </div>

                                    </div>

                                </div>

                                {/* Corps */}
                                <div className="p-6">

                                    {/* Code */}
                                    <div className="mb-5">

                                        <p className="text-sm text-slate-400">
                                            Code du ticket
                                        </p>

                                        <p className="font-mono font-bold text-slate-800 mt-1">
                                            {ticket.code}
                                        </p>

                                    </div>

                                    {/* Événement */}
                                    <div className="mb-4">

                                        <p className="text-sm text-slate-400">
                                            Événement
                                        </p>

                                        <p className="font-bold text-slate-800 mt-1">
                                            {ticket.reservation?.evenement?.titre ||
                                                "Événement"}
                                        </p>

                                    </div>

                                    {/* Date */}
                                    <div className="mb-4">

                                        <p className="text-sm text-slate-400">
                                            📅 Date
                                        </p>

                                        <p className="text-slate-700 mt-1">
                                            {ticket.reservation?.evenement?.date ||
                                                "Date non disponible"}
                                        </p>

                                    </div>

                                    {/* Lieu */}
                                    <div className="mb-4">

                                        <p className="text-sm text-slate-400">
                                            📍 Lieu
                                        </p>

                                        <p className="text-slate-700 mt-1">
                                            {ticket.reservation?.evenement?.lieu ||
                                                "Lieu non disponible"}
                                        </p>

                                    </div>

                                    {/* Statut */}
                                    <div className="pt-4 border-t border-slate-200">

                                        <span className="inline-flex px-3 py-1 rounded-full bg-green-100 text-green-700 text-sm font-semibold">
                                            ✓ Ticket valide
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
