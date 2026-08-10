import { useState } from "react";
import api from "../services/api";

function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [message, setMessage] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState(false);

    const handleLogin = async (e) => {
        e.preventDefault();

        setMessage("");
        setLoading(true);

        try {
            const response = await api.post("/login", {
                email,
                password,
            });

            console.log(response.data);

            setMessage("Connexion réussie !");
        } catch (error) {
            console.error(error);

            setMessage("Email ou mot de passe incorrect.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex bg-slate-50">

            {/* LEFT */}
            <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-blue-600 via-blue-700 to-blue-950 text-white p-12 flex-col">

                {/* Logo */}
                <div className="flex items-center gap-3">
                    <div className="w-11 h-11 rounded-xl bg-white/15 flex items-center justify-center text-2xl">
                        🎟️
                    </div>

                    <span className="text-2xl font-bold">
                        BDE Events
                    </span>
                </div>

                {/* Text */}
                <div className="flex-1 flex flex-col justify-center max-w-xl">

                    <h1 className="text-5xl xl:text-6xl font-extrabold leading-tight">
                        Vivez vos événements
                        <span className="text-blue-200">
                            {" "}autrement.
                        </span>
                    </h1>

                    <p className="mt-6 text-lg text-blue-100 leading-relaxed">
                        Réservez vos places facilement et retrouvez
                        tous les événements du campus au même endroit.
                    </p>

                    {/* Ticket */}
                    <div className="mt-10 w-80 p-6 rounded-2xl bg-white/10 border border-white/20 backdrop-blur">
                        <span className="text-xs tracking-[4px] text-blue-200">
                            EVENT
                        </span>

                        <h3 className="text-2xl font-bold mt-3">
                            Campus Event
                        </h3>

                        <p className="mt-3 text-blue-100">
                            Votre prochaine expérience commence ici.
                        </p>
                    </div>

                </div>
            </div>

            {/* RIGHT */}
            <div className="w-full lg:w-1/2 flex items-center justify-center p-6 sm:p-10">

                <div className="w-full max-w-md bg-white rounded-3xl shadow-xl p-8 sm:p-10">

                    {/* Header */}
                    <div className="mb-8">

                        <h2 className="text-3xl font-bold text-slate-900">
                            Bienvenue
                        </h2>

                        <p className="mt-2 text-slate-500">
                            Connectez-vous à votre espace
                        </p>

                    </div>

                    <form onSubmit={handleLogin}>

                        {/* EMAIL */}
                        <div className="mb-5">

                            <label
                                htmlFor="email"
                                className="block mb-2 text-sm font-semibold text-slate-700"
                            >
                                Adresse email
                            </label>

                            <div className="relative">

                                <span className="absolute left-4 top-1/2 -translate-y-1/2">
                                    ✉️
                                </span>

                                <input
                                    id="email"
                                    type="email"
                                    value={email}
                                    onChange={(e) =>
                                        setEmail(e.target.value)
                                    }
                                    placeholder="exemple@email.com"
                                    autoComplete="email"
                                    required
                                    className="w-full h-13 pl-12 pr-4 rounded-xl border border-slate-200 bg-slate-50 outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-100 transition"
                                />

                            </div>
                        </div>

                        {/* PASSWORD */}
                        <div className="mb-5">

                            <div className="flex justify-between mb-2">

                                <label
                                    htmlFor="password"
                                    className="text-sm font-semibold text-slate-700"
                                >
                                    Mot de passe
                                </label>

                                <a
                                    href="#"
                                    className="text-sm text-blue-600 hover:text-blue-700"
                                >
                                    Mot de passe oublié ?
                                </a>

                            </div>

                            <div className="relative">

                                <span className="absolute left-4 top-1/2 -translate-y-1/2">
                                    🔒
                                </span>

                                <input
                                    id="password"
                                    type={
                                        showPassword
                                            ? "text"
                                            : "password"
                                    }
                                    value={password}
                                    onChange={(e) =>
                                        setPassword(e.target.value)
                                    }
                                    placeholder="Votre mot de passe"
                                    autoComplete="current-password"
                                    required
                                    className="w-full h-13 pl-12 pr-12 rounded-xl border border-slate-200 bg-slate-50 outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-100 transition"
                                />

                                <button
                                    type="button"
                                    onClick={() =>
                                        setShowPassword(!showPassword)
                                    }
                                    className="absolute right-4 top-1/2 -translate-y-1/2"
                                >
                                    {showPassword ? "" : "👁️"}
                                </button>

                            </div>
                        </div>

                        {/* MESSAGE */}
                        {message && (
                            <div
                                className={`mb-5 p-3 rounded-xl text-sm ${
                                    message.includes("réussie")
                                        ? "bg-green-50 text-green-700"
                                        : "bg-red-50 text-red-700"
                                }`}
                            >
                                {message}
                            </div>
                        )}

                        {/* BUTTON */}
                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full h-13 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold transition disabled:opacity-60 disabled:cursor-not-allowed"
                        >
                            {loading
                                ? "Connexion..."
                                : "Se connecter"}
                        </button>

                    </form>

                    {/* REGISTER */}
                    <div className="mt-7 text-center text-sm text-slate-500">

                        Vous n'avez pas encore de compte ?

                        <a
                            href="#"
                            className="ml-1 text-blue-600 font-semibold hover:underline"
                        >
                            Créer un compte
                        </a>

                    </div>

                </div>

            </div>
        </div>
    );
}

export default Login;
