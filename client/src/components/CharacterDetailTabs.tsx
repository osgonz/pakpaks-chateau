import { useState } from 'react';
import Grid from "@mui/material/Grid";
import Icon from "@mui/material/Icon";
import IconButton from "@mui/material/IconButton";
import Paper from "@mui/material/Paper";
import { Tab, Tabs } from "@mui/material";
import { Table, TableContainer, TableHead, TableBody, TableRow, TableCell } from '@mui/material';
import Typography from "@mui/material/Typography";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";
import { CharacterLogTypeDictionary, ItemRarityDictionary, ItemTypeDictionary } from "../data/Dictionaries";
import { CharacterLog, MagicItem, StoryAward } from '../data/Types';

export interface CharacterDetailsProps {
    characterLogs: CharacterLog[],
    consumableMagicItems: MagicItem[],
    permanentMagicItems: MagicItem[],
    storyAwards: StoryAward[],
};

const CharacterDetailTabs = (props: CharacterDetailsProps) => {
    // Reference to theme
    const theme = useTheme();
    // Helper boolean to apply properties conditional on screen size
    const isScreenMdOrLarger = useMediaQuery(theme.breakpoints.up("md"));
    // Value representing currently selected tab
    const [tabValue, setTabValue] = useState(0);

    const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
        setTabValue(newValue);
    };

    return (
        <>
            <Grid 
                container 
                direction="row" 
                justifyContent="center" 
                rowSpacing={2}
                columnSpacing={1}
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
                        centered={isScreenMdOrLarger}
                        variant={isScreenMdOrLarger ? "standard" : "scrollable"}
                        scrollButtons={!isScreenMdOrLarger}
                    >
                        <Tab label="Player Logs" />
                        <Tab label="Magic Items" />
                        <Tab label="Story Awards" />
                        <Tab label="Other Details" />
                    </Tabs>
                </Grid>
                <Grid item xs={12}>
                    <TableContainer component={Paper} elevation={3}>
                    <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
                        <TableHead>
                        <TableRow>
                            <TableCell>Date Logged</TableCell>
                            <TableCell>Title</TableCell>
                            <TableCell>Type</TableCell>
                            <TableCell>Levels Gained</TableCell>
                            <TableCell>Gold</TableCell>
                            <TableCell>Downtime</TableCell>
                            <TableCell>Magic Items</TableCell>
                            <TableCell align="center">Actions</TableCell>
                        </TableRow>
                        </TableHead>
                        <TableBody>
                        {props.characterLogs.map((log) => (
                            <TableRow
                                key={log.id}
                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            >
                            <TableCell>{log.timestamp.toString()}</TableCell>
                            <TableCell component="th" scope="row">
                                {log.title}
                            </TableCell>
                            <TableCell>{CharacterLogTypeDictionary.get(log.type)}</TableCell>
                            <TableCell>{log.levels}</TableCell>
                            <TableCell>{log.gold}</TableCell>
                            <TableCell>{log.downtime}</TableCell>
                            <TableCell>Something Really Cool!</TableCell>
                            <TableCell align="center">
                                <IconButton color="primary"><Icon>visibility</Icon></IconButton>
                                <IconButton color="primary"><Icon>edit</Icon></IconButton>
                                <IconButton color="error"><Icon>delete</Icon></IconButton>
                            </TableCell>
                            </TableRow>
                        ))}
                        </TableBody>
                    </Table>
                    </TableContainer>
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
            { /*props.permanentMagicItems.map((magicItem) => (
                <>
                    <Typography variant="h5" component="h2" gutterBottom>
                        {magicItem.flavorName ? `${magicItem.flavorName} (${magicItem.name})` : magicItem.name}
                    </Typography>
                    <Typography gutterBottom>
                        {ItemTypeDictionary.get(magicItem.type)}, {ItemRarityDictionary.get(magicItem.rarity)}{magicItem.requiresAttunement ? ' (requires attunement)' : ''}
                    </Typography>
                </>
            ))*/}
        </>
    );
};

export default CharacterDetailTabs;