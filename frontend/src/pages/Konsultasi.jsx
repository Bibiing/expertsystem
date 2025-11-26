import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Stethoscope, CheckCircle2, Loader2, AlertCircle, ChevronDown, ChevronUp, ArrowLeft } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import LoadingOverlay from "../components/Loading";
import { diagnosisService } from "../services/diagnosisService";

function Konsultasi() {
  const navigate = useNavigate();
  const [gejalaList, setGejalaList] = useState([]); // State untuk data dari API
  const [selectedGejala, setSelectedGejala] = useState([]);
  const [certaintyValues, setCertaintyValues] = useState({});
  const [expandedGejala, setExpandedGejala] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [isFetching, setIsFetching] = useState(true); // Loading awal fetch gejala
  const [searchTerm, setSearchTerm] = useState("");
  const [error, setError] = useState(null);

  // Fetch gejala saat komponen dimuat
  useEffect(() => {
    const fetchGejala = async () => {
      try {
        const data = await diagnosisService.getSymptoms();
        setGejalaList(data);
      } catch (err) {
        setError("Gagal memuat data gejala. Pastikan server backend berjalan.");
      } finally {
        setIsFetching(false);
      }
    };
    fetchGejala();
  }, []);

  const handleCheckboxChange = (gejalaId) => {
    const isSelected = selectedGejala.includes(gejalaId);

    if (isSelected) {
      setSelectedGejala((prev) => prev.filter((id) => id !== gejalaId));

      const newCertainty = { ...certaintyValues };
      delete newCertainty[gejalaId];
      setCertaintyValues(newCertainty);

      // Close description when unchecked
      setExpandedGejala((prev) => ({ ...prev, [gejalaId]: false }));
    } else {
      setSelectedGejala((prev) => [...prev, gejalaId]);
      setCertaintyValues({ ...certaintyValues, [gejalaId]: 1.0 });

      // Auto expand when selected
      setExpandedGejala((prev) => ({ ...prev, [gejalaId]: true }));
    }
  };

  const handleCertaintyChange = (gejalaId, value) => {
    setCertaintyValues({ ...certaintyValues, [gejalaId]: parseFloat(value) });
  };

  const toggleDescription = (e, gejalaId) => {
    e.preventDefault();
    e.stopPropagation();
    setExpandedGejala(prev => ({ ...prev, [gejalaId]: !prev[gejalaId] }));
  };

  const handleSubmit = async () => {
    if (selectedGejala.length === 0) {
      alert("Pilih minimal 1 gejala untuk memulai diagnosis!");
      return;
    }

    setIsLoading(true);
    try {
      // Kirim ke backend
      const payload = selectedGejala.map(id => ({
        symptom_id: id,
        certainty: certaintyValues[id] || 0
      }));

      const result = await diagnosisService.diagnose(payload);
      
      // Siapkan data untuk halaman hasil
      // Kita perlu mengirim juga detail gejala yang dipilih untuk ditampilkan
      const selectedGejalaDetails = gejalaList.filter(g => selectedGejala.includes(g._id));
      
      navigate("/hasil", { 
        state: { 
          diagnosisResult: result,
          selectedGejala: selectedGejalaDetails
        } 
      });
    } catch (err) {
      alert("Terjadi kesalahan saat diagnosis. Coba lagi.");
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  const filteredGejala = gejalaList.filter((item) =>
    item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    (item.description && item.description.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  const handleSelectAll = () => {
    if (selectedGejala.length === gejalaList.length) {
      setSelectedGejala([]);
      setCertaintyValues({});
    } else {
      const allIds = gejalaList.map((g) => g._id);
      setSelectedGejala(allIds);
      const newCertainty = {};
      allIds.forEach(id => newCertainty[id] = 1.0);
      setCertaintyValues(newCertainty);
    }
  };

  if (isFetching) return <div className="min-h-screen flex items-center justify-center bg-slate-50 text-emerald-800 font-medium">Memuat Data Gejala...</div>;
  if (error) return <div className="min-h-screen flex items-center justify-center bg-slate-50 text-red-600 font-medium">{error}</div>;

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen bg-slate-50 p-4 sm:p-6"
    >
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-gradient-to-br from-emerald-600 to-emerald-800 rounded-xl sm:rounded-2xl p-4 sm:p-6 md:p-8 mb-4 sm:mb-6 shadow-lg"
        >
          <div className="flex items-start sm:items-center gap-3 sm:gap-4 mb-4">
            <div className="p-2 sm:p-3 bg-white/20 backdrop-blur-sm rounded-full shrink-0">
              <Stethoscope className="w-6 h-6 sm:w-8 sm:h-8 text-white" />
            </div>
            <div className="flex-1 min-w-0">
              <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-white warp-break-word">
                Konsultasi Diagnosis
              </h1>
              <p className="text-sm sm:text-base text-emerald-50 mt-1">
                Pilih gejala yang terlihat pada tanaman cabai Anda
              </p>
            </div>
          </div>

          <div className="bg-white/10 border border-white/20 rounded-lg p-3 sm:p-4 flex items-start gap-2 sm:gap-3 backdrop-blur-sm">
            <AlertCircle className="w-4 h-4 sm:w-5 sm:h-5 text-emerald-200 shrink-0 mt-0.5" />
            <div className="flex-1 min-w-0">
              <p className="text-white text-xs sm:text-sm font-medium mb-1">
                Tips Diagnosis yang Akurat:
              </p>
              <ul className="text-emerald-50 text-xs sm:text-sm space-y-1">
                <li>• Pilih semua gejala yang Anda amati pada tanaman</li>
                <li>
                  • Tentukan tingkat keyakinan Anda (0 - 1)
                </li>
                <li className="hidden sm:list-item">
                  • Perhatikan gejala dengan teliti sebelum memilih
                </li>
              </ul>
            </div>
          </div>
          
          <button
            onClick={() => navigate("/")}
            className="flex items-center gap-2 text-emerald-100 hover:text-white transition-colors duration-300 text-sm sm:text-base mt-4"
          >
            <ArrowLeft className="w-4 h-4 sm:w-5 sm:h-5" />
            <span>Kembali ke Dashboard</span>
          </button>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="bg-white rounded-xl sm:rounded-2xl p-4 sm:p-6 shadow-sm border border-slate-200"
        >
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 mb-4 sm:mb-6">
            <div className="flex-1">
              <input
                type="text"
                placeholder="Cari gejala..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full px-3 sm:px-4 py-2.5 sm:py-3 bg-slate-50 border border-slate-200 rounded-lg text-sm sm:text-base text-slate-800 placeholder-slate-400 focus:outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 transition-all duration-300"
              />
            </div>
            <button
              onClick={handleSelectAll}
              className="px-4 sm:px-6 py-2.5 sm:py-3 bg-slate-100 hover:bg-slate-200 border border-slate-200 rounded-lg text-sm sm:text-base text-slate-700 font-medium transition-all duration-300 whitespace-nowrap"
            >
              {selectedGejala.length === gejalaList.length
                ? "Hapus Semua"
                : "Pilih Semua"}
            </button>

            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={handleSubmit}
              disabled={isLoading || selectedGejala.length === 0}
              className={`px-4 sm:px-6 py-2.5 sm:py-3 rounded-lg font-bold text-sm sm:text-base transition-all duration-300 flex items-center justify-center gap-2 whitespace-nowrap ${
                isLoading || selectedGejala.length === 0
                  ? "bg-slate-200 text-slate-400 cursor-not-allowed"
                  : "bg-emerald-600 hover:bg-emerald-700 text-white shadow-lg hover:shadow-xl"
              }`}
            >
              {isLoading ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  <span>Proses...</span>
                </>
              ) : (
                <>
                  <Stethoscope className="w-5 h-5" />
                  <span>Mulai Diagnosis</span>
                </>
              )}
            </motion.button>
          </div>

          <div className="mb-3 sm:mb-4 flex items-center justify-between">
            <p className="text-slate-500 text-xs sm:text-sm">
              Gejala dipilih:{" "}
              <span className="text-emerald-600 font-bold">
                {selectedGejala.length}
              </span>{" "}
              dari {gejalaList.length}
            </p>
          </div>

          <div className="space-y-2 mb-4 sm:mb-6 max-h-[600px] overflow-y-auto pr-1 sm:pr-2 custom-scrollbar">
            {filteredGejala.map((item) => (
              <motion.div
                layout
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                key={item._id}
                className={`rounded-lg transition-all duration-300 border ${
                  selectedGejala.includes(item._id)
                    ? "bg-emerald-50 border-emerald-500 shadow-sm"
                    : "bg-white border-slate-100 hover:bg-slate-50 hover:border-emerald-200"
                }`}
              >
                <div className="flex items-start gap-3 sm:gap-4 p-3 sm:p-4 cursor-pointer" onClick={() => handleCheckboxChange(item._id)}>
                    <div className="flex items-center h-5 sm:h-6 shrink-0">
                    <input
                        type="checkbox"
                        checked={selectedGejala.includes(item._id)}
                        onChange={() => handleCheckboxChange(item._id)}
                        className="w-4 h-4 sm:w-5 sm:h-5 rounded border-slate-300 text-emerald-600 focus:ring-emerald-500 cursor-pointer"
                        onClick={(e) => e.stopPropagation()}
                    />
                    </div>
                    <div className="flex-1 min-w-0">
                    <p className={`text-xs sm:text-sm leading-relaxed wrap-break-word ${selectedGejala.includes(item._id) ? 'text-emerald-900 font-medium' : 'text-slate-700'}`}>
                        {item.name}
                    </p>
                    </div>
                    <button onClick={(e) => toggleDescription(e, item._id)} className="text-slate-400 hover:text-emerald-600">
                        {expandedGejala[item._id] ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
                    </button>
                </div>
                
                <AnimatePresence>
                    {expandedGejala[item._id] && (
                        <motion.div 
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.3, ease: "easeInOut" }}
                            className="overflow-hidden"
                        >
                            <div className="px-4 pb-4 pl-12 space-y-3">
                                <p className="text-sm text-slate-600">
                                    {item.description || "Tidak ada deskripsi."}
                                </p>

                                {selectedGejala.includes(item._id) && (
                                    <motion.div
                                        initial={{ opacity: 0, y: -10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        className="pt-2 border-t border-slate-100"
                                    >
                                        <div className="flex items-center gap-4">
                                            <label className="text-xs font-medium text-slate-700 whitespace-nowrap">
                                                Keyakinan: {certaintyValues[item._id] || 1}
                                            </label>
                                            <input 
                                                type="range" 
                                                min="0" 
                                                max="1" 
                                                step="0.1" 
                                                value={certaintyValues[item._id] || 1} 
                                                onChange={(e) => handleCertaintyChange(item._id, e.target.value)}
                                                onClick={(e) => e.stopPropagation()}
                                                className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-emerald-600"
                                            />
                                        </div>
                                    </motion.div>
                                )}
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
              </motion.div>
            ))}

            {filteredGejala.length === 0 && (
              <div className="text-center py-8 sm:py-12">
                <p className="text-slate-400 text-sm">
                  Tidak ada gejala yang sesuai dengan pencarian
                </p>
              </div>
            )}
          </div>
        </motion.div>
      </div>

      <AnimatePresence>
        {isLoading && (
          <LoadingOverlay
            message="Sedang Memproses..."
            desc="Sistem sedang menganalisis gejala yang Anda pilih"
          />
        )}
      </AnimatePresence>
    </motion.div>
  );
}

export default Konsultasi;
