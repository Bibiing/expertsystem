import { z } from 'zod';

// Validasi body request, input harus array of string, dan minimal 1 gejala
const diagnoseBodySchema = z.object({
   symptoms: z.array(z.string({
      required_error: 'ID Gejala (symptom) diperlukan',
      invalid_type_error: 'ID Gejala (symptom) harus berupa string',
   })).min(1, 'Array gejala (symptoms) tidak boleh kosong'),
});

export const diagnoseSchema = {
   description: 'Menjalankan proses diagnosis berdasarkan gejala yang diberikan',
   tags: ['Diagnosis'],
   summary: 'Memulai sesi diagnosis sistem pakar',
   body: diagnoseBodySchema,
   response: {
      200: {
         description: 'Diagnosis sukses',
         type: 'array',
         items: {
            type: 'object',
            properties: {
               id: { type: 'string' },
               name: { type: 'string' },
               solution: { type: 'string' },
            }
         }
      },
      500: {
         description: 'Kesalahan server internal',
         type: 'object',
         properties: {
            statusCode: { type: 'number' },
            error: { type: 'string' },
            message: { type: 'string' },
         }
      }
   },
};