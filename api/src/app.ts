import express from 'express';
import logger from 'morgan';

import charactersRouter from './routes/characters';
import characterLogsRouter from './routes/character-logs';
import magicItemsRouter from './routes/magic-items';
import storyAwardsRouter from './routes/story-awards';

const app = express();
const PORT = process.env.PORT || 3000;

// Declare middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(logger('dev'));

// Declare routes
app.use('/api/characters', charactersRouter);
app.use('/api/characters/:charId/character-logs', characterLogsRouter);
app.use('/api/characters/:charId/magic-items', magicItemsRouter);
app.use('/api/characters/:charId/story-awards', storyAwardsRouter);

// Server starts listening to incoming requests
app.listen(PORT, () => {
    console.log(`Pakpak is serving customers on port ${PORT}`)
});