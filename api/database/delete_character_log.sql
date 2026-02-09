DELIMITER //
CREATE OR REPLACE PROCEDURE delete_character_log
(
    log_id UUID,
    character_id UUID
)
READS SQL DATA
BEGIN
    DELETE
    FROM characterlog
    WHERE id = log_id
    AND characterId = character_id;
END; //
DELIMITER ;