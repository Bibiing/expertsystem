import { diagnoseHandler } from '../controllers/diagnose.controller.js';
import { getAllSymptoms } from '../controllers/symptom.controller.js';

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
      handler: diagnoseHandler,
   });

   fastify.route({
      method: 'GET',
      url: '/symptoms',
      handler: getAllSymptoms,
   });
}

export default mainRoutes;