import express from 'express';
import magicItemController from '../controllers/magic-items';

const router = express.Router({mergeParams: true});

// POST route to create a magic item
router.post('/create', magicItemController.createMagicItem);

// GET route for one character's magic items
router.get('/', magicItemController.getMagicItemsByCharacter);

// GET route for one magic item
router.get('/:id', magicItemController.getMagicItem);

// POST route to update a magic item
router.post('/:id', magicItemController.updateMagicItem);

// DELETE route for a magic item
router.delete('/:id', magicItemController.deleteMagicItem);

export default router;