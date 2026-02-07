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
import { CharacterLogTypeDictionary } from '../../data/Dictionaries';
import { CharacterLogRow, CharacterLogType } from '../../data/Types';
import { usePlayerLogsSearchParams, useSearchBarSearchParams } from '../../hooks/useSearchParams';
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

    // Array containing Log Type ids for Select options
    const charLogTypeArray = Array.from(CharacterLogTypeDictionary.keys());

    // Variable storing search bar value
    const { types, setTypes } = usePlayerLogsSearchParams();
    const { searchValue, setSearchValue } = useSearchBarSearchParams();

    // Object containing a subset of filtered logs
    const filteredPlayerLogs = useMemo(
        () => {
            let filteredLogs = characterLogs?.slice();

            if (types.length > 0) {
                filteredLogs = filteredLogs?.filter((log) => types.indexOf(log.type) >= 0);
            }

            return filteredLogs;
        },
        [characterLogs, types]
    );
    const searchedPlayerLogs = useMemo(
        () => searchValue === "" ? filteredPlayerLogs?.slice() : filteredPlayerLogs?.slice().filter((log) => {
            let sanitizedSearch = searchValue.toLowerCase().replace(/\s+/g, "");

            return log.title.toLowerCase().replace(/\s+/g, "").includes(sanitizedSearch) 
                || log.location.toLowerCase().replace(/\s+/g, "").includes(sanitizedSearch) 
                || log.dmName?.toLowerCase().replace(/\s+/g, "").includes(sanitizedSearch) 
                || log.description?.toLowerCase().replace(/\s+/g, "").includes(sanitizedSearch) 
                || log.magicItemNames?.toLowerCase().replace(/\s+/g, "").includes(sanitizedSearch) 
                || log.lostMagicItemNames?.toLowerCase().replace(/\s+/g, "").includes(sanitizedSearch) 
                || log.storyAwardNames?.toLowerCase().replace(/\s+/g, "").includes(sanitizedSearch);
        }),
        [filteredPlayerLogs, searchValue]
    );
    

    return (
        <DetailTabPanel 
            value={tabValue}
            index={tabIndex}
            tabName="player-logs"
        >
            <Grid item md={7.5} xs={12}>
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
            <Grid item md={4.5} xs={12} sx={{ pb: '0.35em' }}>
                <FormControl fullWidth>
                    <InputLabel id="player-log-type-label">Type</InputLabel>
                    <Select
                        id="player-log-type"
                        labelId="player-log-type-label"
                        label="Type"
                        multiple
                        onChange={e => setTypes(e.target.value as CharacterLogType[])}
                        renderValue={(selected) => selected.map(o => CharacterLogTypeDictionary.get(o)).join(', ')}
                        value={types}
                    >
                        { charLogTypeArray.map((option) => (
                            <MenuItem key={option} value={option}>
                                <Checkbox checked={ types.indexOf(option) > -1 } />
                                <ListItemText primary={CharacterLogTypeDictionary.get(option)} />
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>
            </Grid>
            <CharacterLogTable 
                characterLogs={searchedPlayerLogs}
                handleRemoveCharacterLogByIndex={handleRemoveCharacterLogByIndex}
            />
        </DetailTabPanel>
    );
};

export default CharacterLogTabPanel;