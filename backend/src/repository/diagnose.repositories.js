import Diagnose from "../models/diagnose.model.js";

class DiagnoseRepository {
   async countDiagnoses() {
      return Diagnose.countDocuments();
   }

   async topDiseases() {
      return Diagnose.aggregate([
         {
            $group: {
               _id: "$disease_id",
               disease_name: { $first: "$disease_name" },
               count: { $sum: 1 }
            }
         },
         { $sort: { count: -1 } },
         { $limit: 5 }
      ]);
   }

   async topSymptoms() {
      return Diagnose.aggregate([
         { $unwind: "$symptoms" },
         {
            $group: {
               _id: "$symptoms.symptom_id",
               symptom_name: { $first: "$symptoms.symptom_name" },
               count: { $sum: 1 }
            }
         },
         { $sort: { count: -1 } },
         { $limit: 5 }
      ]);
   }

   async trendDiagnose() {
      return Diagnose.aggregate([
         { $group: { _id: "$date", count: { $sum: 1 } } },
         { $sort: { count: -1 } },
         { $limit: 5 }
      ])
   }

   async createDiagnose(data) {
      return Diagnose.create(data);
   }
}

export default DiagnoseRepository;