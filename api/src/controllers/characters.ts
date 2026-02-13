import { Request, Response } from 'express';
import { execute } from '../connection';

class CharacterController {
    // Get all characters
    getCharacters = async (req: Request, res: Response) => {
        const userId = req.userId!;
        
        const [characters] = await execute("call get_character_list(?)", [userId]);
        res.status(200).send(characters);
    };

    // Get a character
    getCharacter = async (req: Request, res: Response) => {
        const userId = req.userId!;
        // Extract character id from parameter
        const id = req.params.id;
        
        const [character] = await execute("call get_character(?,?)", [
                id,
                userId
            ]);
        res.status(200).send(character[0]);
    };

    // Create a character
    createCharacter = async (req: Request, res: Response) => {
        const userId = req.userId!;
        // Extract character payload from request body
        const characterContent = req.body;
        
        const [result] = await execute("call create_character(?,?,?,?,?,?,?,?,?,?)", [
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
    };

    // Update a character
    updateCharacter = async (req: Request, res: Response) => {
        const userId = req.userId!;
        // Extract character id from parameter
        const id = req.params.id;
        // Extract character payload from request body
        const characterContent = req.body;
        
        const result = await execute("call update_character(?,?,?,?,?,?,?,?,?,?,?)", [
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
    };

    // Delete a character
    deleteCharacter = async (req: Request, res: Response) => {
        const userId = req.userId!;
        // Extract character id from parameter
        const id = req.params.id;
        
        const result = await execute("call delete_character(?,?)", [
            id,
            userId
        ]);
        if (result.affectedRows === 0) {
            res.status(403).send('Forbidden');
        } else {
            res.status(204).send();
        }
    };
};

export default new CharacterController();