import { useState, useEffect } from "react";
import { MagicItem, ItemRarity, ItemType } from "../data/Types";

/**
 * Custom hook that returns a specific magic item's data
 * @param id - Id corresponding to a magic item
 * @returns Magic item details
 */
export function useMagicItem(id: string) {
    const [magicItem, setMagicItem] = useState<MagicItem | undefined>();

    /**
     * Asynchronous function that pulls a magic item's data
     * @param id - Id corresponding to a magic item
     * @returns Magic item details
     */
    const loadMagicItem = async(id: string) => {
        return new Promise<MagicItem>((resolve) => {
            // TODO: Call to storage to fetch magic item data
            setTimeout(() => {
                const magicItem: MagicItem = {
                    id: id,
                    name: "Shield, +3",
                    flavorName: "Miltiades' Shield",
                    type: ItemType.Armor,
                    rarity: ItemRarity.VeryRare,
                    isConsumable: false,
                    requiresAttunement: false,
                    description: "While holding this shield, you have a +3 bonus to AC. This bonus is in addition to the shield's normal bonus to AC.",
                    flavorDescription: "This shield is decorated with symbols of service and fealty. The shield empathically encourages service to others and whenever the bearer considers performing a selfish act, the shield enhances pangs of conscious.",
                    properties: "Conscientious. When the bearer of this item contemplates or undertakes a malevolent act, the item enhances pangs of conscience.",
                    isEquipped: true,
                    characterId: "test",
                    originLogId: "TestLogOne",
                    lossLogId: null,
                };
                resolve(magicItem);
            }, 1000);
        });
    }

    useEffect(() => {
        loadMagicItem(id)
            .then(setMagicItem);
    }, []);

    return magicItem;
}

/**
 * Custom hook that returns a specific character's magic items data
 * @param characterId - Id corresponding to a character
 * @returns Array containing the character's magic items
 */
export function useMagicItemsByCharacter(characterId: string) {
    const [magicItems, setMagicItems] = useState<MagicItem[] | undefined>();

    /**
     * Asynchronous function that pulls a character's magic items data
     * @param characterId - Id corresponding to a character
     * @returns Array containing the character's magic items
     */
    const loadMagicItemsByCharacter = async(characterId: string) => {
        return new Promise<MagicItem[]>((resolve) => {
            // TODO: Call to storage to fetch magic items data
            setTimeout(() => {
                const items: MagicItem[] = [
                    {
                        id: "testMiltiadesShield",
                        name: "Shield, +3",
                        flavorName: "Miltiades' Shield",
                        type: ItemType.Armor,
                        rarity: ItemRarity.VeryRare,
                        isConsumable: false,
                        requiresAttunement: false,
                        description: "While holding this shield, you have a +3 bonus to AC. This bonus is in addition to the shield's normal bonus to AC.",
                        flavorDescription: "This shield is decorated with symbols of service and fealty. The shield empathically encourages service to others and whenever the bearer considers performing a selfish act, the shield enhances pangs of conscious.",
                        properties: "Conscientious. When the bearer of this item contemplates or undertakes a malevolent act, the item enhances pangs of conscience.",
                        isEquipped: true,
                        characterId: characterId,
                        originLogId: "TestLogOne",
                        lossLogId: null,
                    },
                    {
                        id: "testAmuletDevout+2",
                        name: "Amulet of the Devout, +2",
                        flavorName: null,
                        type: ItemType.WondrousItem,
                        rarity: ItemRarity.Rare,
                        isConsumable: false,
                        requiresAttunement: true,
                        description: `This amulet bears the symbol of a deity inlaid with precious stones or metals. While you wear the holy symbol, you gain a +2 bonus to spell attack rolls and the saving throw DCs of your spells.
                        While you wear this amulet, you can use your Channel Divinity feature without expending one of the feature’s uses. Once this property is used, it can’t be used again until the next dawn.`,
                        flavorDescription: null,
                        properties: null,
                        isEquipped: true,
                        characterId: characterId,
                        originLogId: "TestLogTwo",
                        lossLogId: null,
                    },
                    {
                        id: "testScrollGreaterRestoration",
                        name: "Scroll of Greater Restoration",
                        flavorName: null,
                        type: ItemType.Scroll,
                        rarity: ItemRarity.Rare,
                        isConsumable: true,
                        requiresAttunement: false,
                        description: `A spell scroll bears the words of a single spell, written in a mystical cipher. If the spell is on your class’s spell list, you can read the scroll and cast its spell without providing any material components. Otherwise, the scroll is unintelligible. Casting the spell by reading the scroll requires the spell’s normal casting time. Once the spell is cast, the words on the scroll fade, and it crumbles to dust. If the casting is interrupted, the scroll is not lost.
                        If the spell is on your class’s spell list but of a higher level than you can normally cast, you must make an ability check using your spellcasting ability to determine whether you cast it successfully. The DC equals 15. On a failed check, the spell disappears from the scroll with no other effect.
                        This scroll contains a 5th level spell. The spell's saving throw DC is 17 and attack bonus is +9.
                        A wizard spell on a spell scroll can be copied just as spells in spellbooks can be copied. When a spell is copied from a spell scroll, the copier must succeed on an Intelligence (Arcana) check with a DC equal to 15. If the check succeeds, the spell is successfully copied. Whether the check succeeds or fails, the spell scroll is destroyed.`,
                        flavorDescription: null,
                        properties: null,
                        isEquipped: true,
                        characterId: characterId,
                        originLogId: "TestLogOne",
                        lossLogId: null,
                    },
                ];
                resolve(items);
            }, 1000);
        });
    };

    useEffect(() => {
        loadMagicItemsByCharacter(characterId)
            .then(setMagicItems);
    }, []);

    return magicItems;
}