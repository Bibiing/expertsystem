import Symptom from "../models/symptom.model.js";

class SymptomRepository {
   constructor(logger) {
      this.log = logger || console;
   }

   async getAllSymptoms() {
      try {
         const symptoms = await Symptom.find({});
         return symptoms;
      } catch (err) {
         this.log.error("Gagal mengambil symptoms:", err.message);
         throw err;
      }
   }

   async getSymptomsByIds(symptomIds = []) {
      try {
         const symptoms = await Symptom.find({ code: { $in: symptomIds } });
         return symptoms;
      } catch (err) {
         this.log.error("Gagal mengambil symptoms:", err.message);
         throw err;
      }
   }

   async getSymptomMap() {
      try {
         const symptoms = await Symptom.find({});
         const map = new Map();

         for (const s of symptoms) {
            map.set(s.code, s);
         }

         return map;
      } catch (err) {
         this.log.error("Gagal membuat symptom map:", err.message);
         throw err;
      }
   }
}

export default SymptomRepository;