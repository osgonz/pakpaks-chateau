export type Character = {
    id: string;
    name: string;
    campaign: number;
    lineage: string;
    classes: string;
    level: number;
    background: string;
    faction: string | null;
    lifestyle: number;
    gold: number;
    downtime: number;
    backstory: string | null;
    notes: string | null;
    characterSheetLink: string | null;
    imageUrl: string | null;
};

export type MagicItem = {
    id: string;
    name: string;
    flavorName: string | null;
    itemType: number;
    rarity: number;
    isConsumable: boolean;
    requiresAttunement: boolean;
    description: string | null;
    flavorDescription: string | null;
    properties: string | null;
    isEquipped: boolean;
    characterId: string;
    originLogId: string;
    lossLogId: string;
};

export type StoryAward = {
    id: string;
    name: string;
    description: string | null;
    isActive: boolean;
    characterId: string;
    originLogId: string;
};

export type PlayerLog = {
    id: string;
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

export type DMLog = {
    id: string;
    title: string;
    timestamp: Date;
    location: string;
    lengthHours: number;
    serviceHours: number;
    description: string | null;
};