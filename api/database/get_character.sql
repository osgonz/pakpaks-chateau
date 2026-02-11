DELIMITER //
CREATE OR REPLACE PROCEDURE get_character
(
    character_id UUID,
    user_id UUID
)
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
        imageUrl,
        CASE
            WHEN user_id IS NOT NULL AND userId = user_id THEN 1
            ELSE 0
        END AS isOwner
    FROM `character`
    WHERE id = character_id;
END; //
DELIMITER ;