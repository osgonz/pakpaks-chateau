import { useState, useEffect, useMemo } from 'react';
import Checkbox from "@mui/material/Checkbox";
import Container from "@mui/material/Container";
import FormControl from "@mui/material/FormControl";
import Grid from "@mui/material/Grid";
import InputAdornment from '@mui/material/InputAdornment';
import InputLabel from "@mui/material/InputLabel";
import LinearProgress from "@mui/material/LinearProgress";
import ListItemText from "@mui/material/ListItemText";
import MenuItem from "@mui/material/MenuItem";
import Paper from "@mui/material/Paper";
import Select from "@mui/material/Select";
import TextField from "@mui/material/TextField";
import Typography from '@mui/material/Typography';
import SearchIcon from '@mui/icons-material/Search';
import { CharacterLogTypeDictionary, ItemRarityDictionary } from '../data/Dictionaries';
import { CharacterLogType, ItemRarity, MagicItemGeneralRow } from '../data/Types';
import { useMagicItems } from "../hooks/useMagicItem";
import { useMagicItemSearchParams, useSearchBarSearchParams } from "../hooks/useSearchParams";
import { useAuth } from '../components/shared/AuthContext';
import BreadcrumbsMenu from '../components/shared/BreadcrumbsMenu';
import MagicItemTable from '../components/magic-items/MagicItemTable';

const MagicItemHome = () => {
    // Array containing Character Sort By Option ids for Select options
    const itemRarityArray = Array.from(ItemRarityDictionary.keys());
    const charLogTypeArray = Array.from(CharacterLogTypeDictionary.keys());

    // Auth context loading reference
    const { isLoading } = useAuth();
    // Magic Items details
    const loadedItems = useMagicItems();
    const [items, setItems] = useState<MagicItemGeneralRow[] | undefined>();

    // Variables storing filters
    const { categoryValue, setCategory, attunementValue, setAttunement, rarities, setRarities, origins, setOrigins } = useMagicItemSearchParams();
    const { searchValue, setSearchValue } = useSearchBarSearchParams();

    // Object containing a subset of filtered Magic Items
    const filteredMagicItems = useMemo(
        () => {
            let filteredItems = items?.slice();

            if (categoryValue > -1) {
                filteredItems = filteredItems?.filter((item) => item.isConsumable == Boolean(categoryValue));
            }

            if (attunementValue > -1) {
                filteredItems = filteredItems?.filter((item) => item.requiresAttunement == Boolean(attunementValue));
            }

            if (rarities.length > 0) {
                filteredItems = filteredItems?.filter((item) => rarities.indexOf(item.rarity) >= 0);
            }

            if (origins.length > 0) {
                filteredItems = filteredItems?.filter((item) => origins.indexOf(item.originLogType) >= 0);
            }

            return filteredItems;
        },
        [items, categoryValue, attunementValue, rarities, origins]
    );
    const searchedMagicItems = useMemo(
        () => searchValue === "" ? filteredMagicItems?.slice() : filteredMagicItems?.slice().filter((item) => {
            let sanitizedSearch = searchValue.toLowerCase().replace(/\s+/g, "");

            return item.name.toLowerCase().replace(/\s+/g, "").includes(sanitizedSearch) 
                || item.flavorName?.toLowerCase().replace(/\s+/g, "").includes(sanitizedSearch) 
                || item.characterName.toLowerCase().replace(/\s+/g, "").includes(sanitizedSearch) 
                || item.properties?.toLowerCase().replace(/\s+/g, "").includes(sanitizedSearch) 
                || item.originLogTitle.toLowerCase().replace(/\s+/g, "").includes(sanitizedSearch);
        }),
        [filteredMagicItems, searchValue]
    );

    // Helper function used to refresh data following an item deletion
    const handleRemoveItemByIndex = (index: number) => {
        let splicedItems = [...(items as MagicItemGeneralRow[])];
        splicedItems.splice(index, 1);
        setItems(splicedItems);
    };

    useEffect(() => {
        setItems(loadedItems);
    }, [loadedItems]);

    return (
        <>
            { !isLoading && searchedMagicItems ? (
                <>
                    <Container maxWidth="lg">
                        <BreadcrumbsMenu 
                            currentPageTitle="Magic Items"
                        />
                        <Paper 
                            elevation={1}
                            sx={{
                                p: 3 
                            }}
                        >
                            <Grid 
                                container 
                                justifyContent="center" 
                                spacing={2}
                                sx={{
                                    pb: 2,
                                    pr: 4,
                                    ml: "auto",
                                    mr: "auto",

                                }}
                            >
                                <Grid item xs={12}>
                                    <Typography variant="h3" component="h1" gutterBottom textAlign="center">
                                        Magic Items
                                    </Typography>
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField
                                        id="magic-item-search"
                                        label="Search"
                                        onChange={e => setSearchValue(e.target.value)}
                                        placeholder="Search by Name, Owner, Properties or Origin Log"
                                        value={searchValue}
                                        fullWidth
                                        InputProps={{
                                            startAdornment: <InputAdornment position="start"><SearchIcon /></InputAdornment>,
                                        }}
                                    />
                                </Grid>
                                <Grid item md={3} sm={6} xs={12}>
                                    <FormControl fullWidth>
                                        <InputLabel id="magic-item-rarity-label">Rarity</InputLabel>
                                        <Select
                                            id="magic-item-rarity"
                                            labelId="magic-item-rarity-label"
                                            label="Rarity"
                                            multiple
                                            onChange={e => setRarities(e.target.value as ItemRarity[])}
                                            renderValue={(selected) => selected.map(o => ItemRarityDictionary.get(o)).join(', ')}
                                            value={rarities}
                                        >
                                            { itemRarityArray.map((option) => (
                                                <MenuItem key={option} value={option}>
                                                    <Checkbox checked={ rarities.indexOf(option) > -1 } />
                                                    <ListItemText primary={ItemRarityDictionary.get(option)} />
                                                </MenuItem>
                                            ))}
                                        </Select>
                                    </FormControl>
                                </Grid>
                                <Grid item md={3} sm={6} xs={12}>
                                    <FormControl fullWidth>
                                        <InputLabel 
                                            id="magic-item-category-label"
                                            shrink={categoryValue >= 0}
                                        >
                                            Consumable
                                        </InputLabel>
                                        <Select
                                            id="magic-item-category"
                                            labelId="magic-item-category-label"
                                            label="Consumable"
                                            notched={categoryValue >= 0}
                                            onChange={e => setCategory(e.target.value as number)}
                                            renderValue={s => s == 1 ? 'Yes' : s == 0 ? 'No' : ''}
                                            value={categoryValue}
                                        >
                                            <MenuItem value={-1}>—</MenuItem>
                                            <MenuItem value={0}>No</MenuItem>
                                            <MenuItem value={1}>Yes</MenuItem>
                                        </Select>
                                    </FormControl>
                                </Grid>
                                <Grid item md={3} sm={6} xs={12}>
                                    <FormControl fullWidth>
                                        <InputLabel 
                                            id="magic-item-attunement-label"
                                            shrink={attunementValue >= 0}
                                        >
                                            Attunement
                                        </InputLabel>
                                        <Select
                                            id="magic-item-attunement"
                                            labelId="magic-item-attunement-label"
                                            label="Attunement"
                                            notched={attunementValue >= 0}
                                            onChange={e => setAttunement(e.target.value as number)}
                                            renderValue={s => s == 1 ? 'Yes' : s == 0 ? 'No' : ''}
                                            value={attunementValue}
                                        >
                                            <MenuItem value={-1}>—</MenuItem>
                                            <MenuItem value={0}>No</MenuItem>
                                            <MenuItem value={1}>Yes</MenuItem>
                                        </Select>
                                    </FormControl>
                                </Grid>
                                <Grid item md={3} sm={6} xs={12} sx={{ pb: '0.35em' }}>
                                    <FormControl fullWidth>
                                        <InputLabel id="magic-item-origin-type-label">Origin Type</InputLabel>
                                        <Select
                                            id="magic-item-origin-type"
                                            labelId="magic-item-origin-type-label"
                                            label="Origin Type"
                                            multiple
                                            onChange={e => setOrigins(e.target.value as CharacterLogType[])}
                                            renderValue={(selected) => selected.map(o => CharacterLogTypeDictionary.get(o)).join(', ')}
                                            value={origins}
                                        >
                                            { charLogTypeArray.map((option) => (
                                                <MenuItem key={option} value={option}>
                                                    <Checkbox checked={ origins.indexOf(option) > -1 } />
                                                    <ListItemText primary={CharacterLogTypeDictionary.get(option)} />
                                                </MenuItem>
                                            ))}
                                        </Select>
                                    </FormControl>
                                </Grid>
                                <MagicItemTable
                                    magicItems={searchedMagicItems}
                                    handleRemoveMagicItemByIndex={handleRemoveItemByIndex}
                                />
                            </Grid>
                        </Paper>
                    </Container>
                </>
            ) : (
                <LinearProgress />
            )}
        </>
    );
};

export default MagicItemHome;