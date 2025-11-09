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
    <div className="min-h-screen bg-[#777c6d] p-6">
      <div className="max-w-5xl mx-auto">
        <div className="bg-linear-to-br from-[#5a5f52] to-[#777c6d] rounded-2xl p-8 mb-6 shadow-xl border border-[#B7B89F]/20">
          <div className="flex items-center gap-4 mb-4">
            <div className="p-3 bg-[#B7B89F]/20 rounded-full">
              <Stethoscope className="w-8 h-8 text-[#B7B89F]" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-[#EEEEEE]">
                Konsultasi Diagnosis
              </h1>
              <p className="text-[#CBCBCB] mt-1">
                Pilih gejala yang terlihat pada tanaman cabai Anda
              </p>
            </div>
          </div>

          <div className="bg-[#B7B89F]/10 border border-[#B7B89F]/30 rounded-lg p-4 flex items-start gap-3">
            <AlertCircle className="w-5 h-5 text-[#B7B89F] shrink-0 mt-0.5" />
            <div>
              <p className="text-[#EEEEEE] text-sm font-medium mb-1">
                Tips Diagnosis yang Akurat:
              </p>
              <ul className="text-[#CBCBCB] text-sm space-y-1">
                <li>• Pilih semua gejala yang Anda amati pada tanaman</li>
                <li>
                  • Semakin banyak gejala yang dipilih, diagnosis akan lebih
                  akurat
                </li>
                <li>• Perhatikan gejala dengan teliti sebelum memilih</li>
              </ul>
            </div>
          </div>
        </div>

        <div className="bg-[#5a5f52] rounded-2xl p-6 shadow-xl border border-[#B7B89F]/10">
          <div className="flex flex-col md:flex-row gap-4 mb-6">
            <div className="flex-1">
              <input
                type="text"
                placeholder="Cari gejala..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full px-4 py-3 bg-[#777c6d] border border-[#B7B89F]/30 rounded-lg text-[#EEEEEE] placeholder-[#CBCBCB] focus:outline-none focus:border-[#B7B89F] focus:ring-[#B7B89F]/20 transition-all duration-300"
              />
            </div>
            <button
              onClick={handleSelectAll}
              className="px-6 py-3 bg-[#777c6d] hover:bg-[#6b7060] border border-[#B7B89F]/30 rounded-lg text-[#EEEEEE] font-medium transition-all duration-300"
            >
              {selectedGejala.length === gejala.length
                ? "Hapus Semua"
                : "Pilih Semua"}
            </button>
          </div>

          <div className="mb-4 flex items-center justify-between">
            <p className="text-[#CBCBCB] text-sm">
              Gejala dipilih:{" "}
              <span className="text-[#B7B89F] font-semibold">
                {selectedGejala.length}
              </span>{" "}
              dari {gejala.length}
            </p>
          </div>

          <div className="space-y-2 mb-6 max-h-[500px] overflow-y-auto pr-2 custom-scrollbar">
            {filteredGejala.map((item) => (
              <label
                key={item.id}
                className={`flex items-start gap-4 p-4 rounded-lg cursor-pointer transition-all duration-300 ${
                  selectedGejala.includes(item.id)
                    ? "bg-[#B7B89F]/20 border-2 border-[#B7B89F]"
                    : "bg-[#777c6d]/50 border-2 border-transparent hover:bg-[#777c6d]/70 hover:border-[#B7B89F]/30"
                }`}
              >
                <div className="flex items-center h-6">
                  <input
                    type="checkbox"
                    checked={selectedGejala.includes(item.id)}
                    onChange={() => handleCheckboxChange(item.id)}
                    className="w-5 h-5 rounded border-[#B7B89F]/50 accent-[#B7B89F] text-[#B7B89F] bg-[#777c6d] cursor-pointer"
                  />
                </div>
                <div className="flex-1">
                  <p className="text-[#EEEEEE] text-sm leading-relaxed">
                    {item.nama}
                  </p>
                </div>
                {selectedGejala.includes(item.id) && (
                  <CheckCircle2 className="w-5 h-5 text-[#B7B89F] shrink-0" />
                )}
              </label>
            ))}

            {filteredGejala.length === 0 && (
              <div className="text-center py-12">
                <p className="text-[#CBCBCB]">
                  Tidak ada gejala yang sesuai dengan pencarian
                </p>
              </div>
            )}
          </div>

          <button
            onClick={handleSubmit}
            disabled={isLoading || selectedGejala.length === 0}
            className={`w-full py-4 rounded-lg font-semibold text-lg transition-all duration-300 flex items-center justify-center gap-3 ${
              isLoading || selectedGejala.length === 0
                ? "bg-[#B7B89F]/50 text-[#777c6d]/50 cursor-not-allowed"
                : "bg-[#B7B89F] hover:bg-[#a8a990] text-[#777c6d] shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
            }`}
          >
            {isLoading ? (
              <>
                <Loader2 className="w-6 h-6 animate-spin" />
                Memproses Diagnosis...
              </>
            ) : (
              <>
                <Stethoscope className="w-6 h-6" />
                Mulai Diagnosis
              </>
            )}
          </button>
        </div>
      </div>

      {/* loading overlay */}
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
