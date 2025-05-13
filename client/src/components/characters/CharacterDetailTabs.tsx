import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import Grid from "@mui/material/Grid";
import { Tab, Tabs } from "@mui/material";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";
import { CharacterLogRow, MagicItemRow, StoryAwardRow } from '../../data/Types';
import CharacterDetailTabPanel from './CharacterDetailTabPanel';
import CharacterLogTable from '../character-logs/CharacterLogTable';
import StoryAwardTable from '../story-awards/CharacterStoryAwardTable';
import MagicItemTable from '../magic-items/CharacterMagicItemTable';

function getA11yPropsForTabs(tabName: string) {
    return {
        id: `${tabName}-tab`,
        'aria-controls': `${tabName}-tabpanel`
    };
};

interface CharacterDetailsProps {
    characterLogs: CharacterLogRow[],
    magicItems: MagicItemRow[],
    storyAwards: StoryAwardRow[],
    handleRemoveCharacterLogByIndex: (index: number) => void,
    handleRemoveMagicItemByIndex: (index: number) => void,
    handleRemoveStoryAwardByIndex: (index: number) => void,
};

const CharacterDetailTabs = (props: CharacterDetailsProps) => {
    // Reference to theme
    const theme = useTheme();
    // Helper boolean to apply properties conditional on screen size
    const isScreenMdOrLarger = useMediaQuery(theme.breakpoints.up("md"));
    // Object representing query params
    const [searchParams, setSearchParams] = useSearchParams();
    // Value representing currently selected tab
    const [tabValue, setTabValue] = useState(0);

    // Helper function triggered when detail tab is changed
    const handleTabChange = (_: React.SyntheticEvent, newValue: number) => {
        setSearchParams(prevParams => {
            prevParams.delete('page');
            prevParams.delete('rows');

            switch(newValue) {
                case 1:
                    prevParams.set('tab', 'items');
                    break;
                case 2:
                    prevParams.set('tab', 'awards');
                    break;
                case 3:
                    prevParams.set('tab', 'other');
                    break;
                default:
                    prevParams.delete('tab');
                    break;
            };

            return prevParams;
        });
    };

    useEffect(() => {
        if (searchParams) {
            let tabParam = searchParams.get('tab');

            switch (tabParam) {
                case 'items':
                    setTabValue(1);
                    break;
                case 'awards':
                    setTabValue(2);
                    break;
                case 'other':
                    setTabValue(3);
                    break;
                default:
                    setTabValue(0);
                    break;
            };
        }
    }, [searchParams]);

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
                        handleRemoveCharacterLogByIndex={props.handleRemoveCharacterLogByIndex}
                    />
                </CharacterDetailTabPanel>
                <CharacterDetailTabPanel 
                    value={tabValue}
                    index={1}
                    tabName="magic-items"
                >
                    <MagicItemTable
                        magicItems={props.magicItems}
                        handleRemoveMagicItemByIndex={props.handleRemoveMagicItemByIndex}
                    />
                </CharacterDetailTabPanel>
                <CharacterDetailTabPanel 
                    value={tabValue}
                    index={2}
                    tabName="story-awards"
                >
                    <StoryAwardTable
                        storyAwards={props.storyAwards}
                        handleRemoveStoryAwardByIndex={props.handleRemoveStoryAwardByIndex}
                    />
                </CharacterDetailTabPanel>
                <CharacterDetailTabPanel 
                    value={tabValue}
                    index={3}
                    tabName="other-details"
                >
                </CharacterDetailTabPanel>
            </Grid>
        </>
    );
};

export default CharacterDetailTabs;