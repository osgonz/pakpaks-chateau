import express from 'express';
import magicItemController from '../controllers/magic-items';

const router = express.Router({mergeParams: true});

// POST route to create a magic item
router.post('/create', magicItemController.createMagicItem);

// POST route to update a magic item
router.post('/:id', magicItemController.updateMagicItem);

// GET route for all magic items
router.get('/', magicItemController.getMagicItemsByPlayer);

// GET route for one magic item
router.get('/:id', magicItemController.getMagicItem);

// DELETE route for a magic item
router.delete('/:id', magicItemController.deleteMagicItem);

export default router;