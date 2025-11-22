import mongoose from "mongoose";

const RuleSchema = new mongoose.Schema({
   disease_id: {
      type: String,
      ref: "Disease",
      required: true,
   },
   symptom_id: {
      type: String,
      ref: "Symptom",
      required: true,
   },
   mb: {
      type: Number,
      min: 0,
      max: 1,
      required: true,
   },
   md: {
      type: Number,
      min: 0,
      max: 1,
      required: true,
   },
   expert_notes: String,
}, { timestamps: true });

RuleSchema.index({ disease_id: 1, symptom_id: 1 }, { unique: true });

export default mongoose.model("Rule", RuleSchema);
