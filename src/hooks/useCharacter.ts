import { useState, useEffect } from "react";
import { Character } from "../data/Types";

/**
 * Custom hook that returns a specific character's summary data
 * @param id - Id corresponding to a character
 * @returns Character summary details
 */
export function useCharacter(id: string) {
    const [character, setCharacter]= useState<Character | undefined>();

    /**
     * Asynchronous function that pulls a character's data
     * @param id - Id corresponding to a character
     * @returns Character summary details
     */
    const loadCharacter = async(id: string) => {
        return new Promise<Character>((resolve) => {
            // TODO: Call to storage to fetch character data
            setTimeout(() => {
                const character: Character = {
                    id: id,
                    name: "Khal Nightfist",
                    campaign: 0,
                    lineage: "Half-Orc",
                    classes: "Twilight Cleric of Selune 14 / Circle of Stars Druid 2",
                    background: "Faction Agent",
                    faction: "Harpers",
                    lifestyle: 10,
                    backstory: null,
                    notes: null,
                    characterSheetLink: "https://ddb.ac/characters/78117532/2QPdLS",
                    imageUrl: null
                };
                resolve(character);
            }, 1000);
        });
    };

    useEffect(() => {
        loadCharacter(id)
            .then(setCharacter);
    }, []);

    return character;
}