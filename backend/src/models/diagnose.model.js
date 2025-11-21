import mongoose from "mongoose";

const DiagnoseSchema = new mongoose.Schema(
   {
      disease_id: {
         type: String,
         ref: "Disease",
         required: true,
      },

      // Simpan name agar tidak perlu lookup saat membuat /stats
      disease_name: {
         type: String,
         required: true,
      },

      // Array of chosen symptoms with certainty
      symptoms: [
         {
            symptom_id: {
               type: String,
               ref: "Symptom",
               required: true,
            },
            certainty: {
               type: Number,
               min: 0,
               max: 1,
               required: true,
            },
            symptom_name: {
               type: String,
               required: true,
            },
         }
      ],

      final_score: {
         type: Number,
         min: 0,
         max: 1,
         required: true,
      },
   },
   { timestamps: true }
);

DiagnoseSchema.index({ disease_id: 1 });
DiagnoseSchema.index({ createdAt: -1 });
DiagnoseSchema.index({ "symptoms.symptom_id": 1 });

export default mongoose.model("Diagnose", DiagnoseSchema);
