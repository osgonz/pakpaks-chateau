DELIMITER //
CREATE OR REPLACE PROCEDURE create_story_award
(
    name VARCHAR(100),
    description TEXT,
    status INT,
    characterId UUID,
    originLogId UUID
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
    VALUES (
        newId,
		name, 
        description, 
        status, 
        characterId, 
        originLogId
    );
    SELECT newId;
END; //
DELIMITER ;