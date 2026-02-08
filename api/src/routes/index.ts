import express from 'express';

import characterLogController from '../controllers/character-logs';
import magicItemController from '../controllers/magic-items';

import charactersRouter from './characters';
import dmLogsRouter from './dm-logs';

const router = express.Router({mergeParams: true});

// GET route for all magic items
router.get('/magic-items', magicItemController.getMagicItems);
router.get('/player-logs/service', characterLogController.getServicePlayerLogs);

// Declare routers
router.use('/characters', charactersRouter);
router.use('/dm-logs', dmLogsRouter);

export default router;