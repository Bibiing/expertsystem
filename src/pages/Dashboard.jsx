import { Leaf, Droplets, Sun, Sprout, Shield, Clover } from "lucide-react";

function Dashboard() {
  return (
    <div className="min-h-screen bg-[#777c6d] p-6">
      <section className="bg-linear-to-br from-[#5a5f52] to-[#777c6d] rounded-2xl p-8 md:p-12 mb-8 shadow-xl border border-[#B7B89F]/20">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-block p-3 bg-[#B7B89F]/20 rounded-full mb-4">
            <Leaf className="w-12 h-12 text-[#B7B89F]" />
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-[#EEEEEE] mb-4">
            Sistem Pakar Diagnosis Penyakit Tanaman Cabai
          </h1>
          <p className="text-[#CBCBCB] text-lg mb-6 max-w-2xl mx-auto">
            Identifikasi penyakit pada tanaman cabai Anda dengan cepat dan
            akurat menggunakan teknologi sistem pakar berbasis kecerdasan buatan
          </p>
          <button className="bg-[#B7B89F] hover:bg-[#a8a990] text-[#777c6d] font-semibold px-8 py-3 rounded-lg transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1">
            Mulai Diagnosis
          </button>
        </div>
      </section>

      <div className="mb-8">
        <div className="flex items-center gap-3 mb-6">
          <Clover className="w-6 h-6 text-[#B7B89F]" />
          <h2 className="text-2xl font-bold text-[#EEEEEE]">
            Fase Pertumbuhan Tanaman Cabai
          </h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {growthPhases.map((phase, index) => (
            <div
              key={index}
              className="bg-[#5a5f52] rounded-xl p-6 shadow-lg border border-[#B7B89F]/10 hover:border-[#B7B89F]/30 transition-all duration-300 group"
            >
              <div
                className={`w-12 h-12 ${phase.color} rounded-full flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}
              >
                <phase.icon className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-[#EEEEEE] font-bold text-lg mb-2">
                {phase.phase}
              </h3>
              <p className="text-[#B7B89F] font-semibold">{phase.duration}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        <div className="lg:col-span-2 bg-[#5a5f52] rounded-xl p-6 shadow-lg border border-[#B7B89F]/10">
          <h3 className="text-xl font-bold text-[#EEEEEE] mb-6 flex items-center">
            <Shield className="w-6 h-6 mr-2 text-[#B7B89F]" />
            Tips Perawatan Tanaman Cabai
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {careTips.map((tip, index) => (
              <div
                key={index}
                className="bg-[#777c6d]/50 rounded-lg p-5 hover:bg-[#777c6d]/70 transition-all duration-200 group"
              >
                <div className="flex items-start gap-4">
                  <div className="shrink-0 p-2 bg-[#B7B89F]/20 rounded-lg group-hover:bg-[#B7B89F]/30 transition-colors duration-200">
                    <tip.icon className="w-5 h-5 text-[#B7B89F]" />
                  </div>
                  <div>
                    <h4 className="text-[#EEEEEE] font-semibold mb-2">
                      {tip.title}
                    </h4>
                    <p className="text-[#CBCBCB] text-sm leading-relaxed">
                      {tip.desc}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-[#5a5f52] rounded-xl p-6 shadow-lg border border-[#B7B89F]/10">
          <h3 className="text-xl font-bold text-[#EEEEEE] mb-4">
            Cara Penggunaan Sistem
          </h3>
          <div className="space-y-4">
            <div className="flex gap-3">
              <div className="shrink-0 w-8 h-8 bg-[#B7B89F] rounded-full flex items-center justify-center text-[#777c6d] font-bold">
                1
              </div>
              <div>
                <p className="text-[#EEEEEE] font-medium mb-1">Pilih Gejala</p>
                <p className="text-[#CBCBCB] text-sm">
                  Pilih gejala yang terlihat pada tanaman cabai Anda
                </p>
              </div>
            </div>
            <div className="flex gap-3">
              <div className="shrink-0 w-8 h-8 bg-[#B7B89F] rounded-full flex items-center justify-center text-[#777c6d] font-bold">
                2
              </div>
              <div>
                <p className="text-[#EEEEEE] font-medium mb-1">
                  Analisis Sistem
                </p>
                <p className="text-[#CBCBCB] text-sm">
                  Sistem akan menganalisis gejala yang Anda pilih
                </p>
              </div>
            </div>
            <div className="flex gap-3">
              <div className="shrink-0 w-8 h-8 bg-[#B7B89F] rounded-full flex items-center justify-center text-[#777c6d] font-bold">
                3
              </div>
              <div>
                <p className="text-[#EEEEEE] font-medium mb-1">
                  Hasil & Solusi
                </p>
                <p className="text-[#CBCBCB] text-sm">
                  Dapatkan diagnosis dan rekomendasi penanganan
                </p>
              </div>
            </div>
          </div>
          <button className="w-full mt-6 bg-[#B7B89F] hover:bg-[#a8a990] text-[#777c6d] font-semibold py-2 rounded-lg transition-colors duration-200">
            Pelajari Lebih Lanjut
          </button>
        </div>
      </div>

      <div className="bg-linear-to-r from-[#B7B89F]/20 to-[#B7B89F]/10 rounded-xl p-6 border border-[#B7B89F]/30">
        <div className="flex items-start gap-4">
          <div className="shrink-0 p-2 bg-[#B7B89F]/30 rounded-lg">
            <Leaf className="w-6 h-6 text-[#EEEEEE]" />
          </div>
          <div>
            <h4 className="text-[#EEEEEE] font-semibold mb-2">
              Pencegahan Lebih Baik dari Pengobatan
            </h4>
            <p className="text-[#CBCBCB] text-sm">
              Lakukan pemeriksaan rutin setiap minggu untuk deteksi dini
              penyakit. Tanaman yang sehat dan terawat dengan baik memiliki
              ketahanan lebih tinggi terhadap serangan hama dan penyakit.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;

const growthPhases = [
  {
    phase: "Perkecambahan",
    duration: "7-14 hari",
    icon: Sprout,
    color: "bg-green-500",
  },
  {
    phase: "Vegetatif",
    duration: "30-45 hari",
    icon: Leaf,
    color: "bg-emerald-500",
  },
  {
    phase: "Berbunga",
    duration: "60-75 hari",
    icon: Sun,
    color: "bg-yellow-500",
  },
  {
    phase: "Berbuah",
    duration: "90-120 hari",
    icon: Leaf,
    color: "bg-red-500",
  },
];

const careTips = [
  {
    title: "Penyiraman Teratur",
    desc: "Siram tanaman setiap pagi atau sore, hindari genangan air yang dapat menyebabkan busuk akar",
    icon: Droplets,
  },
  {
    title: "Pemupukan Berkala",
    desc: "Berikan pupuk organik setiap 2 minggu sekali untuk nutrisi optimal",
    icon: Sprout,
  },
  {
    title: "Pemangkasan Rutin",
    desc: "Buang daun tua dan cabang yang tidak produktif untuk sirkulasi udara lebih baik",
    icon: Leaf,
  },
  {
    title: "Monitoring Hama",
    desc: "Periksa tanaman secara rutin untuk deteksi dini hama dan penyakit",
    icon: Shield,
  },
];
