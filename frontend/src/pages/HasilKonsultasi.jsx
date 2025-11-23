import { useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import {
  ClipboardList,
  CheckCircle2,
  AlertTriangle,
  Activity,
  Bug,
  Sprout,
  ArrowLeft,
} from "lucide-react";
import { motion } from "framer-motion";

function HasilDiagnosis() {
  const navigate = useNavigate();
  const location = useLocation();

  // Ambil data dari state navigasi
  const { diagnosisResult, selectedGejala } = location.state || {};

  useEffect(() => {
    // Jika tidak ada data (akses langsung via URL), kembalikan ke konsultasi
    if (!diagnosisResult || !selectedGejala) {
      navigate("/konsultasi");
    }
  }, [diagnosisResult, selectedGejala, navigate]);

  if (!diagnosisResult || !selectedGejala) return null;

  // Ambil penyakit dengan CF tertinggi sebagai kesimpulan utama
  const diseases = Array.isArray(diagnosisResult)
    ? diagnosisResult
    : diagnosisResult?.data || diagnosisResult?.diagnosis || [];

  const topDisease = diseases.length > 0 ? diseases[0] : null;

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
      },
    },
  };

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={containerVariants}
      className="min-h-screen bg-slate-50 p-4 sm:p-6"
    >
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <motion.div
          variants={itemVariants}
          className="bg-gradient-to-br from-emerald-600 to-emerald-800 rounded-xl sm:rounded-2xl p-4 sm:p-6 md:p-8 mb-4 sm:mb-6 shadow-lg"
        >
          <div className="flex items-start sm:items-center gap-3 sm:gap-4 mb-4">
            <div className="p-2 sm:p-3 bg-white/20 backdrop-blur-sm rounded-full shrink-0">
              <ClipboardList className="w-6 h-6 sm:w-8 sm:h-8 text-white" />
            </div>
            <div className="flex-1 min-w-0">
              <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-white wrap-break-word">
                Hasil Diagnosis
              </h1>
              <p className="text-sm sm:text-base text-emerald-50 mt-1">
                Berikut adalah hasil analisis berdasarkan gejala yang Anda pilih
              </p>
            </div>
          </div>
          <button
            onClick={() => navigate("/konsultasi")}
            className="flex items-center gap-2 text-emerald-100 hover:text-white transition-colors duration-300 text-sm sm:text-base"
          >
            <ArrowLeft className="w-4 h-4 sm:w-5 sm:h-5" />
            <span>Konsultasi Ulang</span>
          </button>
        </motion.div>

        {/* Gejala Yang Dipilih */}
        <motion.div
          variants={itemVariants}
          className="bg-white rounded-xl sm:rounded-2xl p-4 sm:p-6 shadow-sm border border-slate-200 mb-4 sm:mb-6"
        >
          <h2 className="text-lg sm:text-xl font-bold text-slate-800 mb-4 flex items-center gap-2">
            <CheckCircle2 className="w-5 h-5 sm:w-6 sm:h-6 text-emerald-600" />
            Gejala yang Dipilih ({selectedGejala.length})
          </h2>
          <div className="grid grid-cols-1 gap-2 sm:gap-3">
            {selectedGejala.map((gejala, index) => (
              <div
                key={gejala._id}
                className="flex items-start gap-3 bg-slate-50 p-3 sm:p-4 rounded-lg border border-slate-100"
              >
                <span className="shrink-0 w-6 h-6 sm:w-7 sm:h-7 bg-emerald-100 text-emerald-700 rounded-full flex items-center justify-center font-semibold text-xs sm:text-sm">
                  {index + 1}
                </span>
                <p className="text-slate-700 text-xs sm:text-sm leading-relaxed flex-1 break-words">
                  {gejala.name}
                </p>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Hasil Diagnosis Utama */}
        {topDisease ? (
          <>
            <motion.div
              variants={itemVariants}
              className="bg-gradient-to-br from-emerald-50 to-teal-50 rounded-xl sm:rounded-2xl p-4 sm:p-6 shadow-sm border border-emerald-100 mb-4 sm:mb-6"
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2 sm:p-3 bg-white rounded-full shadow-sm">
                  <AlertTriangle className="w-6 h-6 sm:w-7 sm:h-7 text-emerald-600" />
                </div>
                <h2 className="text-lg sm:text-xl font-bold text-emerald-900">
                  Kesimpulan Diagnosis
                </h2>
              </div>

              <div className="bg-white rounded-lg p-4 sm:p-5 mb-4 border border-emerald-100 shadow-sm">
                <p className="text-slate-500 text-xs sm:text-sm mb-2">
                  Terdeteksi Penyakit:
                </p>
                <h3 className="text-xl sm:text-2xl md:text-3xl font-bold text-emerald-800 mb-3">
                  {topDisease.name}
                </h3>
                <div className="flex flex-wrap gap-3 sm:gap-4">
                  <div className="flex items-center gap-2">
                    <span className="text-slate-500 text-xs sm:text-sm">
                      Nilai CF:
                    </span>
                    <span className="bg-emerald-100 text-emerald-700 px-2 sm:px-3 py-1 rounded-full font-semibold text-xs sm:text-sm">
                      {topDisease.cf}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-slate-500 text-xs sm:text-sm">
                      Persentase:
                    </span>
                    <span className="text-emerald-600 font-bold text-base sm:text-lg">
                      {(topDisease.cf * 100).toFixed(1)}%
                    </span>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Deskripsi / Penyebab */}
            <motion.div
              variants={itemVariants}
              className="bg-white rounded-xl sm:rounded-2xl p-4 sm:p-6 shadow-sm border border-slate-200 mb-4 sm:mb-6"
            >
              <h2 className="text-lg sm:text-xl font-bold text-slate-800 mb-4 flex items-center gap-2">
                <Bug className="w-5 h-5 sm:w-6 sm:h-6 text-emerald-600" />
                Deskripsi & Penyebab
              </h2>
              <p className="text-slate-600 text-sm leading-relaxed whitespace-pre-line">
                {topDisease.description}
              </p>
            </motion.div>

            {/* Solusi */}
            <motion.div
              variants={itemVariants}
              className="bg-white rounded-xl sm:rounded-2xl p-4 sm:p-6 shadow-sm border border-slate-200 mb-4 sm:mb-6"
            >
              <h2 className="text-lg sm:text-xl font-bold text-slate-800 mb-4 flex items-center gap-2">
                <Sprout className="w-5 h-5 sm:w-6 sm:h-6 text-emerald-600" />
                Solusi Penanganan
              </h2>
              <p className="text-slate-600 text-sm leading-relaxed whitespace-pre-line">
                {topDisease.treatment}
              </p>
            </motion.div>
          </>
        ) : (
          <motion.div
            variants={itemVariants}
            className="bg-white p-6 rounded-xl text-center text-slate-600 border border-slate-200 shadow-sm"
          >
            <p>
              Penyakit tidak dapat diidentifikasi berdasarkan gejala yang
              dipilih.
            </p>
          </motion.div>
        )}

        {/* Kemungkinan Lain */}
        {diseases.length > 1 && (
          <motion.div
            variants={itemVariants}
            className="bg-white rounded-xl sm:rounded-2xl p-4 sm:p-6 shadow-sm border border-slate-200 mb-4 sm:mb-6"
          >
            <h2 className="text-lg sm:text-xl font-bold text-slate-800 mb-4 flex items-center gap-2">
              <Activity className="w-5 h-5 sm:w-6 sm:h-6 text-emerald-600" />
              Kemungkinan Penyakit Lain
            </h2>
            <div className="space-y-3 sm:space-y-4">
              {diseases.slice(1).map((penyakit, index) => (
                <motion.div
                  key={penyakit.id}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ delay: index * 0.1, duration: 0.5 }}
                  className="bg-slate-50 p-4 sm:p-5 rounded-lg border border-slate-100"
                >
                  <div className="flex justify-between items-start mb-3">
                    <div className="flex items-start gap-2 sm:gap-3 flex-1 min-w-0">
                      <span className="shrink-0 text-lg sm:text-xl font-bold text-slate-400">
                        #{index + 2}
                      </span>
                      <h3 className="text-slate-800 font-semibold text-base sm:text-lg break-words">
                        {penyakit.name}
                      </h3>
                    </div>
                    <span className="font-bold text-base sm:text-lg ml-2 shrink-0 text-emerald-600">
                      {(penyakit.cf * 100).toFixed(1)}%
                    </span>
                  </div>
                  <div className="w-full bg-slate-200 rounded-full h-2 sm:h-3 overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      whileInView={{ width: `${penyakit.cf * 100}%` }}
                      viewport={{ once: true }}
                      transition={{
                        duration: 1.5,
                        ease: "easeOut",
                        delay: 0.2,
                      }}
                      className="h-full bg-emerald-500 rounded-full"
                    />
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}
        {/* link to feedback */}
        <motion.div variants={itemVariants} className="text-center mt-6">
          <button
            onClick={() => navigate("/feedback", { state: { from: "hasil" } })}
            className="inline-flex items-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold px-5 py-3 rounded-lg shadow-md transition-colors duration-300"
          >
            Berikan Feedback
          </button>
        </motion.div>
      </div>
    </motion.div>
  );
}

export default HasilDiagnosis;
