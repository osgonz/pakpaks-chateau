import express from 'express';
import magicItemController from '../controllers/magic-items';

const router = express.Router({mergeParams: true});

// GET route for one magic item
router.get('/:id', magicItemController.getMagicItem);

export default router;