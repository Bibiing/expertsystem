import Fastify from 'fastify';
import cors from '@fastify/cors';
import helmet from '@fastify/helmet';

import mainRoutes from './routes/index.js';

// Opsi untuk logger: 'pino-pretty' membuat log lebih mudah dibaca saat development
const loggerConfig = process.env.NODE_ENV === 'development'
   ? {
      transport: {
         target: 'pino-pretty',
         options: {
            translateTime: 'HH:MM:ss Z',
            ignore: 'pid,hostname',
         },
      },
   }
   : true; // Gunakan logger JSON standar di production

// Inisialisasi server
const server = Fastify({
   logger: loggerConfig,
   trustProxy: true,
});

/**
 * Fungsi untuk membangun dan mengkonfigurasi server.
 * Memisahkannya agar bisa diimpor untuk testing tanpa langsung berjalan.
 * @returns {FastifyInstance} instance server Fastify
 */
function buildServer() {
   // plugin keamanan dasar
   server.register(helmet, {
      contentSecurityPolicy: false,
   });

   // CORS
   server.register(cors, {
      origin: '*',
      methods: ['GET', 'POST', 'PUT', 'DELETE'],
   });

   // Semua rute akan memiliki prefix /api/v1
   server.register(mainRoutes, { prefix: '/api/v1' });

   // Hook sederhana untuk 'health check'
   server.get('/health', async (request, reply) => {
      return { status: 'ok' };
   });

   // Hook untuk menangani 'route not found'
   server.setNotFoundHandler((request, reply) => {
      server.log.warn(`Route not found: ${request.method} ${request.url}`);
      reply.status(404).send({
         statusCode: 404,
         error: 'Not Found',
         message: 'Route not found',
      });
   });

   return server;
}

export default buildServer;