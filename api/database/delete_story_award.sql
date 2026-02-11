DELIMITER //
CREATE OR REPLACE PROCEDURE delete_story_award
(
    award_id UUID,
    character_id UUID,
    user_id UUID
)
READS SQL DATA
BEGIN
    DELETE st
    FROM storyaward st
    JOIN `character` c ON st.characterId = c.id
    WHERE st.id = award_id
    AND st.characterId = character_id
    AND c.userId = user_id;
END; //
DELIMITER ;