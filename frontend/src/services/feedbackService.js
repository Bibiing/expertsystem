import api from "./api";

const feedbackService = {
  createFeedback: async (data) => {
    try {
      const response = await api.post("/feedback", data);
      return response.data; // { status: true, message: "...", data: {...} }
    } catch (error) {
      if (error.response?.data) {
        throw new Error(
          error.response.data.message || "Gagal mengirim feedback"
        );
      }
      throw new Error(error.message || "Terjadi kesalahan");
    }
  },

  getAllFeedbacks: async (page = 1) => {
    try {
      const response = await api.get(`/feedback?page=${page}`);
      return response.data; // { status: true, message: "...", data: {...} }
    } catch (error) {
      if (error.response?.data) {
        throw new Error(
          error.response.data.message || "Gagal mengambil feedback"
        );
      }
      throw new Error(error.message || "Terjadi kesalahan");
    }
  },
};

export default feedbackService;
