DELIMITER //
CREATE OR REPLACE PROCEDURE get_character_magic_item_list
(
    character_id UUID,
    user_id UUID
)
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
        CASE
            WHEN user_id IS NOT NULL AND c.userId = user_id THEN 1
            ELSE 0
        END AS isOwner,
        l.title AS originLogTitle, 
        l.type AS originLogType 
    FROM magicitem m 
    JOIN characterlog l ON m.originLogId = l.id 
    JOIN `character` c ON l.characterId = c.id
    WHERE m.characterId = character_id AND m.lossLogId IS NULL;
END; //
DELIMITER ;