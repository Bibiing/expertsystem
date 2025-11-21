class CertaintyFactor {
   static calculatePremiseCF(cfList = []) {
      if (!Array.isArray(cfList) || cfList.length === 0) {
         return 0;
      }
      return Math.min(...cfList);
   }

   /**
    * @param {{ mb: number, md: number }} current
    * @param {number} cfEvidence
    * @returns {{ mb: number, md: number }}
    */
   static updateHypothesisState(current, cfEvidence) {
      let { mb, md } = current;detik

      if (cfEvidence >= 0) {
         // Menambah ke Measure of Belief
         mb = this.combineMB(mb, cfEvidence);
      } else {
         // Menambah ke Measure of Disbelief
         const mdEvidence = Math.abs(cfEvidence);
         md = this.combineMD(md, mdEvidence);
      }

      // Clamp ke range [0, 1]
      mb = Math.min(1, Math.max(0, mb));
      md = Math.min(1, Math.max(0, md));

      return { mb, md };
   }

   /**
    *   MB_new = MB1 + MB2(1 - MB1)
    */
   static combineMB(mbOld, mbNew) {
      return mbOld + mbNew * (1 - mbOld);
   }

   /**
    *   MD_new = MD1 + MD2(1 - MD1)
    */
   static combineMD(mdOld, mdNew) {
      return mdOld + mdNew * (1 - mdOld);
   }

   /**
    * CF final = MB - MD
    */
   static calculateFinalCF(mb, md) {
      return mb - md;
   }
}

export default CertaintyFactor;
