import InferenceService from '../services/inference.service.js';
import { responseFailed, responseSuccess } from '../utils/response.js';
const inferenceService = new InferenceService();

/**
 *
 * @param {import('fastify').FastifyRequest} request 
 * @param {import('fastify').FastifyReply} reply 
 */
export async function diagnoseHandler(request, reply) {
   try {
      const { symptoms } = request.body;
      const result = await inferenceService.diagnose(symptoms);
      const payload = responseSuccess("Berhasil mendiagnosis", result)
      return reply.status(200).send(payload);
   } catch (error) {
      const payload = responseFailed("Internal Server Error", "Gagal mendiagnosis tanaman: " + error.message)
      return reply.status(500).send(payload);
   }
}