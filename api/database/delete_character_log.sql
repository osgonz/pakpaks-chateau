DELIMITER //
CREATE OR REPLACE PROCEDURE delete_character_log
(
    log_id UUID,
    character_id UUID,
    user_id UUID
)
READS SQL DATA
BEGIN
    DELETE cl
    FROM characterlog cl
    JOIN `character` c ON cl.characterId = c.id
    WHERE cl.id = log_id
    AND cl.characterId = character_id
    AND c.userId = user_id;
END; //
DELIMITER ;