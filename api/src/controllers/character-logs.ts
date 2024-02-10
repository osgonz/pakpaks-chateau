import { Request, Response } from 'express';

class CharacterLogController {
    // Get a specific character's logs
    getCharacterLogsByCharacter = async (req: Request, res: Response) => {
        // Extract character id from parameter
        const characterId = req.params.id;
        // TODO: Call to storage to fetch character logs
        const logs = [
            {
                id: "testInitialEquipmentLog",
                type: 2,
                title: "Initial Equipment",
                timestamp: new Date("2022-07-10T22:11:00.000-08:00"),
                location: "Some Poor Fella's Shop (tm)",
                dmName: null,
                dmDci: null,
                lengthHours: 0,
                gold: 15,
                downtime: 0,
                levels: 0,
                serviceHours: 0,
                traderCharacterId: null,
                traderCharacterName: null,
                traderOtherPlayer: null,
                description: null,
                characterId: characterId,
            },
            {
                id: "testDDAL0706Log",
                type: 0,
                title: "DDAL07-06 Fester and Burn",
                timestamp: new Date("2022-07-11T15:00:00.000-08:00"),
                location: "Pocket Mission (Roll20)",
                dmName: "Mlouden03",
                dmDci: null,
                lengthHours: 4,
                gold: 283.32,
                downtime: 10,
                levels: 1,
                serviceHours: 0,
                traderCharacterId: null,
                traderCharacterName: null,
                traderOtherPlayer: null,
                description: "Party details will be added later. Succeeded in saving Mandolin, the tabaxi Harper agent.",
                characterId: characterId,
            },
        ];
        res.status(200).send(logs);
    };

    // Get a magic item
    getCharacterLog = async (req: Request, res: Response) => {
        // Extract character log id from parameter
        const id = req.params.id;
        // Extract character id from parameter
        const characterId = req.params.charId;
        // TODO: Call to storage to fetch character log
        const log = {
            id: id,
            type: 1,
            title: "Initial Equipment",
            timestamp: new Date("2022-07-10T22:11:00.000-08:00"),
            location: "Some Poor Fella's Shop (tm)",
            dmName: null,
            dmDci: null,
            lengthHours: 0,
            gold: 15,
            downtime: 0,
            levels: 0,
            serviceHours: 0,
            traderCharacterId: null,
            traderCharacterName: null,
            traderOtherPlayer: null,
            description: null,
            characterId: "test",
        };
        res.status(200).send(log);
    };
};

export default new CharacterLogController();