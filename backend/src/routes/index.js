import { diagnoseHandler } from '../controllers/diagnose.controller.js';
import { getAllDiseases } from '../controllers/disease.controller.js';
import {
  createFeedback,
  getAllFeedbacks,
} from '../controllers/feedback.controller.js';
import { getAllRules } from '../controllers/rule.controller.js';
import { getStats } from '../controllers/stats.controller.js';
import { getAllSymptoms } from '../controllers/symptom.controller.js';
import {
  runValidation,
  getValidationSummary,
  testSingleCase,
} from '../controllers/validation.controller.js';
import { DiagnoseBodySchema } from '../schema/diagnose.schema.js';
import { createFeedbackSchema } from '../schema/feedback.schema.js';

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
    schema: DiagnoseBodySchema,
    handler: diagnoseHandler,
  });

  fastify.route({
    method: 'GET',
    url: '/symptoms',
    handler: getAllSymptoms,
  });

  fastify.route({
    method: 'GET',
    url: '/diseases',
    handler: getAllDiseases,
  });

  fastify.route({
    method: 'GET',
    url: '/rules',
    handler: getAllRules,
  });

  fastify.route({
    method: 'GET',
    url: '/stats',
    handler: getStats,
  });

  fastify.route({
    method: 'GET',
    url: '/feedback',
    handler: getAllFeedbacks,
  });

  fastify.route({
    method: 'POST',
    url: '/feedback',
    schema: createFeedbackSchema,
    handler: createFeedback,
  });

  // Validation routes
  fastify.route({
    method: 'GET',
    url: '/validation/run',
    handler: runValidation,
  });

  fastify.route({
    method: 'GET',
    url: '/validation/summary',
    handler: getValidationSummary,
  });

  fastify.route({
    method: 'POST',
    url: '/validation/test',
    handler: testSingleCase,
  });
}

export default mainRoutes;
