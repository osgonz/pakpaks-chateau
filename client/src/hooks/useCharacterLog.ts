import axios from 'axios';
import { useState, useEffect } from "react";
import { CharacterLog, CharacterLogAbstract, CharacterLogRow } from "../data/Types";

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

/**
 * Custom hook that returns a specific character's player logs
 * @param characterId - Id corresponding to a character
 * @returns Array containing the character's player logs
 */
export function useCharacterLogsByCharacter(characterId: string) {
    const [characterLogs, setCharacterLogs] = useState<CharacterLogRow[] | undefined>();

    /**
     * Asynchronous function that pulls a character's player logs
     * @param characterId - Id corresponding to a character
     * @returns Array containing the character's player logs
     */
    const loadCharacterLogsByCharacter = async(characterId: string) => {
        return axios.get(`/api/characters/${characterId}/character-logs`).then((res) => res.data) as Promise<CharacterLogRow[]>;
    };

    useEffect(() => {
        loadCharacterLogsByCharacter(characterId)
            .then(setCharacterLogs);
    }, []);
    
    return characterLogs;
}

/**
 * Custom hook that returns a specific character's player log abstracts (for dropdowns)
 * @param characterId - Id corresponding to a character
 * @returns Array containing the character's player log abstracts
 */
export function useCharacterLogsDropdownByCharacter(characterId: string) {
    const [characterLogs, setCharacterLogs] = useState<CharacterLogAbstract[] | undefined>();

    const loadCharacterLogsDropdownByCharacter = async(characterId: string) => {
        return axios.get(`/api/characters/${characterId}/character-logs/abstracts`).then((res) => res.data) as Promise<CharacterLogAbstract[]>;
    };

    useEffect(() => {
        loadCharacterLogsDropdownByCharacter(characterId)
            .then(setCharacterLogs);
    }, []);
    
    return characterLogs;
}