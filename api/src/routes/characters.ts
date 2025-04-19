import express from 'express';
import characterController from '../controllers/characters';
import characterLogController from '../controllers/character-logs';
import magicItemController from '../controllers/magic-items';
import storyAwardController from '../controllers/story-awards';

const router = express.Router();

// GET route for all characters
router.get('/', characterController.getCharacters);

// GET route for one character
router.get('/:id', characterController.getCharacter);

// GET route for one character's logs
router.get('/:id/character-logs', characterLogController.getCharacterLogsByCharacter);

// GET route for one character's logs dropdown abstract
router.get('/:id/character-logs-dropdown', characterLogController.getCharacterLogsDropdownByCharacter);

// GET route for one character's magic items
router.get('/:id/magic-items', magicItemController.getMagicItemsByCharacter);

// GET route for one character's story awards
router.get('/:id/story-awards', storyAwardController.getStoryAwardsByCharacter);

export default router;