import mongoose from "mongoose";

const DiseaseSchema = new mongoose.Schema({
   _id: {
      type: String,
      required: true,
   },
   name: {
      type: String,
      required: true,
   },
   description: String,
   treatment: String,
}, { timestamps: true });

export default mongoose.model("Disease", DiseaseSchema);
