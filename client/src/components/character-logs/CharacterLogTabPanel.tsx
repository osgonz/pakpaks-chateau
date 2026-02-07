import { useMemo } from 'react';
import Grid from '@mui/material/Grid';
import Icon from '@mui/material/Icon';
import InputAdornment from '@mui/material/InputAdornment';
import TextField from "@mui/material/TextField";
import { CharacterLogRow } from '../../data/Types';
import { useSearchBarSearchParams } from '../../hooks/useSearchParams';
import CharacterLogTable from './CharacterLogTable';
import DetailTabPanel from '../shared/DetailTabPanel';

interface CharacterLogTabPanelProps {
    tabIndex: number,
    tabValue: number,
    characterLogs: CharacterLogRow[],
    handleRemoveCharacterLogByIndex: (index: number) => void,
};

const CharacterLogTabPanel = (props: CharacterLogTabPanelProps) => {
    const { tabIndex, tabValue, characterLogs, handleRemoveCharacterLogByIndex } = props;

    // Variable storing search bar value
    const { searchValue, setSearchValue } = useSearchBarSearchParams();

    // Object containing a subset of filtered logs
    const filteredLogs = useMemo(
        () => searchValue === "" ? characterLogs?.slice() : characterLogs?.slice().filter((log) => {
            let sanitizedSearch = searchValue.toLowerCase().replace(/\s+/g, "");

            return log.title.toLowerCase().replace(/\s+/g, "").includes(sanitizedSearch) 
                || log.location.toLowerCase().replace(/\s+/g, "").includes(sanitizedSearch) 
                || log.dmName?.toLowerCase().replace(/\s+/g, "").includes(sanitizedSearch) 
                || log.description?.toLowerCase().replace(/\s+/g, "").includes(sanitizedSearch) 
                || log.magicItemNames?.toLowerCase().replace(/\s+/g, "").includes(sanitizedSearch) 
                || log.lostMagicItemNames?.toLowerCase().replace(/\s+/g, "").includes(sanitizedSearch) 
                || log.storyAwardNames?.toLowerCase().replace(/\s+/g, "").includes(sanitizedSearch);
        }),
        [characterLogs, searchValue]
    );
    

    return (
        <DetailTabPanel 
            value={tabValue}
            index={tabIndex}
            tabName="player-logs"
        >
            <Grid item xs={12} sx={{ pb: '0.35em' }}>
                <TextField
                    id="player-log-search"
                    label="Search"
                    onChange={e => setSearchValue(e.target.value)}
                    placeholder="Search by Title, Location, Dungeon Master, Description or Rewards"
                    value={searchValue}
                    fullWidth
                    InputProps={{
                        startAdornment: <InputAdornment position="start"><Icon>search</Icon></InputAdornment>,
                    }}
                />
            </Grid>
            <CharacterLogTable 
                characterLogs={filteredLogs}
                handleRemoveCharacterLogByIndex={handleRemoveCharacterLogByIndex}
            />
        </DetailTabPanel>
    );
};

export default CharacterLogTabPanel;