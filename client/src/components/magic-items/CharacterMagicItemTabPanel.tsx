import { useMemo } from 'react';
import Grid from '@mui/material/Grid';
import Icon from '@mui/material/Icon';
import InputAdornment from '@mui/material/InputAdornment';
import TextField from "@mui/material/TextField";
import { MagicItemRow } from '../../data/Types';
import { useSearchBarSearchParams } from '../../hooks/useSearchParams';
import DetailTabPanel from '../shared/DetailTabPanel';
import MagicItemTable from './CharacterMagicItemTable';

interface CharacterMagicItemTabPanelProps {
    tabIndex: number,
    tabValue: number,
    magicItems: MagicItemRow[],
    handleRemoveMagicItemByIndex: (index: number) => void,
};

const CharacterMagicItemTabPanel = (props: CharacterMagicItemTabPanelProps) => {
    const { tabIndex, tabValue, magicItems, handleRemoveMagicItemByIndex } = props;

    // Variable storing search bar value
    const { searchValue, setSearchValue } = useSearchBarSearchParams();

    // Object containing a subset of filtered magic items
    const filteredItems = useMemo(
        () => searchValue === "" ? magicItems?.slice() : magicItems?.slice().filter((item) => {
            let sanitizedSearch = searchValue.toLowerCase().replace(/\s+/g, "");

            return item.name.toLowerCase().replace(/\s+/g, "").includes(sanitizedSearch) 
                || item.flavorName?.toLowerCase().replace(/\s+/g, "").includes(sanitizedSearch) 
                || item.properties?.toLowerCase().replace(/\s+/g, "").includes(sanitizedSearch) 
                || item.originLogTitle.toLowerCase().replace(/\s+/g, "").includes(sanitizedSearch);
        }),
        [magicItems, searchValue]
    );
    

    return (
        <DetailTabPanel 
            value={tabValue}
            index={tabIndex}
            tabName="magic-items"
        >
            <Grid item xs={12} sx={{ pb: '0.35em' }}>
                <TextField
                    id="magic-item-search"
                    label="Search"
                    onChange={e => setSearchValue(e.target.value)}
                    placeholder="Search by Name, Properties or Origin Log"
                    value={searchValue}
                    fullWidth
                    InputProps={{
                        startAdornment: <InputAdornment position="start"><Icon>search</Icon></InputAdornment>,
                    }}
                />
            </Grid>
            <MagicItemTable 
                magicItems={filteredItems}
                handleRemoveMagicItemByIndex={handleRemoveMagicItemByIndex}
            />
        </DetailTabPanel>
    );
};

export default CharacterMagicItemTabPanel;