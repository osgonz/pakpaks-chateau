import { useState, useEffect } from 'react';
import { useParams } from "react-router-dom";
import Container from "@mui/material/Container";
import Divider from "@mui/material/Divider";
import LinearProgress from "@mui/material/LinearProgress";
import Paper from "@mui/material/Paper";
import { Tab, Tabs } from "@mui/material";
import Typography from "@mui/material/Typography";
import { CampaignDictionary, ItemRarityDictionary, ItemTypeDictionary, LifestyleDictionary } from "../../data/Dictionaries";
import { useCharacter } from "../../hooks/useCharacter";
import { useMagicItemsByCharacter } from "../../hooks/useMagicItem";
import { useCharacterLogsByCharacter } from '../../hooks/useCharacterLog';

function CharacterHome() {
    // Character Id value fetched from URL params
    const { characterId } = useParams();
    // Character summary details
    const character = useCharacter(characterId!);
    // Magic item details
    const magicItems = useMagicItemsByCharacter(characterId!);
    // Player logs
    const characterLogs = useCharacterLogsByCharacter(characterId!);
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
            { character && magicItems ? (
                <Container maxWidth="lg">
                <Paper 
                    elevation={1}
                    sx={{
                        p: 2 
                    }}
                >
                    <Typography variant="h3" component="h1" gutterBottom>{character.name}</Typography>
                    <Typography gutterBottom>Campaign: {CampaignDictionary.get(character.campaign)}</Typography>
                    <Typography gutterBottom>Lineage: {character.lineage}</Typography>
                    <Typography gutterBottom>Class: {character.classes}</Typography>
                    <Typography gutterBottom>Level: {charCalcValues.level}</Typography>
                    <Typography gutterBottom>Background: {character.background}</Typography>
                    <Typography gutterBottom>Faction: {character.faction || "Unaffiliated"}</Typography>
                    <Typography gutterBottom>Lifestyle: {LifestyleDictionary.get(character.lifestyle)}</Typography>
                    <Typography gutterBottom>Gold: {charCalcValues.gold}</Typography>
                    <Typography gutterBottom>Downtime: {charCalcValues.downtime}</Typography>
                    { character.characterSheetLink ? (
                        <Typography gutterBottom>Character Sheet: {character.characterSheetLink}</Typography>
                    ) : (
                    null 
                    )}
                    <Divider variant="middle"/>
                    <Tabs value={tabValue} onChange={handleTabChange} centered>
                        <Tab label="Magic Items" />
                        <Tab label="Logs" />
                        <Tab label="Story Awards" />
                        <Tab label="Other Details" />
                    </Tabs>
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
    )
};

export default CharacterHome;