import axios from 'axios';
import { useState, useEffect } from "react";
import { DMLog } from "../data/Types";

/**
 * Custom hook that returns a specific DM log
 * @param id - Id corresponding to a DM log
 * @returns DM log details
 */
export function useDMLog(logId: string) {
    const [dmLog, setDMLog] = useState<DMLog | undefined>();

    /**
     * Asynchronous function that pulls data from a DM log
     * @param id - Id corresponding to a DM log
     * @returns DM log details
     */
    const loadDMLog = async(logId: string) => {
        return axios.get(`/api/dm-logs/${logId}`).then((res) => res.data) as Promise<DMLog>;
    }

    useEffect(() => {
        loadDMLog(logId)
            .then(setDMLog);
    }, []);

    return dmLog;
}

/**
 * Custom hook that returns all DM logs
 * @returns Array containing the DM logs
 */
export function useDMLogs() {
    const [dmLogs, setDMLogs] = useState<DMLog[] | undefined>();

    /**
     * Asynchronous function that pulls all DM logs
     * @returns Array containing the DM logs
     */
    const loadDMLogs = async() => {
        return axios.get(`/api/dm-logs`).then((res) => res.data) as Promise<DMLog[]>;
    };

    useEffect(() => {
        loadDMLogs()
            .then(setDMLogs);
    }, []);
    
    return dmLogs;
}