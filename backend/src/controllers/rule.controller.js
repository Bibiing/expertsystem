import RuleService from "../services/rule.service.js";
import { responseFailed, responseSuccess } from "../utils/response.js";

const ruleService = new RuleService();

export const getAllRules = async (request, reply) => {
   try {
      const rules = await ruleService.getAllRules();
      const payload = responseSuccess("Berhasil mengambil aturan", rules)
      reply.status(200).send(payload);
   } catch (error) {
      const payload = responseFailed("Internal Server Error", "Gagal mengambil aturan: " + error.message)
      reply.status(500).send(payload);
   }
} 