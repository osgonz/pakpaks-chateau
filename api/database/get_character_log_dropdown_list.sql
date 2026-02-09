DELIMITER //
CREATE OR REPLACE PROCEDURE get_character_log_dropdown_list
(character_id UUID)
READS SQL DATA
BEGIN
    SELECT id,
        title,
        timestamp
    FROM characterlog
    WHERE characterId = character_id;
END; //
DELIMITER ;