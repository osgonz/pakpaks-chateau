DELIMITER //
CREATE OR REPLACE PROCEDURE create_character_log
(
    type INT,
    title VARCHAR(100),
    timestamp DATETIME,
    location VARCHAR(100),
    dm_name VARCHAR(100),
    dm_dci VARCHAR(100),
    length_hours INT,
    gold DOUBLE,
    downtime INT,
    levels INT,
    service_hours INT,
    trader_character_name VARCHAR(100),
    trader_other_player VARCHAR(100),
    description TEXT,
    character_id UUID,
    user_id UUID
)
READS SQL DATA
BEGIN
    DECLARE newId UUID DEFAULT uuid();
	INSERT INTO characterlog
    (
        id,
		type,
        title,
        timestamp,
        location,
        dmName,
        dmDci,
        lengthHours,
        gold,
        downtime,
        levels,
        serviceHours,
        traderCharacterName,
        traderOtherPlayer,
        description,
        characterId
    )
    SELECT
        newId,
		type,
        title,
        timestamp,
        location,
        dm_name,
        dm_dci,
        length_hours,
        gold,
        downtime,
        levels,
        service_hours,
        trader_character_name,
        trader_other_player,
        description,
        c.id
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