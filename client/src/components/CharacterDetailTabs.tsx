import { useState } from 'react';
import Grid from "@mui/material/Grid";
import { Tab, Tabs } from "@mui/material";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";
import { CharacterLog, MagicItem, StoryAward } from '../data/Types';
import CharacterLogTable from './CharacterLogTable';

interface CharacterDetailsProps {
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

    // Helper function triggered when detail tab is changed
    const handleTabChange = (_: React.SyntheticEvent, newValue: number) => {
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
                    <CharacterLogTable 
                            characterLogs={props.characterLogs}
                    />
                </Grid>
            </Grid>
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