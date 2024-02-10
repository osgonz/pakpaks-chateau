import { useState, useEffect } from 'react';
import { useParams } from "react-router-dom";
import Container from "@mui/material/Container";
import Divider from "@mui/material/Divider";
import LinearProgress from "@mui/material/LinearProgress";
import Paper from "@mui/material/Paper";
import CharacterSummary from '../components/CharacterSummary';
import CharacterDetailTabs from '../components/CharacterDetailTabs';
import { MagicItem } from '../data/Types';
import { useCharacter } from "../hooks/useCharacter";
import { useCharacterLogsByCharacter } from '../hooks/useCharacterLog';
import { useMagicItemsByCharacter } from "../hooks/useMagicItem";
import { useStoryAwardsByCharacter } from '../hooks/useStoryAward';

const CharacterHome = () => {
    // Character Id value fetched from URL params
    const { characterId } = useParams();
    // Character summary details
    const character = useCharacter(characterId!);
    // Player logs
    const characterLogs = useCharacterLogsByCharacter(characterId!);
    // Magic item details
    const magicItems = useMagicItemsByCharacter(characterId!);
    // Story award details
    const storyAwards = useStoryAwardsByCharacter(characterId!);
    // Object containing calculated Character values
    const [charCalcValues, setCharCalcValues] = useState({
        downtime: 0,
        gold: 0,
        level: 0,
    });
    // Objects containing split permanent and consumable magic item lists
    const [consumableMagicItems, setConsumableMagicItems] = useState([] as MagicItem[]);
    const [permanentMagicItems, setPermanentMagicItems] = useState([] as MagicItem[]);

    useEffect(() => {
        async function calculateLevelsAndCurrency() {
            let downtime = 0;
            let gold = 0;
            let level = 0;

            characterLogs?.forEach((log) => {
                downtime += log.downtime;
                gold += log.gold;
                level += log.levels;
            });

            setCharCalcValues({
                ...charCalcValues,
                downtime: downtime,
                gold: gold,
                level: level,
            });
        }
        calculateLevelsAndCurrency();
    }, [characterLogs]);

    useEffect(() => {
        async function splitPermanentAndConsumableMagicItems() {
            let result = magicItems?.reduce((r, o) => {
                r[o.isConsumable ? 'consumableItems' : 'permanentItems'].push(o);
                return r;
            }, { permanentItems: [] as MagicItem[], consumableItems: [] as MagicItem[] });

            if (result?.consumableItems)
                setConsumableMagicItems(result?.consumableItems);
            if (result?.permanentItems)
                setPermanentMagicItems(result?.permanentItems);
        }
        splitPermanentAndConsumableMagicItems();
    }, [magicItems]);

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
                            level={charCalcValues.level}
                            gold={charCalcValues.gold}
                            downtime={charCalcValues.downtime}
                            consumableMagicItems={consumableMagicItems}
                            permanentMagicItems={permanentMagicItems}
                        />
                        <Divider variant="middle"/>
                        <CharacterDetailTabs 
                            characterLogs={characterLogs}
                            consumableMagicItems={consumableMagicItems}
                            permanentMagicItems={permanentMagicItems}
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