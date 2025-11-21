export const DiagnoseBodySchema = {
   body: {
      type: "object",
      required: ["symptoms"],
      properties: {
         symptoms: {
            type: "array",
            minItems: 1,
            items: {
               type: "object",
               required: ["symptom_id", "certainty"],
               properties: {
                  symptom_id: { type: "string", minLength: 1 },
                  certainty: { type: "number", minimum: 0, maximum: 1 }
               }
            }
         }
      }
   }
};
