import express from 'express';
import dmLogController from '../controllers/dm-logs';

const router = express.Router({mergeParams: true});

// GET route for all DM logs
router.get('/', dmLogController.getDMLogs);

// GET route for a DM log
router.get('/:id', dmLogController.getDMLog);

// POST route to update a DM log
router.post('/:id', dmLogController.updateDMLog);

// DELETE route for a DM log
router.delete('/:id', dmLogController.deleteDMLog);

// POST route to create a DM log
router.post('/create', dmLogController.createDMLog);

export default router;