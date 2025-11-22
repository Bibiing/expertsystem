import StatsService from "../services/stats.service.js";
import { responseFailed, responseSuccess } from "../utils/response.js";

const statsService = new StatsService();

export async function getStats(request, reply) {
   try {
      const stats = await statsService.getStats();
      const payload = responseSuccess("Berhasil mengambil statistik", stats)
      reply.status(200).send(payload);
   } catch (error) {
      const payload = responseFailed("Internal Server Error", "Gagal mengambil statistik: " + error.message)
      reply.status(500).send(payload);
   }
}