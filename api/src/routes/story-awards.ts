import express from 'express';
import storyAwardController from '../controllers/story-awards';

const router = express.Router({mergeParams: true});

// POST route to create a story award
router.post('/create', storyAwardController.createStoryAward);

// POST route to update a story award
router.post('/:id', storyAwardController.updateStoryAward);

// GET route for one story award
router.get('/:id', storyAwardController.getStoryAward);

// DELETE route for a story award
router.delete('/:id', storyAwardController.deleteStoryAward);

export default router;