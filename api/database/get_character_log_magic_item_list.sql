DELIMITER //
CREATE OR REPLACE PROCEDURE get_character_log_magic_item_list
(log_id UUID, 
character_id UUID)
READS SQL DATA
BEGIN
    SELECT id, 
        name, 
        flavorName, 
        type, 
        rarity, 
        isConsumable, 
        requiresAttunement, 
        description, 
        flavorDescription, 
        properties, 
        isEquipped, 
        characterId, 
        originLogId,
        lossLogId
    FROM magicitem
    WHERE originLogId = log_id 
    AND characterId = character_id;
END; //
DELIMITER ;