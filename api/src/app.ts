import 'dotenv/config';
import cookies from 'cookie-parser';
import express from 'express';
import logger from 'morgan';

import indexRouter from './routes';

const app = express();
const PORT = process.env.PORT || 3000;

// Declare middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookies());
app.use(logger('dev'));

// Declare routes
app.use('/api', indexRouter);

// Server starts listening to incoming requests
app.listen(PORT, () => {
    console.log(`Pakpak is serving customers on port ${PORT}`)
});