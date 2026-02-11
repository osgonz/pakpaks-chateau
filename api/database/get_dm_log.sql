DELIMITER //
CREATE OR REPLACE PROCEDURE get_dm_log
(
    log_id UUID,
    user_id UUID
)
READS SQL DATA
BEGIN
    SELECT id,
        title,
        timestamp,
        location,
        lengthHours,
        serviceHours,
        description,
        CASE
            WHEN user_id IS NOT NULL AND userId = user_id THEN 1
            ELSE 0
        END AS isOwner
    FROM dmlog
    WHERE id = log_id;
END; //
DELIMITER ;