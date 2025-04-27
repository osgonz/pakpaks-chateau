import express from 'express';
import characterController from '../controllers/characters';
import characterLogController from '../controllers/character-logs';
import magicItemController from '../controllers/magic-items';
import storyAwardController from '../controllers/story-awards';

const router = express.Router();

// POST route to create a character
router.post('/create', characterController.createCharacter);

// POST route to update a character
router.post('/:id', characterController.updateCharacter);

// GET route for all characters
router.get('/', characterController.getCharacters);

// GET route for one character
router.get('/:id', characterController.getCharacter);

// GET route for one character's logs
router.get('/:id/character-logs', characterLogController.getCharacterLogsByCharacter);

// GET route for one character's magic items
router.get('/:id/magic-items', magicItemController.getMagicItemsByCharacter);

// GET route for one character's story awards
router.get('/:id/story-awards', storyAwardController.getStoryAwardsByCharacter);

// DELETE route for a character
router.delete('/:id', characterController.deleteCharacter);

export default router;