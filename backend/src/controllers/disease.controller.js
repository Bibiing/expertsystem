import DiseaseService from "../services/disease.service.js";
import { responseFailed, responseSuccess } from "../utils/response.js";

const diseaseService = new DiseaseService();

export const getAllDiseases = async (request, reply) => {
   try {
      const diseases = await diseaseService.getAllDiseases();
      const payload = responseSuccess("Berhasil mengambil data penyakit", diseases)
      reply.status(200).send(payload);
   } catch (error) {
      const payload = responseFailed("Internal Server Error", "Gagal mengambil data penyakit: " + err.message)
      reply.status(500).send(payload);
   }
};