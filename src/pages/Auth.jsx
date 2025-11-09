import { useState } from "react";
import BrandSection from "../components/Brand";
import Login from "../components/Login";
import Register from "../components/Register";
import { Leaf } from "lucide-react";

export default function Auth() {
  const [isLogin, setIsLogin] = useState(true);

  return (
    <div className="min-h-screen bg-[#777c6d] flex">
      <BrandSection />
      <div className="w-full lg:w-1/2 flex items-center justify-center p-6 lg:p-12">
        <div className="w-full max-w-md">
          <div className="lg:hidden text-center mb-8">
            <div className="inline-block p-3 bg-[#B7B89F]/20 rounded-full mb-4">
              <Leaf className="w-10 h-10 text-[#B7B89F]" />
            </div>
            <h2 className="text-2xl font-bold text-[#EEEEEE]">
              Diagnosis Cabai
            </h2>
            <p className="text-[#CBCBCB] text-sm">Sistem Pakar</p>
          </div>

          <div className="bg-[#5a5f52] rounded-2xl shadow-2xl p-8 border border-[#B7B89F]/20">
            <div className="mb-6">
              <h1 className="text-2xl font-bold text-[#EEEEEE] mb-2">
                {isLogin ? "Selamat Datang Kembali" : "Buat Akun Baru"}
              </h1>
              <p className="text-[#CBCBCB] text-sm">
                {isLogin
                  ? "Masuk untuk melanjutkan diagnosis tanaman cabai"
                  : "Daftar untuk menggunakan sistem diagnosis"}
              </p>
            </div>

            {isLogin ? <Login /> : <Register />}

            <div className="mt-6 text-center">
              <p className="text-[#CBCBCB] text-sm">
                {isLogin ? "Belum punya akun?" : "Sudah punya akun?"}{" "}
                <button
                  type="button"
                  onClick={() => setIsLogin(!isLogin)}
                  className="text-[#B7B89F] font-semibold hover:text-[#a8a990] transition-colors duration-200"
                >
                  {isLogin ? "Daftar Sekarang" : "Masuk"}
                </button>
              </p>
            </div>
          </div>

          <p className="text-center text-[#CBCBCB] text-xs mt-6">
            Dengan {isLogin ? "masuk" : "mendaftar"}, Anda menyetujui syarat dan
            ketentuan kami
          </p>
        </div>
      </div>
    </div>
  );
}
