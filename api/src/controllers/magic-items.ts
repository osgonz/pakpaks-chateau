import { PoolConnection } from 'mariadb';
import db from '../connection';
import { Request, Response } from 'express';

class MagicItemController {
    // Get a specific character's magic items
    getMagicItemsByCharacter = async (req: Request, res: Response) => {
        // Extract character id from parameter
        const characterId = req.params.id;
        let conn: PoolConnection | undefined;
        // TODO: Should front end take care of filtering out items with a lossLogId?
        try {
            conn = await db.getConnection();
            const [items] = await conn.query("call get_character_magic_item_list(?)", [characterId]);
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
        // TODO: Rethink if characterId validation should happen during or after query
        try {
            conn = await db.getConnection();
            const [items] = await conn.query("call get_character_log_magic_item_list(?,?)", [logId, characterId]);
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
        // TODO: Rethink if characterId validation should happen during or after query
        try {
            conn = await db.getConnection();
            const [magicItem] = await conn.query("call get_magic_item(?,?)", [id, characterId]);
            res.status(200).send(magicItem[0]);
        } finally {
            if (conn) {
                conn.release();
            }
        }
    };

    // Create a magic item
    createMagicItem = async (req: Request, res: Response) => {
        // Extract character id from parameter
        const characterId = req.params.charId;
        // Extract magic item payload from request body
        const itemContent = req.body;
        let conn: PoolConnection | undefined;
        try {
            conn = await db.getConnection();
            const [result] = await conn.query("call create_magic_item(?,?,?,?,?,?,?,?,?,?,?,?,?)", [
                itemContent.name,
                itemContent.flavorName,
                itemContent.type,
                itemContent.rarity,
                itemContent.isConsumable,
                itemContent.requiresAttunement,
                itemContent.description,
                itemContent.flavorDescription,
                itemContent.properties,
                itemContent.isEquipped,
                characterId,
                itemContent.originLogId,
                itemContent.lossLogId
            ]);
            res.status(200).send(result[0].newId);
        } finally {
            if (conn) {
                conn.release();
            }
        }
    };

    // Update a magic item
    updateMagicItem = async (req: Request, res: Response) => {
        // Extract magic item id from parameter
        const id = req.params.id;
        // Extract character id from parameter
        const characterId = req.params.charId;
        // Extract magic item payload from request body
        const itemContent = req.body;
        let conn: PoolConnection | undefined;
        try {
            conn = await db.getConnection();
            await conn.query("call update_magic_item(?,?,?,?,?,?,?,?,?,?,?,?,?,?)", [
                id,
                itemContent.name,
                itemContent.flavorName,
                itemContent.type,
                itemContent.rarity,
                itemContent.isConsumable,
                itemContent.requiresAttunement,
                itemContent.description,
                itemContent.flavorDescription,
                itemContent.properties,
                itemContent.isEquipped,
                characterId,
                itemContent.originLogId,
                itemContent.lossLogId
            ]);
            res.status(204).send();
        } finally {
            if (conn) {
                conn.release();
            }
        }
    };

    // Delete a magic item
    deleteMagicItem = async (req: Request, res: Response) => {
        // Extract magic item id from parameter
        const id = req.params.id;
        // Extract character id from parameter
        const characterId = req.params.charId;
        let conn: PoolConnection | undefined;
        try {
            conn = await db.getConnection();
            await conn.query("call delete_magic_item(?,?)", [
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

export default new MagicItemController();