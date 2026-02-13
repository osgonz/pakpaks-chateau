import 'dotenv/config';
import cookies from 'cookie-parser';
import cors from 'cors';
import express from 'express';
import logger from 'morgan';

import indexRouter from './routes';
import { closePool } from './connection';

const app = express();
const PORT = process.env.PORT || 3000;

// Declare middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookies());
app.use(cors({
    origin: ["http://localhost:5173", process.env.CLIENT_API_URL || ''],
    credentials: true,
}));
app.use(logger('dev'));

// Declare routes
app.use('/api', indexRouter);

// Server starts listening to incoming requests
app.listen(PORT, () => {
    console.log(`Pakpak is serving customers on port ${PORT}`)
});

// Cleanup methods when process is interrupted or terminated
process.on("SIGTERM", async () => {
  console.log("Shutting down gracefully...");
  await closePool();
  process.exit(0);
});

process.on("SIGINT", async () => {
  console.log("Interrupted. Closing connections...");
  await closePool();
  process.exit(0);
});