import { PoolConnection } from 'mariadb';
import db from '../connection';
import { Request, Response } from 'express';

class MagicItemController {
    // Get a specific character's magic items
    getMagicItemsByCharacter = async (req: Request, res: Response) => {
        // Extract character id from parameter
        const characterId = req.params.id;
        let conn: PoolConnection | undefined;
        // TODO: Replace call below with stored procedure
        // TODO: Should front end take care of filtering out items with a lossLogId?
        try {
            conn = await db.getConnection();
            const items = await conn.query("SELECT * FROM magicItem WHERE characterId = (?) AND lossLogId IS NULL", [characterId]);
            res.status(200).send(items);
        } finally {
            if (conn) {
                conn.release();
            }
        }
    };

    // Get a specific character log's magic items
    getMagicItemsByCharacterLog = async (req: Request, res: Response) => {
        // Extract character log id from parameter
        const logId = req.params.id;
        // Extract character id from parameter
        const characterId = req.params.charId;
        let conn: PoolConnection | undefined;
        // TODO: Replace call below with stored procedure
        // TODO: Rethink if characterId validation should happen during or after query
        try {
            conn = await db.getConnection();
            const items = await conn.query("SELECT * FROM magicItem WHERE originLogId = (?) AND characterId = (?)", [logId, characterId]);
            res.status(200).send(items);
        } finally {
            if (conn) {
                conn.release();
            }
        }
    };

    // Get a magic item
    getMagicItem = async (req: Request, res: Response) => {
        // Extract magic item id from parameter
        const id = req.params.id;
        // Extract character id from parameter
        const characterId = req.params.charId;
        let conn: PoolConnection | undefined;
        // TODO: Replace call below with stored procedure
        // TODO: Rethink if characterId validation should happen during or after query
        try {
            conn = await db.getConnection();
            const magicItem = await conn.query("SELECT * FROM magicItem WHERE id = (?) AND characterId = (?)", [id, characterId]);
            res.status(200).send(magicItem[0]);
        } finally {
            if (conn) {
                conn.release();
            }
        }
    };
};

export default new MagicItemController();