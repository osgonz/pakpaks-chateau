import express from 'express';
import magicItemController from '../controllers/magic-items';

const router = express.Router({mergeParams: true});

// POST route to create a character log
router.post('/create', magicItemController.createMagicItem);

// POST route to update a character log
router.post('/:id', magicItemController.updateMagicItem);

// GET route for one magic item
router.get('/:id', magicItemController.getMagicItem);

// DELETE route for a magic item
router.delete('/:id', magicItemController.deleteMagicItem);

export default router;