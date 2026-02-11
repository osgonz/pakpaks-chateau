DELIMITER //
CREATE OR REPLACE PROCEDURE get_magic_item
(
    item_id UUID, 
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
        m.lossLogId,
        CASE
            WHEN user_id IS NOT NULL AND c.userId = user_id THEN 1
            ELSE 0
        END AS isOwner
    FROM magicitem m
    JOIN `character` c ON m.characterId = c.id
    WHERE m.id = item_id 
    AND m.characterId = character_id;
END; //
DELIMITER ;