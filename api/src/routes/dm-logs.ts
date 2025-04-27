import express from 'express';
import dmLogController from '../controllers/dm-logs';

const router = express.Router({mergeParams: true});

// POST route to create a character log
router.post('/create', dmLogController.createDMLog);

// POST route to update a character log
router.post('/:id', dmLogController.updateDMLog);

// GET route for a character log
router.get('/:id', dmLogController.getDMLog);

// DELETE route for a character log
router.delete('/:id', dmLogController.deleteDMLog);

export default router;