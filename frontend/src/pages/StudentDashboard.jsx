import { useNavigate } from "react-router-dom";


function StudentDashboard() {
    const navigate = useNavigate();
    return (
        <div className="min-h-screen bg-slate-100">

            {/* Navbar */}
            <nav className="bg-white border-b border-slate-200">
                <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">

                    <h1 className="text-2xl font-bold text-blue-600">
                        🎟️ BDE Events
                    </h1>

                    <div className="flex items-center gap-4">
                        <span className="text-slate-600">
                            Étudiant
                        </span>

                        <button className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600">
                            Déconnexion
                        </button>
                    </div>

                </div>
            </nav>

            {/* Contenu */}
            <main className="max-w-7xl mx-auto px-6 py-10">

                <h2 className="text-3xl font-bold text-slate-800">
                    Bienvenue 👋
                </h2>

                <p className="mt-2 text-slate-500">
                    Retrouvez tous les événements du campus.
                </p>

                {/* Cards */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">

                    <div className="bg-white p-6 rounded-2xl shadow-sm">
                        <div className="text-3xl mb-4">
                            🎉
                        </div>

                        <h3 className="text-xl font-bold text-slate-800">
                            Événements
                        </h3>

                        <p className="text-slate-500 mt-2">
                            Découvrez les prochains événements
                            du campus.
                        </p>

                        <button className="mt-5 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
                            Voir les événements
                        </button>
                    </div>

                    <div className="bg-white p-6 rounded-2xl shadow-sm">
                        <div className="text-3xl mb-4">
                            🎟️
                        </div>

               
                        <p className="text-slate-500 mt-2">
                            Consultez vos réservations.
                        </p>

                               <button
    onClick={() => navigate("/reservations")}
    className="mt-5 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
>
    Mes réservations
</button>
                    </div>

                    <div className="bg-white p-6 rounded-2xl shadow-sm">
                        <div className="text-3xl mb-4">
                            🎫
                        </div>

                        <h3 className="text-xl font-bold text-slate-800">
                            Mes tickets
                        </h3>

                        <p className="text-slate-500 mt-2">
                            Retrouvez vos tickets numériques.
                        </p>

                        <button className="mt-5 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
                            Mes tickets
                        </button>
                    </div>

                </div>

            </main>

        </div>
    );
}

export default StudentDashboard;
