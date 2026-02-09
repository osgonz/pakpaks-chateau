DELIMITER //
CREATE OR REPLACE PROCEDURE create_dm_log
(
    title VARCHAR(100),
    timestamp DATETIME,
    location VARCHAR(100),
    lengthHours INT,
    serviceHours INT,
    description TEXT
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
        description
    )
    VALUES (
        newId,
        title,
        timestamp,
        location,
        lengthHours,
        serviceHours,
        description
    );
    SELECT newId;
END; //
DELIMITER ;