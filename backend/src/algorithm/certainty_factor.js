/**
 * Certainty Factor Utility
 * ------------------------
 * Menerapkan metode CF (MYCIN) untuk sistem pakar rule-based.
 *
 * Fitur:
 * - Perhitungan CF standar (tanpa XAI).
 * - Perhitungan CF dengan penjelasan lengkap (XAI).
 *
 * Rumus dasar:
 *   CF = MB - MD
 *
 * Kombinasi (MYCIN):
 *   MB_new = MB_old + MB_user * (1 - MB_old)
 *   MD_new = MD_old + MD_user * (1 - MD_old)
 */

class CertaintyFactor {
   // ---------------------------------------------------
   // 1. Mengambil CF Premis (AND → minimum)
   // ---------------------------------------------------
   static calculatePremiseCF(cfList = []) {
      if (!Array.isArray(cfList) || cfList.length === 0) return 0;
      return Math.min(...cfList);
   }

   // ---------------------------------------------------
   // 2. Kombinasi MB standar
   // ---------------------------------------------------
   static combineMB(mbOld, mbNew) {
      return mbOld + mbNew * (1 - mbOld);
   }

   // ---------------------------------------------------
   // 3. Kombinasi MD standar
   // ---------------------------------------------------
   static combineMD(mdOld, mdNew) {
      return mdOld + mdNew * (1 - mdOld);
   }

   // ---------------------------------------------------
   // 4. CF Final
   // ---------------------------------------------------
   static calculateFinalCF(mb, md) {
      return mb - md;
   }

   // =================================================================
   // ⬇⬇⬇  XAI MODE: fungsi yang mengembalikan hasil + penjelasan  ⬇⬇⬇
   // =================================================================

   /**
    * Kombinasi MB dengan penjelasan XAI
    */
   static combineMB_XAI(mbOld, mbNew) {
      const result = mbOld + mbNew * (1 - mbOld);

      const explanation =
         `MB_new = ${mbOld.toFixed(3)} + ${mbNew.toFixed(3)} × (1 - ${mbOld.toFixed(3)}) = ${result.toFixed(3)}`;

      return { result, explanation };
   }

   /**
    * Kombinasi MD dengan penjelasan XAI
    */
   static combineMD_XAI(mdOld, mdNew) {
      const result = mdOld + mdNew * (1 - mdOld);

      const explanation =
         `MD_new = ${mdOld.toFixed(3)} + ${mdNew.toFixed(3)} × (1 - ${mdOld.toFixed(3)}) = ${result.toFixed(3)}`;

      return { result, explanation };
   }

   /**
    * Menghasilkan CF final dengan penjelasan XAI
    */
   static calculateFinalCF_XAI(mb, md) {
      const result = mb - md;
      const explanation = `CF_final = MB - MD = ${mb.toFixed(3)} - ${md.toFixed(3)} = ${result.toFixed(3)}`;
      return { result, explanation };
   }

   /**
    * Mengupdate state hipotesis dengan XAI  
    * menghasilkan:
    * - MB_new  
    * - MD_new  
    * - penjelasan langkah demi langkah
    */
   static updateHypothesisState_XAI(currentState, MB_user, MD_user) {
      const steps = [];

      // MB
      const mbCalc = CertaintyFactor.combineMB_XAI(currentState.mb, MB_user);
      steps.push(mbCalc.explanation);

      // MD
      const mdCalc = CertaintyFactor.combineMD_XAI(currentState.md, MD_user);
      steps.push(mdCalc.explanation);

      return {
         newState: { mb: mbCalc.result, md: mdCalc.result },
         explanationSteps: steps
      };
   }
}

export default CertaintyFactor;
