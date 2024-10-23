DELIMITER //
CREATE OR REPLACE PROCEDURE get_character_story_award_list
(character_id UUID)
READS SQL DATA
BEGIN
    SELECT st.id, 
        st.name, 
        st.description, 
        st.status,
        st.characterId, 
        st.originLogId, 
        l.title AS originLogTitle 
    FROM storyAward st 
    JOIN characterlog l ON st.originLogId = l.id 
    WHERE st.characterId = character_id;
END; //
DELIMITER ;