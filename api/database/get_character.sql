DELIMITER //
CREATE OR REPLACE PROCEDURE get_character
(character_id UUID)
READS SQL DATA
BEGIN
    SELECT id,
        name,
        campaign,
        lineage,
        classes,
        background,
        backstory,
        notes,
        characterSheetLink,
        imageUrl
    FROM `character`
    WHERE id = character_id;
END; //
DELIMITER ;