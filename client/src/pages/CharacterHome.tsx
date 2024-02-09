import { useState, useEffect } from 'react';
import { useParams } from "react-router-dom";
import Container from "@mui/material/Container";
import Divider from "@mui/material/Divider";
import Grid from "@mui/material/Grid";
import LinearProgress from "@mui/material/LinearProgress";
import Paper from "@mui/material/Paper";
import { Tab, Tabs } from "@mui/material";
import Typography from "@mui/material/Typography";
import { ItemRarityDictionary, ItemTypeDictionary } from "../data/Dictionaries";
import CharacterSummary from '../components/CharacterSummary';
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
    // Value representing currently selected tab
    const [tabValue, setTabValue] = useState(0);

    const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
        setTabValue(newValue);
    };

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
                        />
                        <Divider variant="middle"/>
                        <Grid 
                            container 
                            direction="row" 
                            justifyContent="center" 
                            spacing={2}
                            sx={{
                                pb: 2,
                                pr: 2,
                                ml: "auto",
                                mr: "auto",

                            }}
                        >
                            <Grid item xs={12}>
                                <Tabs 
                                    value={tabValue} 
                                    onChange={handleTabChange} 
                                    centered
                                >
                                    <Tab label="Magic Items" />
                                    <Tab label="Logs" />
                                    <Tab label="Story Awards" />
                                    <Tab label="Other Details" />
                                </Tabs>
                            </Grid>
                        </Grid>
                        {
                            /*
                            TODO: Log Table
                            Timestamp
                            Title
                            Type
                            Levels
                            Gold
                            Downtime
                            Magic Items*
                            Actions (View, Edit, Delete)

                            id: string;
                            type: CharacterLogType;
                            title: string;
                            timestamp: Date;
                            location: string;
                            dmName: string | null;
                            dmDci: string | null;
                            lengthHours: number;
                            gold: number;
                            downtime: number;
                            levels: number;
                            serviceHours: number;
                            traderCharacterId: string | null;
                            traderCharacterName: string | null;
                            traderOtherPlayer: string | null;
                            description: string | null;
                            characterId: string;
                            */
                        }
                        { magicItems.map((magicItem) => (
                            <>
                                <Typography variant="h5" component="h2" gutterBottom>
                                    {magicItem.flavorName ? `${magicItem.flavorName} (${magicItem.name})` : magicItem.name}
                                </Typography>
                                <Typography gutterBottom>
                                    {ItemTypeDictionary.get(magicItem.type)}, {ItemRarityDictionary.get(magicItem.rarity)}{magicItem.requiresAttunement ? ' (requires attunement)' : ''}
                                </Typography>
                            </>
                        ))}
                    </Paper>
                </Container>
            ) : (
                <LinearProgress />
            )}
        </>
    );
};

export default CharacterHome;