DELIMITER //
CREATE OR REPLACE PROCEDURE update_magic_item
(
    item_id UUID,
    name VARCHAR(100),
    flavor_name VARCHAR(100),
    type INT,
    rarity INT,
    is_consumable BOOLEAN,
    requires_attunement BOOLEAN,
    description TEXT,
    flavor_description TEXT,
    properties TEXT,
    is_equipped BOOLEAN,
    character_id UUID,
    origin_log_id UUID,
    loss_log_id UUID
)
READS SQL DATA
BEGIN
	UPDATE magicItem
    SET name = name,
        flavorName = flavor_name,
        type = type,
        rarity = rarity,
        isConsumable = is_consumable,
        requiresAttunement = requires_attunement, 
        description = description, 
        flavorDescription = flavor_description, 
        properties = properties, 
        isEquipped = is_equipped, 
        originLogId = origin_log_id,
        lossLogId = loss_log_id
    WHERE id = item_id
    AND characterId = character_id;
END; //
DELIMITER ;