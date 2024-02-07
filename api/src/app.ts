import express from 'express';
import logger from 'morgan';

import charactersRouter from './routes/characters';

const app = express();
const PORT = process.env.PORT || 3000;

// Declare middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(logger('dev'));

// Declare routes
app.use('/api/characters', charactersRouter);

// Server starts listening to incoming requests
app.listen(PORT, () => {
    console.log(`Pakpak is serving customers on port ${PORT}`)
});