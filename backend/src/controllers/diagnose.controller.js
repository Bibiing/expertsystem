import InferenceService from '../services/inference.service.js';
const inferenceService = new InferenceService();

/**
 *
 * @param {import('fastify').FastifyRequest} request 
 * @param {import('fastify').FastifyReply} reply 
 */
export async function diagnoseHandler(request, reply) {
   try {
      const { symptoms } = request.body;

      request.log.info(`Menerima permintaan diagnosis untuk gejala: ${symptoms.join(', ')}`);

      // const diagnosisResults = [
      //    { id: "P01", name: "Antraknosa", solution: "Gunakan fungisida X..." },
      //    { id: "P03", name: "Bercak Daun", solution: "Atur irigasi..." }
      // ];

      const diagnosisResults = await inferenceService.diagnose(symptoms);

      return reply.status(200).send(diagnosisResults);

   } catch (error) {
      request.log.error(error, 'Terjadi kesalahan saat proses diagnosis');

      return reply.status(500).send({
         statusCode: 500,
         error: 'Internal Server Error',
         message: 'Terjadi kesalahan internal pada server saat memproses diagnosis Anda.',
      });
   }
}