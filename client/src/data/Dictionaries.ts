import { Campaign, ItemType, ItemRarity, Lifestyle, CharacterLogType } from "./Types";

// Dictionaries for enum types mapped to their string counterparts

export const CampaignDictionary = new Map<Campaign, string>([
    [Campaign.ForgottenRealms, "Forgotten Realms"],
    [Campaign.Eberron, "Eberron"],
    [Campaign.Ravenloft, "Ravenloft"],
    [Campaign.Dragonlance, "Dragonlance"]
]);

export const ItemTypeDictionary = new Map<ItemType, string>([
    [ItemType.Armor, "Armor"],
    [ItemType.Potion, "Potion"],
    [ItemType.Ring, "Ring"],
    [ItemType.Rod, "Rod"],
    [ItemType.Scroll, "Scroll"],
    [ItemType.Staff, "Staff"],
    [ItemType.Wand, "Wand"],
    [ItemType.Weapon, "Weapon"],
    [ItemType.WondrousItem, "Wondrous Item"]
]);

export const ItemRarityDictionary = new Map<ItemRarity, string>([
    [ItemRarity.Common, "Common"],
    [ItemRarity.Uncommon, "Uncommon"],
    [ItemRarity.Rare, "Rare"],
    [ItemRarity.VeryRare, "Very Rare"],
    [ItemRarity.Legendary, "Legendary"],
    [ItemRarity.Artifact, "Artifact"],
    [ItemRarity.Unique, "Unique"]
]);

export const LifestyleDictionary = new Map<Lifestyle, string>([
    [Lifestyle.Wretched, "Wretched"],
    [Lifestyle.Squalid, "Squalid"],
    [Lifestyle.Poor, "Poor"],
    [Lifestyle.Modest, "Modest"],
    [Lifestyle.Comfortable, "Comfortable"],
    [Lifestyle.Wealthy, "Wealthy"],
    [Lifestyle.Aristocratic, "Aristocratic"]
]);

export const CharacterLogTypeDictionary = new Map<CharacterLogType, string>([
    [CharacterLogType.Adventure, "Adventure"],
    [CharacterLogType.Merchant, "Merchant"],
    [CharacterLogType.Trade, "Magic Item Trade"],
    [CharacterLogType.Downtime, "Downtime Activity"],
    [CharacterLogType.ServiceAward, "DM Service Award"]
]);