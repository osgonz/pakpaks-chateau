DELIMITER //
CREATE OR REPLACE PROCEDURE upsert_user
(
    p_googleId VARCHAR(255),
    p_email VARCHAR(255),
    p_name VARCHAR(255),
    p_imageUrl VARCHAR(255)
)
READS SQL DATA
BEGIN
    DECLARE newId UUID DEFAULT uuid();
	INSERT INTO `user`
    (
        id,
        googleId,
        email,
        name,
        imageUrl
    )
    VALUES (
        newId,
        p_googleId,
        p_email,
		p_name,
        p_imageUrl
    )
    ON DUPLICATE KEY UPDATE
        email = p_email,
        name = p_name,
        imageUrl = p_imageUrl;

    SELECT id,
        googleId,
        email,
        name,
        imageUrl
    FROM `user`
    WHERE googleId = p_googleId;
END; //
DELIMITER ;