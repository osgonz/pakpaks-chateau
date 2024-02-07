import axios from 'axios';
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
        return axios.get(`/api/characters/${id}`).then((res) => res.data) as Promise<Character>;
    };

    useEffect(() => {
        loadCharacter(id)
            .then(setCharacter);
    }, []);

    return character;
}