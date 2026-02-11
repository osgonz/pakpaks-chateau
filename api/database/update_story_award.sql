DELIMITER //
CREATE OR REPLACE PROCEDURE update_story_award
(
    award_id UUID,
    name VARCHAR(100),
    description TEXT,
    status INT,
    character_id UUID,
    origin_log_id UUID,
    user_id UUID
)
READS SQL DATA
BEGIN
	UPDATE storyaward st
    JOIN `character` c ON st.characterId = c.id
    SET st.name = name,
        st.description = description, 
        st.status = status,
        st.originLogId = origin_log_id
    WHERE st.id = award_id
    AND st.characterId = character_id
    AND c.userId = user_id;
END; //
DELIMITER ;