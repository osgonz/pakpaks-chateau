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
    loss_log_id UUID,
    user_id UUID
)
READS SQL DATA
BEGIN
	UPDATE magicitem mi
    JOIN `character` c ON mi.characterId = c.id
    SET mi.name = name,
        mi.flavorName = flavor_name,
        mi.type = type,
        mi.rarity = rarity,
        mi.isConsumable = is_consumable,
        mi.requiresAttunement = requires_attunement, 
        mi.description = description, 
        mi.flavorDescription = flavor_description, 
        mi.properties = properties, 
        mi.isEquipped = is_equipped, 
        mi.originLogId = origin_log_id,
        mi.lossLogId = loss_log_id
    WHERE mi.id = item_id
    AND mi.characterId = character_id
    AND c.userId = user_id;
END; //
DELIMITER ;