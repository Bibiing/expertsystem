import { Leaf } from "lucide-react";

export default function BrandSection() {
  return (
    <div className="hidden lg:flex lg:w-1/2 bg-linear-to-br from-[#4a4e45] to-[#5a5f52] p-12 flex-col justify-center items-center text-center relative overflow-hidden">
      <div className="absolute top-10 right-10 w-32 h-32 bg-[#B7B89F]/10 rounded-full blur-3xl"></div>
      <div className="absolute bottom-10 left-10 w-40 h-40 bg-[#B7B89F]/10 rounded-full blur-3xl"></div>

      <div className="relative z-10">
        <div className="inline-block p-6 bg-[#B7B89F]/20 rounded-3xl mb-6 backdrop-blur-sm border border-[#B7B89F]/30">
          <Leaf className="w-20 h-20 text-[#B7B89F]" />
        </div>

        <h1 className="text-4xl font-bold text-[#EEEEEE] mb-4">
          Diagnosis Cabai
        </h1>
        <p className="text-[#B7B89F] text-xl font-semibold mb-6">
          Sistem Pakar Penyakit Tanaman
        </p>

        <p className="text-[#CBCBCB] text-base leading-relaxed max-w-lg mb-8">
          Platform diagnosis cerdas untuk mengidentifikasi dan mengatasi
          penyakit pada tanaman cabai Anda dengan akurat dan efisien
        </p>
      </div>
    </div>
  );
}
