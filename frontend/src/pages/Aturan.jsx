import { useState, useEffect } from 'react'
import { infoService } from '../services/infoService'
import { diagnosisService } from '../services/diagnosisService'
import Loading from '../components/Loading'

export default function Aturan () {
  const [rules, setRules] = useState([])
  const [symptoms, setSymptoms] = useState([])
  const [diseases, setDiseases] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [rulesData, symptomsData, diseasesData] = await Promise.all([
          infoService.getRules(),
          diagnosisService.getSymptoms(),
          infoService.getDiseases()
        ])
        setRules(rulesData.data)
        setSymptoms(symptomsData)
        setDiseases(diseasesData.data)
      } catch (err) {
        setError('Gagal memuat data aturan.')
        console.error(err)
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [])

  const getSymptomName = id => {
    const symptom = symptoms.find(s => s._id === id)
    return symptom ? `${symptom._id} - ${symptom.name}` : id
  }

  const getDiseaseName = id => {
    const disease = diseases.find(d => d._id === id)
    return disease ? disease.name : id
  }

  if (loading) return <Loading />
  if (error)
    return <div className='text-center text-red-500 mt-10'>{error}</div>

  return (
    <div className='space-y-8 py-8 px-2 sm:px-6 lg:px-8'>
      <div className='text-center'>
        <h1 className='text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 to-teal-600'>
          Aturan Basis Pengetahuan
        </h1>
        <p className='mt-2 text-slate-600'>
          Daftar aturan yang digunakan untuk diagnosis penyakit
        </p>
      </div>

      <div className='bg-white rounded-md shadow-lg border border-slate-100 overflow-hidden'>
        <div className='overflow-x-auto'>
          <table className='min-w-full divide-y divide-slate-200'>
            <thead>
              <tr className='bg-gradient-to-r from-emerald-600 to-teal-600 text-white'>
                <th className='px-5 py-2 text-left text-xs font-bold uppercase tracking-wider'>
                  ID
                </th>
                <th className='px-5 py-2 text-left text-xs font-bold uppercase tracking-wider'>
                  Penyakit
                </th>
                <th className='px-5 py-2 text-left text-xs font-bold uppercase tracking-wider'>
                  Gejala
                </th>
                <th className='px-5 py-2 text-center text-xs font-bold uppercase tracking-wider'>
                  Tingkat Keyakinan
                </th>
                <th className='px-5 py-2 text-center text-xs font-bold uppercase tracking-wider'>
                  Tingkat Ketidakyakinan
                </th>
              </tr>
            </thead>
            <tbody className='bg-white divide-y divide-slate-100'>
              {rules.map((rule, index) => (
                <tr
                  key={rule._id || index}
                  className='hover:bg-emerald-50/50 transition-colors duration-200 even:bg-slate-50'
                >
                  <td className='px-4 py-2 whitespace-nowrap text-sm font-medium text-slate-500'>
                    <span className='bg-slate-200 text-slate-600 py-1 rounded text-xs font-bold'>
                      R{index + 1}
                    </span>
                  </td>
                  <td className='px-4 py-2 whitespace-nowrap text-sm font-bold text-emerald-700'>
                    {getDiseaseName(rule.disease_id)}
                  </td>
                  <td className='px-4 py-2 whitespace-nowrap text-sm text-slate-600'>
                    {getSymptomName(rule.symptom_id)}
                  </td>
                  <td className='px-4 py-2 whitespace-nowrap text-sm text-center'>
                    <span className='inline-flex items-center justify-center px-3 py-1 rounded-full text-xs font-bold bg-blue-100 text-blue-700'>
                      {rule.mb}
                    </span>
                  </td>
                  <td className='px-4 py-2 whitespace-nowrap text-sm text-center'>
                    <span className='inline-flex items-center justify-center px-3 py-1 rounded-full text-xs font-bold bg-amber-100 text-amber-700'>
                      {rule.md}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
