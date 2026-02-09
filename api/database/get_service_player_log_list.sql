DELIMITER //
CREATE OR REPLACE PROCEDURE get_service_player_log_list()
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
            GROUP_CONCAT(m.compoundName SEPARATOR ', ') AS magicItemNames,
            GROUP_CONCAT(s.name SEPARATOR ', ') AS storyAwardNames
        FROM characterlog l
        LEFT JOIN (
            SELECT CASE
            WHEN flavorName IS NULL
            THEN name
            ELSE CONCAT(flavorName, ' (', NAME, ')')
            END AS compoundName,
            originLogId
            FROM magicitem
        ) AS m ON m.originLogId = l.id
        LEFT JOIN (
            SELECT name,
            originLogId
            FROM storyaward
        ) AS s ON s.originLogId = l.id
        WHERE l.serviceHours <> 0 OR l.type = 3
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
    ) AS i ON i.lossLogId = lm.id
    GROUP BY lm.id;
END; //
DELIMITER ;