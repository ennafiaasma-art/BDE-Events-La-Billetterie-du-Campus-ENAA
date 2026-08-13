import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../services/api";

/*
  DESIGN NOTE
  -----------
  Same visual identity as the rest of the app (dashboards, tickets, réservations,
  événements): ink-violet / paper / coral / mint, Space Grotesk for display,
  IBM Plex Mono for numeric fields.

  Fonts (add once, e.g. in index.html <head>):
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@500;600;700&family=IBM+Plex+Mono:wght@500&family=Inter:wght@400;500;600&display=swap" rel="stylesheet">

  LOGIC NOTE
  ----------
  No functional changes. Same state (form, message, loading), same handleChange(),
  same handleSubmit() incl. the user check, the api.post payload (with Number()
  conversions and admin_id), the form reset, and the 1s setTimeout redirect to
  "/admin/dashboard". Same fields, same "required"/"min" constraints.
*/

function CreerEvenement() {

    const navigate = useNavigate();

    const [form, setForm] = useState({
        titre: "",
        description: "",
        date: "",
        lieu: "",
        prix: "",
        capaciteMax: "",
    });

    const [message, setMessage] = useState("");
    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {

        setForm({
            ...form,
            [e.target.name]: e.target.value,
        });

    };

    const handleSubmit = async (e) => {

        e.preventDefault();

        setLoading(true);
        setMessage("");

        try {

            const user = JSON.parse(
                localStorage.getItem("user")
            );

            if (!user) {
                setMessage("Vous devez être connecté.");
                return;
            }

            await api.post("/evenements", {

                titre: form.titre,

                description: form.description,

                date: form.date,

                lieu: form.lieu,

                prix: Number(form.prix),

                capaciteMax: Number(form.capaciteMax),

                admin_id: user.id,

            });

            setMessage(
                "Événement créé avec succès !"
            );

            setForm({
                titre: "",
                description: "",
                date: "",
                lieu: "",
                prix: "",
                capaciteMax: "",
            });

            setTimeout(() => {
                navigate("/admin/dashboard");
            }, 1000);

        } catch (error) {

            console.error(error);

            setMessage(
                error.response?.data?.message ||
                "Erreur lors de la création de l'événement."
            );

        } finally {

            setLoading(false);

        }
    };

    const inputClass =
        "w-full border border-[#E7E4F2] rounded-xl p-3 text-sm text-[#14132B] placeholder:text-[#8B87A6] bg-[#F6F4FB]/40 focus:outline-none focus:ring-2 focus:ring-[#5B4FE8]/30 focus:border-[#5B4FE8] transition";

    const labelClass =
        "block mb-2 text-xs font-mono-tix uppercase tracking-wider text-[#8B87A6]";

    return (
        <div
            className="min-h-screen bg-[#F6F4FB] p-8"
            style={{ fontFamily: "'Inter', system-ui, sans-serif" }}
        >
            <style>{`
                .font-display { font-family: 'Space Grotesk', 'Inter', system-ui, sans-serif; }
                .font-mono-tix { font-family: 'IBM Plex Mono', ui-monospace, monospace; }
            `}</style>

            <div className="max-w-3xl mx-auto">

                <button
                    onClick={() =>
                        navigate("/admin/dashboard")
                    }
                    className="mb-6 text-sm font-medium text-[#5B4FE8] hover:text-[#4a3fd1] transition inline-flex items-center gap-1"
                >
                    ← Retour au dashboard
                </button>

                <div className="bg-white rounded-2xl shadow-sm border border-[#E7E4F2] overflow-hidden">

                    <div className="p-8 pb-6">

                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-lg bg-[#5B4FE8]/10 flex items-center justify-center text-lg">
                                🎪
                            </div>
                            <div>
                                <h1 className="font-display text-2xl font-semibold text-[#14132B]">
                                    Créer un événement
                                </h1>
                                <p className="text-[#8B87A6] text-sm mt-0.5">
                                    Ajouter un nouvel événement au campus.
                                </p>
                            </div>
                        </div>

                        {message && (
                            <div className="mt-6 p-4 rounded-xl bg-[#5B4FE8]/10 text-[#5B4FE8] border border-[#5B4FE8]/20 text-sm font-medium">
                                {message}
                            </div>
                        )}

                    </div>

                    <form
                        onSubmit={handleSubmit}
                        className="px-8 pb-8 space-y-5"
                    >

                        {/* TITRE */}

                        <div>

                            <label className={labelClass}>
                                Titre
                            </label>

                            <input
                                type="text"
                                name="titre"
                                value={form.titre}
                                onChange={handleChange}
                                required
                                placeholder="Ex : Journée sportive"
                                className={inputClass}
                            />

                        </div>

                        {/* DESCRIPTION */}

                        <div>

                            <label className={labelClass}>
                                Description
                            </label>

                            <textarea
                                name="description"
                                value={form.description}
                                onChange={handleChange}
                                required
                                rows="4"
                                placeholder="Description de l'événement"
                                className={inputClass}
                            />

                        </div>

                        {/* DATE */}

                        <div>

                            <label className={labelClass}>
                                Date
                            </label>

                            <input
                                type="date"
                                name="date"
                                value={form.date}
                                onChange={handleChange}
                                required
                                className={`${inputClass} font-mono-tix`}
                            />

                        </div>

                        {/* LIEU */}

                        <div>

                            <label className={labelClass}>
                                Lieu
                            </label>

                            <input
                                type="text"
                                name="lieu"
                                value={form.lieu}
                                onChange={handleChange}
                                required
                                placeholder="Ex : Salle A"
                                className={inputClass}
                            />

                        </div>

                        {/* PRIX + CAPACITE */}

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">

                            <div>

                                <label className={labelClass}>
                                    Prix (DH)
                                </label>

                                <input
                                    type="number"
                                    name="prix"
                                    value={form.prix}
                                    onChange={handleChange}
                                    min="0"
                                    required
                                    className={`${inputClass} font-mono-tix`}
                                />

                            </div>

                            <div>

                                <label className={labelClass}>
                                    Capacité maximale
                                </label>

                                <input
                                    type="number"
                                    name="capaciteMax"
                                    value={form.capaciteMax}
                                    onChange={handleChange}
                                    min="1"
                                    required
                                    className={`${inputClass} font-mono-tix`}
                                />

                            </div>

                        </div>

                        {/* BUTTON */}

                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full bg-[#FF6B57] hover:bg-[#e85a47] text-white py-3 rounded-xl font-semibold text-sm transition disabled:opacity-50 flex items-center justify-center gap-2"
                        >
                            {loading && (
                                <span className="w-4 h-4 border-2 border-white/40 border-t-white rounded-full animate-spin" />
                            )}
                            {loading
                                ? "Création…"
                                : "Créer l'événement"}
                        </button>

                    </form>

                </div>

            </div>

        </div>
    );
}

export default CreerEvenement;
