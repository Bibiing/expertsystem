import { useState, useEffect } from "react";
import { infoService } from "../services/infoService";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import Loading from "../components/Loading";

export default function Statistik() {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

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
    <div className="space-y-8 py-8">
      <h1 className="text-3xl font-bold text-slate-800 text-center">Statistik Sistem Pakar</h1>

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
        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={stats.topDiseases}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="disease_name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="count" fill="#10b981" name="Jumlah Diagnosa" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100">
        <h2 className="text-xl font-semibold mb-6 text-slate-700">Gejala Paling Sering Muncul</h2>
        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={stats.topSymptoms} layout="vertical">
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis type="number" />
              <YAxis dataKey="symptom_name" type="category" width={150} />
              <Tooltip />
              <Legend />
              <Bar dataKey="count" fill="#3b82f6" name="Jumlah Kemunculan" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}
