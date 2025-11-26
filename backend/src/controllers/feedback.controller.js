import FeedbackService from "../services/feedback.service.js";
import { responseFailed, responseSuccess } from "../utils/response.js";

const feedbackService = new FeedbackService();

export const getAllFeedbacks = async (request, reply) => {
   try {
      const page = request.query.page || 1;
      const feedbacks = await feedbackService.getAllFeedbacks(page);
      const payload = responseSuccess("Berhasil mengunggah feedback", feedbacks)
      reply.status(201).send(payload);
   } catch (err) {
      const payload = responseFailed("Internal Server Error", "Gagal mengunggah feedback" + error.message)
      reply.status(500).send(payload);
   }
};

export const createFeedback = async (request, reply) => {
   try {
      const userFeedback = request.body;
      const feedback = await feedbackService.createFeedback(userFeedback);
      const payload = responseSuccess("Berhasil mengunggah feedback", feedback)
      reply.status(201).send(payload);
   } catch (error) {
      const payload = responseFailed("Internal Server Error", "Gagal mengunggah feedback" + error.message)
      reply.status(500).send(payload);
   }
};