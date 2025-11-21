import RuleRepository from "../repository/rule.repository.js";

class RuleService {
   constructor(logger) {
      this.ruleRepo = new RuleRepository();
      this.log = logger || console;
   }

   async getAllRules() {
      try {
         return await this.ruleRepo.getAllRules();
      } catch (err) {
         this.log.error("Gagal mengambil rules:", err.message);
         throw err;
      }
   }
}

export default RuleService;