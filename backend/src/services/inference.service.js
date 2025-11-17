import KnowledgeBaseService from './knowledge_base.service.js';
import CertaintyFactor from '../algorithm/certainty_factor.js';

class InferenceService {
   constructor(logger) {
      this.kbService = new KnowledgeBaseService();
      this.log = logger || console;
   }

   async diagnose(userInputSymptoms) {
      this.log.info('Memulai diagnosis CF...');

      // 1. Ambil semua rule dari DB
      const allRules = await this.kbService.getAllRules();

      // 2. Working Memory (gejala yang diinput user)
      const wm = new Map();
      for (const s of userInputSymptoms) {
         if (s.certainty > 0.0) {
            wm.set(s.symptom_id, s.certainty);
         }
      }

      // 3. Tempat agregasi MB/MD tiap penyakit
      const diseaseState = new Map();

      // 4. Proses setiap rule
      for (const rule of allRules) {
         const { disease_id, symptom_id, mb, md } = rule;

         if (!wm.has(symptom_id)) continue;

         const userCF = wm.get(symptom_id);
         const MB_user = mb * userCF;
         const MD_user = md * userCF;

         // Ambil state sebelumnya
         let current = diseaseState.get(disease_id);
         if (!current) current = { mb: 0, md: 0 };

         const updated = {
            mb: CertaintyFactor.combineMB(current.mb, MB_user),
            md: CertaintyFactor.combineMD(current.md, MD_user),
         };

         diseaseState.set(disease_id, updated);
      }

      // 5. Hitung CF final
      const results = [];

      for (const [disease_id, state] of diseaseState.entries()) {
         const finalCF = CertaintyFactor.calculateFinalCF(state.mb, state.md);

         if (finalCF > 0.05) {
            results.push({
               id: disease_id,
               cf: finalCF
            });
         }
      }

      // 6. Urutkan CF tertinggi
      results.sort((a, b) => b.cf - a.cf);

      // 7. Ambil detail penyakit
      const ids = results.map(r => r.id);
      const details = await this.kbService.getDiseasesByIds(ids);

      // 8. Gabungkan
      const finalDiagnosis = results.map(r => {
         const d = details.find(x => x.id === r.id);

         return {
            id: r.id,
            name: d?.name || "Penyakit tidak diketahui",
            description: d?.description || "",
            treatment: d?.treatment || "",
            cf: Number(r.cf.toFixed(3)),
         };
      });

      this.log.info(`Diagnosis selesai: ${finalDiagnosis.length} hasil.`);
      return finalDiagnosis;
   }
}

export default InferenceService;
