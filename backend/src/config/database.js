import mongoose from 'mongoose';
import Fastify from 'fastify';

const log = Fastify({ logger: true }).log;

async function connectDB() {
   const MONGODB_URI = process.env.MONGODB_URI;

   if (!MONGODB_URI) {
      log.error('Kesalahan: MONGODB_URI tidak didefinisikan di environment variables.');
      process.exit(1)
   }

   try {
      const options = {
         useNewUrlParser: true,
         useUnifiedTopology: true,
         serverSelectionTimeoutMS: 5000,
      };

      mongoose.set('strictQuery', true);
      log.info('Menghubungkan ke MongoDB...');

      await mongoose.connect(MONGODB_URI, options);
      log.info('MongoDB terhubung sukses.');

      mongoose.connection.on('disconnected', () => {
         log.warn('Koneksi MongoDB terputus.');
      });

      mongoose.connection.on('error', (err) => {
         log.error(`Error koneksi MongoDB: ${err.message}`);
      });

   } catch (error) {
      log.error(`Tidak dapat terhubung ke MongoDB: ${error.message}`);
      process.exit(1);
   }
}

export default connectDB;