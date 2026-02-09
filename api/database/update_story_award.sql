DELIMITER //
CREATE OR REPLACE PROCEDURE update_story_award
(
    award_id UUID,
    name VARCHAR(100),
    description TEXT,
    status INT,
    character_id UUID,
    origin_log_id UUID
)
READS SQL DATA
BEGIN
	UPDATE storyaward
    SET name = name,
        description = description, 
        status = status,
        originLogId = origin_log_id
    WHERE id = award_id
    AND characterId = character_id;
END; //
DELIMITER ;