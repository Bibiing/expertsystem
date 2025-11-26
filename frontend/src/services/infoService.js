import api from "./api";

export const infoService = {
  getStats: async () => {
    try {
      const response = await api.get("/stats");
      return response.data;
    } catch (error) {
      console.error("Error fetching stats:", error);
      throw error;
    }
  },

  getRules: async () => {
    try {
      const response = await api.get("/rules");
      return response.data;
    } catch (error) {
      console.error("Error fetching rules:", error);
      throw error;
    }
  },

  getDiseases: async () => {
    try {
      const response = await api.get("/diseases");
      return response.data;
    } catch (error) {
      console.error("Error fetching diseases:", error);
      throw error;
    }
  },
};
