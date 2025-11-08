import { useState } from "react";
import { Link } from "react-router-dom";
import {
  Leaf,
  Menu,
  X,
  Home,
  Stethoscope,
  ClipboardList,
  LogIn,
} from "lucide-react";

function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeLink, setActiveLink] = useState("/");

  const navLinks = [
    { path: "/", label: "Dashboard", icon: Home },
    { path: "/konsultasi", label: "Konsultasi", icon: Stethoscope },
    { path: "/hasil", label: "Hasil Diagnosis", icon: ClipboardList },
  ];

  return (
    <nav className="bg-linear-to-r from-[#5a5f52] to-[#6b7060] sticky top-0 z-50 shadow-lg rounded-b-lg ">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link
            to="/"
            className="flex items-center space-x-3 group"
            onClick={() => setActiveLink("/")}
          >
            <div className="bg-[#B7B89F] p-2 rounded-lg group-hover:scale-110 transition-transform duration-300 shadow-md">
              <Leaf className="w-6 h-6 text-[#777c6d]" />
            </div>
            <div>
              <h1 className="font-bold text-xl text-[#EEEEEE] group-hover:text-[#B7B89F] transition-colors duration-300">
                Diagnosis Cabai
              </h1>
              <p className="text-[#CBCBCB] text-xs hidden sm:block">
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
                  onClick={() => setActiveLink(link.path)}
                  className={`flex items-center space-x-2 px-4 py-2 transition-all duration-300 ${
                    isActive ? "text-[#cfd0b5]" : "text-[#EEEEEE]"
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span className="font-medium">{link.label}</span>
                </Link>
              );
            })}

            <Link
              to="/auth"
              className="flex items-center space-x-2 bg-[#B7B89F] text-[#777c6d] px-5 py-2 rounded-lg hover:bg-[#a8a990] transition-all duration-300 shadow-md hover:shadow-xl transform hover:-translate-y-0.5 font-semibold ml-4"
            >
              <LogIn className="w-4 h-4" />
              <span>Login</span>
            </Link>
          </div>

          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden p-2 rounded-lg text-[#EEEEEE] hover:bg-[#777c6d]/50 transition-colors duration-300"
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
            isMenuOpen ? "max-h-96 opacity-100 pb-4" : "max-h-0 opacity-0"
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
                    setActiveLink(link.path);
                    setIsMenuOpen(false);
                  }}
                  className={`flex items-center space-x-3 px-4 py-3 rounded-lg transition-all duration-300 ${
                    isActive ? "text-[#cfd0b5]" : "text-[#EEEEEE]"
                  }`}
                >
                  <Icon className="w-5 h-5" />
                  <span className="font-medium">{link.label}</span>
                </Link>
              );
            })}

            <Link
              to="/auth"
              onClick={() => setIsMenuOpen(false)}
              className="flex items-center space-x-3 bg-[#B7B89F] text-[#777c6d] px-4 py-3 rounded-lg hover:bg-[#a8a990] transition-all duration-300 shadow-md font-semibold"
            >
              <LogIn className="w-5 h-5" />
              <span>Login</span>
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
