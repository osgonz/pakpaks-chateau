DROP DATABASE IF EXISTS adventurersleague;

CREATE DATABASE adventurersleague;

USE adventurersleague;

CREATE TABLE `user` (
    id UUID PRIMARY KEY DEFAULT (UUID()),
    googleId VARCHAR(255) NOT NULL UNIQUE,
    email VARCHAR(255),
    name VARCHAR(255),
    imageUrl VARCHAR(255)
);

CREATE TABLE `character` (
    id UUID PRIMARY KEY DEFAULT (UUID()),
    name VARCHAR(100) NOT NULL,
    campaign INT NOT NULL,
    lineage VARCHAR(100) NOT NULL,
    classes VARCHAR(100) NOT NULL,
    background VARCHAR(100) NOT NULL,
    backstory TEXT,
    notes TEXT,
    characterSheetLink VARCHAR(255),
    imageUrl VARCHAR(255),
    userId UUID NOT NULL,

    CONSTRAINT `fk_character_user`
        FOREIGN KEY (userId) REFERENCES `user` (id)
        ON DELETE CASCADE
        ON UPDATE RESTRICT
);

CREATE TABLE characterLog (
    id UUID PRIMARY KEY DEFAULT (UUID()),
    type INT NOT NULL,
    title VARCHAR(100) NOT NULL,
    timestamp DATETIME NOT NULL,
    location VARCHAR(100) NOT NULL,
    dmName VARCHAR(100),
    dmDci VARCHAR(100),
    lengthHours INT NOT NULL,
    gold DOUBLE NOT NULL,
    downtime INT NOT NULL,
    levels INT NOT NULL,
    serviceHours INT NOT NULL,
    traderCharacterId UUID,
    traderCharacterName VARCHAR(100),
    traderOtherPlayer VARCHAR(100),
    description TEXT,
    characterId UUID NOT NULL,

    CONSTRAINT `fk_characterLog_character`
        FOREIGN KEY (characterId) REFERENCES `character` (id)
        ON DELETE CASCADE
        ON UPDATE RESTRICT,

    CONSTRAINT `fk_characterLog_traderCharacter`
        FOREIGN KEY (traderCharacterId) REFERENCES `character` (id)
        ON DELETE SET NULL
        ON UPDATE RESTRICT
);

CREATE TABLE magicItem (
    id UUID PRIMARY KEY DEFAULT (UUID()),
    name VARCHAR(100) NOT NULL,
    flavorName VARCHAR(100),
    type INT NOT NULL,
    rarity INT NOT NULL,
    isConsumable BOOLEAN NOT NULL,
    requiresAttunement BOOLEAN NOT NULL,
    description TEXT,
    flavorDescription TEXT,
    properties TEXT,
    isEquipped BOOLEAN NOT NULL,
    characterId UUID NOT NULL,
    originLogId UUID NOT NULL,
    lossLogId UUID,

    CONSTRAINT `fk_magicItem_character`
        FOREIGN KEY (characterId) REFERENCES `character` (id)
        ON DELETE CASCADE
        ON UPDATE RESTRICT,
    
    CONSTRAINT `fk_magicItem_originLog`
        FOREIGN KEY (originLogId) REFERENCES characterLog (id)
        ON DELETE CASCADE
        ON UPDATE RESTRICT,

    CONSTRAINT `fk_magicItem_lossLog`
        FOREIGN KEY (lossLogId) REFERENCES characterLog (id)
        ON DELETE SET NULL
        ON UPDATE RESTRICT
);

CREATE TABLE storyAward (
    id UUID PRIMARY KEY DEFAULT (UUID()),
    name VARCHAR(100) NOT NULL,
    description TEXT,
    status INT NOT NULL,
    characterId UUID NOT NULL,
    originLogId UUID NOT NULL,

    CONSTRAINT `fk_storyAward_character`
        FOREIGN KEY (characterId) REFERENCES `character` (id)
        ON DELETE CASCADE
        ON UPDATE RESTRICT,
    
    CONSTRAINT `fk_storyAward_originLog`
        FOREIGN KEY (originLogId) REFERENCES characterLog (id)
        ON DELETE CASCADE
        ON UPDATE RESTRICT
);

CREATE TABLE dmLog (
    id UUID PRIMARY KEY DEFAULT (UUID()),
    title VARCHAR(100) NOT NULL,
    timestamp DATETIME NOT NULL,
    location VARCHAR(100) NOT NULL,
    lengthHours INT NOT NULL,
    serviceHours INT NOT NULL,
    description TEXT,
    userId UUID NOT NULL,

    CONSTRAINT `fk_dmLog_user`
        FOREIGN KEY (userId) REFERENCES `user` (id)
        ON DELETE CASCADE
        ON UPDATE RESTRICT
);