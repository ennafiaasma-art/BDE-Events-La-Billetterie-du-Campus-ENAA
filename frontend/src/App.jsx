import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import Events from "./pages/Events";
import StudentDashboard from "./pages/StudentDashboard";
import MyReservations from "./pages/MyReservations";
import MyTickets from "./pages/MyTicket";
// Admin
import AdminDashboard from "./pages/admin/AdminDashboard";
import CreerEvenement from "./pages/admin/CreerEvenement";
import ModifierEvenement from "./pages/admin/ModifierEvenement";
import SupprimerEvenement from "./pages/admin/SupprimerEvenement";


function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Navigate to="/login" />} />
                <Route path="/login" element={<Login />} />
                <Route path="/dashboard" element={<StudentDashboard />} />
                 <Route path="/reservations" element={<MyReservations />} />
                <Route path="/evenements" element={<Events />} />
                  <Route path="/tickets" element={<MyTickets />}/>

            {  /*admin*/ }
            <Route path="/admin/dashboard"element={<AdminDashboard/>}  />

                <Route
                    path="/admin/evenements/create"
                    element={<CreerEvenement />}
                />
                <Route
                    path="/admin/evenements/modifier/:id"
                    element={<ModifierEvenement />}
                />
                <Route
                    path="/admin/evenements/supprimer/:id"
                    element={<SupprimerEvenement />}
                />



            </Routes>
        </BrowserRouter>
    );
}

export default App;
