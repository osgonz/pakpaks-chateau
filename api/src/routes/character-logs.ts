import express from 'express';
import characterLogController from '../controllers/character-logs';
import magicItemController from '../controllers/magic-items';
import storyAwardController from '../controllers/story-awards';
import { optionalAuth, requireAuth } from '../middleware/auth';

const router = express.Router({mergeParams: true});

// GET route for one character's logs
router.get('/', optionalAuth, characterLogController.getCharacterLogsByCharacter);

// GET route for one character's logs dropdown abstract
router.get('/abstracts', characterLogController.getCharacterLogsDropdownByCharacter);

// POST route to create a character log
router.post('/create', requireAuth, characterLogController.createCharacterLog);

// GET route for a character log
router.get('/:id', optionalAuth, characterLogController.getCharacterLog);

// POST route to update a character log
router.post('/:id', requireAuth, characterLogController.updateCharacterLog);

// DELETE route for a character log
router.delete('/:id', requireAuth, characterLogController.deleteCharacterLog);

// POST route to add lost magic items to a character log
router.post('/:id/lost-magic-items', requireAuth, magicItemController.updateMagicItemsLostByCharacterLog);

// GET route for a character log's magic items
router.get('/:id/magic-items', magicItemController.getMagicItemsByCharacterLog);

// GET route for a character log's lost magic items
router.get('/:id/lost-magic-items', magicItemController.getMagicItemsLostByCharacterLog);

// GET route for a character log's story awards
router.get('/:id/story-awards', storyAwardController.getStoryAwardsByCharacterLog);

export default router;