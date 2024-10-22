import { PoolConnection } from 'mariadb';
import db from '../connection';
import { Request, Response } from 'express';

class CharacterController {
    // Get all characters
    getCharacters = async (req: Request, res: Response) => {
        let conn: PoolConnection | undefined;
        // TODO: Replace call below with stored procedure
        try {
            conn = await db.getConnection();
            const characters = await conn.query("SELECT * FROM `character`");
            res.status(200).send(characters);
        } finally {
            if (conn) {
                conn.release();
            }
        }
    };

    // Get a character
    getCharacter = async (req: Request, res: Response) => {
        // Extract character id from parameter
        const id = req.params.id;
        let conn: PoolConnection | undefined;
        // TODO: Replace call below with stored procedure
        try {
            conn = await db.getConnection();
            const character = await conn.query("SELECT * FROM `character` WHERE id = (?) LIMIT 1", [id]);
            res.status(200).send(character[0]);
        } finally {
            if (conn) {
                conn.release();
            }
        }
    };
};

export default new CharacterController();