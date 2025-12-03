import api from './api';

const validationService = {
  runValidation: async () => {
    try {
      const response = await api.get('/validation/run');
      return response.data;
    } catch (error) {
      if (error.response?.data) {
        throw new Error(
          error.response.data.message || 'Gagal menjalankan validasi',
        );
      }
      throw new Error(error.message || 'Terjadi kesalahan');
    }
  },

  getValidationSummary: async () => {
    try {
      const response = await api.get('/validation/summary');
      return response.data;
    } catch (error) {
      if (error.response?.data) {
        throw new Error(
          error.response.data.message || 'Gagal mengambil ringkasan validasi',
        );
      }
      throw new Error(error.message || 'Terjadi kesalahan');
    }
  },

  testSingleCase: async (symptoms, expectedDisease) => {
    try {
      const response = await api.post('/validation/test', {
        symptoms,
        expectedDisease,
      });
      return response.data;
    } catch (error) {
      if (error.response?.data) {
        throw new Error(
          error.response.data.message || 'Gagal menjalankan test case',
        );
      }
      throw new Error(error.message || 'Terjadi kesalahan');
    }
  },
};

export default validationService;
