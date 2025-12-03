import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Leaf, Menu, X, Home, Stethoscope, MessageSquare, BarChart2, BookOpen, Activity } from "lucide-react";

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();
  const activeLink = location.pathname;

  const navLinks = [
    { path: "/konsultasi", label: "Diagnosa", icon: Stethoscope },
    { path: "/statistik", label: "Statistik", icon: BarChart2 },
    { path: "/aturan", label: "Aturan", icon: BookOpen },
    { path: "/penyakit", label: "Penyakit", icon: Activity },
    { path: "/feedback", label: "Feedback", icon: MessageSquare },
    // {path: "/hasil", label: "Hasil Diagnosa", icon: ClipboardList },
    // { path: "/", label: "Beranda", icon: Home },
  ];

  return (
    <nav className="bg-white sticky top-0 z-50 shadow-sm border-b border-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link to="/" className="flex items-center space-x-3 group">
            <div className="bg-emerald-100 p-2 rounded-lg group-hover:scale-110 transition-transform duration-300">
              <Leaf className="w-6 h-6 text-emerald-600" />
            </div>
            <div>
              <h1 className="font-bold text-xl text-slate-800 group-hover:text-emerald-600 transition-colors duration-300">
                Diagnosis Cabai
              </h1>
              <p className="text-slate-500 text-xs hidden sm:block">
                Sistem Pakar
              </p>
            </div>
          </Link>

          <div className="hidden md:flex items-center space-x-2">
            {navLinks.map((link) => {
              const Icon = link.icon;
              const isActive = activeLink === link.path;
              return (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-all duration-300 ${
                    isActive
                      ? 'bg-emerald-50 text-emerald-700'
                      : 'text-slate-600 hover:bg-slate-50 hover:text-emerald-600'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span className="font-medium">{link.label}</span>
                </Link>
              );
            })}
          </div>

          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden p-2 rounded-lg text-slate-600 hover:bg-slate-100 transition-colors duration-300"
          >
            {isMenuOpen ? (
              <X className="w-6 h-6" />
            ) : (
              <Menu className="w-6 h-6" />
            )}
          </button>
        </div>

        <div
          className={`md:hidden overflow-hidden transition-all duration-300 ease-in-out ${
            isMenuOpen ? 'max-h-96 opacity-100 pb-4' : 'max-h-0 opacity-0'
          }`}
        >
          <div className="space-y-2 pt-2">
            {navLinks.map((link) => {
              const Icon = link.icon;
              const isActive = activeLink === link.path;
              return (
                <Link
                  key={link.path}
                  to={link.path}
                  onClick={() => {
                    setIsMenuOpen(false);
                  }}
                  className={`flex items-center space-x-3 px-4 py-3 rounded-lg transition-all duration-300 ${
                    isActive
                      ? 'bg-emerald-50 text-emerald-700'
                      : 'text-slate-600 hover:bg-slate-50 hover:text-emerald-600'
                  }`}
                >
                  <Icon className="w-5 h-5" />
                  <span className="font-medium">{link.label}</span>
                </Link>
              );
            })}
          </div>
        </div>
      </div>
    </nav>
  );
}
