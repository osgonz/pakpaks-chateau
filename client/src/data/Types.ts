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

export enum CharacterLogType {
    Adventure,
    Downtime,
    Merchant,
    ServiceAward,
    Trade
};

export enum StoryAwardStatus {
    Active,
    Consumed,
    Pending
};

export enum CharacterSortByOption {
    NameAscending,
    NameDescending,
    LevelAscending,
    LevelDescending
};


// Character type definition
export type Character = {
    id: string;
    name: string;
    campaign: Campaign;
    lineage: string;
    classes: string;
    background: string;
    backstory: string | null;
    notes: string | null;
    characterSheetLink: string | null;
    imageUrl: string | null;
    isOwner: boolean;
};

export interface CharacterRow extends Character {
    characterLevel: number;
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
    isOwner: boolean;
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
    isOwner: boolean;
};

export interface MagicItemRow extends MagicItem {
    originLogTitle: string;
    originLogType: CharacterLogType;
};

export interface MagicItemGeneralRow extends MagicItemRow {
    characterName: string;
    originTimestamp: Date;
};

// Player Log type definition
export type CharacterLog = {
    id: string;
    type: CharacterLogType;
    title: string;
    timestamp: Date;
    location: string;
    dmName: string | null;
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
    isOwner: boolean;
};

export interface CharacterLogRow extends CharacterLog {
    magicItemNames: string | null;
    lostMagicItemNames: string | null;
    storyAwardNames: string | null;
};

export type CharacterLogAbstract = {
    id: string;
    title: string;
    timestamp: Date;
};

// Story Award type definition
export type StoryAward = {
    id: string;
    name: string;
    description: string | null;
    status: StoryAwardStatus;
    characterId: string;
    originLogId: string;
    isOwner: boolean;
};

export interface StoryAwardRow extends StoryAward {
    originLogTitle: string;
};

// Metadata interface for head cells used in a sortable table
export interface SortableTableHeadCell {
    id: keyof any;
    label: string;
    alignment: "right" | "left" | "center";
    isSortable: boolean;
}

// Order type for table sorting
export type Order = 'asc' | 'desc';

// User type definition
export type User = {
    id: string;
    email: string;
    name: string;
    imageUrl: string;
};

// Auth context interface
export interface AuthContextType {
    user: User | null;
    isLoading: boolean;
    login: (authCode: string) => Promise<void>;
    logout: () => Promise<void>;
};