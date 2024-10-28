import express from 'express';
import characterLogController from '../controllers/character-logs';
import magicItemController from '../controllers/magic-items';
import storyAwardController from '../controllers/story-awards';

const router = express.Router({mergeParams: true});

// POST route to create a character log
router.post('/create', characterLogController.createCharacterLog);

// POST route to update a character log
router.post('/:id', characterLogController.updateCharacterLog);

// GET route for a character log
router.get('/:id', characterLogController.getCharacterLog);

// GET route for a character log's magic items
router.get('/:id/magic-items', magicItemController.getMagicItemsByCharacterLog);

// GET route for a character log's story awards
router.get('/:id/story-awards', storyAwardController.getStoryAwardsByCharacterLog);

// DELETE route for a character log
router.delete('/:id', characterLogController.deleteCharacterLog);

export default router;