import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import Events from "./pages/Events";
import StudentDashboard from "./pages/StudentDashboard";
import MyReservations from "./pages/MyReservations";

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Navigate to="/login" />} />
                <Route path="/login" element={<Login />} />
                <Route path="/dashboard" element={<StudentDashboard />} />
                 <Route path="/reservations" element={<MyReservations />} />
                <Route path="/evenements" element={<Events />} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;
