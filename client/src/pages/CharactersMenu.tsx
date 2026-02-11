import axios from 'axios';
import { useState, useEffect, useMemo } from 'react';
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import FormControl from "@mui/material/FormControl";
import Grid from "@mui/material/Grid";
import Icon from "@mui/material/Icon";
import InputAdornment from '@mui/material/InputAdornment';
import InputLabel from "@mui/material/InputLabel";
import LinearProgress from "@mui/material/LinearProgress";
import MenuItem from "@mui/material/MenuItem";
import Paper from "@mui/material/Paper";
import Select from "@mui/material/Select";
import TextField from "@mui/material/TextField";
import Typography from '@mui/material/Typography';
import { Link } from "react-router-dom";
import { CharacterSortByOptionDictionary, CampaignDictionary } from '../data/Dictionaries';
import { Character, CharacterSortByOption, CharacterRow } from '../data/Types';
import { useCharacters } from "../hooks/useCharacter";
import { useCharacterSearchParams, useSearchBarSearchParams } from "../hooks/useSearchParams";
import { useAuth } from '../components/shared/AuthContext';
import BreadcrumbsMenu from '../components/shared/BreadcrumbsMenu';
import CharacterCard from "../components/characters/CharacterCard";
import DeleteConfirmationDialog from '../components/shared/DeleteConfirmationDialog';
import { getCharacterSortComparator } from '../components/shared/SortableTableHead';

const CharactersMenu = () => {
    // Array containing Character Sort By Option ids for Select options
    const characterSortByArray = Array.from(CharacterSortByOptionDictionary.keys());

    // Auth context loading reference
    const { isLoading } = useAuth();
    // Character details
    const loadedCharacters = useCharacters();
    const [characters, setCharacters] = useState<CharacterRow[] | undefined>();

    // Variables storing
    const { searchValue, setSearchValue } = useSearchBarSearchParams();
    const { sortOrder, setSortOrder } = useCharacterSearchParams();

    // Flag used to display Character Delete dialog
    const [deleteOpen, setDeleteOpen] = useState(false);
    // Character currently set for deletion
    const [characterToBeDeleted, setCharacterToBeDeleted] = useState<Character | null>(null);

    // Object containing sorted subset of Characters
    const sortedCharacters = useMemo(
        () => characters?.slice().sort(getCharacterSortComparator(sortOrder)),
        [characters, sortOrder]
    );
    const visibleCharacters = useMemo(
        () => searchValue === "" ? sortedCharacters?.slice() : sortedCharacters?.slice().filter((character) => {
            let sanitizedSearch = searchValue.toLowerCase().replace(/\s+/g, "");

            return character.name.toLowerCase().replace(/\s+/g, "").includes(sanitizedSearch) 
                || character.classes.toLowerCase().replace(/\s+/g, "").includes(sanitizedSearch) 
                || character.lineage.toLowerCase().replace(/\s+/g, "").includes(sanitizedSearch)
                || CampaignDictionary.get(character.campaign)?.toLowerCase().replace(/\s+/g, "").includes(sanitizedSearch)
                || character.characterLevel === parseInt(searchValue) 
                || (character.characterLevel >= 10 && (
                    Math.floor(character.characterLevel / 10) === parseInt(searchValue) 
                    || character.characterLevel % 10 === parseInt(searchValue)
                ));
        }),
        [sortedCharacters, searchValue]
    );

    // Helper function triggered when attempting to Delete a Character
    const handleDeleteOpen = (character: Character) => {
        setCharacterToBeDeleted(character);
        setDeleteOpen(true);
    };

    // Helper function triggered when closing the Delete Character Confirmation dialog
    const handleDeleteClose = () => {
        setDeleteOpen(false);
        setCharacterToBeDeleted(null);
    };

    // Helper function used to refresh data following a character deletion
    const handleRemoveCharacterByIndex = (index: number) => {
        let splicedCharacters = [...(characters as CharacterRow[])];
        splicedCharacters.splice(index, 1);
        setCharacters(splicedCharacters);
    };

    // Function used to delete a character following confirmation
    const deleteCharacter = async() => {
        await axios.delete(`/api/characters/${characterToBeDeleted?.id}`);
        handleRemoveCharacterByIndex(characters!.findIndex((character) => character.id === characterToBeDeleted?.id));
        handleDeleteClose();
    };

    useEffect(() => {
        setCharacters(loadedCharacters);
    }, [loadedCharacters]);

    return (
        <>
            { !isLoading && visibleCharacters ? (
                <>
                    <Container maxWidth="lg">
                        <BreadcrumbsMenu 
                            currentPageTitle="Characters"
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
                                        Characters
                                    </Typography>
                                </Grid>
                                <Grid justifyContent="flex-end" container item xs={12}>
                                    <Grid item md={4.5} xs={12}>
                                        <Button 
                                            component={Link}
                                            to={`/characters/new`}
                                            variant="outlined"
                                            fullWidth
                >
                                            Create Character
                                        </Button>
                                    </Grid>
                                </Grid>
                                <Grid item md={7.5} xs={12}>
                                    <TextField
                                        id="characters-search"
                                        label="Search"
                                        onChange={e => setSearchValue(e.target.value)}
                                        placeholder="Search by Name, Level, Class, Species or Campaign"
                                        value={searchValue}
                                        fullWidth
                                        InputProps={{
                                            startAdornment: <InputAdornment position="start"><Icon>search</Icon></InputAdornment>,
                                        }}
                                    />
                                </Grid>
                                <Grid item md={4.5} xs={12} sx={{ pb: '0.35em' }}>
                                    <FormControl fullWidth>
                                        <InputLabel id="characters-sort-label">Sort By</InputLabel>
                                        <Select
                                            id="characters-sort"
                                            labelId="characters-sort-label"
                                            label="Sort By"
                                            onChange={e => setSortOrder(e.target.value as CharacterSortByOption)}
                                            value={sortOrder}
                                        >
                                            { characterSortByArray.map((option) => (
                                                <MenuItem key={option} value={option}>{CharacterSortByOptionDictionary.get(option)}</MenuItem>
                                            ))}
                                        </Select>
                                    </FormControl>
                                </Grid>
                                <Grid 
                                    container 
                                    item
                                    spacing={4}
                                >
                                    { visibleCharacters.map((character) => (
                                        <CharacterCard
                                            key={character.id}
                                            character={character}
                                            handleDeleteOpen={handleDeleteOpen}
                                        />
                                    ))}
                                </Grid>
                            </Grid>
                        </Paper>
                    </Container>
                    <DeleteConfirmationDialog
                        open={deleteOpen}
                        handleClose={handleDeleteClose}
                        entityTypeToDelete='Character'
                        confirmationDialogText={`You are deleting a character named '${characterToBeDeleted?.name}'. You will not be able to recover this data.`}
                        deleteFunction={deleteCharacter}
                    />
                </>
            ) : (
                <LinearProgress />
            )}
        </>
    );
};

export default CharactersMenu;