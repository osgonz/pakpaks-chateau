import axios from 'axios';
import { useState, useEffect } from 'react';
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import LinearProgress from "@mui/material/LinearProgress";
import Paper from "@mui/material/Paper";
import Typography from '@mui/material/Typography';
import { Link } from "react-router-dom";
import { Character, CharacterRow } from '../data/Types';
import BreadcrumbsMenu from '../components/shared/BreadcrumbsMenu';
import CharacterCard from "../components/characters/CharacterCard";
import DeleteConfirmationDialog from '../components/shared/DeleteConfirmationDialog';
import { useCharacters } from "../hooks/useCharacter";

const CharactersMenu = () => {
    // Character details
    const loadedCharacters = useCharacters();
    const [characters, setCharacters] = useState<CharacterRow[] | undefined>();

    // Flag used to display Character Delete dialog
    const [deleteOpen, setDeleteOpen] = useState(false);
    // Character currently set for deletion
    const [characterToBeDeleted, setCharacterToBeDeleted] = useState<Character | null>(null);

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
            { characters ? (
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
                                    <Grid item md={4.5} xs={12} sx={{ pb: '0.35em' }}>
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
                                <Grid 
                                    container 
                                    item
                                    spacing={4}
                                >
                                    { characters.map((character) => (
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