import axios from 'axios';
import { useEffect, useMemo, useState } from 'react';
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { format } from 'date-fns';
import Autocomplete from "@mui/material/Autocomplete";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import LinearProgress from "@mui/material/LinearProgress";
import Paper from "@mui/material/Paper";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import BaseStoryAwardFields from '../components/story-awards/BaseStoryAwardFields';
import BreadcrumbsMenu from '../components/shared/BreadcrumbsMenu';
import { StoryAwardStatusDictionary } from '../data/Dictionaries';
import { StoryAwardStatus } from '../data/Types';
import { useCharacter } from "../hooks/useCharacter";
import { useCharacterLogsDropdownByCharacter } from "../hooks/useCharacterLog";
import { useStoryAward } from "../hooks/useStoryAward";

const StoryAwardForm = () => {
    // Character & award id values fetched from URL params
    const { characterId, storyAwardId } = useParams();
    // Character summary details
    const character = useCharacter(characterId!);
    // Character log abstracts
    const characterLogAbstracts = useCharacterLogsDropdownByCharacter(characterId!);
    // Story award details
    const currentStoryAward = storyAwardId ? useStoryAward(characterId!, storyAwardId) : null;
    // Hook used to navigate programmatically
    const navigate = useNavigate();
    // Flag indicating if form is in view mode
    const isViewing = !(storyAwardId == null || useLocation().pathname.includes("/edit"));
    // Array containing Story Award Status ids for Autocomplete fields
    const storyAwardStatusArray = Array.from(StoryAwardStatusDictionary.keys());
    // Default error message for required fields
    const requiredFieldErrorMessage = "This field is required.";

    // State object containing user-provided story award info
    const [storyAward, setStoryAward] = useState({
        name: '' as string,
        description: '' as string | null,
        status: null as StoryAwardStatus | null,
        originLogId: null as string | null,
    });

    // State object containing error flags for fields requiring validation
    const [storyAwardError, setStoryAwardError] = useState({
        name: false,
        status: false,
        originLogId: false,
    });

    // State object containing loading flag for View/Edit scenarios
    const [isStoryAwardLoading, setIsStoryAwardLoading] = useState(true);

    // Objects containing character log abstracts dictionary and array for dropdowns
    const [characterLogIds, characterLogDictionary] = useMemo(() => {
        let result = characterLogAbstracts?.reduce((r, o) => {
            r.logIds.push(o.id);
            r.logDictionary.set(o.id, `${o.title} (${format(o.timestamp, "yyyy-MM-dd")})`);
            return r;
        }, { logIds: [] as string[], logDictionary: new Map() as Map<string,string> });
        
        return [result?.logIds, result?.logDictionary]
    }, [characterLogAbstracts]);

    // Helper function triggered when updating an Autocomplete field
    const handleStoryAwardAutocompleteChange = (_: React.BaseSyntheticEvent, value: StoryAwardStatus | string | null, fieldName: string) => {
        setStoryAward({ ...storyAward, [fieldName]: value });
    };
    // Helper function triggered when updating a text field
    const handleStoryAwardTextChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>, fieldName: string) => {
        setStoryAward({ ...storyAward, [fieldName]: event.target.value });
    };
    // Helper function triggered when validating a required field
    const handleRequiredFieldValidation = (fieldName: string) => {
        let dynamicKey = fieldName as keyof (typeof storyAward);
        setStoryAwardError({ ...storyAwardError, [fieldName]: (storyAward[dynamicKey] === null || storyAward[dynamicKey] === "") });
    };

    // Function that validates form before submitting
    const validateForm = () => {
        let errorsFound: any = {};

        if (storyAward.name === null || storyAward.name === "")
            errorsFound['name'] = true;
        if (storyAward.status === null)
            errorsFound['status'] = true;
        if (storyAward.originLogId === null || storyAward.originLogId === "")
            errorsFound['originLogId'] = true;

        if (Object.keys(errorsFound).length === 0) {
            cookAndSubmitStoryAward();
        } else {
            setStoryAwardError({...storyAwardError, ...errorsFound});
        }
    };

    const cookAndSubmitStoryAward = () => {
        let rawStoryAward = {...storyAward};

        if (!rawStoryAward.description) {
            rawStoryAward.description = null;
        }

        axios.post(`/api/characters/${characterId}/story-awards/${storyAwardId || 'create'}`, rawStoryAward).then(_ => {
            navigate(`/characters/${characterId}`);
        });
    };

    useEffect(() => {
        if (currentStoryAward) {
            setStoryAward({
                name: currentStoryAward.name,
                status: currentStoryAward.status,
                description: currentStoryAward.description === null ? '' : currentStoryAward.description,
                originLogId: currentStoryAward.originLogId,
            });
            setIsStoryAwardLoading(false);
        }
    }, [currentStoryAward]);

    return (
        <>
            { (character && characterLogIds && (!storyAwardId || (storyAwardId && !isStoryAwardLoading))) ? (
                <Container maxWidth="md">
                    <BreadcrumbsMenu 
                        characterId={characterId}
                        characterName={character.name}
                        currentPageTitle={(storyAwardId ? (isViewing ? "View" : "Edit") : "New") + " Story Award"}
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
                                    {(storyAwardId ? (isViewing ? "View" : "Edit") : "New") + " Story Award"}
                                </Typography>
                            </Grid>
                            <BaseStoryAwardFields
                                storyAward={storyAward}
                                storyAwardError={storyAwardError}
                                isViewing={isViewing}
                                requiredFieldErrorMessage={requiredFieldErrorMessage}
                                handleStoryAwardAutocompleteChange={handleStoryAwardAutocompleteChange}
                                handleStoryAwardTextChange={handleStoryAwardTextChange}
                                handleRequiredFieldValidation={handleRequiredFieldValidation}
                            />
                            <Grid item xs={12}>
                                <Autocomplete 
                                    disabled={storyAwardId != null}
                                    id="story-award-origin-log"
                                    options={characterLogIds || []}
                                    getOptionLabel={(o) => characterLogDictionary?.get(o) || ''}
                                    onChange={(e, v) => handleStoryAwardAutocompleteChange(e, v, "originLogId")}
                                    onBlur={_ => handleRequiredFieldValidation("originLogId")}
                                    value={storyAward.originLogId}
                                    fullWidth
                                    renderInput={(params) => (
                                        <TextField 
                                            {...params} 
                                            error={storyAwardError.originLogId} 
                                            required 
                                            label="Origin Log" 
                                            helperText={storyAwardError.originLogId ? requiredFieldErrorMessage : ''}
                                        />
                                    )}
                                />
                            </Grid>
                            { !isViewing &&
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
                            }
                        </Grid>
                    </Paper>
                </Container>
            ) : (
                <LinearProgress />
            )}
        </>
    );
};

export default StoryAwardForm;