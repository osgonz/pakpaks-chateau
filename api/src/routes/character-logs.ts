import express from 'express';
import characterLogController from '../controllers/character-logs';
import magicItemController from '../controllers/magic-items';
import storyAwardController from '../controllers/story-awards';

const router = express.Router({mergeParams: true});

// GET route for a character log
router.get('/:id', characterLogController.getCharacterLog);

// GET route for a character log's magic items
router.get('/:id/magic-items', magicItemController.getMagicItemsByCharacterLog);

// GET route for a character log's story awards
router.get('/:id/story-awards', storyAwardController.getStoryAwardsByCharacterLog);

export default router;