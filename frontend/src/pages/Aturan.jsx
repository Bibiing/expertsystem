import { useState, useEffect } from "react";
import { infoService } from "../services/infoService";
import { diagnosisService } from "../services/diagnosisService";
import Loading from "../components/Loading";

export default function Aturan() {
  const [rules, setRules] = useState([]);
  const [symptoms, setSymptoms] = useState([]);
  const [diseases, setDiseases] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [rulesData, symptomsData, diseasesData] = await Promise.all([
          infoService.getRules(),
          diagnosisService.getSymptoms(),
          infoService.getDiseases(),
        ]);
        setRules(rulesData.data);
        setSymptoms(symptomsData);
        setDiseases(diseasesData.data);
      } catch (err) {
        setError("Gagal memuat data aturan.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const getSymptomName = (id) => {
    const symptom = symptoms.find((s) => s._id === id);
    return symptom ? `${symptom._id} - ${symptom.name}` : id;
  };

  const getDiseaseName = (id) => {
    const disease = diseases.find((d) => d._id === id);
    return disease ? disease.name : id;
  };

  if (loading) return <Loading />;
  if (error) return <div className="text-center text-red-500 mt-10">{error}</div>;

  return (
    <div className="space-y-8 py-8">
      <h1 className="text-3xl font-bold text-slate-800 text-center">Basis Pengetahuan (Aturan)</h1>

      <div className="bg-white rounded-xl shadow-sm border border-slate-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-slate-200">
            <thead className="bg-slate-50">
              <tr>
                <th className="px-4 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">ID Aturan</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Penyakit</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Gejala</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">MB (Measure of Belief)</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">MD (Measure of Disbelief)</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-slate-200">
              {rules.map((rule, index) => (
                <tr key={rule._id || index} className="hover:bg-slate-50">
                  <td className="px-4 py-4 whitespace-nowrap text-sm text-slate-500">R{index + 1}</td>
                  <td className="px-4 py-4 whitespace-nowrap text-sm font-medium text-slate-900">{getDiseaseName(rule.disease_id)}</td>
                  <td className="px-4 py-4 whitespace-nowrap text-sm text-slate-500">{getSymptomName(rule.symptom_id)}</td>
                  <td className="px-4 py-4 whitespace-nowrap text-sm text-slate-500">{rule.mb}</td>
                  <td className="px-4 py-4 whitespace-nowrap text-sm text-slate-500">{rule.md}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
