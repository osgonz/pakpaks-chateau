DELIMITER //
CREATE OR REPLACE PROCEDURE create_story_award
(
    name VARCHAR(100),
    description TEXT,
    status INT,
    character_id UUID,
    origin_log_id UUID,
    user_id UUID
)
READS SQL DATA
BEGIN
    DECLARE newId UUID DEFAULT uuid();
	INSERT INTO storyaward
    (
        id,
		name, 
        description, 
        status,
        characterId, 
        originLogId
    )
    SELECT
        newId,
		name, 
        description, 
        status, 
        c.id, 
        origin_log_id
    FROM `character` c
    WHERE c.id = character_id
    AND c.userId = user_id;

    IF ROW_COUNT() = 0 THEN
        SELECT NULL as newId;
    ELSE
        SELECT newId;
    END IF;
END; //
DELIMITER ;