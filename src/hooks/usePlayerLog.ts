import { useState, useEffect } from "react";
import { PlayerLog, PlayerLogType } from "../data/Types";

/**
 * Custom hook that returns a specific player log
 * @param id - Id corresponding to a player log
 * @returns Player log details
 */
export function usePlayerLog(id: string) {
    const [playerLog, setPlayerLog] = useState<PlayerLog | undefined>();

    /**
     * Asynchronous function that pulls data from a player log
     * @param id - Id corresponding to a player log
     * @returns Player log details
     */
    const loadPlayerLog = async(id: string) => {
        return new Promise<PlayerLog>((resolve) => {
            // TODO: Call to storage to fetch player log data
            setTimeout(() => {
                const playerLog: PlayerLog = {
                    id: id,
                    type: PlayerLogType.Merchant,
                    title: "Initial Equipment",
                    timestamp: new Date("2022-07-10T22:11:00.000-08:00"),
                    location: "Some Poor Fella's Shop (tm)",
                    dmName: null,
                    dmDci: null,
                    lengthHours: 0,
                    gold: 15,
                    downtime: 0,
                    levels: 0,
                    serviceHours: 0,
                    traderCharacterId: null,
                    traderCharacterName: null,
                    traderOtherPlayer: null,
                    description: null,
                    characterId: "test",
                };
                resolve(playerLog);
            }, 1000);
        });
    }

    useEffect(() => {
        loadPlayerLog(id)
            .then(setPlayerLog);
    }, []);

    return playerLog;
}

/**
 * Custom hook that returns a specific character's player logs
 * @param characterId - Id corresponding to a character
 * @returns Array containing the character's player logs
 */
export function usePlayerLogsByCharacter(characterId: string) {
    const [playerLogs, setPlayerLogs] = useState<PlayerLog[] | undefined>();

    /**
     * Asynchronous function that pulls a character's player logs
     * @param characterId - Id corresponding to a character
     * @returns Array containing the character's player logs
     */
    const loadPlayerLogsByCharacter = async(characterId: string) => {
        return new Promise<PlayerLog[]>((resolve) => {
            // TODO: Call to storage to fetch player log data
            setTimeout(() => {
                const items: PlayerLog[] = [
                    {
                        id: "testInitialEquipmentLog",
                        type: PlayerLogType.Merchant,
                        title: "Initial Equipment",
                        timestamp: new Date("2022-07-10T22:11:00.000-08:00"),
                        location: "Some Poor Fella's Shop (tm)",
                        dmName: null,
                        dmDci: null,
                        lengthHours: 0,
                        gold: 15,
                        downtime: 0,
                        levels: 0,
                        serviceHours: 0,
                        traderCharacterId: null,
                        traderCharacterName: null,
                        traderOtherPlayer: null,
                        description: null,
                        characterId: characterId,
                    },
                    {
                        id: "testDDAL0706Log",
                        type: PlayerLogType.Adventure,
                        title: "DDAL07-06 Fester and Burn",
                        timestamp: new Date("2022-07-11T15:00:00.000-08:00"),
                        location: "Pocket Mission (Roll20)",
                        dmName: "Mlouden03",
                        dmDci: null,
                        lengthHours: 4,
                        gold: 283.32,
                        downtime: 10,
                        levels: 1,
                        serviceHours: 0,
                        traderCharacterId: null,
                        traderCharacterName: null,
                        traderOtherPlayer: null,
                        description: "Party details will be added later. Succeeded in saving Mandolin, the tabaxi Harper agent.",
                        characterId: characterId,
                    },
                ];
                resolve(items);
            }, 1000);
        });
    };

    useEffect(() => {
        loadPlayerLogsByCharacter(characterId)
            .then(setPlayerLogs);
    }, []);

    return playerLogs;
}