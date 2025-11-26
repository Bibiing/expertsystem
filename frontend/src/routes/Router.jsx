import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Dashboard from "../pages/Dashboard";
import KonsultasiForm from "../pages/Konsultasi";
import HasilKonsultasi from "../pages/HasilKonsultasi";
import FeedbackForm from "../pages/FeedbackForm";
import Statistik from "../pages/Statistik";
import Aturan from "../pages/Aturan";
import Penyakit from "../pages/Penyakit";
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
          path="/konsultasi"
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

        <Route
          path="/feedback"
          element={
            <div className="flex flex-col min-h-screen">
              <Navbar />
              <main className="max-w-6xl mx-auto w-full px-4">
                <FeedbackForm />
              </main>
              <Footer />
            </div>
          }
        />

        <Route
          path="/statistik"
          element={
            <div className="flex flex-col min-h-screen">
              <Navbar />
              <main className="max-w-6xl mx-auto w-full px-4">
                <Statistik />
              </main>
              <Footer />
            </div>
          }
        />

        <Route
          path="/aturan"
          element={
            <div className="flex flex-col min-h-screen">
              <Navbar />
              <main className="max-w-6xl mx-auto w-full px-4">
                <Aturan />
              </main>
              <Footer />
            </div>
          }
        />

        <Route
          path="/penyakit"
          element={
            <div className="flex flex-col min-h-screen">
              <Navbar />
              <main className="max-w-6xl mx-auto w-full px-4">
                <Penyakit />
              </main>
              <Footer />
            </div>
          }
        />
      </Routes>
    </Router>
  );
}
