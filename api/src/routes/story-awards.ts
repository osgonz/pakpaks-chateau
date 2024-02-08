import express from 'express';
import storyAwardController from '../controllers/story-awards';

const router = express.Router({mergeParams: true});

// GET route for one magic item
router.get('/:id', storyAwardController.getStoryAward);

export default router;