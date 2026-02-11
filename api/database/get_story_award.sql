DELIMITER //
CREATE OR REPLACE PROCEDURE get_story_award
(
    award_id UUID, 
    character_id UUID,
    user_id UUID
)
READS SQL DATA
BEGIN
    SELECT st.id, 
        st.name, 
        st.description, 
        st.status,
        st.characterId, 
        st.originLogId,
        CASE
            WHEN user_id IS NOT NULL AND c.userId = user_id THEN 1
            ELSE 0
        END AS isOwner
    FROM storyaward st
    JOIN `character` c ON st.characterId = c.id
    WHERE st.id = award_id
    AND st.characterId = character_id;
END; //
DELIMITER ;