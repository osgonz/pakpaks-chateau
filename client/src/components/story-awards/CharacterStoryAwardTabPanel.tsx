import { useMemo } from 'react';
import Checkbox from "@mui/material/Checkbox";
import Grid from '@mui/material/Grid';
import FormControl from "@mui/material/FormControl";
import Icon from '@mui/material/Icon';
import InputAdornment from '@mui/material/InputAdornment';
import InputLabel from "@mui/material/InputLabel";
import ListItemText from "@mui/material/ListItemText";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import TextField from "@mui/material/TextField";
import { StoryAwardStatusDictionary } from '../../data/Dictionaries';
import { StoryAwardRow, StoryAwardStatus } from '../../data/Types';
import { useSearchBarSearchParams, useStoryAwardSearchParams } from '../../hooks/useSearchParams';
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

    // Array containing Story Award Status ids for Select options
    const statusDictionary = Array.from(StoryAwardStatusDictionary.keys());

    // Variable storing search bar value
    const { status, setStatus } = useStoryAwardSearchParams();
    const { searchValue, setSearchValue } = useSearchBarSearchParams();

    // Object containing a subset of filtered story awards
    const filteredStoryAward = useMemo(
        () => {
            let filteredAwards = storyAwards?.slice();

            if (status.length > 0) {
                filteredAwards = filteredAwards?.filter((award) => status.indexOf(award.status) >= 0);
            }

            return filteredAwards;
        },
        [storyAwards, status]
    );
    const searchedStoryAward = useMemo(
        () => searchValue === "" ? filteredStoryAward?.slice() : filteredStoryAward?.slice().filter((award) => {
            let sanitizedSearch = searchValue.toLowerCase().replace(/\s+/g, "");

            return award.name.toLowerCase().replace(/\s+/g, "").includes(sanitizedSearch) 
                || award.description?.toLowerCase().replace(/\s+/g, "").includes(sanitizedSearch) 
                || award.originLogTitle.toLowerCase().replace(/\s+/g, "").includes(sanitizedSearch);
        }),
        [filteredStoryAward, searchValue]
    );
    

    return (
        <DetailTabPanel 
            value={tabValue}
            index={tabIndex}
            tabName="story-awards"
        >
            <Grid item md={7.5} xs={12}>
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
            <Grid item md={4.5} xs={12} sx={{ pb: '0.35em' }}>
                <FormControl fullWidth>
                    <InputLabel id="story-award-status-label">Status</InputLabel>
                    <Select
                        id="story-award-status"
                        labelId="story-award-status-label"
                        label="Status"
                        multiple
                        onChange={e => setStatus(e.target.value as StoryAwardStatus[])}
                        renderValue={(selected) => selected.map(o => StoryAwardStatusDictionary.get(o)).join(', ')}
                        value={status}
                    >
                        { statusDictionary.map((option) => (
                            <MenuItem key={option} value={option}>
                                <Checkbox checked={ status.indexOf(option) > -1 } />
                                <ListItemText primary={StoryAwardStatusDictionary.get(option)} />
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>
            </Grid>
            <StoryAwardTable 
                storyAwards={searchedStoryAward}
                handleRemoveStoryAwardByIndex={handleRemoveStoryAwardByIndex}
            />
        </DetailTabPanel>
    );
};

export default CharacterStoryAwardTabPanel;