DELIMITER //
CREATE OR REPLACE PROCEDURE create_magic_item
(
    name VARCHAR(100),
    flavorName VARCHAR(100),
    type INT,
    rarity INT,
    isConsumable BOOLEAN,
    requiresAttunement BOOLEAN,
    description TEXT,
    flavorDescription TEXT,
    properties TEXT,
    isEquipped BOOLEAN,
    characterId UUID,
    originLogId UUID,
    lossLogId UUID
)
READS SQL DATA
BEGIN
    DECLARE newId UUID DEFAULT uuid();
	INSERT INTO magicItem
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
    VALUES (
        newId,
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
    );
    SELECT newId;
END; //
DELIMITER ;