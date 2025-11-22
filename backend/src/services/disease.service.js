import DiseaseRepository from "../repository/disease.repositories.js";

class DiseaseService {
   constructor(logger) {
      this.diseaseRepo = new DiseaseRepository();
      this.log = logger || console;
   }

   async getAllDiseases() {
      try {
         const diseases = await this.diseaseRepo.getAllDisease();
         return diseases;
      } catch (err) {
         this.log.error("Gagal mengambil diseases:", err.message);
         throw err;
      }
   }
}

export default DiseaseService;