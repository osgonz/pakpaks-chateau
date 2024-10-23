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
};

export default new StoryAwardController();