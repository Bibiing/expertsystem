import { useState } from "react";
import { Mail, Lock, Eye, EyeOff } from "lucide-react";

export default function Login() {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Login:", {
      email: formData.email,
      password: formData.password,
    });
    // kirim ke backend
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
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

      <div className="text-right">
        <button
          type="button"
          className="text-[#B7B89F] text-sm hover:text-[#a8a990] transition-colors duration-200"
        >
          Lupa Password?
        </button>
      </div>

      <button
        type="submit"
        className="w-full bg-[#B7B89F] hover:bg-[#a8a990] text-[#777c6d] font-semibold py-3 rounded-lg transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
      >
        Masuk
      </button>
    </form>
  );
}
