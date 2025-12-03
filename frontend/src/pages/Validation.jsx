import { useState } from 'react';
import {
  CheckCircle,
  XCircle,
  TrendingUp,
  BarChart3,
  Activity,
  AlertTriangle,
  PlayCircle,
  Loader2,
} from 'lucide-react';
import validationService from '../services/validationService';

export default function Validation() {
  const [isRunning, setIsRunning] = useState(false);
  const [results, setResults] = useState(null);
  const [error, setError] = useState(null);

  const runValidation = async () => {
    setIsRunning(true);
    setError(null);
    setResults(null);

    try {
      const response = await validationService.runValidation();
      console.log('Validation response:', response);
      setResults(response.data);
    } catch (err) {
      console.error('Validation error:', err);
      setError(err.message);
    } finally {
      setIsRunning(false);
    }
  };

  const getAccuracyColor = (accuracy) => {
    if (accuracy >= 80) return 'text-green-600';
    if (accuracy >= 60) return 'text-yellow-600';
    return 'text-red-600';
  };

  const getAccuracyBgColor = (accuracy) => {
    if (accuracy >= 80) return 'bg-green-50';
    if (accuracy >= 60) return 'bg-yellow-50';
    return 'bg-red-50';
  };

  return (
    <div className="min-h-screen bg-linear-to-br from-slate-50 to-emerald-50/30 py-8 px-4 lg:px-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="bg-linear-to-br from-emerald-600 to-emerald-700 rounded-2xl p-10 mb-8 shadow-xl text-center">
          <div className="inline-block p-3 bg-white/20 backdrop-blur-sm rounded-full mb-4">
            <BarChart3 className="w-10 h-10 text-white" />
          </div>
          <h1 className="text-4xl font-bold text-white mb-3">
            Validasi Sistem Pakar
          </h1>
          <p className="text-emerald-50 text-lg max-w-2xl mx-auto">
            Uji akurasi dan performa sistem diagnosis dengan test cases yang
            telah ditentukan
          </p>
        </div>

        {/* Run Validation Button */}
        <div className="text-center mb-8">
          <button
            onClick={runValidation}
            disabled={isRunning}
            className="inline-flex items-center gap-2 px-8 py-4 bg-emerald-600 text-white font-semibold rounded-xl hover:bg-emerald-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-all shadow-lg hover:shadow-xl"
          >
            {isRunning ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin" />
                Menjalankan Validasi...
              </>
            ) : (
              <>
                <PlayCircle className="w-5 h-5" />
                Jalankan Validasi
              </>
            )}
          </button>
        </div>

        {/* Error Message */}
        {error && (
          <div className="mb-8 p-4 bg-red-50 border-l-4 border-red-500 rounded-lg">
            <div className="flex items-center gap-2">
              <AlertTriangle className="w-5 h-5 text-red-500" />
              <p className="text-red-700 font-medium">{error}</p>
            </div>
          </div>
        )}

        {/* Results */}
        {results && (
          <div className="space-y-6">
            {/* Summary Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {/* Total Cases */}
              <div className="bg-white rounded-xl p-6 shadow-md border border-gray-100">
                <div className="flex items-center justify-between mb-2">
                  <Activity className="w-8 h-8 text-blue-500" />
                  <span className="text-3xl font-bold text-gray-800">
                    {results.totalCases}
                  </span>
                </div>
                <p className="text-gray-600 font-medium">Total Test Cases</p>
              </div>

              {/* Accuracy */}
              <div
                className={`rounded-xl p-6 shadow-md border ${getAccuracyBgColor(
                  results.accuracy,
                )}`}
              >
                <div className="flex items-center justify-between mb-2">
                  <TrendingUp
                    className={`w-8 h-8 ${getAccuracyColor(results.accuracy)}`}
                  />
                  <span
                    className={`text-3xl font-bold ${getAccuracyColor(
                      results.accuracy,
                    )}`}
                  >
                    {results.accuracy.toFixed(1)}%
                  </span>
                </div>
                <p className="text-gray-600 font-medium">Akurasi</p>
              </div>

              {/* Correct Diagnoses */}
              <div className="bg-white rounded-xl p-6 shadow-md border border-gray-100">
                <div className="flex items-center justify-between mb-2">
                  <CheckCircle className="w-8 h-8 text-green-500" />
                  <span className="text-3xl font-bold text-gray-800">
                    {results.correctDiagnoses}
                  </span>
                </div>
                <p className="text-gray-600 font-medium">Diagnosis Benar</p>
              </div>

              {/* Average CF */}
              <div className="bg-white rounded-xl p-6 shadow-md border border-gray-100">
                <div className="flex items-center justify-between mb-2">
                  <BarChart3 className="w-8 h-8 text-purple-500" />
                  <span className="text-3xl font-bold text-gray-800">
                    {results.cfStats.avg.toFixed(2)}
                  </span>
                </div>
                <p className="text-gray-600 font-medium">Rata-rata CF</p>
              </div>
            </div>

            {/* CF Statistics */}
            <div className="bg-white rounded-xl p-6 shadow-md">
              <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
                <Activity className="w-6 h-6 text-emerald-600" />
                Statistik Certainty Factor
              </h2>
              <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                <div className="text-center p-4 bg-gray-50 rounded-lg">
                  <p className="text-sm text-gray-600 mb-1">CF Minimum</p>
                  <p className="text-xl font-bold text-gray-800">
                    {results.cfStats.min.toFixed(3)}
                  </p>
                </div>
                <div className="text-center p-4 bg-gray-50 rounded-lg">
                  <p className="text-sm text-gray-600 mb-1">CF Maximum</p>
                  <p className="text-xl font-bold text-gray-800">
                    {results.cfStats.max.toFixed(3)}
                  </p>
                </div>
                <div className="text-center p-4 bg-gray-50 rounded-lg">
                  <p className="text-sm text-gray-600 mb-1">CF Rata-rata</p>
                  <p className="text-xl font-bold text-gray-800">
                    {results.cfStats.avg.toFixed(3)}
                  </p>
                </div>
                <div className="text-center p-4 bg-green-50 rounded-lg">
                  <p className="text-sm text-gray-600 mb-1">CF Benar</p>
                  <p className="text-xl font-bold text-green-700">
                    {results.cfStats.correctAvg.toFixed(3)}
                  </p>
                </div>
                <div className="text-center p-4 bg-red-50 rounded-lg">
                  <p className="text-sm text-gray-600 mb-1">CF Salah</p>
                  <p className="text-xl font-bold text-red-700">
                    {results.cfStats.incorrectAvg.toFixed(3)}
                  </p>
                </div>
              </div>
            </div>

            {/* Per-Disease Metrics */}
            <div className="bg-white rounded-xl p-6 shadow-md">
              <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
                <BarChart3 className="w-6 h-6 text-emerald-600" />
                Metrik Per Penyakit
              </h2>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b-2 border-gray-200">
                      <th className="text-left py-3 px-4 font-semibold text-gray-700">
                        Penyakit
                      </th>
                      <th className="text-center py-3 px-4 font-semibold text-gray-700">
                        TP
                      </th>
                      <th className="text-center py-3 px-4 font-semibold text-gray-700">
                        FP
                      </th>
                      <th className="text-center py-3 px-4 font-semibold text-gray-700">
                        FN
                      </th>
                      <th className="text-center py-3 px-4 font-semibold text-gray-700">
                        Precision
                      </th>
                      <th className="text-center py-3 px-4 font-semibold text-gray-700">
                        Recall
                      </th>
                      <th className="text-center py-3 px-4 font-semibold text-gray-700">
                        F1-Score
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {Object.entries(results.perDiseaseMetrics).map(
                      ([disease, metrics]) => (
                        <tr key={disease} className="border-b border-gray-100">
                          <td className="py-3 px-4 font-medium text-gray-800">
                            {disease}
                          </td>
                          <td className="text-center py-3 px-4 text-gray-700">
                            {metrics.truePositives}
                          </td>
                          <td className="text-center py-3 px-4 text-gray-700">
                            {metrics.falsePositives}
                          </td>
                          <td className="text-center py-3 px-4 text-gray-700">
                            {metrics.falseNegatives}
                          </td>
                          <td className="text-center py-3 px-4">
                            <span
                              className={`font-semibold ${
                                metrics.precision >= 0.8
                                  ? 'text-green-600'
                                  : metrics.precision >= 0.6
                                  ? 'text-yellow-600'
                                  : 'text-red-600'
                              }`}
                            >
                              {(metrics.precision * 100).toFixed(1)}%
                            </span>
                          </td>
                          <td className="text-center py-3 px-4">
                            <span
                              className={`font-semibold ${
                                metrics.recall >= 0.8
                                  ? 'text-green-600'
                                  : metrics.recall >= 0.6
                                  ? 'text-yellow-600'
                                  : 'text-red-600'
                              }`}
                            >
                              {(metrics.recall * 100).toFixed(1)}%
                            </span>
                          </td>
                          <td className="text-center py-3 px-4">
                            <span
                              className={`font-semibold ${
                                metrics.f1Score >= 0.8
                                  ? 'text-green-600'
                                  : metrics.f1Score >= 0.6
                                  ? 'text-yellow-600'
                                  : 'text-red-600'
                              }`}
                            >
                              {(metrics.f1Score * 100).toFixed(1)}%
                            </span>
                          </td>
                        </tr>
                      ),
                    )}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Detailed Results */}
            <div className="bg-white rounded-xl p-6 shadow-md">
              <h2 className="text-xl font-bold text-gray-800 mb-4">
                Detail Hasil Test Cases
              </h2>
              <div className="space-y-3 max-h-96 overflow-y-auto">
                {results.detailedResults.map((result) => (
                  <div
                    key={result.testCaseId}
                    className={`p-4 rounded-lg border-l-4 ${
                      result.isCorrect
                        ? 'bg-green-50 border-green-500'
                        : 'bg-red-50 border-red-500'
                    }`}
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          {result.isCorrect ? (
                            <CheckCircle className="w-5 h-5 text-green-600" />
                          ) : (
                            <XCircle className="w-5 h-5 text-red-600" />
                          )}
                          <span className="font-semibold text-gray-800">
                            Test Case #{result.testCaseId}
                          </span>
                        </div>
                        <p className="text-sm text-gray-600 mb-2">
                          {result.description}
                        </p>
                        <div className="text-sm">
                          <span className="text-gray-700">Diharapkan: </span>
                          <span className="font-medium text-gray-800">
                            {result.expected}
                          </span>
                          <span className="mx-2">→</span>
                          <span className="text-gray-700">Diprediksi: </span>
                          <span
                            className={`font-medium ${
                              result.isCorrect
                                ? 'text-green-700'
                                : 'text-red-700'
                            }`}
                          >
                            {result.predicted}
                          </span>
                        </div>
                      </div>
                      <div className="text-right ml-4">
                        <p className="text-xs text-gray-500 mb-1">CF</p>
                        <p className="text-lg font-bold text-gray-800">
                          {result.cf.toFixed(3)}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
