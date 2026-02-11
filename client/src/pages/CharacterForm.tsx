import axios from 'axios';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from "react-router-dom";
import Autocomplete from "@mui/material/Autocomplete";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import LinearProgress from "@mui/material/LinearProgress";
import Paper from "@mui/material/Paper";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import { CampaignDictionary } from '../data/Dictionaries';
import { Campaign } from '../data/Types';
import { useCharacter } from "../hooks/useCharacter";
import { useAuth } from '../components/shared/AuthContext';
import BreadcrumbsMenu from '../components/shared/BreadcrumbsMenu';

const CharacterForm = () => {
    // Auth context loading reference
    const { isLoading } = useAuth();
    // Character & award id values fetched from URL params
    const { characterId } = useParams();
    // Character details
    const currentCharacter = characterId ? useCharacter(characterId) : null;
    // Hook used to navigate programmatically
    const navigate = useNavigate();
    // Default error message for required fields
    const requiredFieldErrorMessage = "This field is required.";
    // Array containing Campaign ids for Autocomplete fields
    const campaignArray = Array.from(CampaignDictionary.keys());

    // State object containing user-provided character info
    const [character, setCharacter] = useState({
        name: '' as string,
        campaign: null as Campaign | null,
        lineage: '' as string,
        classes: '' as string,
        background: '' as string,
        backstory: '' as string | null,
        notes: '' as string | null,
        characterSheetLink: '' as string | null,
        imageUrl: '' as string | null,
    });

    // State object containing error flags for fields requiring validation
    const [characterError, setCharacterError] = useState({
        name: false,
        campaign: false,
        lineage: false,
        classes: false,
        background: false,
    });

    // State object containing loading flag for View/Edit scenarios
    const [isCharacterLoading, setIsCharacterLoading] = useState(true);

    // Helper function triggered when updating an Autocomplete field
    const handleCharacterAutocompleteChange = (_: React.BaseSyntheticEvent, value: Campaign | null, fieldName: string) => {
        setCharacter({ ...character, [fieldName]: value });
    };
    // Helper function triggered when updating a text field
    const handleCharacterTextChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>, fieldName: string) => {
        setCharacter({ ...character, [fieldName]: event.target.value });
    };
    // Helper function triggered when validating a required field
    const handleRequiredFieldValidation = (fieldName: string) => {
        let dynamicKey = fieldName as keyof (typeof character);
        setCharacterError({ ...characterError, [fieldName]: (character[dynamicKey] === null || character[dynamicKey] === "") });
    };

    // Function that validates form before submitting
    const validateForm = () => {
        let errorsFound: any = {};

        if (character.name === null || character.name === "")
            errorsFound['name'] = true;
        if (character.campaign === null)
            errorsFound['campaign'] = true;
        if (character.lineage === null || character.lineage === "")
            errorsFound['lineage'] = true;
        if (character.classes === null || character.classes === "")
            errorsFound['classes'] = true;
        if (character.background === null || character.background === "")
            errorsFound['background'] = true;

        if (Object.keys(errorsFound).length === 0) {
            cookAndSubmitCharacter();
        } else {
            setCharacterError({...characterError, ...errorsFound});
        }
    };

    const cookAndSubmitCharacter = () => {
        let rawCharacter = {...character};

        if (!rawCharacter.backstory) {
            rawCharacter.backstory = null;
        }
        if (!rawCharacter.notes) {
            rawCharacter.notes = null;
        }
        if (!rawCharacter.characterSheetLink) {
            rawCharacter.characterSheetLink = null;
        }
        if (!rawCharacter.imageUrl) {
            rawCharacter.imageUrl = null;
        }

        axios.post(`/api/characters/${characterId || 'create'}`, rawCharacter, { withCredentials: true }).then(_ => {
            navigate(`/characters${ characterId ? `/${characterId}` : '' }`);
        });
    };

    useEffect(() => {
        if (currentCharacter) {
            setCharacter({
                name: currentCharacter.name,
                campaign: currentCharacter.campaign,
                lineage: currentCharacter.lineage,
                classes: currentCharacter.classes,
                background: currentCharacter.background,
                backstory: currentCharacter.backstory === null ? '' : currentCharacter.backstory,
                notes: currentCharacter.notes === null ? '' : currentCharacter.notes,
                characterSheetLink: currentCharacter.characterSheetLink === null ? '' : currentCharacter.characterSheetLink,
                imageUrl: currentCharacter.imageUrl === null ? '' : currentCharacter.imageUrl,
            });
            setIsCharacterLoading(false);
        }
    }, [currentCharacter]);

    return (
        <>
            { !isLoading && (!characterId || (characterId && !isCharacterLoading)) ? (
                <Container maxWidth="md">
                    <BreadcrumbsMenu 
                        characterId={characterId}
                        characterName={(currentCharacter?.name)}
                        currentPageTitle={(characterId ? "Edit" : "New") + " Character"}
                    />
                    <Paper 
                        elevation={1}
                        sx={{
                            p: 3 
                        }}
                    >
                        <Grid 
                            container 
                            direction="row" 
                            justifyContent="center" 
                            rowSpacing={2}
                            columnSpacing={2}
                            sx={{
                                pb: 2,
                                pr: 4,
                                ml: "auto",
                                mr: "auto",

                            }}
                        >
                            <Grid item xs={12}>
                                <Typography variant="h3" component="h1" gutterBottom textAlign="center">
                                    {(characterId ? "Edit" : "New") + " Character"}
                                </Typography>
                            </Grid>
                            <Grid item xs={12}>
                                <TextField 
                                    error={characterError.name}
                                    required
                                    id="character-name"
                                    label="Name"
                                    helperText={characterError.name ? requiredFieldErrorMessage : ''}
                                    onChange={e => handleCharacterTextChange(e, "name")}
                                    onBlur={_ => handleRequiredFieldValidation("name")}
                                    value={character.name}
                                    fullWidth
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <Autocomplete 
                                    id="character-campaign"
                                    options={campaignArray}
                                    getOptionLabel={(o) => CampaignDictionary.get(o) || ''}
                                    onChange={(e, v) => handleCharacterAutocompleteChange(e, v, "campaign")}
                                    onBlur={_ => handleRequiredFieldValidation("campaign")}
                                    value={character.campaign}
                                    fullWidth
                                    renderInput={(params) => (
                                        <TextField 
                                            {...params} 
                                            error={characterError.campaign} 
                                            required 
                                            label="Campaign" 
                                            helperText={characterError.campaign ? requiredFieldErrorMessage : ''}
                                        />
                                    )}
                                />
                            </Grid>
                            <Grid item md={6} xs={12}>
                                <TextField 
                                    error={characterError.background}
                                    required
                                    id="character-background"
                                    label="Background"
                                    helperText={characterError.background ? requiredFieldErrorMessage : ''}
                                    onChange={e => handleCharacterTextChange(e, "background")}
                                    onBlur={_ => handleRequiredFieldValidation("background")}
                                    value={character.background}
                                    fullWidth
                                />
                            </Grid>
                            <Grid item md={6} xs={12}>
                                <TextField 
                                    error={characterError.lineage}
                                    required
                                    id="character-lineage"
                                    label="Species"
                                    helperText={characterError.lineage ? requiredFieldErrorMessage : ''}
                                    onChange={e => handleCharacterTextChange(e, "lineage")}
                                    onBlur={_ => handleRequiredFieldValidation("lineage")}
                                    value={character.lineage}
                                    fullWidth
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField 
                                    error={characterError.classes}
                                    required
                                    id="character-classes"
                                    label="Class"
                                    helperText={characterError.classes ? requiredFieldErrorMessage : ''}
                                    onChange={e => handleCharacterTextChange(e, "classes")}
                                    onBlur={_ => handleRequiredFieldValidation("classes")}
                                    value={character.classes}
                                    fullWidth
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField 
                                    id="character-backstory"
                                    label="Backstory"
                                    onChange={e => handleCharacterTextChange(e, "backstory")}
                                    value={character.backstory}
                                    multiline
                                    rows={6}
                                    fullWidth
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField 
                                    id="character-notes"
                                    label="Notes"
                                    onChange={e => handleCharacterTextChange(e, "notes")}
                                    value={character.notes}
                                    multiline
                                    rows={6}
                                    fullWidth
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField 
                                    id="character-image-url"
                                    label="Image URL"
                                    onChange={e => handleCharacterTextChange(e, "imageUrl")}
                                    value={character.imageUrl}
                                    fullWidth
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField 
                                    id="character-sheet-url"
                                    label="Character Sheet URL"
                                    onChange={e => handleCharacterTextChange(e, "characterSheetLink")}
                                    value={character.characterSheetLink}
                                    fullWidth
                                />
                            </Grid>
                            <Grid justifyContent="flex-end" container item xs={12}>
                                <Grid item md={1} xs={2}>
                                    <Button 
                                        variant="contained"
                                        onClick={_ => validateForm()}
                                        fullWidth
                                    >
                                        Save
                                    </Button>
                                </Grid>
                            </Grid>
                        </Grid>
                    </Paper>
                </Container>
            ) : (
                <LinearProgress />
            )}
        </>
    );
};

export default CharacterForm;