import Grid from '@mui/material/Grid';
import Tab from '@mui/material/Tab';
import Tabs from "@mui/material/Tabs";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";
import { CharacterLogRow, MagicItemRow, StoryAwardRow } from '../../data/Types';
import { useCharacterTabSearchParams } from '../../hooks/useSearchParams';
import CharacterLogTabPanel from '../character-logs/CharacterLogTabPanel';
import CharacterMagicItemTabPanel from '../magic-items/CharacterMagicItemTabPanel';
import CharacterStoryAwardTabPanel from '../story-awards/CharacterStoryAwardTabPanel';
import DetailTabPanel from '../shared/DetailTabPanel';

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
    // Value representing currently selected tab
    const { tabValue, setTabValue } = useCharacterTabSearchParams();

    // Helper function triggered when detail tab is changed
    const handleTabChange = (_: React.SyntheticEvent, newValue: number) => {
        setTabValue(newValue);
    };

    return (
        <>
            <Grid 
                container 
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
                <CharacterLogTabPanel 
                    tabIndex={0}
                    tabValue={tabValue}
                    characterLogs={props.characterLogs}
                    handleRemoveCharacterLogByIndex={props.handleRemoveCharacterLogByIndex}
                />
                <CharacterMagicItemTabPanel
                    tabIndex={1}
                    tabValue={tabValue}
                    magicItems={props.magicItems}
                    handleRemoveMagicItemByIndex={props.handleRemoveMagicItemByIndex}
                />
                <CharacterStoryAwardTabPanel
                    tabIndex={2}
                    tabValue={tabValue}
                    storyAwards={props.storyAwards}
                    handleRemoveStoryAwardByIndex={props.handleRemoveStoryAwardByIndex}
                />
                <DetailTabPanel 
                    value={tabValue}
                    index={3}
                    tabName="other-details"
                >
                </DetailTabPanel>
            </Grid>
        </>
    );
};

export default CharacterDetailTabs;