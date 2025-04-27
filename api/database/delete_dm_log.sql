DELIMITER //
CREATE OR REPLACE PROCEDURE delete_dm_log
(
    log_id UUID
)
READS SQL DATA
BEGIN
    DELETE
    FROM dmLog
    WHERE id = log_id;
END; //
DELIMITER ;