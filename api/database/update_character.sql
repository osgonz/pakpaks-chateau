DELIMITER //
CREATE OR REPLACE PROCEDURE update_character
(
    character_id UUID,
    name VARCHAR(100),
    campaign INT,
    lineage VARCHAR(100),
    classes VARCHAR(100),
    background VARCHAR(100),
    backstory TEXT,
    notes TEXT,
    character_sheet_link VARCHAR(255),
    image_url VARCHAR(255),
    user_id UUID
)
READS SQL DATA
BEGIN
	UPDATE `character`
    SET name = name,
        campaign = campaign,
        lineage = lineage,
        classes = classes,
        background = background,
        backstory = backstory, 
        notes = notes, 
        characterSheetLink = character_sheet_link, 
        imageUrl = image_url
    WHERE id = character_id AND userId = user_id;
END; //
DELIMITER ;