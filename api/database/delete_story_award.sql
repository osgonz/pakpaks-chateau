DELIMITER //
CREATE OR REPLACE PROCEDURE delete_story_award
(
    award_id UUID,
    character_id UUID
)
READS SQL DATA
BEGIN
    DELETE
    FROM storyAward
    WHERE id = award_id
    AND characterId = character_id;
END; //
DELIMITER ;