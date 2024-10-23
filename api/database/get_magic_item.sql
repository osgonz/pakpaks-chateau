DELIMITER //
CREATE OR REPLACE PROCEDURE get_magic_item
(item_id UUID, 
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
    WHERE id = item_id 
    AND characterId = character_id;
END; //
DELIMITER ;