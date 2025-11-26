import { useState, useEffect } from "react";
import { infoService } from "../services/infoService";
import { diagnosisService } from "../services/diagnosisService";
import Loading from "../components/Loading";

export default function Penyakit() {
  const [diseases, setDiseases] = useState([]);
  const [rules, setRules] = useState([]);
  const [symptoms, setSymptoms] = useState([]);
  const [selectedDiseaseId, setSelectedDiseaseId] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [diseasesData, rulesData, symptomsData] = await Promise.all([
          infoService.getDiseases(),
          infoService.getRules(),
          diagnosisService.getSymptoms(),
        ]);
        setDiseases(diseasesData.data);
        setRules(rulesData.data);
        setSymptoms(symptomsData);
        
        if (diseasesData.data.length > 0) {
            setSelectedDiseaseId(diseasesData.data[0]._id);
        }
      } catch (err) {
        setError("Gagal memuat data penyakit.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const selectedDisease = diseases.find(d => d._id === selectedDiseaseId);
  
  const relatedSymptoms = selectedDisease 
    ? rules
        .filter(r => r.disease_id === selectedDisease._id)
        .map(r => {
            const symptom = symptoms.find(s => s._id === r.symptom_id);
            return symptom ? symptom : null;
        })
        .filter(Boolean)
    : [];

  if (loading) return <Loading />;
  if (error) return <div className="text-center text-red-500 mt-10">{error}</div>;

  return (
    <div className="space-y-8 py-8 px-4 sm:px-6 lg:px-8">
      <div className="text-center">
        <h1 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 to-teal-600">
          Informasi Penyakit
        </h1>
        <p className="mt-2 text-slate-600">Detail lengkap mengenai penyakit dan cara penanganannya</p>
      </div>

      <div className="max-w-xl mx-auto">
        <label className="block text-sm font-medium text-slate-700 mb-2">Pilih Penyakit</label>
        <div className="relative">
          <select
            value={selectedDiseaseId}
            onChange={(e) => setSelectedDiseaseId(e.target.value)}
            className="block w-full pl-3 pr-10 py-3 text-base border-slate-300 focus:outline-none focus:ring-emerald-500 focus:border-emerald-500 sm:text-sm rounded-lg shadow-sm border"
          >
            {diseases.map((disease) => (
              <option key={disease._id} value={disease._id}>
                {disease.name}
              </option>
            ))}
          </select>
        </div>
      </div>

      {selectedDisease && (
        <div className="bg-white rounded-xl shadow-sm border border-slate-100 overflow-hidden">
          <div className="p-6 border-b border-slate-100 bg-emerald-50">
            <h2 className="text-2xl font-bold text-emerald-800">{selectedDisease.name}</h2>
          </div>
          
          <div className="p-6 space-y-6">
            <div>
              <h3 className="text-lg font-semibold text-slate-800 mb-2">Deskripsi</h3>
              <p className="text-slate-600 leading-relaxed">{selectedDisease.description || "Tidak ada deskripsi."}</p>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-slate-800 mb-2">Solusi / Penanganan</h3>
              <p className="text-slate-600 leading-relaxed whitespace-pre-line">{selectedDisease.treatment || "Tidak ada solusi."}</p>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-slate-800 mb-3">Gejala Terkait</h3>
              {relatedSymptoms.length > 0 ? (
                <ul className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {relatedSymptoms.map((symptom, idx) => (
                    <li key={idx} className="flex items-start space-x-2 text-slate-600 bg-slate-50 p-3 rounded-lg">
                      <span className="inline-block w-2 h-2 mt-2 rounded-full bg-emerald-500 flex-shrink-0"></span>
                      <span>{symptom.name}</span>
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-slate-500 italic">Tidak ada data gejala terkait.</p>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
