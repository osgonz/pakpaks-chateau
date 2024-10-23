DELIMITER //
CREATE OR REPLACE PROCEDURE get_character_magic_item_list
(character_id UUID)
READS SQL DATA
BEGIN
    SELECT m.id, 
        m.name, 
        m.flavorName, 
        m.type, 
        m.rarity, 
        m.isConsumable, 
        m.requiresAttunement, 
        m.description, 
        m.flavorDescription, 
        m.properties, 
        m.isEquipped, 
        m.characterId, 
        m.originLogId, 
        l.title AS originLogTitle 
    FROM magicitem m 
    JOIN characterlog l ON m.originLogId = l.id 
    WHERE m.characterId = character_id AND m.lossLogId IS NULL;
END; //
DELIMITER ;