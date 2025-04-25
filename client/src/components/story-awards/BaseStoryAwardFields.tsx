import Autocomplete from "@mui/material/Autocomplete";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import { StoryAwardStatusDictionary } from '../../data/Dictionaries';
import { StoryAwardStatus } from '../../data/Types';

interface BaseStoryAwardFieldsProps {
    storyAward: any,
    storyAwardError: any,
    isViewing: boolean,
    requiredFieldErrorMessage: string,
    handleStoryAwardAutocompleteChange: (_: React.BaseSyntheticEvent, value: StoryAwardStatus | string | null, fieldName: string) => void,
    handleStoryAwardTextChange: (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>, fieldName: string) => void,
    handleRequiredFieldValidation: (fieldName: string) => void,
};

const BaseStoryAwardFields = (props: BaseStoryAwardFieldsProps) => {
    // Array containing Story Award Status ids for Autocomplete fields
    const storyAwardStatusArray = Array.from(StoryAwardStatusDictionary.keys());

    // Destructuring props
    const { storyAward, storyAwardError, isViewing, requiredFieldErrorMessage } = props;

    return (
        <>
            <Grid item xs={12}>
                <TextField 
                    error={storyAwardError.name}
                    disabled={isViewing}
                    required
                    id="story-award-name"
                    label="Name"
                    helperText={storyAwardError.name ? requiredFieldErrorMessage : ''}
                    onChange={e => props.handleStoryAwardTextChange(e, "name")}
                    onBlur={_ => props.handleRequiredFieldValidation("name")}
                    value={storyAward.name}
                    fullWidth
                />
            </Grid>
            <Grid item xs={12}>
                <TextField 
                    disabled={isViewing}
                    id="story-award-description"
                    label="Description"
                    onChange={e => props.handleStoryAwardTextChange(e, "description")}
                    value={storyAward.description}
                    multiline
                    rows={8}
                    fullWidth
                />
            </Grid>
            <Grid item xs={12}>
                <Autocomplete 
                    disabled={isViewing}
                    id="story-award-status"
                    options={storyAwardStatusArray}
                    getOptionLabel={(o) => StoryAwardStatusDictionary.get(o) || ''}
                    onChange={(e, v) => props.handleStoryAwardAutocompleteChange(e, v, "status")}
                    onBlur={_ => props.handleRequiredFieldValidation("status")}
                    value={storyAward.status}
                    fullWidth
                    renderInput={(params) => (
                        <TextField 
                            {...params} 
                            error={storyAwardError.status} 
                            required 
                            label="Status" 
                            helperText={storyAwardError.status ? requiredFieldErrorMessage : ''}
                        />
                    )}
                />
            </Grid>
        </>
    );
};

export default BaseStoryAwardFields;