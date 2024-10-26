import { useState, useMemo } from 'react';
import { useParams } from "react-router-dom";
import Autocomplete from "@mui/material/Autocomplete";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import LinearProgress from "@mui/material/LinearProgress";
import Paper from "@mui/material/Paper";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import AdventureLogFields from '../components/character-logs/AdventureLogFields';
import MerchantLogFields from '../components/character-logs/MerchantLogFields';
import ServiceAwardLogFields from '../components/character-logs/ServiceAwardLogFields';
import TradeLogFields from '../components/character-logs/TradeLogFields';
import BreadcrumbsMenu from '../components/shared/BreadcrumbsMenu';
import { CharacterLogTypeDictionary } from '../data/Dictionaries';
import { CharacterLogType } from '../data/Types';
import { useCharacter } from "../hooks/useCharacter";

const CharacterLogForm = () => {
    // Character Id value fetched from URL params
    const { characterId } = useParams();
    // Character summary details
    const character = useCharacter(characterId!);
    // Array containing Character Log Type ids for Autocomplete field
    const characterLogTypeArray = Array.from(CharacterLogTypeDictionary.keys());
    // Default error message for required fields
    const requiredFieldErrorMessage = "This field is required.";

    // State object containing user-provided log info
    const [log, setLog] = useState({
        type: null as CharacterLogType | null,
        title: '' as string,
        timestamp: new Date() as Date | null,
        location: '' as string,
        dmName: '' as string,
        dmDci: '' as string,
        lengthHours: 0 as number,
        gold: 0 as number,
        downtime: 0 as number,
        levels: 0 as number,
        serviceHours: 0 as number,
        traderCharacterName: '' as string,
        traderOtherPlayer: '' as string,
        description: '' as string,
    });

    // State object containing error flags for fields requiring validation
    const [logError, setLogError] = useState({
        type: false,
        title: false,
        timestamp: false,
        location: false,
        dmName: false,
        traderCharacterName: false,
        traderOtherPlayer: false,
    })

    // Helper function triggered when updating an Autocomplete field
    const handleLogTypeChange = (_: React.BaseSyntheticEvent, value: CharacterLogType | null) => {
        setLog({ 
            ...log, 
            type: value,
            location: '' as string,
            dmName: '' as string,
            dmDci: '' as string,
            lengthHours: 0 as number,
            gold: 0 as number,
            downtime: 0 as number,
            levels: 0 as number,
            serviceHours: 0 as number,
            traderCharacterName: '' as string,
            traderOtherPlayer: '' as string,
            description: '' as string,
        });
        setLogError({
            ...logError,
            location: false,
            dmName: false,
            traderCharacterName: false,
            traderOtherPlayer: false,
        });
    };
    // Helper function triggered when updating a text field
    const handleLogTextChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>, fieldName: string) => {
        setLog({ ...log, [fieldName]: event.target.value });
    };
    // Helper function triggered when validating a required field
    const handleRequiredFieldValidation = (fieldName: string) => {
        let dynamicKey = fieldName as keyof (typeof log);
        setLogError({ ...logError, [fieldName]: (log[dynamicKey] === null || log[dynamicKey] === "") });
    };

    // Function that validates form before submitting
    const validateForm = () => {
        let errorsFound: any = {};

        if (log.title === null || log.title === "")
            errorsFound['title'] = true;
        if (log.timestamp === null)
            errorsFound['timestamp'] = true;
        if (log.type === null) {
            errorsFound['type'] = true;
        } else {
            if (log.location === null || log.location === "")
                errorsFound['location'] = true;
            switch (log.type) {
                case CharacterLogType.Adventure:
                    if (log.dmName === null || log.dmName === "")
                        errorsFound['dmName'] = true;
                    break;
                case CharacterLogType.Trade:
                    if (log.traderCharacterName === null || log.traderCharacterName === "")
                        errorsFound['traderCharacterName'] = true;
                    if (log.traderOtherPlayer === null || log.traderOtherPlayer === "")
                        errorsFound['traderOtherPlayer'] = true;
                    break;
                default:
                    break;
            }
        }

        if (Object.keys(errorsFound).length === 0) {
            
        } else {
            setLogError({...logError, ...errorsFound});
        }
    }

    return (
        <>
            { character ? (
                <Container maxWidth="md">
                    <BreadcrumbsMenu 
                        characterId={characterId}
                        characterName={character.name}
                        currentPageTitle='New Character Log'
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
                                <Typography variant="h3" component="h1" gutterBottom textAlign="center">New Character Log</Typography>
                            </Grid>
                            <Grid item md={8} xs={12}>
                                <TextField 
                                    error={logError.title}
                                    required
                                    id="log-title"
                                    label="Title"
                                    helperText={logError.title ? requiredFieldErrorMessage : ''}
                                    onChange={e => handleLogTextChange(e, "title")}
                                    onBlur={_ => handleRequiredFieldValidation("title")}
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
                                    onClose={() => handleRequiredFieldValidation("timestamp")}
                                    value={log.timestamp}
                                    slotProps={{ textField: { 
                                        error: logError.timestamp,
                                        required: true, 
                                        helperText: logError.timestamp ? requiredFieldErrorMessage : '',
                                        fullWidth: true,
                                        onBlur: (_) => handleRequiredFieldValidation("timestamp"),
                                    } }}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <Autocomplete 
                                    id="log-type"
                                    options={characterLogTypeArray}
                                    getOptionLabel={(o) => CharacterLogTypeDictionary.get(o) || ''}
                                    onChange={(e, v) => handleLogTypeChange(e, v)}
                                    onBlur={_ => handleRequiredFieldValidation("type")}
                                    value={log.type}
                                    fullWidth
                                    renderInput={(params) => (
                                        <TextField 
                                            {...params} 
                                            error={logError.type} 
                                            required 
                                            label="Type" 
                                            helperText={logError.type ? requiredFieldErrorMessage : ''}
                                        />
                                    )}
                                />
                            </Grid>
                            { log.type == CharacterLogType.Adventure &&
                                <AdventureLogFields
                                    log={log}
                                    logError={logError}
                                    requiredFieldErrorMessage={requiredFieldErrorMessage}
                                    handleLogTextChange={handleLogTextChange}
                                    handleRequiredFieldValidation={handleRequiredFieldValidation}
                                />
                            }
                            { (log.type == CharacterLogType.Merchant || log.type == CharacterLogType.Downtime) &&
                                <MerchantLogFields
                                    log={log}
                                    logError={logError}
                                    requiredFieldErrorMessage={requiredFieldErrorMessage}
                                    handleLogTextChange={handleLogTextChange}
                                    handleRequiredFieldValidation={handleRequiredFieldValidation}
                                />
                            }
                            { log.type == CharacterLogType.Trade &&
                                <TradeLogFields
                                    log={log}
                                    logError={logError}
                                    requiredFieldErrorMessage={requiredFieldErrorMessage}
                                    handleLogTextChange={handleLogTextChange}
                                    handleRequiredFieldValidation={handleRequiredFieldValidation}
                                />
                            }
                            { log.type == CharacterLogType.ServiceAward &&
                                <ServiceAwardLogFields
                                    log={log}
                                    logError={logError}
                                    requiredFieldErrorMessage={requiredFieldErrorMessage}
                                    handleLogTextChange={handleLogTextChange}
                                    handleRequiredFieldValidation={handleRequiredFieldValidation}
                                />
                            }
                            { log.type != null && log.type != CharacterLogType.Trade &&
                                <Grid item xs={12}>
                                    <Typography>Magic Items and Story Awards... coming soon...</Typography>
                                </Grid>
                            }
                            { log.type != null &&
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

export default CharacterLogForm;