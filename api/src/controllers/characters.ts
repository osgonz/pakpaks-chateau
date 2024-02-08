import { Request, Response } from 'express';

class CharacterController {
    // Get all characters
    getCharacters = async (req: Request, res: Response) => {
        // TODO: Call to storage to fetch character data
        const characters = [
            {
                id: "test",
                name: "Khal Nightfist",
                campaign: 0,
                lineage: "Half-Orc",
                classes: "Twilight Cleric of Selune 14 / Circle of Stars Druid 2",
                background: "Faction Agent",
                faction: "Harpers",
                lifestyle: 10,
                backstory: null,
                notes: null,
                characterSheetLink: "https://ddb.ac/characters/78117532/2QPdLS",
                imageUrl: null
            },
        ];
        res.status(200).send(characters);
    };

    // Get a character
    getCharacter = async (req: Request, res: Response) => {
        // Extract character id from parameter
        const id = req.params.id;
        // TODO: Call to storage to fetch character data
        const character = {
            id: id,
            name: "Khal Nightfist",
            campaign: 0,
            lineage: "Half-Orc",
            classes: "Twilight Cleric of Selune 14 / Circle of Stars Druid 2",
            background: "Faction Agent",
            faction: "Harpers",
            lifestyle: 10,
            backstory: null,
            notes: null,
            characterSheetLink: "https://ddb.ac/characters/78117532/2QPdLS",
            imageUrl: null
        };
        res.status(200).send(character);
    };
};

export default new CharacterController();