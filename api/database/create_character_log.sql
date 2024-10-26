DELIMITER //
CREATE OR REPLACE PROCEDURE create_character_log
(
    type INT,
    title VARCHAR(100),
    timestamp DATETIME,
    location VARCHAR(100),
    dmName VARCHAR(100),
    dmDci VARCHAR(100),
    lengthHours INT,
    gold DOUBLE,
    downtime INT,
    levels INT,
    serviceHours INT,
    traderCharacterName VARCHAR(100),
    traderOtherPlayer VARCHAR(100),
    description TEXT,
    characterId UUID
)
READS SQL DATA
BEGIN
    INSERT INTO characterLog
    (
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
    VALUES (
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
    );
END; //
DELIMITER ;