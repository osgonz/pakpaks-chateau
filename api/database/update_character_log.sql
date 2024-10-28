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
    character_id UUID
)
READS SQL DATA
BEGIN
	UPDATE characterLog
    SET title = title,
        timestamp = timestamp,
        location = location,
        dmName = dm_name,
        dmDci = dm_dci,
        lengthHours = length_hours,
        gold = gold,
        downtime = downtime,
        levels = levels,
        serviceHours = service_hours,
        traderCharacterName = trader_character_name,
        traderOtherPlayer = trader_other_player,
        description = description
    WHERE id = log_id
    AND characterId = character_id;
END; //
DELIMITER ;