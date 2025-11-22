import SymptomRepository from "../repository/symptom.repositories.js";

class SymptomService {
   constructor(logger) {
      this.symptomRepo = new SymptomRepository();
      this.log = logger || console;
   }

   async getAllSymptoms() {
      try {
         return await this.symptomRepo.getAllSymptoms();
      } catch (err) {
         this.log.error(`Gagal mengambil data gejala: ${err.message}`);
         throw err;
      }
   }
}

export default SymptomService;