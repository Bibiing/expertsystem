import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Stethoscope, CheckCircle2, Loader2, AlertCircle } from "lucide-react";
import LoadingOverlay from "../components/Loading";
import gejala from "../data/gejala";

function Konsultasi() {
  const navigate = useNavigate();
  const [selectedGejala, setSelectedGejala] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  const handleCheckboxChange = (gejalaId) => {
    setSelectedGejala((prev) => {
      if (prev.includes(gejalaId)) {
        return prev.filter((id) => id !== gejalaId);
      } else {
        return [...prev, gejalaId];
      }
    });
  };

  const handleSubmit = async () => {
    if (selectedGejala.length === 0) {
      alert("Pilih minimal 1 gejala untuk memulai diagnosis!");
      return;
    }

    setIsLoading(true);
    // backedn
    setTimeout(() => {
      setIsLoading(false);
      navigate("/hasil", { state: { gejala: selectedGejala } });
    }, 2000);
  };

  const filteredGejala = gejala.filter((item) =>
    item.nama.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleSelectAll = () => {
    if (selectedGejala.length === gejala.length) {
      setSelectedGejala([]);
    } else {
      setSelectedGejala(gejala.map((g) => g.id));
    }
  };

  return (
    <div className="min-h-screen bg-[#777c6d] p-4 sm:p-6">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="bg-linear-to-br from-[#5a5f52] to-[#777c6d] rounded-xl sm:rounded-2xl p-4 sm:p-6 md:p-8 mb-4 sm:mb-6 shadow-xl border border-[#B7B89F]/20">
          <div className="flex items-start sm:items-center gap-3 sm:gap-4 mb-4">
            <div className="p-2 sm:p-3 bg-[#B7B89F]/20 rounded-full shrink-0">
              <Stethoscope className="w-6 h-6 sm:w-8 sm:h-8 text-[#B7B89F]" />
            </div>
            <div className="flex-1 min-w-0">
              <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-[#EEEEEE] warp-break-word">
                Konsultasi Diagnosis
              </h1>
              <p className="text-sm sm:text-base text-[#CBCBCB] mt-1">
                Pilih gejala yang terlihat pada tanaman cabai Anda
              </p>
            </div>
          </div>

          <div className="bg-[#B7B89F]/10 border border-[#B7B89F]/30 rounded-lg p-3 sm:p-4 flex items-start gap-2 sm:gap-3">
            <AlertCircle className="w-4 h-4 sm:w-5 sm:h-5 text-[#B7B89F] shrink-0 mt-0.5" />
            <div className="flex-1 min-w-0">
              <p className="text-[#EEEEEE] text-xs sm:text-sm font-medium mb-1">
                Tips Diagnosis yang Akurat:
              </p>
              <ul className="text-[#CBCBCB] text-xs sm:text-sm space-y-1">
                <li>• Pilih semua gejala yang Anda amati pada tanaman</li>
                <li>
                  • Semakin banyak gejala yang dipilih, diagnosis akan lebih
                  akurat
                </li>
                <li className="hidden sm:list-item">
                  • Perhatikan gejala dengan teliti sebelum memilih
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div className="bg-[#5a5f52] rounded-xl sm:rounded-2xl p-4 sm:p-6 shadow-xl border border-[#B7B89F]/10">
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 mb-4 sm:mb-6">
            <div className="flex-1">
              <input
                type="text"
                placeholder="Cari gejala..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full px-3 sm:px-4 py-2.5 sm:py-3 bg-[#777c6d] border border-[#B7B89F]/30 rounded-lg text-sm sm:text-base text-[#EEEEEE] placeholder-[#CBCBCB] focus:outline-none focus:border-[#B7B89F] focus:ring-2 focus:ring-[#B7B89F]/20 transition-all duration-300"
              />
            </div>
            <button
              onClick={handleSelectAll}
              className="px-4 sm:px-6 py-2.5 sm:py-3 bg-[#777c6d] hover:bg-[#6b7060] border border-[#B7B89F]/30 rounded-lg text-sm sm:text-base text-[#EEEEEE] font-medium transition-all duration-300 whitespace-nowrap"
            >
              {selectedGejala.length === gejala.length
                ? "Hapus Semua"
                : "Pilih Semua"}
            </button>
          </div>

          <div className="mb-3 sm:mb-4 flex items-center justify-between">
            <p className="text-[#CBCBCB] text-xs sm:text-sm">
              Gejala dipilih:{" "}
              <span className="text-[#B7B89F] font-semibold">
                {selectedGejala.length}
              </span>{" "}
              dari {gejala.length}
            </p>
          </div>

          <div className="space-y-2 mb-4 sm:mb-6 max-h-[400px] sm:max-h-[500px] overflow-y-auto pr-1 sm:pr-2 custom-scrollbar">
            {filteredGejala.map((item) => (
              <label
                key={item.id}
                className={`flex items-start gap-3 sm:gap-4 p-3 sm:p-4 rounded-lg cursor-pointer transition-all duration-300 ${
                  selectedGejala.includes(item.id)
                    ? "bg-[#B7B89F]/20 border-2 border-[#B7B89F]"
                    : "bg-[#777c6d]/50 border-2 border-transparent hover:bg-[#777c6d]/70 hover:border-[#B7B89F]/30"
                }`}
              >
                <div className="flex items-center h-5 sm:h-6 shrink-0">
                  <input
                    type="checkbox"
                    checked={selectedGejala.includes(item.id)}
                    onChange={() => handleCheckboxChange(item.id)}
                    className="w-4 h-4 sm:w-5 sm:h-5 rounded border-[#B7B89F]/50 text-[#B7B89F] accent-[#B7B89F] focus:ring-[#B7B89F] focus:ring-offset-0 bg-[#777c6d] cursor-pointer"
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-[#EEEEEE] text-xs sm:text-sm leading-relaxed wrap-break-word">
                    {item.nama}
                  </p>
                </div>
                {selectedGejala.includes(item.id) && (
                  <CheckCircle2 className="w-4 h-4 sm:w-5 sm:h-5 text-[#B7B89F] shrink-0" />
                )}
              </label>
            ))}

            {filteredGejala.length === 0 && (
              <div className="text-center py-8 sm:py-12">
                <p className="text-[#CBCBCB] text-sm">
                  Tidak ada gejala yang sesuai dengan pencarian
                </p>
              </div>
            )}
          </div>

          <button
            onClick={handleSubmit}
            disabled={isLoading || selectedGejala.length === 0}
            className={`w-full py-3 sm:py-4 rounded-lg font-semibold text-base sm:text-lg transition-all duration-300 flex items-center justify-center gap-2 sm:gap-3 ${
              isLoading || selectedGejala.length === 0
                ? "bg-[#B7B89F]/50 text-[#777c6d]/50 cursor-not-allowed"
                : "bg-[#B7B89F] hover:bg-[#a8a990] text-[#777c6d] shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
            }`}
          >
            {isLoading ? (
              <>
                <Loader2 className="w-5 h-5 sm:w-6 sm:h-6 animate-spin" />
                <span className="text-sm sm:text-lg">
                  Memproses Diagnosis...
                </span>
              </>
            ) : (
              <>
                <Stethoscope className="w-5 h-5 sm:w-6 sm:h-6" />
                <span className="text-sm sm:text-lg">Mulai Diagnosis</span>
              </>
            )}
          </button>
        </div>
      </div>

      {isLoading && (
        <LoadingOverlay
          message="Sedang Memproses..."
          desc="Sistem sedang menganalisis gejala yang Anda pilih"
        />
      )}
    </div>
  );
}

export default Konsultasi;
