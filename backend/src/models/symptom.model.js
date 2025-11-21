import mongoose from "mongoose";

const SymptomSchema = new mongoose.Schema({
   _id: {
      type: String,
      required: true,
   },
   name: {
      type: String,
      required: true,
   },
   description: String,
}, { timestamps: true });

export default mongoose.model("Symptom", SymptomSchema);
