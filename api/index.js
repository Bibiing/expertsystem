import buildServer from '../backend/src/app.js';
import connectDB from '../backend/src/config/database.js';

const app = buildServer();
let isConnected = false;

export default async function handler(req, res) {
  if (!isConnected) {
    await connectDB();
    isConnected = true;
  }
  await app.ready();
  app.server.emit('request', req, res);
}
