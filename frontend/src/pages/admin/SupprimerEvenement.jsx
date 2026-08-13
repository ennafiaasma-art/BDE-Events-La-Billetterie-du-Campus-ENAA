import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import api from "../../services/api";

function SupprimerEvenement() {

    const { id } = useParams();
    const navigate = useNavigate();

    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState("");

    const supprimer = async () => {

        try {

            setLoading(true);
            setMessage("");

            await api.delete(`/evenements/${id}`);

            setMessage(
                "Événement supprimé avec succès !"
            );

            setTimeout(() => {
                navigate("/admin/dashboard");
            }, 1000);

        } catch (error) {

            console.error(error);

            setMessage(
                error.response?.data?.message ||
                "Erreur lors de la suppression."
            );

        } finally {

            setLoading(false);

        }
    };

    return (
        <div className="min-h-screen bg-slate-100 flex items-center justify-center p-6">

            <div className="bg-white rounded-2xl shadow p-8 max-w-md w-full text-center">

                <div className="text-5xl mb-5">
                    ⚠️
                </div>

                <h1 className="text-2xl font-bold text-slate-800">
                    Supprimer l'événement ?
                </h1>

                <p className="text-slate-500 mt-3">
                    Êtes-vous sûr de vouloir supprimer cet événement ?
                </p>

                <p className="text-red-500 text-sm mt-2">
                    Cette action est irréversible.
                </p>

                {message && (
                    <div className="mt-5 p-4 bg-blue-50 text-blue-700 rounded-xl">
                        {message}
                    </div>
                )}

                <div className="flex gap-4 mt-7">

                    <button
                        onClick={() =>
                            navigate("/admin/dashboard")
                        }
                        disabled={loading}
                        className="flex-1 bg-slate-200 hover:bg-slate-300 text-slate-800 py-3 rounded-xl"
                    >
                        Annuler
                    </button>

                    <button
                        onClick={supprimer}
                        disabled={loading}
                        className="flex-1 bg-red-600 hover:bg-red-700 text-white py-3 rounded-xl font-semibold disabled:opacity-50"
                    >
                        {loading
                            ? "Suppression..."
                            : "Supprimer"}
                    </button>

                </div>

            </div>

        </div>
    );
}

export default SupprimerEvenement;
