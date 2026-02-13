import { Request, Response } from 'express';
import { format } from 'date-fns';
import { execute } from '../connection';

class CharacterLogController {
    // Get a specific character's logs
    getCharacterLogsByCharacter = async (req: Request, res: Response) => {
        const userId = req.userId!;
        // Extract character id from parameter
        const characterId = req.params.charId;

        const [logs] = await execute("call get_character_log_list(?,?)", [
            characterId,
            userId
        ]);
        res.status(200).send(logs);
    };

    // Get a specific character's log abstract for UI dropdowns
    getCharacterLogsDropdownByCharacter = async (req: Request, res: Response) => {
        // Extract character id from parameter
        const characterId = req.params.charId;

        const [logs] = await execute("call get_character_log_dropdown_list(?)", [characterId]);
        res.status(200).send(logs);
    };

    // Get a character log
    getCharacterLog = async (req: Request, res: Response) => {
        const userId = req.userId!;
        // Extract character log id from parameter
        const id = req.params.id;
        // Extract character id from parameter
        const characterId = req.params.charId;

        // TODO: Rethink if characterId validation should happen during or after query
        const [log] = await execute("call get_character_log(?,?,?)", [
            id, 
            characterId,
            userId
        ]);
        res.status(200).send(log[0]);
    };

    // Get all player logs with either service hour changes or service awards
    getServicePlayerLogs = async (req: Request, res: Response) => {
        const userId = req.userId!;

        const [logs] = await execute("call get_service_player_log_list(?)", [userId]);
        res.status(200).send(logs);
    };

    // Create a character log
    createCharacterLog = async (req: Request, res: Response) => {
        const userId = req.userId!;
        // Extract character id from parameter
        const characterId = req.params.charId;
        // Extract log payload from request body
        const logContent = req.body;
        
        const [result] = await execute("call create_character_log(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)", [
            logContent.type,
            logContent.title,
            format(logContent.timestamp as Date, "yyyy-MM-dd HH:mm:ss"),
            logContent.location,
            logContent.dmName,
            logContent.dmDci,
            logContent.lengthHours,
            logContent.gold,
            logContent.downtime,
            logContent.levels,
            logContent.serviceHours,
            logContent.traderCharacterName,
            logContent.traderOtherPlayer,
            logContent.description,
            characterId,
            userId
        ]);
        const newId = result[0].newId;

        if (!newId) {
            res.status(403).send("Forbidden");
        } else {
            res.status(200).send(newId);
        }
    };

    // Update a character log
    updateCharacterLog = async (req: Request, res: Response) => {
        const userId = req.userId!;
        // Extract character log id from parameter
        const id = req.params.id;
        // Extract character id from parameter
        const characterId = req.params.charId;
        // Extract log payload from request body
        const logContent = req.body;
        
        const result = await execute("call update_character_log(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)", [
            id,
            logContent.title,
            format(logContent.timestamp as Date, "yyyy-MM-dd HH:mm:ss"),
            logContent.location,
            logContent.dmName,
            logContent.dmDci,
            logContent.lengthHours,
            logContent.gold,
            logContent.downtime,
            logContent.levels,
            logContent.serviceHours,
            logContent.traderCharacterName,
            logContent.traderOtherPlayer,
            logContent.description,
            characterId,
            userId
        ]);
        if (result.affectedRows === 0) {
            res.status(403).send('Forbidden');
        } else {
            res.status(204).send();
        }
    };

    // Delete a character log
    deleteCharacterLog = async (req: Request, res: Response) => {
        const userId = req.userId!;
        // Extract character log id from parameter
        const id = req.params.id;
        // Extract character id from parameter
        const characterId = req.params.charId;
        
        const result = await execute("call delete_character_log(?,?,?)", [
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

export default new CharacterLogController();