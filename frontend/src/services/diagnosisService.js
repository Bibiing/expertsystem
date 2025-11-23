import api from "./api";

export const diagnosisService = {
  // Mengambil semua gejala dari backend
  getSymptoms: async () => {
    try {
      const response = await api.get("/symptoms");
      return response.data.data || [];
    } catch (error) {
      console.error("Error fetching symptoms:", error);
      throw error;
    }
  },

  // Mengirim gejala untuk didiagnosis
  diagnose: async (symptoms) => {
    try {
      // Format payload sesuai permintaan backend:
      // { symptoms: [{ symptom_id: "S01", certainty: 1.0 }, ...] }
      const payload = {
        symptoms: symptoms,
        // symptoms: selectedSymptoms.map((id) => ({
        //   symptom_id: id,
        //   certainty: 1.0, // Asumsikan certainty 1.0 untuk setiap gejala yang dipilih
        // })),
      };

      const response = await api.post("/diagnose", payload);
      return response.data;
    } catch (error) {
      console.error("Error diagnosing:", error);
      throw error;
    }
  },
};
