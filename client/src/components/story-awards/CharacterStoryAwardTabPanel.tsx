import { useMemo } from 'react';
import Grid from '@mui/material/Grid';
import Icon from '@mui/material/Icon';
import InputAdornment from '@mui/material/InputAdornment';
import TextField from "@mui/material/TextField";
import { StoryAwardRow } from '../../data/Types';
import { useSearchBarSearchParams } from '../../hooks/useSearchParams';
import DetailTabPanel from '../shared/DetailTabPanel';
import StoryAwardTable from './CharacterStoryAwardTable';

interface CharacterStoryAwardTabPanelProps {
    tabIndex: number,
    tabValue: number,
    storyAwards: StoryAwardRow[],
    handleRemoveStoryAwardByIndex: (index: number) => void,
};

const CharacterStoryAwardTabPanel = (props: CharacterStoryAwardTabPanelProps) => {
    const { tabIndex, tabValue, storyAwards, handleRemoveStoryAwardByIndex } = props;

    // Variable storing search bar value
    const { searchValue, setSearchValue } = useSearchBarSearchParams();

    // Object containing a subset of filtered story awards
    const filteredAwards = useMemo(
        () => searchValue === "" ? storyAwards?.slice() : storyAwards?.slice().filter((award) => {
            let sanitizedSearch = searchValue.toLowerCase().replace(/\s+/g, "");

            return award.name.toLowerCase().replace(/\s+/g, "").includes(sanitizedSearch) 
                || award.description?.toLowerCase().replace(/\s+/g, "").includes(sanitizedSearch) 
                || award.originLogTitle.toLowerCase().replace(/\s+/g, "").includes(sanitizedSearch);
        }),
        [storyAwards, searchValue]
    );
    

    return (
        <DetailTabPanel 
            value={tabValue}
            index={tabIndex}
            tabName="story-awards"
        >
            <Grid item xs={12} sx={{ pb: '0.35em' }}>
                <TextField
                    id="story-award-search"
                    label="Search"
                    onChange={e => setSearchValue(e.target.value)}
                    placeholder="Search by Name, Description or Origin Log"
                    value={searchValue}
                    fullWidth
                    InputProps={{
                        startAdornment: <InputAdornment position="start"><Icon>search</Icon></InputAdornment>,
                    }}
                />
            </Grid>
            <StoryAwardTable 
                storyAwards={filteredAwards}
                handleRemoveStoryAwardByIndex={handleRemoveStoryAwardByIndex}
            />
        </DetailTabPanel>
    );
};

export default CharacterStoryAwardTabPanel;