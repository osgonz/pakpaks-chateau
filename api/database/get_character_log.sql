DELIMITER //
CREATE OR REPLACE PROCEDURE get_character_log
(log_id UUID, 
character_id UUID)
READS SQL DATA
BEGIN
    SELECT id,
        type,
        title,
        timestamp,
        location,
        dmName,
        dmDci,
        lengthHours,
        gold,
        downtime,
        levels,
        serviceHours,
        traderCharacterId,
        traderCharacterName,
        traderOtherPlayer,
        description,
        characterId
    FROM characterlog
    WHERE id = log_id
    AND characterId = character_id;
END; //
DELIMITER ;