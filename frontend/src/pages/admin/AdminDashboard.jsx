import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../services/api";

/*
  DESIGN NOTE
  -----------
  Same visual identity as the student-facing pages: ink-violet / paper / coral /
  mint, Space Grotesk for display, IBM Plex Mono for data — plus a small "ADMIN"
  tag so the two areas of the app stay visually related but clearly distinct.

  Fonts (add once, e.g. in index.html <head>):
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@500;600;700&family=IBM+Plex+Mono:wght@500&family=Inter:wght@400;500;600&display=swap" rel="stylesheet">

  LOGIC NOTE
  ----------
  No functional changes. Same state (evenements, loading, error), same
  getEvenements(), same handleLogout() (removes "token" and "user", navigates
  to "/"), same effect, same navigate() targets for create/modifier/supprimer.
*/

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

    const fontStyles = (
        <style>{`
            .font-display { font-family: 'Space Grotesk', 'Inter', system-ui, sans-serif; }
            .font-mono-tix { font-family: 'IBM Plex Mono', ui-monospace, monospace; }
        `}</style>
    );

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
                        Chargement…
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

            {/* NAVBAR */}

            <nav className="bg-[#14132B] text-white">

                <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">

                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-lg bg-[#FF6B57] flex items-center justify-center font-display font-bold text-white">
                            B
                        </div>
                        <div>
                            <div className="flex items-center gap-2">
                                <h1 className="font-display text-lg font-semibold leading-tight">
                                    BDE Events
                                </h1>
                                <span className="text-[10px] font-mono-tix bg-[#5B4FE8]/30 text-[#C9C5F5] px-2 py-0.5 rounded-full tracking-wider">
                                    ADMIN
                                </span>
                            </div>
                            <p className="text-xs text-white/40">
                                Panneau d'administration
                            </p>
                        </div>
                    </div>

                    <div className="flex items-center gap-5">

                        <div className="text-right">

                            <p className="font-semibold text-sm">
                                {user?.name}
                            </p>

                            <p className="text-xs text-white/40">
                                {user?.email}
                            </p>

                        </div>

                        <button
                            onClick={handleLogout}
                            className="border border-white/15 hover:border-[#FF6B57] hover:text-[#FF6B57] px-4 py-2 rounded-lg text-sm font-medium transition"
                        >
                            Déconnexion
                        </button>

                    </div>

                </div>

            </nav>

            {/* CONTENU */}

            <main className="max-w-7xl mx-auto px-6 py-10">

                <div className="flex justify-between items-center flex-wrap gap-4">

                    <div>

                        <h2 className="font-display text-3xl font-semibold text-[#14132B]">
                            Dashboard Admin
                        </h2>

                        <p className="mt-1 text-[#8B87A6]">
                            Gérez les événements du campus.
                        </p>

                    </div>

                    <button
                        onClick={() =>
                            navigate("/admin/evenements/create")
                        }
                        className="bg-[#FF6B57] hover:bg-[#e85a47] text-white px-5 py-3 rounded-xl font-semibold text-sm transition"
                    >
                        + Créer un événement
                    </button>

                </div>

                {/* STATISTIQUE */}

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">

                    <div className="bg-white rounded-2xl shadow-sm border border-[#E7E4F2] p-6">

                        <p className="text-xs font-mono-tix uppercase tracking-wider text-[#8B87A6]">
                            Total événements
                        </p>

                        <p className="text-4xl font-display font-semibold text-[#14132B] mt-2">
                            {String(evenements.length).padStart(2, "0")}
                        </p>

                    </div>

                    <div className="bg-white rounded-2xl shadow-sm border border-[#E7E4F2] p-6">

                        <p className="text-xs font-mono-tix uppercase tracking-wider text-[#8B87A6]">
                            Événements disponibles
                        </p>

                        <p className="text-4xl font-display font-semibold text-[#1C8F68] mt-2">
                            {String(evenements.length).padStart(2, "0")}
                        </p>

                    </div>

                    <div className="bg-white rounded-2xl shadow-sm border border-[#E7E4F2] p-6">

                        <p className="text-xs font-mono-tix uppercase tracking-wider text-[#8B87A6]">
                            Administrateur connecté
                        </p>

                        <p className="text-xl font-display font-semibold text-[#14132B] mt-2 truncate">
                            {user?.name}
                        </p>

                    </div>

                </div>

                {/* ERREUR */}

                {error && (
                    <div className="mt-8 bg-[#E4574F]/10 text-[#C43F38] border border-[#E4574F]/20 p-4 rounded-xl text-sm font-medium">
                        {error}
                    </div>
                )}

                {/* TABLEAU */}

                <div className="bg-white rounded-2xl shadow-sm border border-[#E7E4F2] mt-10 overflow-hidden">

                    <div className="px-6 py-5 border-b border-[#E7E4F2] flex items-center justify-between">

                        <h3 className="font-display text-lg font-semibold text-[#14132B]">
                            Gestion des événements
                        </h3>

                        <span className="font-mono-tix text-xs text-[#8B87A6]">
                            {evenements.length} au total
                        </span>

                    </div>

                    {evenements.length === 0 ? (

                        <div className="p-10 text-center text-[#8B87A6] text-sm">
                            Aucun événement disponible.
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
                                            Prix
                                        </th>

                                        <th className="text-left px-6 py-3 font-mono-tix text-xs uppercase tracking-wider text-[#8B87A6] font-medium">
                                            Capacité
                                        </th>

                                        <th className="text-center px-6 py-3 font-mono-tix text-xs uppercase tracking-wider text-[#8B87A6] font-medium">
                                            Actions
                                        </th>

                                    </tr>

                                </thead>

                                <tbody className="divide-y divide-[#E7E4F2]">

                                    {evenements.map((evenement) => (

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
                                                {evenement.prix} DH
                                            </td>

                                            <td className="px-6 py-4 text-[#4B4869] font-mono-tix">
                                                {evenement.capaciteMax}
                                            </td>

                                            <td className="px-6 py-4">

                                                <div className="flex justify-center gap-2">

                                                    <button
                                                        onClick={() =>
                                                            navigate(
                                                                `/admin/evenements/modifier/${evenement.id}`
                                                            )
                                                        }
                                                        className="bg-[#2FBF8F]/10 hover:bg-[#2FBF8F]/20 text-[#1C8F68] px-3 py-2 rounded-lg text-xs font-semibold transition"
                                                    >
                                                        Modifier
                                                    </button>

                                                    <button
                                                        onClick={() =>
                                                            navigate(
                                                                `/admin/evenements/supprimer/${evenement.id}`
                                                            )
                                                        }
                                                        className="bg-[#E4574F]/10 hover:bg-[#E4574F]/20 text-[#C43F38] px-3 py-2 rounded-lg text-xs font-semibold transition"
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
