import { Request, Response } from 'express';
import { execute } from '../connection';

class MagicItemController {
    // Get all magic items
    getMagicItems = async (req: Request, res: Response) => {
        const userId = req.userId!;
        
        const [items] = await execute("call get_magic_item_list(?)", [userId]);
        res.status(200).send(items);
    };
    
    // Get a specific character's magic items
    getMagicItemsByCharacter = async (req: Request, res: Response) => {
        const userId = req.userId!;
        // Extract character id from parameter
        const characterId = req.params.charId;
        
        // TODO: Should front end take care of filtering out items with a lossLogId?
        const [items] = await execute("call get_character_magic_item_list(?,?)", [
            characterId,
            userId
        ]);
        res.status(200).send(items);
    };

    // Get a specific character log's magic items
    getMagicItemsByCharacterLog = async (req: Request, res: Response) => {
        // Extract character log id from parameter
        const logId = req.params.id;
        // Extract character id from parameter
        const characterId = req.params.charId;
        
        const [items] = await execute("call get_character_log_magic_item_list(?,?)", [logId, characterId]);
        res.status(200).send(items);
    };

    // Get a specific character log's lost magic items
    getMagicItemsLostByCharacterLog = async (req: Request, res: Response) => {
        // Extract character log id from parameter
        const logId = req.params.id;
        // Extract character id from parameter
        const characterId = req.params.charId;
        
        const [items] = await execute("call get_character_log_lost_magic_item_list(?,?)", [logId, characterId]);
        res.status(200).send(items);
    };

    // Get a magic item
    getMagicItem = async (req: Request, res: Response) => {
        const userId = req.userId!;
        // Extract magic item id from parameter
        const id = req.params.id;
        // Extract character id from parameter
        const characterId = req.params.charId;
        
        const [magicItem] = await execute("call get_magic_item(?,?,?)", [
            id, 
            characterId,
            userId
        ]);
        res.status(200).send(magicItem[0]);
    };

    // Create a magic item
    createMagicItem = async (req: Request, res: Response) => {
        const userId = req.userId!;
        // Extract character id from parameter
        const characterId = req.params.charId;
        // Extract magic item payload from request body
        const itemContent = req.body;
        
        const [result] = await execute("call create_magic_item(?,?,?,?,?,?,?,?,?,?,?,?,?,?)", [
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
            itemContent.lossLogId,
            userId
        ]);
        const newId = result[0].newId;

        if (!newId) {
            res.status(403).send("Forbidden");
        } else {
            res.status(200).send(newId);
        }
    };

    // Update a magic item
    updateMagicItem = async (req: Request, res: Response) => {
        const userId = req.userId!;
        // Extract magic item id from parameter
        const id = req.params.id;
        // Extract character id from parameter
        const characterId = req.params.charId;
        // Extract magic item payload from request body
        const itemContent = req.body;
        
        const result = await execute("call update_magic_item(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)", [
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
            itemContent.lossLogId,
            userId
        ]);
        if (result.affectedRows === 0) {
            res.status(403).send('Forbidden');
        } else {
            res.status(204).send();
        }
    };

    // Update a specific character log's lost magic items
    updateMagicItemsLostByCharacterLog = async (req: Request, res: Response) => {
        const userId = req.userId!;
        // Extract character log id from parameter
        const logId = req.params.id;
        // Extract character id from parameter
        const characterId = req.params.charId;
        // Extract magic item payload from request body
        const itemContent = req.body;
        
        const result = await execute("call update_character_log_lost_magic_item_list(?,?,?,?,?)", [
            characterId,
            logId,
            JSON.stringify(itemContent.lostItemIdsToAdd),
            JSON.stringify(itemContent.lostItemIdsToRemove),
            userId
        ]);
        if (result.affectedRows === 0) {
            res.status(403).send('Forbidden');
        } else {
            res.status(204).send();
        }
    };

    // Delete a magic item
    deleteMagicItem = async (req: Request, res: Response) => {
        const userId = req.userId!;
        // Extract magic item id from parameter
        const id = req.params.id;
        // Extract character id from parameter
        const characterId = req.params.charId;
        
        const result = await execute("call delete_magic_item(?,?,?)", [
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

export default new MagicItemController();