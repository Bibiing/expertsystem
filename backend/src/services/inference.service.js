import CertaintyFactor from "../algorithm/certainty_factor.js";
import RuleRepository from "../repository/rule.repository.js";
import DiagnoseRepository from "../repository/diagnose.repositories.js";

class InferenceService {
   constructor(logger) {
      this.ruleRepo = new RuleRepository(logger);
      this.diagnoseRepo = new DiagnoseRepository(logger);
      this.log = logger || console;
   }

   /**
    * userInputSymptoms: [
    *   { symptom_id: "buah-busuk-basah", certainty: 0.85 }
    * ]
    */
   async diagnose(userInputSymptoms) {
      this.log.info("Memulai proses diagnosis + XAI...");

      // 1. Ambil semua knowledge base (rules, symptoms, diseases)
      const { rules, symptoms, diseases } = await this.ruleRepo.getRuleBundle();

      // Buat Map lookup cepat untuk detail gejala & penyakit
      const symptomMap = new Map(symptoms.map(s => [s._id, s]));
      const diseaseMap = new Map(diseases.map(d => [String(d._id), d]));

      // 2. Masukkan input user ke Working Memory
      const WM = new Map();
      for (const s of userInputSymptoms) {
         if (s.certainty > 0) {
            WM.set(s.symptom_id, s.certainty);
         }
      }

      // 3. State penyakit dan XAI trace
      const diseaseState = new Map();   // penyakit → { mb, md }
      const explanationTrace = new Map(); // penyakit → XAI obj

      // 4. Eksekusi rules 1 gejala : 1 penyakit
      for (const rule of rules) {
         const { disease_id, symptom_id, mb, md } = rule;

         // Gejala tidak dipilih user → rule di-skip
         if (!WM.has(symptom_id)) continue;
         const userCF = WM.get(symptom_id);

         const MB_user = mb * userCF;
         const MD_user = md * userCF;

         // Ambil state lama
         let current = diseaseState.get(disease_id);
         if (!current) current = { mb: 0, md: 0 };

         // Lakukan kombinasi dengan XAI
         const { newState, explanationSteps } =
            CertaintyFactor.updateHypothesisState_XAI(current, MB_user, MD_user);

         diseaseState.set(disease_id, newState);

         if (!explanationTrace.has(disease_id)) {
            explanationTrace.set(disease_id, {
               disease_id,
               matchedSymptoms: [],
               calculations: []
            });
         }

         const trace = explanationTrace.get(disease_id);

         // Tambah gejala yang match
         trace.matchedSymptoms.push({
            symptom_id,
            symptom_name: symptomMap.get(symptom_id)?.name || symptom_id,
            userCF,
            expertMB: mb,
            expertMD: md,
            MB_user,
            MD_user
         });

         // Tambah langkah perhitungan
         trace.calculations.push(...explanationSteps);
      }

      // 5. Hitung CF final setiap penyakit
      const results = [];

      for (const [diseaseId, state] of diseaseState.entries()) {
         const { result: cfFinal, explanation } =
            CertaintyFactor.calculateFinalCF_XAI(state.mb, state.md);

         if (cfFinal > 0.05) {
            const diseaseDetail = diseaseMap.get(diseaseId);

            results.push({
               id: diseaseId,
               name: diseaseDetail?.name,
               description: diseaseDetail?.description,
               treatment: diseaseDetail?.treatment,
               cf: Number(cfFinal.toFixed(3)),
               explanation: {
                  ...explanationTrace.get(diseaseId),
                  finalCFExplanation: explanation
               }
            });
         }
      }

      // 6. Urutkan hasil tertinggi
      results.sort((a, b) => b.cf - a.cf);
      results.slice(0, 5);

      this.log.info(`Diagnosis selesai: ${results.length} penyakit terdeteksi.`);

      // 7. Menyimpan hasil diagnosis untuk keperluan statistik
      const best = results[0];
      if (best) {
         await this.diagnoseRepo.createDiagnose({
            disease_id: best.id,
            disease_name: best.name,
            symptoms: userInputSymptoms.map(s => ({
               symptom_id: s.symptom_id,
               certainty: s.certainty,
               symptom_name: symptomMap.get(s.symptom_id)?.name
            })),
            final_score: best.cf
         });
      }

      return results
   }
}

export default InferenceService;
