import { PoolConnection } from 'mariadb';
import db from '../connection';
import { Request, Response } from 'express';

class StoryAwardController {
    // Get a specific character's story awards
    getStoryAwardsByCharacter = async (req: Request, res: Response) => {
        // Extract character id from parameter
        const characterId = req.params.id;
        let conn: PoolConnection | undefined;
        try {
            conn = await db.getConnection();
            const [awards] = await conn.query("call get_character_story_award_list(?)", [characterId]);
            res.status(200).send(awards);
        } finally {
            if (conn) {
                conn.release();
            }
        }
    };

    // Get a specific character log's story awards
    getStoryAwardsByCharacterLog = async (req: Request, res: Response) => {
        // Extract character log id from parameter
        const logId = req.params.id;
        // Extract character id from parameter
        const characterId = req.params.charId;
        let conn: PoolConnection | undefined;
        // TODO: Rethink if characterId validation should happen during or after query
        try {
            conn = await db.getConnection();
            const [awards] = await conn.query("call get_character_log_story_award_list(?,?)", [logId, characterId]);
            res.status(200).send(awards);
        } finally {
            if (conn) {
                conn.release();
            }
        }
    };

    // Get a story award
    getStoryAward = async (req: Request, res: Response) => {
        // Extract story award id from parameter
        const id = req.params.id;
        // Extract character id from parameter
        const characterId = req.params.charId;
        let conn: PoolConnection | undefined;
        // TODO: Rethink if characterId validation should happen during or after query
        try {
            conn = await db.getConnection();
            const [award] = await conn.query("call get_story_award(?,?)", [id, characterId]);
            res.status(200).send(award[0]);
        } finally {
            if (conn) {
                conn.release();
            }
        }
    };

    // Create a story award
    createStoryAward = async (req: Request, res: Response) => {
        // Extract character id from parameter
        const characterId = req.params.charId;
        // Extract story award payload from request body
        const awardContent = req.body;
        let conn: PoolConnection | undefined;
        try {
            conn = await db.getConnection();
            const [result] = await conn.query("call create_story_award(?,?,?,?,?)", [
                awardContent.name,
                awardContent.description,
                awardContent.status,
                characterId,
                awardContent.originLogId
            ]);
            res.status(200).send(result[0].newId);
        } finally {
            if (conn) {
                conn.release();
            }
        }
    };

    // Update a story award
    updateStoryAward = async (req: Request, res: Response) => {
        // Extract story award id from parameter
        const id = req.params.id;
        // Extract character id from parameter
        const characterId = req.params.charId;
        // Extract story award payload from request body
        const awardContent = req.body;
        let conn: PoolConnection | undefined;
        try {
            conn = await db.getConnection();
            await conn.query("call update_story_award(?,?,?,?,?,?)", [
                id,
                awardContent.name,
                awardContent.description,
                awardContent.status,
                characterId,
                awardContent.originLogId
            ]);
            res.status(204).send();
        } finally {
            if (conn) {
                conn.release();
            }
        }
    };

    // Delete a story award
    deleteStoryAward = async (req: Request, res: Response) => {
        // Extract story award id from parameter
        const id = req.params.id;
        // Extract character id from parameter
        const characterId = req.params.charId;
        let conn: PoolConnection | undefined;
        try {
            conn = await db.getConnection();
            await conn.query("call delete_story_award(?,?)", [
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

export default new StoryAwardController();