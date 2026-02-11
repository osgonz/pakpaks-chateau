DELIMITER //
CREATE OR REPLACE PROCEDURE delete_magic_item
(
    item_id UUID,
    character_id UUID,
    user_id UUID
)
READS SQL DATA
BEGIN
    DELETE mi
    FROM magicitem mi
    JOIN `character` c ON mi.characterId = c.id
    WHERE mi.id = item_id
    AND mi.characterId = character_id
    AND c.userId = user_id;
END; //
DELIMITER ;