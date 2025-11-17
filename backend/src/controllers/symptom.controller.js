import SymptomService from "../services/symptom.service.js"
const symptomService = new SymptomService();

/**
 *
 * @param {import('fastify').FastifyRequest} request 
 * @param {import('fastify').FastifyReply} reply 
 */
export const getAllSymptoms = async (request, reply) => {
   try {
      const symptoms = await symptomService.getAllSymptoms();
      reply.status(200).send(symptoms);
   } catch (err) {
      reply.status(500).send(err);
   }
};