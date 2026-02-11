DELIMITER //
CREATE OR REPLACE PROCEDURE get_character_log
(
    log_id UUID, 
    character_id UUID,
    user_id UUID
)
READS SQL DATA
BEGIN
    SELECT cl.id,
        cl.type,
        cl.title,
        cl.timestamp,
        cl.location,
        cl.dmName,
        cl.dmDci,
        cl.lengthHours,
        cl.gold,
        cl.downtime,
        cl.levels,
        cl.serviceHours,
        cl.traderCharacterId,
        cl.traderCharacterName,
        cl.traderOtherPlayer,
        cl.description,
        cl.characterId,
        CASE
            WHEN user_id IS NOT NULL AND c.userId = user_id THEN 1
            ELSE 0
        END AS isOwner
    FROM characterlog cl
    JOIN `character` c ON cl.characterId = c.id
    WHERE cl.id = log_id
    AND cl.characterId = character_id;
END; //
DELIMITER ;