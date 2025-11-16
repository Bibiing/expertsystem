import { diagnoseHandler } from '../controllers/diagnose.controller.js';
import { diagnoseSchema } from '../schemas/diagnose.schema.js';

/**
 * Plugin utama yang mendaftarkan semua rute aplikasi Anda.
 * Fastify menggunakan 'plugin' untuk mengenkapsulasi rute.
 *
 * @param {import('fastify').FastifyInstance} fastify - Instance server Fastify
 * @param {object} options 
 */
async function mainRoutes(fastify, options) {
   fastify.route({
      method: 'POST',
      url: '/diagnose',
      schema: diagnoseSchema,
      handler: diagnoseHandler,
   });
}

export default mainRoutes;