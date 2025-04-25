import { useEffect, useState } from 'react';
import { useParams } from "react-router-dom";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import Grid from "@mui/material/Grid";
import BaseStoryAwardFields from './BaseStoryAwardFields';
import { StoryAward, StoryAwardStatus } from "../../data/Types";

interface CharacterLogStoryAwardDialogProps {
    open: boolean,
    handleClose: () => void,
    currentStoryAward: StoryAward | null,
    saveFunction: (newAward: StoryAward) => Promise<void>,
};

const CharacterLogStoryAwardDialog = (props: CharacterLogStoryAwardDialogProps) => {
    // Character & log id values fetched from URL params
    const { characterId, logId } = useParams();
    // Destructuring props
    const { open, currentStoryAward } = props;
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
    });

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

    // Helper function triggered when closing the Delete Story Award Confirmation dialog
    const handleStoryAwardClose = () => {
        setStoryAward({
            name: '',
            description: '',
            status: null,
            originLogId: null,
        });
        setStoryAwardError({
            name: false,
            status: false,
        });
        props.handleClose();
    };

    // Helper function that validates story award before adding it
    const handleSubmitStoryAward = async () => {
        let errorsFound: any = {};

        if (storyAward.name === null || storyAward.name === "")
            errorsFound['name'] = true;
        if (storyAward.status === null)
            errorsFound['status'] = true;

        if (Object.keys(errorsFound).length === 0) {
            await cookAndSubmitStoryAward();
        } else {
            setStoryAwardError({...storyAwardError, ...errorsFound});
        }
    };

    const cookAndSubmitStoryAward = async () => {
        let rawStoryAward = {...storyAward};

        if (!rawStoryAward.description) {
            rawStoryAward.description = null;
        }

        let cookedStoryAward: StoryAward = {
            id: '',
            name: rawStoryAward.name,
            description: rawStoryAward.description,
            status: rawStoryAward.status!,
            characterId: characterId!,
            originLogId: logId ? logId: rawStoryAward.originLogId!
        };

        await props.saveFunction(cookedStoryAward);
        handleStoryAwardClose();
    };

    useEffect(() => {
        if (currentStoryAward) {
            setStoryAward({
                name: currentStoryAward.name,
                description: currentStoryAward.description === null ? '' : currentStoryAward.description,
                status: currentStoryAward.status,
                originLogId: currentStoryAward.originLogId,
            });
        }
    }, [currentStoryAward]);

    return (
        <Dialog
            open={open}
            onClose={handleStoryAwardClose}
            aria-labelledby="story-award-dialog-title"
            aria-describedby="story-award-dialog-description"
            maxWidth="sm"
            fullWidth={true}
        >
            <DialogTitle id="story-award-dialog-title">
                {`${currentStoryAward ? 'View' : 'New' } Story Award`}
            </DialogTitle>
            <DialogContent>
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
                    <BaseStoryAwardFields
                        storyAward={storyAward}
                        storyAwardError={storyAwardError}
                        isViewing={currentStoryAward != null}
                        requiredFieldErrorMessage={requiredFieldErrorMessage}
                        handleStoryAwardAutocompleteChange={handleStoryAwardAutocompleteChange}
                        handleStoryAwardTextChange={handleStoryAwardTextChange}
                        handleRequiredFieldValidation={handleRequiredFieldValidation}
                    />
                </Grid>
            </DialogContent>
            <DialogActions>
                <Button onClick={handleStoryAwardClose}>Close</Button>
                { !currentStoryAward &&
                    <Button onClick={handleSubmitStoryAward} autoFocus>
                        Save
                    </Button>
                }
            </DialogActions>
        </Dialog>
    );
};

export default CharacterLogStoryAwardDialog;