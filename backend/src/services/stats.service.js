import DiagnoseRepository from "../repository/diagnose.repositories.js";
import FeedbackRepository from "../repository/feedback.repositories.js";

class StatsService {
   constructor(logger) {
      this.log = logger || console;
      this.diagnoseRepo = new DiagnoseRepository(logger);
      this.feedbackRepo = new FeedbackRepository(logger);
   }

   async getStats() {
      const totalDiagnoses = await this.diagnoseRepo.countDiagnoses();
      const topDiseases = await this.diagnoseRepo.topDiseases();
      const topSymptoms = await this.diagnoseRepo.topSymptoms();
      // const trendDiagnose = await this.diagnoseRepo.trendDiagnose();
      const totalFeedbacks = await this.feedbackRepo.countFeedbacks();
      const totalFeedbacksPerCategory = await this.feedbackRepo.totalFeedbacksPerCategory();
      return {
         totalDiagnoses,
         topDiseases,
         topSymptoms,
         // trendDiagnose,
         totalFeedbacks,
         totalFeedbacksPerCategory
      };
   }
}

export default StatsService;