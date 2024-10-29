import axios from 'axios';
import { useState, useEffect } from "react";
import { CharacterLog, CharacterLogRow } from "../data/Types";

/**
 * Custom hook that returns a specific player log
 * @param id - Id corresponding to a player log
 * @returns Player log details
 */
export function useCharacterLog(characterId: string, logId: string) {
    const [characterLog, setCharacterLog] = useState<CharacterLog | undefined>();

    /**
     * Asynchronous function that pulls data from a player log
     * @param id - Id corresponding to a player log
     * @returns Player log details
     */
    const loadCharacterLog = async(characterId: string, logId: string) => {
        return axios.get(`/api/characters/${characterId}/character-logs/${logId}`).then((res) => res.data) as Promise<CharacterLog>;
    }

    useEffect(() => {
        loadCharacterLog(characterId, logId)
            .then(setCharacterLog);
    }, []);

    return characterLog;
}