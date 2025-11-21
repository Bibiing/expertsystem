import Disease from "../models/disease.model.js";

class DiseaseRepository {
   constructor(logger) {
      this.log = logger || console;
   }

   async getAllDisease() {
      try {
         const diseases = await Disease.find({});
         return diseases;
      } catch (err) {
         this.log.error("Gagal mengambil diseases:", err.message);
         throw err;
      }
   }

   async getDiseasesByIds(ids = []) {
      try {
         const diseases = await Disease.find({ _id: { $in: ids } });
         return diseases;
      } catch (err) {
         this.log.error("Gagal mengambil diseases:", err.message);
         throw err;
      }
   }

   async getDiseaseMap() {
      try {
         const diseases = await Disease.find({});
         const map = new Map();

         for (const d of diseases) {
            map.set(String(d._id), d);
         }

         return map;
      } catch (err) {
         this.log.error("Gagal membuat disease map:", err.message);
         throw err;
      }
   }
}

export default DiseaseRepository;
