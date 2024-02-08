import { Request, Response } from 'express';

class StoryAwardController {
    // Get a specific character's story awards
    getStoryAwardsByCharacter = async (req: Request, res: Response) => {
        // Extract character id from parameter
        const characterId = req.params.id;
        // TODO: Call to storage to fetch story awards
        const awards = [
            {
                id: "testStoryAwardOne",
                name: "Uneasy Alliance",
                description: `Damita Uthros is alive, and you "might" be allies.`,
                status: 1,
                characterId: characterId,
                originLogId: "testDDAL0706Log",
            },
            {
                id: "testStoryAwardTwo",
                name: "A Giant Challenge",
                description: `You have earned the respect of Prince Thornacious. He challenges you to befriend a giant, as he has done with you, (Huge sized humanoid), without using charm effects. If you do, (DMs judgement), you may spend five downtime days to return to Thornacious, who uses Heart Sight to tell if you are true of heart. He bestows upon you the title: Adoness (Peacekeeper). This title grants you advantage on Charisma ability checks with good aligned fey.`,
                status: 0,
                characterId: characterId,
                originLogId: "TestLogTwo",
            },
        ];
        res.status(200).send(awards);
    };

    // Get a specific character log's story awards
    getStoryAwardsByCharacterLog = async (req: Request, res: Response) => {
        // Extract character log id from parameter
        const logId = req.params.id;
        // Extract character id from parameter
        const characterId = req.params.charId;
        // TODO: Call to storage to fetch story awards
        // TODO: Validate if characterId param matches characterId within story award
        const awards = [
            {
                id: "testStoryAwardOne",
                name: "Uneasy Alliance",
                description: `Damita Uthros is alive, and you "might" be allies.`,
                status: 1,
                characterId: "test",
                originLogId: logId,
            },
        ];
        res.status(200).send(awards);
    };

    // Get a story award
    getStoryAward = async (req: Request, res: Response) => {
        // Extract story award id from parameter
        const id = req.params.id;
        // Extract character id from parameter
        const characterId = req.params.charId;
        // TODO: Call to storage to fetch story award data
        // TODO: Validate if characterId param matches characterId within story award
        const award = {
            id: id,
            name: "Uneasy Alliance",
            description: `Damita Uthros is alive, and you "might" be allies.`,
            status: 1,
            characterId: "test",
            originLogId: "testDDAL0706Log",
        };
        res.status(200).send(award);
    };
};

export default new StoryAwardController();