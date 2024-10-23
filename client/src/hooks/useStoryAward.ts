import axios from 'axios';
import { useState, useEffect } from "react";
import { StoryAward, StoryAwardRow } from "../data/Types";

/**
 * Custom hook that returns a specific story award's data
 * @param id - Id corresponding to a story award
 * @returns Story award details
 */
export function useStoryAward(characterId: string, awardId: string) {
    const [storyAward, setStoryAward] = useState<StoryAward | undefined>();

    /**
     * Asynchronous function that pulls a story award's data
     * @param id - Id corresponding to a story award
     * @returns Story award details
     */
    const loadStoryAward = async(characterId: string, awardId: string) => {
        return axios.get(`/api/characters/${characterId}/story-awards/${awardId}`).then((res) => res.data) as Promise<StoryAward>;
    }

    useEffect(() => {
        loadStoryAward(characterId, awardId)
            .then(setStoryAward);
    }, []);

    return storyAward;
}

/**
 * Custom hook that returns a specific character's story awards
 * @param characterId - Id corresponding to a character
 * @returns Array containing the character's story awards
 */
export function useStoryAwardsByCharacter(characterId: string) {
    const [storyAwards, setStoryAwards] = useState<StoryAwardRow[] | undefined>();

    /**
     * Asynchronous function that pulls a character's story awards
     * @param characterId - Id corresponding to a character
     * @returns Array containing the character's story awards
     */
    const loadStoryAwardsByCharacter = async(characterId: string) => {
        return axios.get(`/api/characters/${characterId}/story-awards`).then((res) => res.data) as Promise<StoryAwardRow[]>;
    };

    useEffect(() => {
        loadStoryAwardsByCharacter(characterId)
            .then(setStoryAwards);
    }, []);

    return storyAwards;
}

/**
 * Custom hook that returns a specific character log's story awards
 * @param characterId - Id corresponding to a character
 * @param logId - Id corresponding to a character log
 * @returns Array containing the character log's story awards
 */
export function useStoryAwardsByCharacterLog(characterId: string, logId: string) {
    const [storyAwards, setStoryAwards] = useState<StoryAward[] | undefined>();

    /**
     * Asynchronous function that pulls a character log's story awards
     * @param characterId - Id corresponding to a character
     * @param logId - Id corresponding to a character log
     * @returns Array containing the character log's story awards
     */
    const loadStoryAwardsByCharacterLog = async(characterId: string, logId: string) => {
        return axios.get(`/api/characters/${characterId}/character-logs/${logId}/story-awards`).then((res) => res.data) as Promise<StoryAward[]>;
    };

    useEffect(() => {
        loadStoryAwardsByCharacterLog(characterId, logId)
            .then(setStoryAwards);
    }, []);

    return storyAwards;
}