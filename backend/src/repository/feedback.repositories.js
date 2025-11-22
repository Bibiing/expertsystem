import Feedback from "../models/feedback.model.js";

class FeedbackRepository {
   constructor(logger) {
      this.log = logger || console;
   }

   async createFeedback(feedback) {
      const newFeedback = new Feedback(feedback);
      return newFeedback.save();
   }

   async getAllFeedbacks(offset, limit) {
      return Feedback.find({}).skip(offset).limit(limit);
   }

   async countFeedbacks() {
      return Feedback.countDocuments({});
   }

   async totalFeedbacksPerCategory() {
      return Feedback.aggregate([
         {
            $group: {
               _id: "$category",
               count: { $sum: 1 }
            }
         },
         {
            $project: {
               _id: 0,
               category: "$_id",
               count: 1
            }
         },
         { $sort: { count: -1 } }
      ]);
   }

}

export default FeedbackRepository;