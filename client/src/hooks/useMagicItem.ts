import axios from 'axios';
import { useState, useEffect } from "react";
import { MagicItem, MagicItemRow } from "../data/Types";

/**
 * Custom hook that returns a specific magic item's data
 * @param id - Id corresponding to a magic item
 * @returns Magic item details
 */
export function useMagicItem(characterId: string, itemId: string) {
    const [magicItem, setMagicItem] = useState<MagicItem | undefined>();

    /**
     * Asynchronous function that pulls a magic item's data
     * @param id - Id corresponding to a magic item
     * @returns Magic item details
     */
    const loadMagicItem = async(characterId: string, itemId: string) => {
        return axios.get(`/api/characters/${characterId}/magic-items/${itemId}`).then((res) => res.data) as Promise<MagicItem>;
    }

    useEffect(() => {
        loadMagicItem(characterId, itemId)
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
    const [magicItems, setMagicItems] = useState<MagicItemRow[] | undefined>();

    /**
     * Asynchronous function that pulls a character's magic items data
     * @param characterId - Id corresponding to a character
     * @returns Array containing the character's magic items
     */
    const loadMagicItemsByCharacter = async(characterId: string) => {
        return axios.get(`/api/characters/${characterId}/magic-items`).then((res) => res.data) as Promise<MagicItemRow[]>;
    };

    useEffect(() => {
        loadMagicItemsByCharacter(characterId)
            .then(setMagicItems);
    }, []);

    return magicItems;
}

/**
 * Custom hook that returns a specific character log's magic items data
 * @param characterId - Id corresponding to a character
 * @param logId - Id corresponding to a character log
 * @returns Array containing the character log's magic items
 */
export function useMagicItemsByCharacterLog(characterId: string, logId: string) {
    const [magicItems, setMagicItems] = useState<MagicItem[] | undefined>();

    /**
     * Asynchronous function that pulls a character log's magic items data
     * @param characterId - Id corresponding to a character
     * @param logId - Id corresponding to a character log
     * @returns Array containing the character log's magic items
     */
    const loadMagicItemsByCharacterLog = async(characterId: string, logId: string) => {
        return axios.get(`/api/characters/${characterId}/character-logs/${logId}/magic-items`).then((res) => res.data) as Promise<MagicItem[]>;
    };

    useEffect(() => {
        loadMagicItemsByCharacterLog(characterId, logId)
            .then(setMagicItems);
    }, []);

    return magicItems;
}

/**
 * Custom hook that returns a specific character log's lost magic items data
 * @param characterId - Id corresponding to a character
 * @param logId - Id corresponding to a character log
 * @returns Array containing the character log's lost magic items
 */
export function useMagicItemsLostByCharacterLog(characterId: string, logId: string) {
    const [magicItems, setMagicItems] = useState<MagicItem[] | undefined>();

    /**
     * Asynchronous function that pulls a character log's lost magic items data
     * @param characterId - Id corresponding to a character
     * @param logId - Id corresponding to a character log
     * @returns Array containing the character log's lost magic items
     */
    const loadMagicItemsByCharacterLog = async(characterId: string, logId: string) => {
        return axios.get(`/api/characters/${characterId}/character-logs/${logId}/lost-magic-items`).then((res) => res.data) as Promise<MagicItem[]>;
    };

    useEffect(() => {
        loadMagicItemsByCharacterLog(characterId, logId)
            .then(setMagicItems);
    }, []);

    return magicItems;
}