import { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import {
  ClipboardList,
  CheckCircle2,
  AlertTriangle,
  Activity,
  Bug,
  Sprout,
  ArrowLeft,
  FileText,
} from "lucide-react";

function HasilDiagnosis() {
  const navigate = useNavigate();
  // const location = useLocation();
  // const [hasilData, setHasilData] = useState(null);
  // const [isLoading, setIsLoading] = useState(true);

  // data gejala dari page konsultasi
  // const selectedGejalaIds = location.state?.selectedGejala || [];

  // useEffect(() => {
  //   // redirect ke konsultasi
  //   if (selectedGejalaIds.length === 0) {
  //     // navigate("/konsultasi");
  //     return;
  //   }

  //   // Simulasi fetch data dari backend
  //   fetchHasilDiagnosis();
  // }, []);

  // const fetchHasilDiagnosis = async () => {
  //   try {
  //     // be api
  //     setHasilData(mockData);
  //     setIsLoading(false);
  //   } catch (error) {
  //     console.error("Error fetching hasil diagnosis:", error);
  //     setIsLoading(false);
  //   }
  // };

  const handleKonsultasiUlang = () => {
    navigate("/konsultasi");
  };

  // if (isLoading) {
  //   return (
  //     <div className="min-h-screen bg-[#777c6d] flex items-center justify-center p-6">
  //       <div className="text-center">
  //         <Activity className="w-16 h-16 text-[#B7B89F] animate-pulse mx-auto mb-4" />
  //         <p className="text-[#EEEEEE] text-lg">Memuat hasil diagnosis...</p>
  //       </div>
  //     </div>
  //   );
  // }

  // if (!hasilData) {
  //   return (
  //     <div className="min-h-screen bg-[#777c6d] flex items-center justify-center p-6">
  //       <div className="text-center">
  //         <AlertTriangle className="w-16 h-16 text-yellow-400 mx-auto mb-4" />
  //         <p className="text-[#EEEEEE] text-lg mb-4">
  //           Gagal memuat hasil diagnosis
  //         </p>
  //         <button
  //           onClick={handleKonsultasiUlang}
  //           className="bg-[#B7B89F] hover:bg-[#a8a990] text-[#777c6d] px-6 py-3 rounded-lg font-semibold transition-all duration-300"
  //         >
  //           Kembali ke Konsultasi
  //         </button>
  //       </div>
  //     </div>
  //   );
  // }

  return (
    <div className="min-h-screen bg-[#777c6d] p-4 sm:p-6">
      <div className="max-w-5xl mx-auto">
        <div className="bg-linear-to-br from-[#5a5f52] to-[#777c6d] rounded-xl sm:rounded-2xl p-4 sm:p-6 md:p-8 mb-4 sm:mb-6 shadow-xl border border-[#B7B89F]/20">
          <div className="flex items-start sm:items-center gap-3 sm:gap-4 mb-4">
            <div className="p-2 sm:p-3 bg-[#B7B89F]/20 rounded-full shrink-0">
              <ClipboardList className="w-6 h-6 sm:w-8 sm:h-8 text-[#B7B89F]" />
            </div>
            <div className="flex-1 min-w-0">
              <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-[#EEEEEE] wrap-break-word">
                Hasil Diagnosis
              </h1>
              <p className="text-sm sm:text-base text-[#CBCBCB] mt-1">
                Berikut adalah hasil analisis berdasarkan gejala yang Anda pilih
              </p>
            </div>
          </div>

          <button
            onClick={handleKonsultasiUlang}
            className="flex items-center gap-2 text-[#B7B89F] hover:text-[#a8a990] transition-colors duration-300 text-sm sm:text-base"
          >
            <ArrowLeft className="w-4 h-4 sm:w-5 sm:h-5" />
            <span>Konsultasi Ulang</span>
          </button>
        </div>

        {/* Gejala Yang Dipilih */}
        <div className="bg-[#5a5f52] rounded-xl sm:rounded-2xl p-4 sm:p-6 shadow-xl border border-[#B7B89F]/10 mb-4 sm:mb-6">
          <h2 className="text-lg sm:text-xl font-bold text-[#EEEEEE] mb-4 flex items-center gap-2">
            <CheckCircle2 className="w-5 h-5 sm:w-6 sm:h-6 text-[#B7B89F]" />
            Gejala yang Dipilih ({hasilData.gejala.length})
          </h2>
          <div className="grid grid-cols-1 gap-2 sm:gap-3">
            {hasilData.gejala.map((gejala, index) => (
              <div
                key={gejala.id}
                className="flex items-start gap-3 bg-[#777c6d]/50 p-3 sm:p-4 rounded-lg"
              >
                <span className="shrink-0 w-6 h-6 sm:w-7 sm:h-7 bg-[#B7B89F] text-[#777c6d] rounded-full flex items-center justify-center font-semibold text-xs sm:text-sm">
                  {index + 1}
                </span>
                <p className="text-[#EEEEEE] text-xs sm:text-sm leading-relaxed flex-1 wrap-break-word">
                  {gejala.nama}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Kemungkinan Penyakit */}
        <div className="bg-[#5a5f52] rounded-xl sm:rounded-2xl p-4 sm:p-6 shadow-xl border border-[#B7B89F]/10 mb-4 sm:mb-6">
          <h2 className="text-lg sm:text-xl font-bold text-[#EEEEEE] mb-4 flex items-center gap-2">
            <Activity className="w-5 h-5 sm:w-6 sm:h-6 text-[#B7B89F]" />
            Kemungkinan Penyakit
          </h2>
          <div className="space-y-3 sm:space-y-4">
            {hasilData.kemungkinanPenyakit.map((penyakit, index) => (
              <div
                key={penyakit.id}
                className="bg-[#777c6d]/50 p-4 sm:p-5 rounded-lg"
              >
                <div className="flex justify-between items-start mb-3">
                  <div className="flex items-start gap-2 sm:gap-3 flex-1 min-w-0">
                    <span className="shrink-0 text-lg sm:text-xl font-bold text-[#CBCBCB]">
                      #{index + 1}
                    </span>
                    <h3 className="text-[#EEEEEE] font-semibold text-base sm:text-lg wrap-break-word">
                      {penyakit.nama}
                    </h3>
                  </div>
                  <span
                    className={"font-bold text-base sm:text-lg ml-2 shrink-0"}
                  >
                    {penyakit.persentase}%
                  </span>
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between text-xs sm:text-sm text-[#CBCBCB]">
                    <span>Certainty Factor (CF)</span>
                    <span className="font-semibold">
                      {penyakit.cf.toFixed(2)}
                    </span>
                  </div>
                  <div className="w-full bg-[#777c6d] rounded-full h-2 sm:h-3 overflow-hidden">
                    <div
                      className={
                        "h-full rounded-full transition-all duration-500"
                      }
                      style={{ width: `${penyakit.persentase}%` }}
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Diagnosis */}
        <div className="bg-linear-to-br from-[#B7B89F]/20 to-[#B7B89F]/10 rounded-xl sm:rounded-2xl p-4 sm:p-6 shadow-xl border-2 border-[#B7B89F]/40 mb-4 sm:mb-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 sm:p-3 bg-[#B7B89F]/30 rounded-full">
              <AlertTriangle className="w-6 h-6 sm:w-7 sm:h-7 text-[#B7B89F]" />
            </div>
            <h2 className="text-lg sm:text-xl font-bold text-[#EEEEEE]">
              Kesimpulan Diagnosis
            </h2>
          </div>

          <div className="bg-[#5a5f52]/50 rounded-lg p-4 sm:p-5 mb-4">
            <p className="text-[#CBCBCB] text-xs sm:text-sm mb-2">
              Terdeteksi Penyakit:
            </p>
            <h3 className="text-xl sm:text-2xl md:text-3xl font-bold text-[#EEEEEE] mb-3">
              {hasilData.kesimpulan.penyakit}
            </h3>
            <div className="flex flex-wrap gap-3 sm:gap-4">
              <div className="flex items-center gap-2">
                <span className="text-[#CBCBCB] text-xs sm:text-sm">
                  Tingkat Kepercayaan:
                </span>
                <span className="bg-[#B7B89F] text-[#777c6d] px-2 sm:px-3 py-1 rounded-full font-semibold text-xs sm:text-sm">
                  {hasilData.kesimpulan.tingkatKepercayaan}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-[#CBCBCB] text-xs sm:text-sm">CF:</span>
                <span className="text-[#B7B89F] font-bold text-base sm:text-lg">
                  {hasilData.kesimpulan.cf} ({hasilData.kesimpulan.persentase}%)
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Penyebab */}
        <div className="bg-[#5a5f52] rounded-xl sm:rounded-2xl p-4 sm:p-6 shadow-xl border border-[#B7B89F]/10 mb-4 sm:mb-6">
          <h2 className="text-lg sm:text-xl font-bold text-[#EEEEEE] mb-4 flex items-center gap-2">
            <Bug className="w-5 h-5 sm:w-6 sm:h-6 text-[#B7B89F]" />
            Penyebab
          </h2>
          <ul className="space-y-2 sm:space-y-3">
            {hasilData.kesimpulan.penyebab.map((item, index) => (
              <li
                key={index}
                className="flex items-start gap-2 sm:gap-3 text-[#EEEEEE] text-xs sm:text-sm leading-relaxed"
              >
                <span className="shrink-0 w-1.5 h-1.5 sm:w-2 sm:h-2 bg-[#B7B89F] rounded-full mt-1.5 sm:mt-2" />
                <span className="wrap-break-word">{item}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Solusi */}
        <div className="bg-[#5a5f52] rounded-xl sm:rounded-2xl p-4 sm:p-6 shadow-xl border border-[#B7B89F]/10 mb-4 sm:mb-6">
          <h2 className="text-lg sm:text-xl font-bold text-[#EEEEEE] mb-4 flex items-center gap-2">
            <Sprout className="w-5 h-5 sm:w-6 sm:h-6 text-[#B7B89F]" />
            Solusi Penanganan
          </h2>
          <div className="space-y-3 sm:space-y-4">
            {hasilData.kesimpulan.solusi.map((item, index) => (
              <div
                key={index}
                className="flex items-start gap-3 sm:gap-4 bg-[#777c6d]/50 p-3 sm:p-4 rounded-lg"
              >
                <span className="shrink-0 w-6 h-6 sm:w-7 sm:h-7 bg-[#B7B89F] text-[#777c6d] rounded-full flex items-center justify-center font-semibold text-xs sm:text-sm">
                  {index + 1}
                </span>
                <p className="text-[#EEEEEE] text-xs sm:text-sm leading-relaxed flex-1 wrap-break-word">
                  {item}
                </p>
              </div>
            ))}
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
          <button
            onClick={handleKonsultasiUlang}
            className="flex-1 flex items-center justify-center gap-2 bg-[#B7B89F] hover:bg-[#a8a990] text-[#777c6d] py-3 sm:py-4 rounded-lg font-semibold text-sm sm:text-base transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
          >
            <ArrowLeft className="w-4 h-4 sm:w-5 sm:h-5" />
            <span>Konsultasi Ulang</span>
          </button>
        </div>
      </div>
    </div>
  );
}

export default HasilDiagnosis;

const hasilData = {
  gejala: [
    { id: 1, nama: "Buah busuk berwarna kuning coklat" },
    {
      id: 2,
      nama: "Daun, ranting, dan cabang membusuk kering berwarna coklat kehitaman",
    },
    {
      id: 5,
      nama: "Daun mempunyai bercak berbentuk bulat, berwarna abu-abu dan warna coklat dipinggirannya",
    },
  ],
  kemungkinanPenyakit: [
    {
      id: 1,
      nama: "Antraknosa",
      cf: 0.85,
      persentase: 85,
    },
    {
      id: 2,
      nama: "Bercak Daun Cercospora",
      cf: 0.65,
      persentase: 65,
    },
    {
      id: 3,
      nama: "Busuk Buah",
      cf: 0.45,
      persentase: 45,
    },
  ],
  kesimpulan: {
    penyakit: "Antraknosa",
    cf: 0.85,
    persentase: 85,
    tingkatKepercayaan: "Tinggi",
    penyebab: [
      "Jamur Colletotrichum capsici yang menyerang tanaman cabai",
      "Kelembaban tinggi (>80%) menjadi kondisi ideal untuk perkembangan jamur",
      "Suhu optimal 25-30°C mendukung perkembangan penyakit",
      "Sanitasi lahan yang kurang baik",
    ],
    solusi: [
      "Aplikasi fungisida berbahan aktif mankozeb atau tembaga dengan dosis sesuai anjuran",
      "Pangkas dan buang bagian tanaman yang terinfeksi, lalu bakar atau kubur",
      "Lakukan sanitasi lahan dengan membersihkan gulma dan sisa tanaman",
      "Atur jarak tanam minimal 50-60 cm untuk sirkulasi udara yang baik",
      "Hindari penyiraman dari atas (overhead) yang dapat menyebarkan spora",
      "Rotasi tanaman dengan jenis non-solanaceae untuk memutus siklus penyakit",
    ],
  },
};
