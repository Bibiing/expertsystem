import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Dashboard from "../pages/Dashboard";
import KonsultasiForm from "../pages/Konsultasi";
import HasilKonsultasi from "../pages/HasilKonsultasi";
import Auth from "../pages/Auth";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

export default function AppRouter() {
  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={
            <div className="flex flex-col min-h-screen">
              <Navbar />
              <main className="max-w-6xl mx-auto w-full px-4">
                <Dashboard />
              </main>
              <Footer />
            </div>
          }
        />

        <Route
          path="/diagnosis"
          element={
            <div className="flex flex-col min-h-screen">
              <Navbar />
              <main className="max-w-6xl mx-auto w-full px-4">
                <KonsultasiForm />
              </main>
              <Footer />
            </div>
          }
        />

        <Route
          path="/hasil"
          element={
            <div className="flex flex-col min-h-screen">
              <Navbar />
              <main className="max-w-6xl mx-auto w-full px-4">
                <HasilKonsultasi />
              </main>
              <Footer />
            </div>
          }
        />

        <Route path="/auth" element={<Auth />} />
      </Routes>
    </Router>
  );
}
