import {useState} from 'react';
import Autocomplete from "@mui/material/Autocomplete";
import Container from "@mui/material/Container";
import Dialog from "@mui/material/Dialog";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import useMediaQuery from "@mui/material/useMediaQuery";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import { useTheme } from "@mui/material/styles";
import { CharacterLogTypeDictionary } from '../data/Dictionaries';
import AdventureLogFields from './AdventureLogFields';

interface CharacterLogDialogProps {
    characterId: string | undefined,
    open: boolean,
    setOpen: (value: boolean | ((prevVar: boolean) => boolean)) => void,
};

const CharacterLogDialog = (props: CharacterLogDialogProps) => {
    // State object containing user-provided log info
    const [log, setLog] = useState({
        type: null as string | null,
        title: '' as string | null,
        timestamp: new Date() as Date | null,
        location: '' as string | null,
        dmName: '' as string | null,
        dmDci: '' as string | null,
        lengthHours: 0 as number | null,
        gold: 0 as number | null,
        downtime: 0 as number | null,
        levels: 0 as number | null,
        serviceHours: 0 as number | null,
        traderCharacterName: '' as string | null,
        traderOtherPlayer: '' as string | null,
        description: '' as string | null,
    });

    const theme = useTheme();
    const fullScreen = useMediaQuery(theme.breakpoints.down('md'));

    // Helper function triggered when hiding Character Log Dialog
    const handleLogDialogClose = () => {
        props.setOpen(false);
        setLog({
            type: null as string | null,
            title: '' as string | null,
            timestamp: new Date() as Date | null,
            location: '' as string | null,
            dmName: '' as string | null,
            dmDci: '' as string | null,
            lengthHours: null as number | null,
            gold: null as number | null,
            downtime: null as number | null,
            levels: null as number | null,
            serviceHours: null as number | null,
            traderCharacterName: '' as string | null,
            traderOtherPlayer: '' as string | null,
            description: '' as string | null,
        });
    };
    // Helper function triggered when updating an Autocomplete field
    const handleLogAutocompleteChange = (_: React.BaseSyntheticEvent, value: string | null, fieldName: string) => {
        setLog({ ...log, [fieldName]: value });
    };
    // Helper function triggered when updating a text field
    const handleLogTextChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>, fieldName: string) => {
        setLog({ ...log, [fieldName]: event.target.value });
    };

    return (
        <Dialog
            aria-labelledby="character-log-title"
            fullScreen={fullScreen}
            fullWidth
            maxWidth={'lg'}
            open={props.open}
            onClose={handleLogDialogClose}
        >
            <Container 
                maxWidth="lg"
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
                        <Typography id="character-log-title" variant="h4" component="h2" gutterBottom textAlign="center">Add Character Log</Typography>
                    </Grid>
                    <Grid item md={8} xs={12}>
                        <TextField 
                            required
                            id="log-title"
                            label="Title"
                            onChange={e => handleLogTextChange(e, "title")}
                            value={log.title}
                            fullWidth
                        />
                    </Grid>
                    <Grid item md={4} xs={12}>
                        <DateTimePicker 
                            ampm={false}
                            label="Date"
                            format="yyyy-MM-dd HH:mm"
                            onChange={(newDate => setLog({...log, timestamp: newDate}))}
                            value={log.timestamp}
                            slotProps={{ textField: { required: true, fullWidth: true } }}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <Autocomplete 
                            id="log-type"
                            options={Array.from(CharacterLogTypeDictionary.values())}
                            onChange={(e, v) => handleLogAutocompleteChange(e, v, "type")}
                            value={log.type}
                            fullWidth
                            renderInput={(params) => (
                                <TextField {...params} label="Type" />
                            )}
                        />
                    </Grid>
                    { log.type == "Adventure" &&
                        <AdventureLogFields
                            log={log}
                            handleLogTextChange={handleLogTextChange}
                        />
                    }
                </Grid>
            </Container>
        </Dialog>
    );
};

export default CharacterLogDialog;