DELIMITER //
CREATE OR REPLACE PROCEDURE create_dm_log
(
    title VARCHAR(100),
    timestamp DATETIME,
    location VARCHAR(100),
    lengthHours INT,
    serviceHours INT,
    description TEXT,
    userId UUID
)
READS SQL DATA
BEGIN
    DECLARE newId UUID DEFAULT uuid();
	INSERT INTO dmlog
    (
        id,
        title,
        timestamp,
        location,
        lengthHours,
        serviceHours,
        description,
        userId
    )
    VALUES (
        newId,
        title,
        timestamp,
        location,
        lengthHours,
        serviceHours,
        description,
        userId
    );
    SELECT newId;
END; //
DELIMITER ;