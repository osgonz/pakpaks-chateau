DELIMITER //
CREATE OR REPLACE PROCEDURE create_character
(
    name VARCHAR(100),
    campaign INT,
    lineage VARCHAR(100),
    classes VARCHAR(100),
    background VARCHAR(100),
    backstory TEXT,
    notes TEXT,
    characterSheetLink VARCHAR(255),
    imageUrl VARCHAR(255),
    userId UUID
)
READS SQL DATA
BEGIN
    DECLARE newId UUID DEFAULT uuid();
	INSERT INTO `character`
    (
        id,
        name,
		campaign,
        lineage,
        classes,
        background,
        backstory,
        notes,
        characterSheetLink,
        imageUrl,
        userId
    )
    VALUES (
        newId,
		name,
		campaign,
        lineage,
        classes,
        background,
        backstory,
        notes,
        characterSheetLink,
        imageUrl,
        userId
    );
    SELECT newId;
END; //
DELIMITER ;