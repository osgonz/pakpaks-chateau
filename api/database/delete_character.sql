DELIMITER //
CREATE OR REPLACE PROCEDURE delete_character
(
    character_id UUID,
    user_id UUID
)
READS SQL DATA
BEGIN
    DELETE
    FROM `character`
    WHERE id = character_id AND userId = user_id;
END; //
DELIMITER ;