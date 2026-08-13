import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";
import MyTickets from "./MyTicket";



function StudentDashboard() {
    const navigate = useNavigate();

    const user = JSON.parse(localStorage.getItem("user"));

    const [evenements, setEvenements] = useState([]);
    const [reservations, setReservations] = useState([]);
    const [tickets, setTickets] = useState([]);
    const [loading, setLoading] = useState(true);
    const [loadingTickets, setLoadingTickets] = useState(true);
    const [message, setMessage] = useState("");
    const [activeNav, setActiveNav] = useState("dashboard");

    // Récupérer les événements + réservations
    useEffect(() => {
        getDashboardData();
    }, []);

    const getDashboardData = async () => {
        try {
            const [eventsResponse, reservationsResponse] = await Promise.all([
                api.get("/evenements"),
                api.get("/mes-reservations"),
            ]);

            setEvenements(eventsResponse.data.data || []);
            setReservations(reservationsResponse.data.data || []);

        } catch (error) {
            console.error(error);
            setMessage("Impossible de récupérer les données.");
        } finally {
            setLoading(false);
        }
    };

    // Vérifier si l'utilisateur a déjà réservé l'événement
    const dejaReserve = (evenementId) => {
        return reservations.some(
            (reservation) =>
                reservation.evenement_id === evenementId
        );
    };

    // Réserver un événement
    const reserver = async (evenementId) => {
        try {
            setMessage("");

            await api.post("/reservations", {
                evenement_id: evenementId,
                etudiant_id: user.id,
                codeReservation: "BDE-" + Date.now(),
                dateReservation: new Date().toISOString().split("T")[0],
            });

            setMessage("Réservation effectuée avec succès !");

            // Actualiser les réservations
            const response = await api.get("/mes-reservations");

            setReservations(response.data.data || []);

        } catch (error) {
            console.error(error);

            if (error.response?.data?.message) {
                setMessage(error.response.data.message);
            } else {
                setMessage("Erreur lors de la réservation.");
            }
        }
    };

    useEffect(() => {
        getTickets();
    }, []);

    const getTickets = async () => {
        try {
            const response = await api.get("/tickets");

            console.log("Tickets :", response.data);

            setTickets(response.data.data || []);

        } catch (error) {
            console.error("Erreur récupération tickets :", error);
            setTickets([]);
        } finally {
            setLoadingTickets(false);
        }
    };

    // Déconnexion
    const logout = async () => {
        try {
            await api.post("/logout");
        } catch (error) {
            console.error(error);
        }

        localStorage.removeItem("user");
        navigate("/login");
    };

    const navItems = [
        { key: "dashboard", label: "Dashboard", path: "/dashboard" },
        { key: "evenements", label: "Mes événements", path: "/evenements" },
        { key: "reservations", label: "Mes réservations", path: "/reservations" },
        { key: "tickets", label: "Mes tickets", path: "/tickets" },
    ];

    return (
        <div
            className="flex min-h-screen bg-[#F6F4FB] text-[#14132B]"
            style={{ fontFamily: "'Inter', system-ui, sans-serif" }}
        >
            <style>{`
                .font-display { font-family: 'Space Grotesk', 'Inter', system-ui, sans-serif; }
                .font-mono-tix { font-family: 'IBM Plex Mono', ui-monospace, monospace; }
                .stub-perforation {
                    background-image: radial-gradient(circle, #F6F4FB 2.5px, transparent 2.6px);
                    background-size: 14px 14px;
                    background-position: center;
                }
            `}</style>

            {/* SIDEBAR */}
            <aside className="hidden md:flex md:flex-col w-64 bg-[#14132B] text-white">

                <div className="p-6 border-b border-white/10">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-lg bg-[#FF6B57] flex items-center justify-center font-display font-bold text-white">
                            B
                        </div>
                        <div>
                            <h1 className="font-display text-lg font-semibold leading-tight">
                                BDE
                            </h1>
                            <p className="text-xs text-white/50 font-mono-tix tracking-wide">
                                CAMPUS PASS
                            </p>
                        </div>
                    </div>
                </div>

                <nav className="mt-4 flex-1 px-3 space-y-1">
                    {navItems.map((item) => (
                        <button
                            key={item.key}
                            onClick={() => {
                                setActiveNav(item.key);
                                navigate(item.path);
                            }}
                            className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition
                                ${activeNav === item.key
                                    ? "bg-white/10 text-white"
                                    : "text-white/60 hover:bg-white/5 hover:text-white"
                                }`}
                        >
                            <span
                                className={`w-1.5 h-1.5 rounded-full ${
                                    activeNav === item.key ? "bg-[#FF6B57]" : "bg-white/20"
                                }`}
                            />
                            {item.label}
                        </button>
                    ))}
                </nav>

                <div className="p-4 border-t border-white/10">
                    <p className="text-[11px] text-white/40 leading-relaxed px-2">
                        Bureau des Étudiants · saison 2026
                    </p>
                </div>
            </aside>


            {/* CONTENT */}
            <main className="flex-1 min-w-0">

                {/* NAVBAR */}
                <header className="bg-white border-b border-[#E7E4F2] flex justify-between items-center px-8 py-4">

                    <div>
                        <h2 className="font-display text-xl font-semibold text-[#14132B]">
                            Bonjour {user?.name} 👋
                        </h2>

                        <p className="text-sm text-[#8B87A6]">
                            {user?.email}
                        </p>
                    </div>

                    <button
                        onClick={logout}
                        className="border border-[#E7E4F2] hover:border-[#FF6B57] hover:text-[#FF6B57] text-[#14132B] px-4 py-2 rounded-lg text-sm font-medium transition"
                    >
                        Déconnexion
                    </button>

                </header>


                {/* MAIN */}
                <div className="p-8">

                    <div className="flex items-baseline justify-between flex-wrap gap-2">
                        <h1 className="font-display text-3xl font-semibold text-[#14132B]">
                            Bienvenue, {user?.name} 👋
                        </h1>
                        <span className="font-mono-tix text-xs text-[#8B87A6] tracking-wide">
                            {new Date().toLocaleDateString("fr-FR", { day: "2-digit", month: "long", year: "numeric" })}
                        </span>
                    </div>

                    <p className="mt-1 text-[#8B87A6]">
                        Retrouvez tous les événements du campus.
                    </p>


                    {/* MESSAGE */}
                    {message && (
                        <div className="mt-6 p-4 rounded-xl bg-[#5B4FE8]/10 text-[#5B4FE8] border border-[#5B4FE8]/20 text-sm font-medium">
                            {message}
                        </div>
                    )}


                    {/* CARDS — ticket-stub style */}
                    <div className="grid md:grid-cols-3 gap-6 mt-8">

                        {/* ÉVÉNEMENTS */}
                        <div className="relative bg-white rounded-2xl shadow-sm border border-[#E7E4F2] overflow-hidden">
                            <div className="p-6">
                                <p className="text-xs font-mono-tix uppercase tracking-wider text-[#8B87A6]">
                                    Événements
                                </p>
                                <p className="text-4xl font-display font-semibold text-[#14132B] mt-2">
                                    {String(evenements.length).padStart(2, "0")}
                                </p>
                                <p className="text-sm text-[#8B87A6] mt-1">disponibles ce trimestre</p>
                            </div>
                            <div className="h-3 stub-perforation border-t border-dashed border-[#E7E4F2]" />
                            <button
                                onClick={() => navigate("/evenements")}
                                className="w-full py-3 text-sm font-semibold text-[#5B4FE8] hover:bg-[#5B4FE8]/5 transition"
                            >
                                Voir les événements →
                            </button>
                        </div>


                        {/* RESERVATIONS */}
                        <div className="relative bg-white rounded-2xl shadow-sm border border-[#E7E4F2] overflow-hidden">
                            <div className="p-6">
                                <p className="text-xs font-mono-tix uppercase tracking-wider text-[#8B87A6]">
                                    Réservations
                                </p>
                                <p className="text-4xl font-display font-semibold text-[#14132B] mt-2">
                                    {String(reservations.length).padStart(2, "0")}
                                </p>
                                <p className="text-sm text-[#8B87A6] mt-1">places confirmées</p>
                            </div>
                            <div className="h-3 stub-perforation border-t border-dashed border-[#E7E4F2]" />
                            <button
                                onClick={() => navigate("/reservations")}
                                className="w-full py-3 text-sm font-semibold text-[#5B4FE8] hover:bg-[#5B4FE8]/5 transition"
                            >
                                Mes réservations →
                            </button>
                        </div>


                        {/* TICKETS */}
                        <div className="relative bg-white rounded-2xl shadow-sm border border-[#E7E4F2] overflow-hidden">
                            <div className="p-6">
                                <p className="text-xs font-mono-tix uppercase tracking-wider text-[#8B87A6]">
                                    Tickets
                                </p>
                                <p className="text-4xl font-display font-semibold text-[#14132B] mt-2">
                                    {loadingTickets ? "—" : String(tickets.length).padStart(2, "0")}
                                </p>
                                <p className="text-sm text-[#8B87A6] mt-1">prêts à scanner</p>
                            </div>
                            <div className="h-3 stub-perforation border-t border-dashed border-[#E7E4F2]" />
                            <button
                                onClick={() => navigate("/tickets")}
                                className="w-full py-3 text-sm font-semibold text-[#FF6B57] hover:bg-[#FF6B57]/5 transition"
                            >
                                Mes tickets →
                            </button>
                        </div>

                    </div>


                    {/* TABLEAU */}
                    <div className="bg-white rounded-2xl shadow-sm border border-[#E7E4F2] mt-10 overflow-hidden">

                        <div className="px-6 py-5 border-b border-[#E7E4F2] flex items-center justify-between">
                            <h2 className="font-display text-lg font-semibold text-[#14132B]">
                                Prochains événements
                            </h2>
                            <span className="font-mono-tix text-xs text-[#8B87A6]">
                                {evenements.length} au programme
                            </span>
                        </div>


                        {loading ? (

                            <div className="p-10 text-center text-[#8B87A6] text-sm">
                                Chargement des événements…
                            </div>

                        ) : evenements.length === 0 ? (

                            <div className="p-10 text-center text-[#8B87A6] text-sm">
                                Aucun événement disponible pour le moment.
                            </div>

                        ) : (

                            <div className="overflow-x-auto">

                                <table className="w-full text-sm">

                                    <thead className="bg-[#F6F4FB]">

                                        <tr>

                                            <th className="text-left px-6 py-3 font-mono-tix text-xs uppercase tracking-wider text-[#8B87A6] font-medium">
                                                Titre
                                            </th>

                                            <th className="text-left px-6 py-3 font-mono-tix text-xs uppercase tracking-wider text-[#8B87A6] font-medium">
                                                Date
                                            </th>

                                            <th className="text-left px-6 py-3 font-mono-tix text-xs uppercase tracking-wider text-[#8B87A6] font-medium">
                                                Lieu
                                            </th>

                                            <th className="text-left px-6 py-3 font-mono-tix text-xs uppercase tracking-wider text-[#8B87A6] font-medium">
                                                Places
                                            </th>

                                            <th className="text-left px-6 py-3 font-mono-tix text-xs uppercase tracking-wider text-[#8B87A6] font-medium">
                                                Description
                                            </th>

                                            <th className="text-center px-6 py-3 font-mono-tix text-xs uppercase tracking-wider text-[#8B87A6] font-medium">
                                                Action
                                            </th>

                                        </tr>

                                    </thead>


                                    <tbody className="divide-y divide-[#E7E4F2]">

                                        {evenements.map((evenement) => {

                                            const reserve = dejaReserve(
                                                evenement.id
                                            );

                                            return (

                                                <tr
                                                    key={evenement.id}
                                                    className="hover:bg-[#F6F4FB]/60 transition"
                                                >

                                                    <td className="px-6 py-4 font-semibold text-[#14132B]">
                                                        {evenement.titre}
                                                    </td>

                                                    <td className="px-6 py-4 text-[#4B4869] font-mono-tix text-xs">
                                                        {evenement.date}
                                                    </td>

                                                    <td className="px-6 py-4 text-[#4B4869]">
                                                        {evenement.lieu}
                                                    </td>

                                                    <td className="px-6 py-4 text-[#4B4869] font-mono-tix">
                                                        {evenement.capaciteMax}
                                                    </td>

                                                    <td className="px-6 py-4 max-w-xs text-[#8B87A6]">
                                                        {evenement.description}
                                                    </td>

                                                    <td className="px-6 py-4 text-center">

                                                        {reserve ? (

                                                            <span
                                                                className="inline-flex items-center gap-1.5 bg-[#2FBF8F]/10 text-[#1C8F68] px-3 py-1.5 rounded-full text-xs font-semibold"
                                                            >
                                                                <span className="w-1.5 h-1.5 rounded-full bg-[#2FBF8F]" />
                                                                Déjà réservé
                                                            </span>

                                                        ) : (

                                                            <button
                                                                onClick={() =>
                                                                    reserver(
                                                                        evenement.id
                                                                    )
                                                                }
                                                                className="bg-[#FF6B57] hover:bg-[#e85a47] text-white px-4 py-2 rounded-lg text-xs font-semibold transition"
                                                            >
                                                                Réserver
                                                            </button>

                                                        )}

                                                    </td>

                                                </tr>

                                            );

                                        })}

                                    </tbody>

                                </table>

                            </div>

                        )}

                    </div>

                </div>

            </main>

        </div>
    );
}

export default StudentDashboard;
