import { Leaf, Droplets, Sun, Sprout, Shield, Clover } from "lucide-react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

export default function Dashboard() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5
      }
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 py-8 sm:py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.section 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={containerVariants}
          className="relative rounded-2xl p-8 md:p-12 mb-12 shadow-xl overflow-hidden group"
        >
          {/* Background Image & Overlay */}
          <div className="absolute inset-0 z-0">
            <img 
              src="/images/background.jpg" 
              alt="Chili Background" 
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-br from-emerald-900/60 to-emerald-800/80 backdrop-blur-[1px]" />
          </div>

          <div className="absolute top-0 right-0 -mt-10 -mr-10 w-64 h-64 bg-white/10 rounded-full blur-3xl z-0"></div>
          <div className="absolute bottom-0 left-0 -mb-10 -ml-10 w-64 h-64 bg-emerald-400/20 rounded-full blur-3xl z-0"></div>
          
          <div className="relative z-10 max-w-4xl mx-auto text-center">
            <motion.div 
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", stiffness: 260, damping: 20 }}
              className="inline-block p-3 bg-white/20 backdrop-blur-sm rounded-full mb-6"
            >
              <Leaf className="w-12 h-12 text-white" />
            </motion.div>
            <h1 className="text-3xl md:text-5xl font-bold text-white mb-6 leading-tight">
              Sistem Pakar Diagnosis <br/> Penyakit Tanaman Cabai
            </h1>
            <p className="text-emerald-50 text-lg mb-8 max-w-2xl mx-auto leading-relaxed">
              Identifikasi penyakit pada tanaman cabai Anda dengan cepat dan
              akurat menggunakan teknologi sistem pakar berbasis kecerdasan buatan.
            </p>
            <Link to="/konsultasi">
              <motion.button 
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-white hover:bg-emerald-50 text-emerald-700 font-bold px-8 py-4 rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl flex items-center gap-2 mx-auto"
              >
                <Sprout className="w-5 h-5" />
                Mulai Diagnosis Sekarang
              </motion.button>
            </Link>
          </div>
        </motion.section>

        <motion.div 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={containerVariants}
          className="mb-12"
        >
          <motion.div variants={itemVariants} className="flex items-center gap-3 mb-6">
            <div className="p-2 bg-emerald-100 rounded-lg">
              <Clover className="w-6 h-6 text-emerald-600" />
            </div>
            <h2 className="text-2xl font-bold text-slate-800">
              Fase Pertumbuhan Tanaman Cabai
            </h2>
          </motion.div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {growthPhases.map((phase, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                whileHover={{ y: -5 }}
                className="bg-white rounded-xl p-6 shadow-sm border border-slate-100 hover:shadow-md hover:border-emerald-200 transition-all duration-300 group"
              >
                <div
                  className={`w-12 h-12 ${phase.color} rounded-full flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300 shadow-sm`}
                >
                  <phase.icon className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-slate-800 font-bold text-lg mb-2">
                  {phase.phase}
                </h3>
                <p className="text-slate-500 font-medium bg-slate-50 inline-block px-3 py-1 rounded-full text-sm border border-slate-100">
                  {phase.duration}
                </p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        <motion.div 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={containerVariants}
          className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12"
        >
          <motion.div variants={itemVariants} className="lg:col-span-2 bg-white rounded-2xl p-8 shadow-sm border border-slate-100">
            <h3 className="text-xl font-bold text-slate-800 mb-6 flex items-center gap-2">
              <Shield className="w-6 h-6 text-emerald-600" />
              Tips Perawatan Tanaman Cabai
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {careTips.map((tip, index) => (
                <motion.div
                  key={index}
                  variants={itemVariants}
                  className="bg-slate-50 rounded-xl p-5 hover:bg-emerald-50/50 transition-all duration-200 group border border-slate-100 hover:border-emerald-100"
                >
                  <div className="flex items-start gap-4">
                    <div className="shrink-0 p-2 bg-white rounded-lg shadow-sm group-hover:scale-110 transition-transform duration-200">
                      <tip.icon className="w-5 h-5 text-emerald-600" />
                    </div>
                    <div>
                      <h4 className="text-slate-800 font-semibold mb-2">
                        {tip.title}
                      </h4>
                      <p className="text-slate-500 text-sm leading-relaxed">
                        {tip.desc}
                      </p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          <motion.div variants={itemVariants} className="bg-white rounded-2xl p-8 shadow-sm border border-slate-100 h-fit sticky top-24">
            <h3 className="text-xl font-bold text-slate-800 mb-6">
              Cara Penggunaan Sistem
            </h3>
            <div className="space-y-6">
              <div className="flex gap-4 relative">
                <div className="absolute left-[15px] top-8 bottom-[-24px] w-0.5 bg-slate-100 last:hidden"></div>
                <div className="shrink-0 w-8 h-8 bg-emerald-100 rounded-full flex items-center justify-center text-emerald-700 font-bold shadow-sm z-10">
                  1
                </div>
                <div>
                  <p className="text-slate-800 font-semibold mb-1">Pilih Gejala</p>
                  <p className="text-slate-500 text-sm">
                    Pilih gejala yang terlihat pada tanaman cabai Anda
                  </p>
                </div>
              </div>
              <div className="flex gap-4 relative">
                <div className="absolute left-[15px] top-8 bottom-[-24px] w-0.5 bg-slate-100"></div>
                <div className="shrink-0 w-8 h-8 bg-emerald-100 rounded-full flex items-center justify-center text-emerald-700 font-bold shadow-sm z-10">
                  2
                </div>
                <div>
                  <p className="text-slate-800 font-semibold mb-1">
                    Analisis Sistem
                  </p>
                  <p className="text-slate-500 text-sm">
                    Sistem akan menganalisis gejala yang Anda pilih
                  </p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="shrink-0 w-8 h-8 bg-emerald-100 rounded-full flex items-center justify-center text-emerald-700 font-bold shadow-sm z-10">
                  3
                </div>
                <div>
                  <p className="text-slate-800 font-semibold mb-1">
                    Hasil & Solusi
                  </p>
                  <p className="text-slate-500 text-sm">
                    Dapatkan diagnosis dan rekomendasi penanganan
                  </p>
                </div>
              </div>
            </div>
            <Link to="/konsultasi">
              <motion.button 
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full mt-8 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold py-3 rounded-xl transition-colors duration-200 shadow-md hover:shadow-lg"
              >
                Mulai Diagnosis
              </motion.button>
            </Link>
          </motion.div>
        </motion.div>

        <motion.div 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={itemVariants}
          className="bg-gradient-to-r from-emerald-50 to-teal-50 rounded-xl p-6 border border-emerald-100"
        >
          <div className="flex items-start gap-4">
            <div className="shrink-0 p-2 bg-white rounded-lg shadow-sm">
              <Leaf className="w-6 h-6 text-emerald-600" />
            </div>
            <div>
              <h4 className="text-emerald-900 font-semibold mb-2">
                Pencegahan Lebih Baik dari Pengobatan
              </h4>
              <p className="text-emerald-700/80 text-sm leading-relaxed">
                Lakukan pemeriksaan rutin setiap minggu untuk deteksi dini
                penyakit. Tanaman yang sehat dan terawat dengan baik memiliki
                ketahanan lebih tinggi terhadap serangan hama dan penyakit.
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

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
