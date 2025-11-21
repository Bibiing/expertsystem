import Disease from "../models/disease.model.js";
import Symptom from "../models/symptom.model.js";
import Rule from "../models/rule.model.js";

class RuleRepository {
   constructor(logger) {
      this.log = logger || console;
   }

   async getAllRules() {
      try {
         const rules = await Rule.find({});
         return rules;
      } catch (err) {
         this.log.error("Gagal mengambil rules:", err.message);
         throw err;
      }
   }

   async getRuleBundle() {
      try {
         const [rules, symptoms, diseases] = await Promise.all([
            Rule.find({}),
            Symptom.find({}),
            Disease.find({})
         ]);

         return { rules, symptoms, diseases };
      } catch (err) {
         this.log.error("Gagal mengambil knowledge base bundle:", err.message);
         throw err;
      }
   }
}

export default RuleRepository;