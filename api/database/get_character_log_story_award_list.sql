DELIMITER //
CREATE OR REPLACE PROCEDURE get_character_log_story_award_list
(log_id UUID, 
character_id UUID)
READS SQL DATA
BEGIN
    SELECT id, 
        name, 
        description, 
        status,
        characterId, 
        originLogId
    FROM storyAward
    WHERE originLogId = log_id 
    AND characterId = character_id;
END; //
DELIMITER ;