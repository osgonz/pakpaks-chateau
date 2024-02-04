import { useState, useEffect } from "react";
import { Character } from "../data/Types";

function useCharacter(id: string) {
    const [character, setCharacter]= useState<Character | undefined>();

    const loadCharacter = async(id: string) => {
        return new Promise<Character>((resolve) => {
            setTimeout(() => {
                const character: Character = {
                    id: id,
                    name: "Khal Nightfist",
                    campaign: 1,
                    lineage: "Half-Orc",
                    classes: "Twilight Cleric of Selune 14 / Circle of Stars Druid 2",
                    background: "Faction Agent",
                    faction: "Harpers",
                    lifestyle: 10,
                    backstory: "",
                    notes: "",
                    characterSheetLink: "https://ddb.ac/characters/78117532/2QPdLS",
                    imageURL: ""
                }
                resolve(character);
            }, 1000);
        });
    };

    useEffect(() => {
        loadCharacter(id).then(setCharacter);
    }, []);

    return character;
}

export default useCharacter;