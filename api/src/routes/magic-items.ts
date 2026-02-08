import express from 'express';
import magicItemController from '../controllers/magic-items';

const router = express.Router({mergeParams: true});

// GET route for all magic items
router.get('/', magicItemController.getMagicItems);

export default router;