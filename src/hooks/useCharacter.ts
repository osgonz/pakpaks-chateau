import { useState, useEffect } from "react";
import { Character } from "../data/Types";

function useCharacter(id: string) {
    const [character, setCharacter]= useState<Character | undefined>();

    /**
     * Asynchronous function that pulls a character's data and injects calculated values into it
     * @param calculatedValues - Number array containing calculated level, gold and downtime values for the character
     * @param id - Id corresponding to the character
     * @returns Character summary details
     */
    const loadCharacter = async(calculatedValues: [number, number, number], id: string) => {
        return new Promise<Character>((resolve) => {
            // TODO: Call to storage to fetch character data
            setTimeout(() => {
                const character: Character = {
                    id: id,
                    name: "Khal Nightfist",
                    campaign: 0,
                    lineage: "Half-Orc",
                    classes: "Twilight Cleric of Selune 14 / Circle of Stars Druid 2",
                    level: calculatedValues[0],
                    background: "Faction Agent",
                    faction: "Harpers",
                    lifestyle: 10,
                    gold: calculatedValues[1],
                    downtime: calculatedValues[2],
                    backstory: null,
                    notes: null,
                    characterSheetLink: "https://ddb.ac/characters/78117532/2QPdLS",
                    imageUrl: null
                }
                resolve(character);
            }, 1000);
        });
    };

    /**
     * Asynchronous function that calculates a character's level, gold and downtime based on their logs
     * @param id - Id corresponding to the character
     * @returns Number array containing calculated level, gold and downtime values
     */
    const calculateLevelsAndCurrencyForCharacter = async(id: string) => {
        return new Promise<[number, number, number]>((resolve) => {
            // TODO: Call to storage to fetch character logs and add all levels, gold and downtime - stored proc instead maybe?
            setTimeout(() => {
                const levels = 1 + 15;
                const gold = 0 + 10000;
                const downtime = 0 + 100;
                resolve([levels, gold, downtime])
            }, 1000);
        });
    };

    useEffect(() => {
        calculateLevelsAndCurrencyForCharacter(id)
            .then((calculatedValues) => loadCharacter(calculatedValues, id))
            .then(setCharacter);
    }, []);

    return character;
}

export default useCharacter;