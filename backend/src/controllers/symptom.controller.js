import SymptomService from "../services/symptom.service.js"
import { responseFailed, responseSuccess } from "../utils/response.js";
const symptomService = new SymptomService();

/**
 *
 * @param {import('fastify').FastifyRequest} request 
 * @param {import('fastify').FastifyReply} reply 
 */
export const getAllSymptoms = async (request, reply) => {
   try {
      const symptoms = await symptomService.getAllSymptoms();
      const payload = responseSuccess("Berhasil mengambil gejala", symptoms)
      reply.status(200).send(payload);
   } catch (error) {
      const payload = responseFailed("Internal Server Error", "Gagal mengambil gejala: " + error.message)
      reply.status(500).send(payload);
   }
};