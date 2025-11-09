import { useState } from "react";
import { Mail, Lock, Eye, EyeOff, User } from "lucide-react";

export default function Register() {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      alert("Password dan Konfirmasi Password tidak cocok!");
      return;
    }
    // console.log("Register Data:", formData);
    // kirim data ke backend
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div>
        <label className="block text-[#EEEEEE] text-sm font-medium mb-2 text-left">
          Nama Lengkap
        </label>
        <div className="relative">
          <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-[#CBCBCB]" />
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="John Doe"
            required
            className="w-full pl-11 pr-4 py-3 bg-[#777c6d] border border-[#B7B89F]/30 rounded-lg text-[#EEEEEE] placeholder-[#CBCBCB] focus:outline-none focus:border-[#B7B89F] focus:ring-2 focus:ring-[#B7B89F]/20 transition-all duration-300"
          />
        </div>
      </div>

      <div>
        <label className="block text-[#EEEEEE] text-sm font-medium mb-2 text-left">
          Email
        </label>
        <div className="relative">
          <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-[#CBCBCB]" />
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="nama@email.com"
            required
            className="w-full pl-11 pr-4 py-3 bg-[#777c6d] border border-[#B7B89F]/30 rounded-lg text-[#EEEEEE] placeholder-[#CBCBCB] focus:outline-none focus:border-[#B7B89F] focus:ring-2 focus:ring-[#B7B89F]/20 transition-all duration-300"
          />
        </div>
      </div>

      <div>
        <label className="block text-[#EEEEEE] text-sm font-medium mb-2 text-left">
          Password
        </label>
        <div className="relative">
          <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-[#CBCBCB]" />
          <input
            type={showPassword ? "text" : "password"}
            name="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="••••••••"
            required
            className="w-full pl-11 pr-12 py-3 bg-[#777c6d] border border-[#B7B89F]/30 rounded-lg text-[#EEEEEE] placeholder-[#CBCBCB] focus:outline-none focus:border-[#B7B89F] focus:ring-2 focus:ring-[#B7B89F]/20 transition-all duration-300"
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-[#CBCBCB] hover:text-[#B7B89F] transition-colors duration-200"
          >
            {showPassword ? (
              <EyeOff className="w-5 h-5" />
            ) : (
              <Eye className="w-5 h-5" />
            )}
          </button>
        </div>
      </div>

      <div>
        <label className="block text-[#EEEEEE] text-sm font-medium mb-2 text-left">
          Konfirmasi Password
        </label>
        <div className="relative">
          <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-[#CBCBCB]" />
          <input
            type={showPassword ? "text" : "password"}
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleChange}
            placeholder="••••••••"
            required
            className="w-full pl-11 pr-4 py-3 bg-[#777c6d] border border-[#B7B89F]/30 rounded-lg text-[#EEEEEE] placeholder-[#CBCBCB] focus:outline-none focus:border-[#B7B89F] focus:ring-2 focus:ring-[#B7B89F]/20 transition-all duration-300"
          />
        </div>
      </div>

      <button
        type="submit"
        className="w-full bg-[#B7B89F] hover:bg-[#a8a990] text-[#777c6d] font-semibold py-3 rounded-lg transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
      >
        Daftar
      </button>
    </form>
  );
}
