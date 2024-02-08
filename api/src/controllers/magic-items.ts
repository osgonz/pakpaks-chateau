import { Request, Response } from 'express';

class MagicItemController {
    // Get a specific character's magic items
    getMagicItemsByCharacter = async (req: Request, res: Response) => {
        // Extract character id from parameter
        const characterId = req.params.id;
        // TODO: Call to storage to fetch magic items - maybe filter out items with lossLogId? should front end take care of that instead?
        const items = [
            {
                id: "testMiltiadesShield",
                name: "Shield, +3",
                flavorName: "Miltiades' Shield",
                type: 0,
                rarity: 3,
                isConsumable: false,
                requiresAttunement: false,
                description: "While holding this shield, you have a +3 bonus to AC. This bonus is in addition to the shield's normal bonus to AC.",
                flavorDescription: "This shield is decorated with symbols of service and fealty. The shield empathically encourages service to others and whenever the bearer considers performing a selfish act, the shield enhances pangs of conscious.",
                properties: "Conscientious. When the bearer of this item contemplates or undertakes a malevolent act, the item enhances pangs of conscience.",
                isEquipped: true,
                characterId: characterId,
                originLogId: "testDDAL0706Log",
                lossLogId: null,
            },
            {
                id: "testAmuletDevout+2",
                name: "Amulet of the Devout, +2",
                flavorName: null,
                type: 8,
                rarity: 2,
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
                type: 4,
                rarity: 2,
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
                originLogId: "testDDAL0706Log",
                lossLogId: null,
            },
        ];
        res.status(200).send(items);
    };

    // Get a specific character log's magic items
    getMagicItemsByCharacterLog = async (req: Request, res: Response) => {
        // Extract character log id from parameter
        const logId = req.params.id;
        // Extract character id from parameter
        const characterId = req.params.charId;
        // TODO: Call to storage to fetch magic items
        // TODO: Validate if characterId param matches characterId within magic item
        const items = [
            {
                id: "testMiltiadesShield",
                name: "Shield, +3",
                flavorName: "Miltiades' Shield",
                type: 0,
                rarity: 3,
                isConsumable: false,
                requiresAttunement: false,
                description: "While holding this shield, you have a +3 bonus to AC. This bonus is in addition to the shield's normal bonus to AC.",
                flavorDescription: "This shield is decorated with symbols of service and fealty. The shield empathically encourages service to others and whenever the bearer considers performing a selfish act, the shield enhances pangs of conscious.",
                properties: "Conscientious. When the bearer of this item contemplates or undertakes a malevolent act, the item enhances pangs of conscience.",
                isEquipped: true,
                characterId: "test",
                originLogId: logId,
                lossLogId: null,
            },
            {
                id: "testScrollGreaterRestoration",
                name: "Scroll of Greater Restoration",
                flavorName: null,
                type: 4,
                rarity: 2,
                isConsumable: true,
                requiresAttunement: false,
                description: `A spell scroll bears the words of a single spell, written in a mystical cipher. If the spell is on your class’s spell list, you can read the scroll and cast its spell without providing any material components. Otherwise, the scroll is unintelligible. Casting the spell by reading the scroll requires the spell’s normal casting time. Once the spell is cast, the words on the scroll fade, and it crumbles to dust. If the casting is interrupted, the scroll is not lost.
                If the spell is on your class’s spell list but of a higher level than you can normally cast, you must make an ability check using your spellcasting ability to determine whether you cast it successfully. The DC equals 15. On a failed check, the spell disappears from the scroll with no other effect.
                This scroll contains a 5th level spell. The spell's saving throw DC is 17 and attack bonus is +9.
                A wizard spell on a spell scroll can be copied just as spells in spellbooks can be copied. When a spell is copied from a spell scroll, the copier must succeed on an Intelligence (Arcana) check with a DC equal to 15. If the check succeeds, the spell is successfully copied. Whether the check succeeds or fails, the spell scroll is destroyed.`,
                flavorDescription: null,
                properties: null,
                isEquipped: true,
                characterId: "test",
                originLogId: logId,
                lossLogId: null,
            },
        ];
        res.status(200).send(items);
    };

    // Get a magic item
    getMagicItem = async (req: Request, res: Response) => {
        // Extract magic item id from parameter
        const id = req.params.id;
        // Extract character id from parameter
        const characterId = req.params.charId;
        // TODO: Call to storage to fetch magic item data
        // TODO: Validate if characterId param matches characterId within magic item
        const magicItem = {
            id: id,
            name: "Shield, +3",
            flavorName: "Miltiades' Shield",
            type: 0,
            rarity: 3,
            isConsumable: false,
            requiresAttunement: false,
            description: "While holding this shield, you have a +3 bonus to AC. This bonus is in addition to the shield's normal bonus to AC.",
            flavorDescription: "This shield is decorated with symbols of service and fealty. The shield empathically encourages service to others and whenever the bearer considers performing a selfish act, the shield enhances pangs of conscious.",
            properties: "Conscientious. When the bearer of this item contemplates or undertakes a malevolent act, the item enhances pangs of conscience.",
            isEquipped: true,
            characterId: "test",
            originLogId: "testDDAL0706Log",
            lossLogId: null,
        };
        res.status(200).send(magicItem);
    };
};

export default new MagicItemController();