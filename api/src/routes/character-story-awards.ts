import express from 'express';
import storyAwardController from '../controllers/story-awards';
import { optionalAuth, requireAuth } from '../middleware/auth';

const router = express.Router({mergeParams: true});

// GET route for one character's story awards
router.get('/', optionalAuth, storyAwardController.getStoryAwardsByCharacter);

// POST route to create a story award
router.post('/create', requireAuth, storyAwardController.createStoryAward);

// GET route for one story award
router.get('/:id', optionalAuth, storyAwardController.getStoryAward);

// POST route to update a story award
router.post('/:id', requireAuth, storyAwardController.updateStoryAward);

// DELETE route for a story award
router.delete('/:id', requireAuth, storyAwardController.deleteStoryAward);

export default router;