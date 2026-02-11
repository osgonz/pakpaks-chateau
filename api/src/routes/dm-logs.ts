import express from 'express';
import dmLogController from '../controllers/dm-logs';
import { optionalAuth, requireAuth } from '../middleware/auth';

const router = express.Router({mergeParams: true});

// GET route for all DM logs
router.get('/', requireAuth, dmLogController.getDMLogs);

// POST route to create a DM log
router.post('/create', requireAuth, dmLogController.createDMLog);

// GET route for a DM log
router.get('/:id', optionalAuth, dmLogController.getDMLog);

// POST route to update a DM log
router.post('/:id', requireAuth, dmLogController.updateDMLog);

// DELETE route for a DM log
router.delete('/:id', requireAuth, dmLogController.deleteDMLog);

export default router;