DELIMITER //
CREATE OR REPLACE PROCEDURE delete_magic_item
(
    item_id UUID,
    character_id UUID
)
READS SQL DATA
BEGIN
    DELETE
    FROM magicItem
    WHERE id = item_id
    AND characterId = character_id;
END; //
DELIMITER ;