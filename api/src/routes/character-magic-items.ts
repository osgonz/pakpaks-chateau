import express from 'express';
import magicItemController from '../controllers/magic-items';
import { requireAuth } from '../middleware/auth';

const router = express.Router({mergeParams: true});

// POST route to create a magic item
router.post('/create', requireAuth, magicItemController.createMagicItem);

// GET route for one character's magic items
router.get('/', magicItemController.getMagicItemsByCharacter);

// GET route for one magic item
router.get('/:id', magicItemController.getMagicItem);

// POST route to update a magic item
router.post('/:id', requireAuth, magicItemController.updateMagicItem);

// DELETE route for a magic item
router.delete('/:id', requireAuth, magicItemController.deleteMagicItem);

export default router;