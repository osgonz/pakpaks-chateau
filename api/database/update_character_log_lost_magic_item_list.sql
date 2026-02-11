DELIMITER //
CREATE OR REPLACE PROCEDURE update_character_log_lost_magic_item_list
(
    character_id UUID,
    loss_log_id UUID,
    add_item_ids JSON,
    remove_item_ids JSON,
    user_id UUID
)
READS SQL DATA
BEGIN
	UPDATE magicitem m
    JOIN `character` c ON m.characterId = c.id
    SET m.lossLogId = loss_log_id
    WHERE JSON_CONTAINS(add_item_ids, CONCAT('"',m.id,'"'))
    AND m.characterId = character_id
    AND c.userId = user_id;

    UPDATE magicitem i
    JOIN `character` c ON i.characterId = c.id
    SET i.lossLogId = NULL
    WHERE JSON_CONTAINS(remove_item_ids, CONCAT('"',i.id,'"'))
    AND i.characterId = character_id
    AND c.userId = user_id;
END; //
DELIMITER ;