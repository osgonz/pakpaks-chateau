import { PoolConnection } from 'mariadb';
import db from '../connection';
import { Request, Response } from 'express';

class CharacterController {
    // Get all characters
    getCharacters = async (req: Request, res: Response) => {
        const userId = req.userId!;
        let conn: PoolConnection | undefined;
        try {
            conn = await db.getConnection();
            const [characters] = await conn.execute("call get_character_list(?)", [userId]);
            res.status(200).send(characters);
        } finally {
            if (conn) {
                conn.release();
            }
        }
    };

    // Get a character
    getCharacter = async (req: Request, res: Response) => {
        const userId = req.userId!;
        // Extract character id from parameter
        const id = req.params.id;
        let conn: PoolConnection | undefined;
        try {
            conn = await db.getConnection();
            const [character] = await conn.execute("call get_character(?,?)", [
                id,
                userId
            ]);
            res.status(200).send(character[0]);
        } finally {
            if (conn) {
                conn.release();
            }
        }
    };

    // Create a character
    createCharacter = async (req: Request, res: Response) => {
        const userId = req.userId!;
        // Extract character payload from request body
        const characterContent = req.body;
        let conn: PoolConnection | undefined;
        try {
            conn = await db.getConnection();
            const [result] = await conn.query("call create_character(?,?,?,?,?,?,?,?,?,?)", [
                characterContent.name,
                characterContent.campaign,
                characterContent.lineage,
                characterContent.classes,
                characterContent.background,
                characterContent.backstory,
                characterContent.notes,
                characterContent.characterSheetLink,
                characterContent.imageUrl,
                userId
            ]);
            const newId = result[0].newId;

            if (!newId) {
                res.status(403).send("Forbidden");
            } else {
                res.status(200).send(newId);
            }
        } finally {
            if (conn) {
                conn.release();
            }
        }
    };

    // Update a character
    updateCharacter = async (req: Request, res: Response) => {
        const userId = req.userId!;
        // Extract character id from parameter
        const id = req.params.id;
        // Extract character payload from request body
        const characterContent = req.body;
        let conn: PoolConnection | undefined;
        try {
            conn = await db.getConnection();
            const result = await conn.query("call update_character(?,?,?,?,?,?,?,?,?,?,?)", [
                id,
                characterContent.name,
                characterContent.campaign,
                characterContent.lineage,
                characterContent.classes,
                characterContent.background,
                characterContent.backstory,
                characterContent.notes,
                characterContent.characterSheetLink,
                characterContent.imageUrl,
                userId
            ]);
            if (result.affectedRows === 0) {
                res.status(403).send('Forbidden');
            } else {
                res.status(204).send();
            }
        } finally {
            if (conn) {
                conn.release();
            }
        }
    };

    // Delete a character
    deleteCharacter = async (req: Request, res: Response) => {
        const userId = req.userId!;
        // Extract character id from parameter
        const id = req.params.id;
        let conn: PoolConnection | undefined;
        try {
            conn = await db.getConnection();
            const result = await conn.query("call delete_character(?,?)", [
                id,
                userId
            ]);
            if (result.affectedRows === 0) {
                res.status(403).send('Forbidden');
            } else {
                res.status(204).send();
            }
        } finally {
            if (conn) {
                conn.release();
            }
        }
    };
};

export default new CharacterController();