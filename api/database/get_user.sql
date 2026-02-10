DELIMITER //
CREATE OR REPLACE PROCEDURE get_user
(user_id VARCHAR(255))
READS SQL DATA
BEGIN
    SELECT id,
        googleId,
        email,
        name,
        imageUrl
    FROM `user`
    WHERE id = user_id;
END; //
DELIMITER ;