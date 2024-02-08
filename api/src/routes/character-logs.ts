import express from 'express';
import characterLogController from '../controllers/character-logs';

const router = express.Router({mergeParams: true});

// GET route for a character log
router.get('/:id', characterLogController.getCharacterLog);

export default router;