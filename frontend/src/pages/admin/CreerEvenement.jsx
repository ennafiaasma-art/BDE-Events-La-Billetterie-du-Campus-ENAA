import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../services/api";

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

    return (
        <div className="min-h-screen bg-slate-100 p-8">

            <div className="max-w-3xl mx-auto">

                <button
                    onClick={() =>
                        navigate("/admin/dashboard")
                    }
                    className="mb-6 text-blue-600 hover:underline"
                >
                    ← Retour au dashboard
                </button>

                <div className="bg-white rounded-2xl shadow p-8">

                    <h1 className="text-3xl font-bold text-slate-800">
                        Créer un événement
                    </h1>

                    <p className="text-slate-500 mt-2">
                        Ajouter un nouvel événement au campus.
                    </p>

                    {message && (
                        <div className="mt-6 p-4 rounded-xl bg-blue-50 text-blue-700">
                            {message}
                        </div>
                    )}

                    <form
                        onSubmit={handleSubmit}
                        className="mt-8 space-y-5"
                    >

                        {/* TITRE */}

                        <div>

                            <label className="block mb-2 font-semibold">
                                Titre
                            </label>

                            <input
                                type="text"
                                name="titre"
                                value={form.titre}
                                onChange={handleChange}
                                required
                                placeholder="Ex : Journée sportive"
                                className="w-full border border-slate-200 rounded-xl p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />

                        </div>

                        {/* DESCRIPTION */}

                        <div>

                            <label className="block mb-2 font-semibold">
                                Description
                            </label>

                            <textarea
                                name="description"
                                value={form.description}
                                onChange={handleChange}
                                required
                                rows="4"
                                placeholder="Description de l'événement"
                                className="w-full border border-slate-200 rounded-xl p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />

                        </div>

                        {/* DATE */}

                        <div>

                            <label className="block mb-2 font-semibold">
                                Date
                            </label>

                            <input
                                type="date"
                                name="date"
                                value={form.date}
                                onChange={handleChange}
                                required
                                className="w-full border border-slate-200 rounded-xl p-3"
                            />

                        </div>

                        {/* LIEU */}

                        <div>

                            <label className="block mb-2 font-semibold">
                                Lieu
                            </label>

                            <input
                                type="text"
                                name="lieu"
                                value={form.lieu}
                                onChange={handleChange}
                                required
                                placeholder="Ex : Salle A"
                                className="w-full border border-slate-200 rounded-xl p-3"
                            />

                        </div>

                        {/* PRIX + CAPACITE */}

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">

                            <div>

                                <label className="block mb-2 font-semibold">
                                    Prix (DH)
                                </label>

                                <input
                                    type="number"
                                    name="prix"
                                    value={form.prix}
                                    onChange={handleChange}
                                    min="0"
                                    required
                                    className="w-full border border-slate-200 rounded-xl p-3"
                                />

                            </div>

                            <div>

                                <label className="block mb-2 font-semibold">
                                    Capacité maximale
                                </label>

                                <input
                                    type="number"
                                    name="capaciteMax"
                                    value={form.capaciteMax}
                                    onChange={handleChange}
                                    min="1"
                                    required
                                    className="w-full border border-slate-200 rounded-xl p-3"
                                />

                            </div>

                        </div>

                        {/* BUTTON */}

                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-xl font-semibold disabled:opacity-50"
                        >
                            {loading
                                ? "Création..."
                                : "Créer l'événement"}
                        </button>

                    </form>

                </div>

            </div>

        </div>
    );
}

export default CreerEvenement;
