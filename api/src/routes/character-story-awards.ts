import express from 'express';
import storyAwardController from '../controllers/story-awards';

const router = express.Router({mergeParams: true});

// GET route for one character's story awards
router.get('/', storyAwardController.getStoryAwardsByCharacter);

// POST route to create a story award
router.post('/create', storyAwardController.createStoryAward);

// GET route for one story award
router.get('/:id', storyAwardController.getStoryAward);

// POST route to update a story award
router.post('/:id', storyAwardController.updateStoryAward);

// DELETE route for a story award
router.delete('/:id', storyAwardController.deleteStoryAward);

export default router;