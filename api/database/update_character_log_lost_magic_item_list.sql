DELIMITER //
CREATE OR REPLACE PROCEDURE update_character_log_lost_magic_item_list
(
    character_id UUID,
    loss_log_id UUID,
    add_item_ids JSON,
    remove_item_ids JSON
)
READS SQL DATA
BEGIN
	UPDATE magicitem
    SET lossLogId = loss_log_id
    WHERE JSON_CONTAINS(add_item_ids, CONCAT('"',id,'"'))
    AND characterId = character_id;

    UPDATE magicitem
    SET lossLogId = NULL
    WHERE JSON_CONTAINS(remove_item_ids, CONCAT('"',id,'"'))
    AND characterId = character_id;
END; //
DELIMITER ;