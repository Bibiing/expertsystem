export const createFeedbackSchema = {
   body: {
      type: "object",
      required: ["notes", "category"],
      properties: {
         name: { type: 'string' },
         notes: { type: 'string', minLength: 3 },
         category: {
            type: 'string',
            enum: ['pujian', 'keluhan', 'saran', 'lainnya']
         }
      }
   }
}
