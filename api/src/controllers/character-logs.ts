import { PoolConnection } from 'mariadb';
import db from '../connection';
import { Request, Response } from 'express';

class CharacterLogController {
    // Get a specific character's logs
    getCharacterLogsByCharacter = async (req: Request, res: Response) => {
        // Extract character id from parameter
        const characterId = req.params.id;
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
};

export default new CharacterLogController();