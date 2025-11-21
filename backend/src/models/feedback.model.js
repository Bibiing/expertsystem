import mongoose from "mongoose";

const FeedbackSchema = new mongoose.Schema({
   name: {
      type: String,
      default: "Anonim",
   },
   notes: {
      type: String,
      required: true,
   },
   category: {
      type: String,
      enum: ["pujian", "keluhan", "saran", "lainnya"],
      required: true
   }

}, { timestamps: true });

FeedbackSchema.index({ category: 1 });
FeedbackSchema.index({ createdAt: -1 })

export default mongoose.model("Feedback", FeedbackSchema);
