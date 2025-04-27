import { PoolConnection } from 'mariadb';
import { format } from 'date-fns';
import db from '../connection';
import { Request, Response } from 'express';

class DMLogController {
    // Get all DM logs
    getDMLogs = async (req: Request, res: Response) => {
        let conn: PoolConnection | undefined;
        try {
            conn = await db.getConnection();
            const [logs] = await conn.query("call get_dm_log_list()");
            res.status(200).send(logs);
        } finally {
            if (conn) {
                conn.release();
            }
        }
    };

    // Get a DM log
    getDMLog = async (req: Request, res: Response) => {
        // Extract DM log id from parameter
        const id = req.params.id;
        let conn: PoolConnection | undefined;
        try {
            conn = await db.getConnection();
            const [log] = await conn.query("call get_dm_log(?)", [id]);
            res.status(200).send(log[0]);
        } finally {
            if (conn) {
                conn.release();
            }
        }
    };

    // Create a DM log
    createDMLog = async (req: Request, res: Response) => {
        // Extract log payload from request body
        const logContent = req.body;
        let conn: PoolConnection | undefined;
        try {
            conn = await db.getConnection();
            const [result] = await conn.query("call create_dm_log(?,?,?,?,?,?)", [
                logContent.title,
                format(logContent.timestamp as Date, "yyyy-MM-dd HH:mm:ss"),
                logContent.location,
                logContent.lengthHours,
                logContent.serviceHours,
                logContent.description
            ]);
            res.status(200).send(result[0].newId);
        } finally {
            if (conn) {
                conn.release();
            }
        }
    };

    // Update a DM log
    updateDMLog = async (req: Request, res: Response) => {
        // Extract DM log id from parameter
        const id = req.params.id;
        // Extract log payload from request body
        const logContent = req.body;
        let conn: PoolConnection | undefined;
        try {
            conn = await db.getConnection();
            await conn.query("call update_dm_log(?,?,?,?,?,?,?)", [
                id,
                logContent.title,
                format(logContent.timestamp as Date, "yyyy-MM-dd HH:mm:ss"),
                logContent.location,
                logContent.lengthHours,
                logContent.serviceHours,
                logContent.description
            ]);
            res.status(204).send();
        } finally {
            if (conn) {
                conn.release();
            }
        }
    };

    // Delete a DM log
    deleteDMLog = async (req: Request, res: Response) => {
        // Extract DM log id from parameter
        const id = req.params.id;
        let conn: PoolConnection | undefined;
        try {
            conn = await db.getConnection();
            await conn.query("call delete_dm_log(?)", [id]);
            res.status(204).send();
        } finally {
            if (conn) {
                conn.release();
            }
        }
    };
};

export default new DMLogController();