import express from 'express';
import path from 'path';
import cors from 'cors';
import dotenv from 'dotenv';
import morgan from 'morgan';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';

import { restRouter } from './routes/api';
import { errorHandler } from './middleware/error';

// Load env vars
dotenv.config();

export const app = express();

// Enabling cors
app.use(cors());

// Enabling helmet
app.use(helmet());

// Limiting each IP to 100 requests per windowMs
if (process.env.NODE_ENV === 'prodcution') {
  const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 200,
  });

  app.use('/rest', limiter);
}

// body parsing middleware
app.use(express.json());
app.use(
  express.urlencoded({
    extended: true,
  }),
);

// Dev logging middleware
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

// Defining Routes
app.use('/api', restRouter);

// Serve static assets in production
if (process.env.NODE_ENV === 'production') {
  // Set static folder
  app.use(express.static(path.join(__dirname, 'client/dist')));

  app.get('*', (_req, res) =>
    res.sendFile(path.resolve(__dirname, 'client', 'dist', 'index.html')),
  );
}

app.use(errorHandler);
