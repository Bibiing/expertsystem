import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Dashboard from "../pages/Dashboard";
import KonsultasiForm from "../pages/Konsultasi";
import HasilKonsultasi from "../pages/HasilKonsultasi";
import Auth from "../pages/Auth";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

function AppRouter() {
  return (
    <Router>
      <div className="flex flex-col min-h-screen">
        <Navbar />
        <main className="max-w-6xl mx-auto">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/konsultasi" element={<KonsultasiForm />} />
            <Route path="/hasil" element={<HasilKonsultasi />} />
            <Route path="/auth" element={<Auth />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default AppRouter;
