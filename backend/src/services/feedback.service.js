import FeedbackRepository from '../repository/feedback.repositories.js';

class FeedbackService {
   constructor(logger) {
      this.feedbackRepo = new FeedbackRepository(logger);
   }

   async getAllFeedbacks(page) {
      const limit = 5;
      const offset = (page - 1) * limit;
      return this.feedbackRepo.getAllFeedbacks(offset, limit);
   }

   async createFeedback(feedback) {
      return this.feedbackRepo.createFeedback(feedback);
   }

}

export default FeedbackService;