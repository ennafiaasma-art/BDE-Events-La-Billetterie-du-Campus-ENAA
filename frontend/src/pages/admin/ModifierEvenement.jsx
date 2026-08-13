import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import api from "../../services/api";

/*
  DESIGN NOTE
  -----------
  Same visual identity as CreerEvenement.jsx and the rest of the app: ink-violet
  / paper / coral / mint, Space Grotesk for display, IBM Plex Mono for numeric
  fields. Uses mint/green as the primary action color here (edit = confirm an
  existing thing) to echo the original green button, instead of the coral used
  for "create".

  Fonts (add once, e.g. in index.html <head>):
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@500;600;700&family=IBM+Plex+Mono:wght@500&family=Inter:wght@400;500;600&display=swap" rel="stylesheet">

  LOGIC NOTE
  ----------
  No functional changes. Same state (form, loading, saving, message), same
  getEvenement() (incl. useEffect on [id]), same handleChange(), same
  handleSubmit() with the api.put payload (Number() on prix/capaciteMax) and
  the 1s setTimeout redirect to "/admin/dashboard". Same fields, same
  "required"/"min" constraints.
*/

function ModifierEvenement() {

    const { id } = useParams();
    const navigate = useNavigate();

    const [form, setForm] = useState({
        titre: "",
        description: "",
        date: "",
        lieu: "",
        prix: "",
        capaciteMax: "",
    });

    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [message, setMessage] = useState("");

    useEffect(() => {
        getEvenement();
    }, [id]);

    const getEvenement = async () => {

        try {

            const response =
                await api.get(`/evenements/${id}`);

            const evenement = response.data.data;

            setForm({
                titre: evenement.titre || "",
                description: evenement.description || "",
                date: evenement.date || "",
                lieu: evenement.lieu || "",
                prix: evenement.prix || "",
                capaciteMax: evenement.capaciteMax || "",
            });

        } catch (error) {

            console.error(error);

            setMessage(
                error.response?.data?.message ||
                "Impossible de récupérer l'événement."
            );

        } finally {

            setLoading(false);

        }
    };

    const handleChange = (e) => {

        setForm({
            ...form,
            [e.target.name]: e.target.value,
        });

    };

    const handleSubmit = async (e) => {

        e.preventDefault();

        setSaving(true);
        setMessage("");

        try {

            await api.put(`/evenements/${id}`, {

                titre: form.titre,

                description: form.description,

                date: form.date,

                lieu: form.lieu,

                prix: Number(form.prix),

                capaciteMax: Number(form.capaciteMax),

            });

            setMessage(
                "Événement modifié avec succès !"
            );

            setTimeout(() => {
                navigate("/admin/dashboard");
            }, 1000);

        } catch (error) {

            console.error(error);

            setMessage(
                error.response?.data?.message ||
                "Erreur lors de la modification."
            );

        } finally {

            setSaving(false);

        }
    };

    const fontStyles = (
        <style>{`
            .font-display { font-family: 'Space Grotesk', 'Inter', system-ui, sans-serif; }
            .font-mono-tix { font-family: 'IBM Plex Mono', ui-monospace, monospace; }
        `}</style>
    );

    const inputClass =
        "w-full border border-[#E7E4F2] rounded-xl p-3 text-sm text-[#14132B] placeholder:text-[#8B87A6] bg-[#F6F4FB]/40 focus:outline-none focus:ring-2 focus:ring-[#5B4FE8]/30 focus:border-[#5B4FE8] transition";

    const labelClass =
        "block mb-2 text-xs font-mono-tix uppercase tracking-wider text-[#8B87A6]";

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
                        Chargement de l'événement…
                    </p>
                </div>
            </div>
        );
    }

    return (
        <div
            className="min-h-screen bg-[#F6F4FB] p-8"
            style={{ fontFamily: "'Inter', system-ui, sans-serif" }}
        >
            {fontStyles}

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
                            <div className="w-10 h-10 rounded-lg bg-[#2FBF8F]/10 flex items-center justify-center text-lg">
                                ✏️
                            </div>
                            <div>
                                <h1 className="font-display text-2xl font-semibold text-[#14132B]">
                                    Modifier l'événement
                                </h1>
                                <p className="text-[#8B87A6] text-sm mt-0.5 font-mono-tix">
                                    #{id}
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
                                className={inputClass}
                            />

                        </div>

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
                                className={inputClass}
                            />

                        </div>

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
                                className={inputClass}
                            />

                        </div>

                        <div className="grid grid-cols-2 gap-5">

                            <div>

                                <label className={labelClass}>
                                    Prix
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
                                    Capacité
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

                        <button
                            type="submit"
                            disabled={saving}
                            className="w-full bg-[#2FBF8F] hover:bg-[#27a87c] text-white py-3 rounded-xl font-semibold text-sm transition disabled:opacity-50 flex items-center justify-center gap-2"
                        >
                            {saving && (
                                <span className="w-4 h-4 border-2 border-white/40 border-t-white rounded-full animate-spin" />
                            )}
                            {saving
                                ? "Modification…"
                                : "Modifier l'événement"}
                        </button>

                    </form>

                </div>

            </div>

        </div>
    );
}

export default ModifierEvenement;
