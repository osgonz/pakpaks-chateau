import express from 'express';

import characterLogController from '../controllers/character-logs';
import magicItemController from '../controllers/magic-items';

import { requireAuth } from '../middleware/auth';

import authRouter from './auth';
import charactersRouter from './characters';
import dmLogsRouter from './dm-logs';

const router = express.Router({mergeParams: true});

// GET route for all magic items
router.get('/magic-items', requireAuth, magicItemController.getMagicItems);
// GET route for all service player logs
router.get('/player-logs/service', requireAuth, characterLogController.getServicePlayerLogs);

// Declare routers
router.use('/auth', authRouter);
router.use('/characters', charactersRouter);
router.use('/dm-logs', dmLogsRouter);

export default router;