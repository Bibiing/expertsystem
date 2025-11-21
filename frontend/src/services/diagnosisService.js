import api from './api';

export const diagnosisService = {
  // Mengambil semua gejala dari backend
  getSymptoms: async () => {
    try {
      const response = await api.get('/symptoms');
      return response.data;
    } catch (error) {
      console.error("Error fetching symptoms:", error);
      throw error;
    }
  },

  // Mengirim gejala untuk didiagnosis
  diagnose: async (selectedSymptomIds) => {
    try {
      // Format payload sesuai permintaan backend:
      // { symptoms: [{ symptom_id: "S01", certainty: 1.0 }, ...] }
      const payload = {
        symptoms: selectedSymptomIds.map(id => ({
          symptom_id: id,
          certainty: 1.0 // Asumsi user yakin (1.0) jika memilih gejala
        }))
      };

      const response = await api.post('/diagnose', payload);
      return response.data;
    } catch (error) {
      console.error("Error diagnosing:", error);
      throw error;
    }
  }
};
