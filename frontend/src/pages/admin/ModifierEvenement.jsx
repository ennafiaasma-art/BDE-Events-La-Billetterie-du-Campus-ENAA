import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import api from "../../services/api";

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

    if (loading) {

        return (
            <div className="min-h-screen flex items-center justify-center bg-slate-100">

                <p className="text-slate-500">
                    Chargement de l'événement...
                </p>

            </div>
        );
    }

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
                        Modifier l'événement
                    </h1>

                    {message && (
                        <div className="mt-6 p-4 bg-blue-50 text-blue-700 rounded-xl">
                            {message}
                        </div>
                    )}

                    <form
                        onSubmit={handleSubmit}
                        className="mt-8 space-y-5"
                    >

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
                                className="w-full border rounded-xl p-3"
                            />

                        </div>

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
                                className="w-full border rounded-xl p-3"
                            />

                        </div>

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
                                className="w-full border rounded-xl p-3"
                            />

                        </div>

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
                                className="w-full border rounded-xl p-3"
                            />

                        </div>

                        <div className="grid grid-cols-2 gap-5">

                            <div>

                                <label className="block mb-2 font-semibold">
                                    Prix
                                </label>

                                <input
                                    type="number"
                                    name="prix"
                                    value={form.prix}
                                    onChange={handleChange}
                                    min="0"
                                    required
                                    className="w-full border rounded-xl p-3"
                                />

                            </div>

                            <div>

                                <label className="block mb-2 font-semibold">
                                    Capacité
                                </label>

                                <input
                                    type="number"
                                    name="capaciteMax"
                                    value={form.capaciteMax}
                                    onChange={handleChange}
                                    min="1"
                                    required
                                    className="w-full border rounded-xl p-3"
                                />

                            </div>

                        </div>

                        <button
                            type="submit"
                            disabled={saving}
                            className="w-full bg-green-600 hover:bg-green-700 text-white py-3 rounded-xl font-semibold disabled:opacity-50"
                        >
                            {saving
                                ? "Modification..."
                                : "Modifier l'événement"}
                        </button>

                    </form>

                </div>

            </div>

        </div>
    );
}

export default ModifierEvenement;
