import { useState, useEffect } from "react";
import { infoService } from "../services/infoService";
import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import Loading from "../components/Loading";

export default function Statistik() {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  
  const COLORS = ['#10b981', '#3b82f6', '#f59e0b', '#ef4444', '#8b5cf6', '#ec4899'];

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const data = await infoService.getStats();
        setStats(data.data);
      } catch (err) {
        setError("Gagal memuat data statistik.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  if (loading) return <Loading />;
  if (error) return <div className="text-center text-red-500 mt-10">{error}</div>;
  if (!stats) return <div className="text-center mt-10">Tidak ada data statistik.</div>;

  return (
    <div className="space-y-8 py-8 px-4 sm:px-6 lg:px-8">
      <div className="text-center">
        <h1 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 to-teal-600">
          Statistik Sistem Pakar
        </h1>
        <p className="mt-2 text-slate-600">Data visualisasi penggunaan dan diagnosis sistem</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100">
          <h2 className="text-xl font-semibold mb-4 text-slate-700">Total Diagnosa</h2>
          <p className="text-4xl font-bold text-emerald-600">{stats.totalDiagnoses}</p>
        </div>
        <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100">
          <h2 className="text-xl font-semibold mb-4 text-slate-700">Total Feedback</h2>
          <p className="text-4xl font-bold text-blue-600">{stats.totalFeedbacks}</p>
        </div>
      </div>

      <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100">
        <h2 className="text-xl font-semibold mb-6 text-slate-700">Penyakit Terbanyak Terdeteksi</h2>
        <div className="h-[400px]">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart margin={{ top: 20, bottom: 20, left: 20, right: 20 }}>
              <Pie
                data={stats.topDiseases}
                cx="50%"
                cy="50%"
                labelLine={!isMobile}
                label={isMobile ? false : ({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                outerRadius={120}
                fill="#8884d8"
                dataKey="count"
                nameKey="disease_name"
              >
                {stats.topDiseases.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
              <Legend 
                layout="horizontal" 
                verticalAlign="bottom" 
                align="center"
              />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100">
        <h2 className="text-xl font-semibold mb-6 text-slate-700">Gejala Paling Sering Muncul</h2>
        <div className="h-[450px]">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart margin={{ top: 20, bottom: 20, left: 20, right: 20 }}>
              <Pie
                data={stats.topSymptoms}
                cx="50%"
                cy="50%"
                labelLine={!isMobile}
                label={isMobile ? false : ({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                outerRadius={120}
                fill="#8884d8"
                dataKey="count"
                nameKey="symptom_name"
              >
                {stats.topSymptoms.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
              <Legend 
                layout="horizontal" 
                verticalAlign="bottom" 
                align="center"
              />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100">
        <h2 className="text-xl font-semibold mb-6 text-slate-700">Statistik Kategori Feedback</h2>
        <div className="h-[400px]">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart margin={{ top: 0, bottom: 20, left: 20, right: 20 }}>
              <Pie
                data={stats.totalFeedbacksPerCategory}
                cx="50%"
                cy="50%"
                labelLine={!isMobile}
                label={isMobile ? false : ({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                outerRadius={120}
                fill="#8884d8"
                dataKey="count"
                nameKey="category"
              >
                {stats.totalFeedbacksPerCategory.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
              <Legend 
                layout="horizontal" 
                verticalAlign="bottom" 
                align="center"
              />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}
