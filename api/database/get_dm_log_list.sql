DELIMITER //
CREATE OR REPLACE PROCEDURE get_dm_log_list
(user_id UUID)
READS SQL DATA
BEGIN
    SELECT id,
        title,
        timestamp,
        location,
        lengthHours,
        serviceHours,
        description
    FROM dmlog
    WHERE userId = user_id;
END; //
DELIMITER ;