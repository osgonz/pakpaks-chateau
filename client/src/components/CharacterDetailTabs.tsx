import { useState } from 'react';
import Grid from "@mui/material/Grid";
import { Tab, Tabs } from "@mui/material";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";
import { CharacterLogRow, MagicItemRow, StoryAward } from '../data/Types';
import CharacterDetailTabPanel from './CharacterDetailTabPanel';
import CharacterLogTable from './CharacterLogTable';
import StoryAwardTable from './StoryAwardTable';
import MagicItemTable from './MagicItemTable';

function getA11yPropsForTabs(tabName: string) {
    return {
        id: `${tabName}-tab`,
        'aria-controls': `${tabName}-tabpanel`
    };
};

interface CharacterDetailsProps {
    characterLogs: CharacterLogRow[],
    magicItems: MagicItemRow[],
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
                        aria-label="Character details tabs"
                    >
                        <Tab label="Player Logs" {...getA11yPropsForTabs("player-logs")} />
                        <Tab label="Magic Items" {...getA11yPropsForTabs("magic-items")} />
                        <Tab label="Story Awards" {...getA11yPropsForTabs("story-awards")} />
                        <Tab label="Other Details" {...getA11yPropsForTabs("other-details")} />
                    </Tabs>
                </Grid>
                <CharacterDetailTabPanel 
                    value={tabValue}
                    index={0}
                    tabName="player-logs"
                >
                    <CharacterLogTable 
                        characterLogs={props.characterLogs}
                    />
                </CharacterDetailTabPanel>
                <CharacterDetailTabPanel 
                    value={tabValue}
                    index={1}
                    tabName="magic-items"
                >
                    <MagicItemTable
                        magicItems={props.magicItems}
                    />
                </CharacterDetailTabPanel>
                <CharacterDetailTabPanel 
                    value={tabValue}
                    index={2}
                    tabName="story-awards"
                >
                    <StoryAwardTable
                        storyAwards={props.storyAwards}
                    />
                </CharacterDetailTabPanel>
                <CharacterDetailTabPanel 
                    value={tabValue}
                    index={3}
                    tabName="other-details"
                >
                </CharacterDetailTabPanel>
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