import { Request, Response } from 'express';
import { execute } from '../connection';

class StoryAwardController {
    // Get a specific character's story awards
    getStoryAwardsByCharacter = async (req: Request, res: Response) => {
        const userId = req.userId!;
        // Extract character id from parameter
        const characterId = req.params.charId;
        
        const [awards] = await execute("call get_character_story_award_list(?,?)", [
            characterId,
            userId
        ]);
        res.status(200).send(awards);
    };

    // Get a specific character log's story awards
    getStoryAwardsByCharacterLog = async (req: Request, res: Response) => {
        // Extract character log id from parameter
        const logId = req.params.id;
        // Extract character id from parameter
        const characterId = req.params.charId;
        
        const [awards] = await execute("call get_character_log_story_award_list(?,?)", [logId, characterId]);
        res.status(200).send(awards);
    };

    // Get a story award
    getStoryAward = async (req: Request, res: Response) => {
        const userId = req.userId!;
        // Extract story award id from parameter
        const id = req.params.id;
        // Extract character id from parameter
        const characterId = req.params.charId;
        
        const [award] = await execute("call get_story_award(?,?,?)", [
            id, 
            characterId,
            userId
        ]);
        res.status(200).send(award[0]);
    };

    // Create a story award
    createStoryAward = async (req: Request, res: Response) => {
        const userId = req.userId!;
        // Extract character id from parameter
        const characterId = req.params.charId;
        // Extract story award payload from request body
        const awardContent = req.body;
        
        const [result] = await execute("call create_story_award(?,?,?,?,?,?)", [
            awardContent.name,
            awardContent.description,
            awardContent.status,
            characterId,
            awardContent.originLogId,
            userId
        ]);
        const newId = result[0].newId;

        if (!newId) {
            res.status(403).send("Forbidden");
        } else {
            res.status(200).send(newId);
        }
    };

    // Update a story award
    updateStoryAward = async (req: Request, res: Response) => {
        const userId = req.userId!;
        // Extract story award id from parameter
        const id = req.params.id;
        // Extract character id from parameter
        const characterId = req.params.charId;
        // Extract story award payload from request body
        const awardContent = req.body;
        
        const result = await execute("call update_story_award(?,?,?,?,?,?,?)", [
            id,
            awardContent.name,
            awardContent.description,
            awardContent.status,
            characterId,
            awardContent.originLogId,
            userId
        ]);
        if (result.affectedRows === 0) {
            res.status(403).send('Forbidden');
        } else {
            res.status(204).send();
        }
    };

    // Delete a story award
    deleteStoryAward = async (req: Request, res: Response) => {
        const userId = req.userId!;
        // Extract story award id from parameter
        const id = req.params.id;
        // Extract character id from parameter
        const characterId = req.params.charId;
        
        const result = await execute("call delete_story_award(?,?,?)", [
            id,
            characterId,
            userId
        ]);
        if (result.affectedRows === 0) {
            res.status(403).send('Forbidden');
        } else {
            res.status(204).send();
        }
    };
};

export default new StoryAwardController();