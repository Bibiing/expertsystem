import KnowledgeBaseService from './knowledge_base.service.js';

class SymptomService {
   constructor(logger) {
      this.kbService = new KnowledgeBaseService();
      this.log = logger || console;
   }

   async getAllSymptoms() {
      try {
         return await this.kbService.getAllSymptoms();
      } catch (err) {
         this.log.error(`Gagal mengambil data gejala: ${err.message}`);
         throw err;
      }
   }
}

export default SymptomService;