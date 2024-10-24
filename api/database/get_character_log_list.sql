DELIMITER //
CREATE OR REPLACE PROCEDURE get_character_log_list
(character_id UUID)
READS SQL DATA
BEGIN
    SELECT lm.*,
        GROUP_CONCAT(i.compoundName SEPARATOR ', ') AS lostMagicItemNames
    FROM (
        SELECT l.id,
            l.type,
            l.title,
            l.timestamp,
            l.location,
            l.dmName,
            l.dmDci,
            l.lengthHours,
            l.gold,
            l.downtime,
            l.levels,
            l.serviceHours,
            l.traderCharacterId,
            l.traderCharacterName,
            l.traderOtherPlayer,
            l.description,
            l.characterId,
            GROUP_CONCAT(m.compoundName SEPARATOR ', ') AS magicItemNames
        FROM characterlog l
        LEFT JOIN (
            SELECT CASE
            WHEN flavorName IS NULL
            THEN name
            ELSE CONCAT(flavorName, ' (', NAME, ')')
            END AS compoundName,
            originLogId
            FROM magicitem
            WHERE characterId = character_id
        ) AS m ON m.originLogId = l.id
        WHERE l.characterId = character_id
        GROUP BY l.id
    ) AS lm
    LEFT JOIN (
        SELECT CASE
        WHEN flavorName IS NULL
        THEN name
        ELSE CONCAT(flavorName, ' (', NAME, ')')
        END AS compoundName,
        lossLogId
        FROM magicitem
        WHERE characterId = character_id
    ) AS i ON i.lossLogId = lm.id
    GROUP BY lm.id;
END; //
DELIMITER ;