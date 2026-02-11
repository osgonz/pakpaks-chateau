DELIMITER //
CREATE OR REPLACE PROCEDURE get_magic_item_list
(user_id UUID)
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
        c.name AS characterName, 
        m.originLogId, 
        l.title AS originLogTitle, 
        l.type AS originLogType, 
        l.timestamp AS originTimestamp 
    FROM magicitem m 
    JOIN characterlog l ON m.originLogId = l.id 
    JOIN `character` c ON m.characterId = c.id
    WHERE c.userId = user_id AND m.lossLogId IS NULL;
END; //
DELIMITER ;