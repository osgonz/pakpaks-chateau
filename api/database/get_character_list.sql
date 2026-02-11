DELIMITER //
CREATE OR REPLACE PROCEDURE get_character_list
(user_id UUID)
READS SQL DATA
BEGIN
    SELECT c.id,
        c.name,
        c.campaign,
        c.lineage,
        c.classes,
        c.background,
        c.backstory,
        c.notes,
        c.characterSheetLink,
        c.imageUrl,
        1 + l.gainedLevels AS characterLevel
    FROM `character` c
    LEFT JOIN (
        SELECT characterId,
        SUM(levels) AS gainedLevels
        FROM characterlog
        GROUP BY characterId
    ) AS l ON c.id = l.characterId
    WHERE c.userId = user_id;
END; //
DELIMITER ;