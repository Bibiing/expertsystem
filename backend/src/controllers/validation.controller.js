import ValidationService from '../services/validation.service.js';
import { responseFailed, responseSuccess } from '../utils/response.js';

const validationService = new ValidationService();

/**
 * Run full system validation
 * GET /api/v1/validation/run
 */
export const runValidation = async (request, reply) => {
  try {
    const results = await validationService.validateSystem();
    const payload = responseSuccess(
      'Validasi sistem berhasil dijalankan',
      results,
    );
    reply.status(200).send(payload);
  } catch (error) {
    const payload = responseFailed(
      'Gagal menjalankan validasi sistem',
      error.message,
    );
    reply.status(500).send(payload);
  }
};

/**
 * Get validation summary (without detailed results)
 * GET /api/v1/validation/summary
 */
export const getValidationSummary = async (request, reply) => {
  try {
    const summary = await validationService.getValidationSummary();
    const payload = responseSuccess(
      'Berhasil mengambil ringkasan validasi',
      summary,
    );
    reply.status(200).send(payload);
  } catch (error) {
    const payload = responseFailed(
      'Gagal mengambil ringkasan validasi',
      error.message,
    );
    reply.status(500).send(payload);
  }
};

/**
 * Test a single case manually
 * POST /api/v1/validation/test
 * Body: { symptoms: [...], expectedDisease: "..." }
 */
export const testSingleCase = async (request, reply) => {
  try {
    const { symptoms, expectedDisease } = request.body;

    const diagnosisResult = await validationService.runSingleDiagnosis(
      symptoms,
    );
    const topDisease =
      diagnosisResult.diseases && diagnosisResult.diseases.length > 0
        ? diagnosisResult.diseases[0]
        : null;

    const result = {
      diagnosis: diagnosisResult,
      validation: {
        expected: expectedDisease,
        predicted: topDisease ? topDisease.name : null,
        cf: topDisease ? topDisease.cf : 0,
        isCorrect: topDisease ? topDisease.name === expectedDisease : false,
      },
    };

    const payload = responseSuccess('Test case berhasil dijalankan', result);
    reply.status(200).send(payload);
  } catch (error) {
    const payload = responseFailed(
      'Gagal menjalankan test case',
      error.message,
    );
    reply.status(500).send(payload);
  }
};
