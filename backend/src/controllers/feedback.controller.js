import FeedbackService from "../services/feedback.service.js";
import { responseFailed, responseSuccess } from "../utils/response.js";

const feedbackService = new FeedbackService();

export const getAllFeedbacks = async (request, reply) => {
  try {
    const page = request.query.page || 1;
    const feedbacks = await feedbackService.getAllFeedbacks(page);
    const payload = responseSuccess(
      "Berhasil mengambil data feedback",
      feedbacks
    );
    reply.status(200).send(payload);
  } catch (error) {
    const payload = responseFailed(
      "Gagal mengambil data feedback",
      error.message
    );
    reply.status(500).send(payload);
  }
};

export const createFeedback = async (request, reply) => {
  try {
    const feedback = await feedbackService.createFeedback(request.body);
    const payload = responseSuccess("Feedback berhasil dikirim", feedback);
    reply.status(201).send(payload);
  } catch (error) {
    const payload = responseFailed("Gagal mengirim feedback", error.message);
    reply.status(500).send(payload);
  }
};
