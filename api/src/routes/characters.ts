import express from 'express';
import characterController from '../controllers/characters';
import { requireAuth } from '../middleware/auth';
import characterLogsRouter from './character-logs';
import magicItemsRouter from './character-magic-items';
import storyAwardsRouter from './character-story-awards';

const router = express.Router();

// GET route for all characters
router.get('/', requireAuth, characterController.getCharacters);

// POST route to create a character
router.post('/create', requireAuth, characterController.createCharacter);

// GET route for one character
router.get('/:id', characterController.getCharacter);

// POST route to update a character
router.post('/:id', requireAuth, characterController.updateCharacter);

// DELETE route for a character
router.delete('/:id', requireAuth, characterController.deleteCharacter);

// Declare child routers
router.use('/:charId/character-logs', characterLogsRouter);
router.use('/:charId/magic-items', magicItemsRouter);
router.use('/:charId/story-awards', storyAwardsRouter);

export default router;