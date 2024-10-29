import axios from 'axios';
import { useEffect, useMemo, useState } from 'react';
import { useParams } from "react-router-dom";
import Container from "@mui/material/Container";
import Divider from "@mui/material/Divider";
import LinearProgress from "@mui/material/LinearProgress";
import Paper from "@mui/material/Paper";
import CharacterSummary from '../components/characters/CharacterSummary';
import CharacterDetailTabs from '../components/characters/CharacterDetailTabs';
import { CharacterLogRow, MagicItem } from '../data/Types';
import { useCharacter } from "../hooks/useCharacter";
import { useMagicItemsByCharacter } from "../hooks/useMagicItem";
import { useStoryAwardsByCharacter } from '../hooks/useStoryAward';

const CharacterHome = () => {
    // Character Id value fetched from URL params
    const { characterId } = useParams();
    // Character summary details
    const character = useCharacter(characterId!);
    // Player logs
    const [characterLogs, setCharacterLogs] = useState<CharacterLogRow[] | undefined>();
    // Magic item details
    const magicItems = useMagicItemsByCharacter(characterId!);
    // Story award details
    const storyAwards = useStoryAwardsByCharacter(characterId!);

    // Object containing calculated Character values (cached)
    const [level, gold, downtime] = useMemo(() => {
        let downtime = 0;
        let gold = 0;
        let level = 0;

        characterLogs?.forEach((log) => {
            downtime += log.downtime;
            gold += log.gold;
            level += log.levels;
        });

        return [level, gold, downtime]
    }, [characterLogs]);
    // Objects containing split permanent and consumable magic item lists (cached)
    const [consumableMagicItems, permanentMagicItems] = useMemo(() => {
        let result = magicItems?.reduce((r, o) => {
            r[o.isConsumable ? 'consumableItems' : 'permanentItems'].push(o);
            return r;
        }, { permanentItems: [] as MagicItem[], consumableItems: [] as MagicItem[] });
        
        return [result?.consumableItems, result?.permanentItems]
    }, [magicItems]);

    // Helper function used to refresh data following a log deletion
    const handleRemoveCharacterLogByIndex = (index: number) => {
        let splicedLogs = [...(characterLogs as CharacterLogRow[])];
        splicedLogs.splice(index, 1);
        setCharacterLogs(splicedLogs);
    };

    useEffect(() => {
        /**
         * Asynchronous function that pulls a character's player logs
         * @param characterId - Id corresponding to a character
         * @returns Array containing the character's player logs
         */
        const loadCharacterLogsByCharacter = async(characterId: string) => {
            return axios.get(`/api/characters/${characterId}/character-logs`).then((res) => res.data) as Promise<CharacterLogRow[]>;
        };
        loadCharacterLogsByCharacter(characterId!)
            .then(setCharacterLogs);
        
    }, []);

    return (
        <>
            { character && characterLogs && magicItems && storyAwards ? (
                <Container maxWidth="lg">
                    <Paper 
                        elevation={1}
                        sx={{
                            p: 3 
                        }}
                    >
                        <CharacterSummary 
                            character={character}
                            level={level}
                            gold={gold}
                            downtime={downtime}
                            consumableMagicItems={consumableMagicItems!}
                            permanentMagicItems={permanentMagicItems!}
                        />
                        <Divider variant="middle"/>
                        <CharacterDetailTabs 
                            characterLogs={characterLogs}
                            handleRemoveCharacterLogByIndex={handleRemoveCharacterLogByIndex}
                            magicItems={magicItems}
                            storyAwards={storyAwards}
                        />
                    </Paper>
                </Container>
            ) : (
                <LinearProgress />
            )}
        </>
    );
};

export default CharacterHome;