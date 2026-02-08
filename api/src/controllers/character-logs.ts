import { PoolConnection } from 'mariadb';
import { format } from 'date-fns';
import db from '../connection';
import { Request, Response } from 'express';

class CharacterLogController {
    // Get a specific character's logs
    getCharacterLogsByCharacter = async (req: Request, res: Response) => {
        // Extract character id from parameter
        const characterId = req.params.charId;
        let conn: PoolConnection | undefined;
        try {
            conn = await db.getConnection();
            const [logs] = await conn.query("call get_character_log_list(?)", [characterId]);
            res.status(200).send(logs);
        } finally {
            if (conn) {
                conn.release();
            }
        }
    };

    // Get a specific character's log abstract for UI dropdowns
    getCharacterLogsDropdownByCharacter = async (req: Request, res: Response) => {
        // Extract character id from parameter
        const characterId = req.params.charId;
        let conn: PoolConnection | undefined;
        try {
            conn = await db.getConnection();
            const [logs] = await conn.query("call get_character_log_dropdown_list(?)", [characterId]);
            res.status(200).send(logs);
        } finally {
            if (conn) {
                conn.release();
            }
        }
    };

    // Get a character log
    getCharacterLog = async (req: Request, res: Response) => {
        // Extract character log id from parameter
        const id = req.params.id;
        // Extract character id from parameter
        const characterId = req.params.charId;
        let conn: PoolConnection | undefined;
        // TODO: Rethink if characterId validation should happen during or after query
        try {
            conn = await db.getConnection();
            const [log] = await conn.query("call get_character_log(?,?)", [id, characterId]);
            res.status(200).send(log[0]);
        } finally {
            if (conn) {
                conn.release();
            }
        }
    };

    // Get all player logs with either service hour changes or service awards
    getServicePlayerLogs = async (req: Request, res: Response) => {
        let conn: PoolConnection | undefined;
        try {
            conn = await db.getConnection();
            const [logs] = await conn.query("call get_service_player_log_list()");
            res.status(200).send(logs);
        } finally {
            if (conn) {
                conn.release();
            }
        }
    };

    // Create a character log
    createCharacterLog = async (req: Request, res: Response) => {
        // Extract character id from parameter
        const characterId = req.params.charId;
        // Extract log payload from request body
        const logContent = req.body;
        let conn: PoolConnection | undefined;
        try {
            conn = await db.getConnection();
            const [result] = await conn.query("call create_character_log(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)", [
                logContent.type,
                logContent.title,
                format(logContent.timestamp as Date, "yyyy-MM-dd HH:mm:ss"),
                logContent.location,
                logContent.dmName,
                logContent.dmDci,
                logContent.lengthHours,
                logContent.gold,
                logContent.downtime,
                logContent.levels,
                logContent.serviceHours,
                logContent.traderCharacterName,
                logContent.traderOtherPlayer,
                logContent.description,
                characterId
            ]);
            res.status(200).send(result[0].newId);
        } finally {
            if (conn) {
                conn.release();
            }
        }
    };

    // Update a character log
    updateCharacterLog = async (req: Request, res: Response) => {
        // Extract character log id from parameter
        const id = req.params.id;
        // Extract character id from parameter
        const characterId = req.params.charId;
        // Extract log payload from request body
        const logContent = req.body;
        let conn: PoolConnection | undefined;
        try {
            conn = await db.getConnection();
            await conn.query("call update_character_log(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)", [
                id,
                logContent.title,
                format(logContent.timestamp as Date, "yyyy-MM-dd HH:mm:ss"),
                logContent.location,
                logContent.dmName,
                logContent.dmDci,
                logContent.lengthHours,
                logContent.gold,
                logContent.downtime,
                logContent.levels,
                logContent.serviceHours,
                logContent.traderCharacterName,
                logContent.traderOtherPlayer,
                logContent.description,
                characterId
            ]);
            res.status(204).send();
        } finally {
            if (conn) {
                conn.release();
            }
        }
    };

    // Delete a character log
    deleteCharacterLog = async (req: Request, res: Response) => {
        // Extract character log id from parameter
        const id = req.params.id;
        // Extract character id from parameter
        const characterId = req.params.charId;
        let conn: PoolConnection | undefined;
        try {
            conn = await db.getConnection();
            await conn.query("call delete_character_log(?,?)", [
                id,
                characterId
            ]);
            res.status(204).send();
        } finally {
            if (conn) {
                conn.release();
            }
        }
    };
};

export default new CharacterLogController();