import Disease from '../models/disease.js';
import Symptom from '../models/symptom.js';
import Rule from '../models/rule.js';

class KnowledgeBaseService {
   constructor(logger) {
      this.log = logger || console;
   }

   // Symptom
   async getAllSymptoms() {
      try {
         return await Symptom.find({});
      } catch (err) {
         this.log.error(`Gagal mengambil data gejala: ${err.message}`);
         throw err;
      }
   }

   async getSymptomsByIds(ids = []) {
      try {
         return await Symptom.find({ _id: { $in: ids } });
      } catch (err) {
         this.log.error(`Gagal mengambil gejala berdasarkan ID: ${err.message}`);
         throw err;
      }
   }

   // Desease
   async getAllDiseases() {
      try {
         return await Disease.find({});
      } catch (err) {
         this.log.error(`Gagal mengambil data penyakit: ${err.message}`);
         throw err;
      }
   }

   async getDiseasesByIds(ids = []) {
      try {
         return await Disease.find({ _id: { $in: ids } });
      } catch (err) {
         this.log.error(`Gagal mengambil penyakit berdasarkan ID: ${err.message}`);
         throw err;
      }
   }

   // Rule
   async getAllRules() {
      try {
         return await Rule.find({});
      } catch (err) {
         this.log.error(`Gagal mengambil data aturan: ${err.message}`);
         throw err;
      }
   }

   async getRulesByDisease(diseaseId) {
      try {
         return await Rule.find({ consequent: diseaseId });
      } catch (err) {
         this.log.error(`Gagal mengambil aturan berdasarkan penyakit: ${err.message}`);
         throw err;
      }
   }

}

export default KnowledgeBaseService;
