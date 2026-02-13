import { Request, Response } from 'express';
import { format } from 'date-fns';
import { execute } from '../connection';

class DMLogController {
    // Get all DM logs
    getDMLogs = async (req: Request, res: Response) => {
        const userId = req.userId!;
        
        const [logs] = await execute("call get_dm_log_list(?)", [userId]);
        res.status(200).send(logs);
    };

    // Get a DM log
    getDMLog = async (req: Request, res: Response) => {
        const userId = req.userId!;
        // Extract DM log id from parameter
        const id = req.params.id;
        
        const [log] = await execute("call get_dm_log(?,?)", [id, userId]);
        res.status(200).send(log[0]);
    };

    // Create a DM log
    createDMLog = async (req: Request, res: Response) => {
        const userId = req.userId!;
        // Extract log payload from request body
        const logContent = req.body;
        
        const [result] = await execute("call create_dm_log(?,?,?,?,?,?,?)", [
            logContent.title,
            format(logContent.timestamp as Date, "yyyy-MM-dd HH:mm:ss"),
            logContent.location,
            logContent.lengthHours,
            logContent.serviceHours,
            logContent.description,
            userId
        ]);
        const newId = result[0].newId;

        if (!newId) {
            res.status(403).send("Forbidden");
        } else {
            res.status(200).send(newId);
        }
    };

    // Update a DM log
    updateDMLog = async (req: Request, res: Response) => {
        const userId = req.userId!;
        // Extract DM log id from parameter
        const id = req.params.id;
        // Extract log payload from request body
        const logContent = req.body;
        
        const result = await execute("call update_dm_log(?,?,?,?,?,?,?,?)", [
            id,
            logContent.title,
            format(logContent.timestamp as Date, "yyyy-MM-dd HH:mm:ss"),
            logContent.location,
            logContent.lengthHours,
            logContent.serviceHours,
            logContent.description,
            userId
        ]);
        if (result.affectedRows === 0) {
            res.status(403).send('Forbidden');
        } else {
            res.status(204).send();
        }
    };

    // Delete a DM log
    deleteDMLog = async (req: Request, res: Response) => {
        const userId = req.userId!;
        // Extract DM log id from parameter
        const id = req.params.id;
        
        const result = await execute("call delete_dm_log(?,?)", [
            id,
            userId
        ]);
        if (result.affectedRows === 0) {
            res.status(403).send('Forbidden');
        } else {
            res.status(204).send();
        }
    };
};

export default new DMLogController();