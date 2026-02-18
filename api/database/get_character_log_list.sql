DELIMITER //
CREATE OR REPLACE PROCEDURE get_character_log_list
(
    character_id UUID,
    user_id UUID
)
READS SQL DATA
BEGIN
    SELECT lm.*,
        GROUP_CONCAT(i.compoundName SEPARATOR ', ') AS lostMagicItemNames,
        CASE
            WHEN user_id IS NOT NULL AND c.userId = user_id THEN 1
            ELSE 0
        END AS isOwner
    FROM (
        SELECT ls.*,
            GROUP_CONCAT(m.compoundName SEPARATOR ', ') AS magicItemNames
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
                GROUP_CONCAT(s.name SEPARATOR ', ') AS storyAwardNames
            FROM characterlog l
            LEFT JOIN (
                SELECT name,
                originLogId
                FROM storyaward
                WHERE characterId = character_id
            ) AS s ON s.originLogId = l.id
            WHERE l.characterId = character_id
            GROUP BY l.id
        ) AS ls
        LEFT JOIN (
            SELECT CASE
            WHEN flavorName IS NULL
            THEN name
            ELSE CONCAT(flavorName, ' (', NAME, ')')
            END AS compoundName,
            originLogId
            FROM magicitem
            WHERE characterId = character_id
        ) AS m ON m.originLogId = ls.id
        GROUP BY ls.id
    ) AS lm
    JOIN `character` c ON c.id = lm.characterId
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