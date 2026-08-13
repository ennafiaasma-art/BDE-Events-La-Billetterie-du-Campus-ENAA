import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import api from "../../services/api";

/*
  DESIGN NOTE
  -----------
  Same visual identity as the rest of the app: ink-violet / paper / coral / mint,
  Space Grotesk for display. This is a destructive-confirmation screen, so the
  warning tone is pushed a bit further (soft red halo behind the icon, red id
  chip) while staying inside the established palette instead of default Tailwind reds.

  Fonts (add once, e.g. in index.html <head>):
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@500;600;700&family=IBM+Plex+Mono:wght@500&family=Inter:wght@400;500;600&display=swap" rel="stylesheet">

  LOGIC NOTE
  ----------
  No functional changes. Same state (loading, message), same supprimer()
  (api.delete + 1s setTimeout redirect to "/admin/dashboard"), same "Annuler"
  button navigating back to "/admin/dashboard", both buttons still disabled
  while loading.
*/

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
        <div
            className="min-h-screen bg-[#F6F4FB] flex items-center justify-center p-6"
            style={{ fontFamily: "'Inter', system-ui, sans-serif" }}
        >
            <style>{`
                .font-display { font-family: 'Space Grotesk', 'Inter', system-ui, sans-serif; }
                .font-mono-tix { font-family: 'IBM Plex Mono', ui-monospace, monospace; }
            `}</style>

            <div className="bg-white rounded-2xl shadow-sm border border-[#E7E4F2] p-8 max-w-md w-full text-center">

                <div className="mx-auto w-16 h-16 rounded-full bg-[#E4574F]/10 flex items-center justify-center">
                    <span className="text-3xl">⚠️</span>
                </div>

                <h1 className="mt-5 font-display text-2xl font-semibold text-[#14132B]">
                    Supprimer l'événement ?
                </h1>

                <p className="inline-block mt-3 font-mono-tix text-xs text-[#8B87A6] bg-[#F6F4FB] rounded-full px-3 py-1">
                    Événement #{id}
                </p>

                <p className="text-[#8B87A6] mt-4 text-sm">
                    Êtes-vous sûr de vouloir supprimer cet événement ?
                </p>

                <p className="text-[#C43F38] text-sm mt-1.5 font-medium">
                    Cette action est irréversible.
                </p>

                {message && (
                    <div className="mt-5 p-4 bg-[#5B4FE8]/10 text-[#5B4FE8] border border-[#5B4FE8]/20 rounded-xl text-sm font-medium">
                        {message}
                    </div>
                )}

                <div className="flex gap-3 mt-7">

                    <button
                        onClick={() =>
                            navigate("/admin/dashboard")
                        }
                        disabled={loading}
                        className="flex-1 border border-[#E7E4F2] hover:bg-[#F6F4FB] text-[#14132B] py-3 rounded-xl text-sm font-semibold transition disabled:opacity-50"
                    >
                        Annuler
                    </button>

                    <button
                        onClick={supprimer}
                        disabled={loading}
                        className="flex-1 bg-[#E4574F] hover:bg-[#cf483f] text-white py-3 rounded-xl font-semibold text-sm transition disabled:opacity-50 flex items-center justify-center gap-2"
                    >
                        {loading && (
                            <span className="w-4 h-4 border-2 border-white/40 border-t-white rounded-full animate-spin" />
                        )}
                        {loading
                            ? "Suppression…"
                            : "Supprimer"}
                    </button>

                </div>

            </div>

        </div>
    );
}

export default SupprimerEvenement;
