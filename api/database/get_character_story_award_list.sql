DELIMITER //
CREATE OR REPLACE PROCEDURE get_character_story_award_list
(
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
        END AS isOwner,
        l.title AS originLogTitle 
    FROM storyaward st 
    JOIN characterlog l ON st.originLogId = l.id 
    JOIN `character` c ON l.characterId = c.id
    WHERE st.characterId = character_id;
END; //
DELIMITER ;