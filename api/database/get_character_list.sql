DELIMITER //
CREATE OR REPLACE PROCEDURE get_character_list()
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
    FROM `character`;
END; //
DELIMITER ;