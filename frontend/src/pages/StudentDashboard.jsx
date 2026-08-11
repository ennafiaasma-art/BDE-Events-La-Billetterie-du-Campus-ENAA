import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";

function StudentDashboard() {
    const navigate = useNavigate();

    const user = JSON.parse(localStorage.getItem("user"));

    const [evenements, setEvenements] = useState([]);
    const [reservations, setReservations] = useState([]);
    const [loading, setLoading] = useState(true);
    const [message, setMessage] = useState("");

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

    return (
        <div className="flex min-h-screen bg-slate-100">

            {/* SIDEBAR */}
            <aside className="hidden md:block w-64 bg-blue-700 text-white shadow-lg">

                <div className="p-6 text-center border-b border-blue-600">
                    <h1 className="text-2xl font-bold">
                        BDE
                    </h1>

                    <p className="text-sm text-blue-200">
                        Dashboard Étudiant
                    </p>
                </div>

                <nav className="mt-6">

                    <button
                        onClick={() => navigate("/dashboard")}
                        className="w-full flex items-center px-6 py-3 hover:bg-blue-600 transition">
                            <span className="ml-3">
                            Dashboard
                        </span>
                    </button>


                         <button
                        onClick={() =>navigate("/evenements")}
                        className="w-full flex items-center px-6 py-3 hover:bg-blue-600 transition">


                        <span className="ml-3">
                            Mes Evenements
                        </span>
                    </button>

                    <button
                        onClick={() => navigate("/reservations")}
                        className="w-full flex items-center px-6 py-3 hover:bg-blue-600 transition"
                    >

                        <span className="ml-3">
                            Mes Réservations
                        </span>
                    </button>

                    <button
                        onClick={() => navigate("/tickets")}
                        className="w-full flex items-center px-6 py-3 hover:bg-blue-600 transition"
                    >

                        <span className="ml-3">
                            Mes Tickets
                        </span>
                    </button>

                </nav>

            </aside>


            {/* CONTENT */}
            <main className="flex-1">

                {/* NAVBAR */}
                <header className="bg-white shadow flex justify-between items-center px-8 py-4">

                    <div>
                        <h2 className="text-xl font-bold text-slate-800">
                            Bonjour {user?.name} 👋
                        </h2>

                        <p className="text-gray-500">
                            {user?.email}
                        </p>
                    </div>

                    <button
                        onClick={logout}
                        className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg"
                    >
                        Déconnexion
                    </button>

                </header>


                {/* MAIN */}
                <div className="p-8">

                    <h1 className="text-3xl font-bold text-slate-800">
                        Bienvenue, {user?.name} 👋
                    </h1>

                    <p className="mt-2 text-slate-500">
                        Retrouvez tous les événements du campus.
                    </p>


                    {/* MESSAGE */}
                    {message && (
                        <div className="mt-6 p-4 rounded-xl bg-blue-50 text-blue-700">
                            {message}
                        </div>
                    )}


                    {/* CARDS */}
                    <div className="grid md:grid-cols-3 gap-6 mt-8">

                        {/* ÉVÉNEMENTS */}
                        <div className="bg-white rounded-xl shadow p-6">

                            <h3 className="text-gray-500">
                                Événements disponibles
                            </h3>

                            <p className="text-4xl font-bold text-blue-600 mt-3">
                                {evenements.length}
                            </p>

                            <button
                                onClick={() => navigate("/evenements")}
                                className="mt-5 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg"
                            >
                                Voir les événements
                            </button>

                        </div>


                        {/* RESERVATIONS */}
                        <div className="bg-white rounded-xl shadow p-6">

                            <h3 className="text-gray-500">
                                Mes réservations
                            </h3>

                            <p className="text-4xl font-bold text-blue-600 mt-3">
                                {reservations.length}
                            </p>

                            <button
                                onClick={() => navigate("/reservations")}
                                className="mt-5 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg"
                            >
                                Mes réservations
                            </button>

                        </div>


                        {/* TICKETS */}
                        <div className="bg-white rounded-xl shadow p-6">

                            <h3 className="text-gray-500">
                                Mes tickets
                            </h3>

                            <p className="text-4xl font-bold text-blue-600 mt-3">
                                -
                            </p>

                            <button
                                onClick={() => navigate("/tickets")}
                                className="mt-5 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg"
                            >
                                Mes tickets
                            </button>

                        </div>

                    </div>


                    {/* TABLEAU */}
                    <div className="bg-white rounded-xl shadow mt-10 overflow-hidden">

                        <div className="p-6 border-b">
                            <h2 className="text-xl font-bold">
                                Prochains événements
                            </h2>
                        </div>


                        {loading ? (

                            <div className="p-8 text-center text-gray-500">
                                Chargement des événements...
                            </div>

                        ) : evenements.length === 0 ? (

                            <div className="p-8 text-center text-gray-500">
                                Aucun événement disponible.
                            </div>

                        ) : (

                            <div className="overflow-x-auto">

                                <table className="w-full">

                                    <thead className="bg-gray-50">

                                        <tr>

                                            <th className="text-left p-4">
                                                Titre
                                            </th>

                                            <th className="text-left p-4">
                                                Date
                                            </th>

                                            <th className="text-left p-4">
                                                Lieu
                                            </th>

                                            <th className="text-left p-4">
                                                Places
                                            </th>

                                            <th className="text-left p-4">
                                                Description
                                            </th>

                                            <th className="text-center p-4">
                                                Action
                                            </th>

                                        </tr>

                                    </thead>


                                    <tbody>

                                        {evenements.map((evenement) => {

                                            const reserve = dejaReserve(
                                                evenement.id
                                            );

                                            return (

                                                <tr
                                                    key={evenement.id}
                                                    className="border-t hover:bg-gray-50"
                                                >

                                                    <td className="p-4 font-semibold">
                                                        {evenement.titre}
                                                    </td>

                                                    <td className="p-4">
                                                        {evenement.date}
                                                    </td>

                                                    <td className="p-4">
                                                        {evenement.lieu}
                                                    </td>

                                                    <td className="p-4">
                                                        {evenement.capaciteMax}
                                                    </td>

                                                    <td className="p-4 max-w-xs">
                                                        {evenement.description}
                                                    </td>

                                                    <td className="p-4 text-center">

                                                        {reserve ? (

                                                            <button
                                                                disabled
                                                                className="bg-gray-500 text-white px-4 py-2 rounded cursor-not-allowed"
                                                            >
                                                                Déjà réservé
                                                            </button>

                                                        ) : (

                                                            <button
                                                                onClick={() =>
                                                                    reserver(
                                                                        evenement.id
                                                                    )
                                                                }
                                                                className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded"
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
