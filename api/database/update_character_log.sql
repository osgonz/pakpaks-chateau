DELIMITER //
CREATE OR REPLACE PROCEDURE update_character_log
(
    log_id UUID,
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
	UPDATE characterlog cl
    JOIN `character` c ON cl.characterId = c.id
    SET cl.title = title,
        cl.timestamp = timestamp,
        cl.location = location,
        cl.dmName = dm_name,
        cl.dmDci = dm_dci,
        cl.lengthHours = length_hours,
        cl.gold = gold,
        cl.downtime = downtime,
        cl.levels = levels,
        cl.serviceHours = service_hours,
        cl.traderCharacterName = trader_character_name,
        cl.traderOtherPlayer = trader_other_player,
        cl.description = description
    WHERE cl.id = log_id
    AND cl.characterId = character_id
    AND c.userId = user_id;
END; //
DELIMITER ;