import express from 'express';

import charactersRouter from './characters';
import dmLogsRouter from './dm-logs';
import magicItemsRouter from './magic-items';

const router = express.Router({mergeParams: true});

// Declare routers
router.use('/characters', charactersRouter);
router.use('/dm-logs', dmLogsRouter);
router.use('/magic-items', magicItemsRouter);

export default router;