import dotenv from 'dotenv';
dotenv.config();

import buildServer from './app.js';
import connectDB from './config/database.js';

const PORT = process.env.PORT || 3001;
const HOST = process.env.HOST || '0.0.0.0';

const server = buildServer();

(async function startServer() {
   try {
      await connectDB();

      await server.listen({
         port: PORT,
         host: HOST,
      });

      console.log(`Server berjalan di http://${HOST}:${PORT}`);
   } catch (err) {
      server.log
         ? server.log.error(err)
         : console.error('Error saat memulai server:', err);
      process.exit(1);
   }
})();