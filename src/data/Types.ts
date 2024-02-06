// Enums

export enum Campaign {
    ForgottenRealms,
    Eberron,
    Ravenloft,
    Dragonlance
};

export enum ItemType {
    Armor,
    Potion,
    Ring,
    Rod,
    Scroll,
    Staff,
    Wand,
    Weapon,
    WondrousItem
};

export enum ItemRarity {
    Common,
    Uncommon,
    Rare,
    VeryRare,
    Legendary,
    Artifact,
    Unique
};

export enum Lifestyle {
    Wretched = 0,
    Squalid = 1,
    Poor = 2,
    Modest = 10,
    Comfortable = 20,
    Wealthy = 40,
    Aristocratic = 100
};

export enum PlayerLogType {
    Adventure,
    Merchant,
    Trade,
    Downtime,
    ServiceAward
};


// Character type definition
export type Character = {
    id: string;
    name: string;
    campaign: Campaign;
    lineage: string;
    classes: string;
    level: number;
    background: string;
    faction: string | null;
    lifestyle: Lifestyle;
    gold: number;
    downtime: number;
    backstory: string | null;
    notes: string | null;
    characterSheetLink: string | null;
    imageUrl: string | null;
};

// DM Log type definition
export type DMLog = {
    id: string;
    title: string;
    timestamp: Date;
    location: string;
    lengthHours: number;
    serviceHours: number;
    description: string | null;
};

// Magic Item type definition
export type MagicItem = {
    id: string;
    name: string;
    flavorName: string | null;
    type: ItemType;
    rarity: ItemRarity;
    isConsumable: boolean;
    requiresAttunement: boolean;
    description: string | null;
    flavorDescription: string | null;
    properties: string | null;
    isEquipped: boolean;
    characterId: string;
    originLogId: string;
    lossLogId: string | null;
};

// Player Log type definition
export type PlayerLog = {
    id: string;
    type: PlayerLogType;
    title: string;
    timestamp: Date;
    location: string;
    dmName: string;
    dmDci: string | null;
    lengthHours: number;
    gold: number;
    downtime: number;
    levels: number;
    serviceHours: number;
    traderCharacterId: string | null;
    traderCharacterName: string | null;
    traderOtherPlayer: string | null;
    description: string | null;
    characterId: string;
};

// Story Award type definition
export type StoryAward = {
    id: string;
    name: string;
    description: string | null;
    isActive: boolean;
    characterId: string;
    originLogId: string;
};