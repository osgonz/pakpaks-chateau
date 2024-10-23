DELIMITER //
CREATE OR REPLACE PROCEDURE get_character_log_list
(character_id UUID)
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
    FROM characterLog
    WHERE characterId = character_id;
END; //
DELIMITER ;