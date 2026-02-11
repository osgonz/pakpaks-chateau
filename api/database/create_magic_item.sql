DELIMITER //
CREATE OR REPLACE PROCEDURE create_magic_item
(
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
    DECLARE newId UUID DEFAULT uuid();
	INSERT INTO magicitem
    (
        id,
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
    )
    SELECT
        newId,
		name, 
        flavor_name,
        type,
        rarity,
        is_consumable,
        requires_attunement,
        description,
        flavor_description,
        properties,
        is_equipped,
        c.id,
        origin_log_id,
        loss_log_id
    FROM `character` c
    WHERE c.id = character_id
    AND c.userId = user_id;

    IF ROW_COUNT() = 0 THEN
        SELECT NULL as newId;
    ELSE
        SELECT newId;
    END IF;
END; //
DELIMITER ;