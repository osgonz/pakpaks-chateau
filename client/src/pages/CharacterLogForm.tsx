import axios from 'axios';
import { useState, useEffect } from 'react';
import { useLocation, useNavigate, useParams } from "react-router-dom";
import Autocomplete from "@mui/material/Autocomplete";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import Divider from "@mui/material/Divider";
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
import CharacterLogMagicItemTable from '../components/character-logs/CharacterLogMagicItemTable';
import CharacterLogStoryAwardTable from '../components/character-logs/CharacterLogStoryAwardTable';
import BreadcrumbsMenu from '../components/shared/BreadcrumbsMenu';
import { CharacterLogTypeDictionary } from '../data/Dictionaries';
import { CharacterLogType } from '../data/Types';
import { useCharacter } from "../hooks/useCharacter";
import { useCharacterLog } from "../hooks/useCharacterLog";
import { useMagicItemsByCharacterLog } from "../hooks/useMagicItem";
import { useStoryAwardsByCharacterLog } from '../hooks/useStoryAward';

const CharacterLogForm = () => {
    // Character & log id values fetched from URL params
    const { characterId, logId } = useParams();
    // Character summary details
    const character = useCharacter(characterId!);
    // Character log details
    const currentLog = logId ? useCharacterLog(characterId!, logId) : null;
    // Magic item details
    const currentMagicItems = logId ? useMagicItemsByCharacterLog(characterId!, logId) : null;
    // Story award details
    const currentStoryAwards = logId ? useStoryAwardsByCharacterLog(characterId!, logId) : null;
    // Hook used to navigate programmatically
    const navigate = useNavigate();
    // Flag indicating if form is in view mode
    const isViewing = !(logId == null || useLocation().pathname.includes("/edit"));
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
        dmName: '' as string | null,
        dmDci: '' as string | null,
        lengthHours: 0 as number,
        gold: 0 as number,
        downtime: 0 as number,
        levels: 0 as number,
        serviceHours: 0 as number,
        traderCharacterName: '' as string | null,
        traderOtherPlayer: '' as string | null,
        description: '' as string | null,
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
    });

    // State object containing loading flag for View/Edit scenarios
    const [isLogLoading, setIsLogLoading] = useState(true);

    // Helper function triggered when updating an Autocomplete field
    const handleLogTypeChange = (_: React.BaseSyntheticEvent, value: CharacterLogType | null) => {
        setLog({ 
            ...log, 
            type: value,
            location: '' as string,
            dmName: '' as string | null,
            dmDci: '' as string | null,
            lengthHours: 0 as number,
            gold: 0 as number,
            downtime: 0 as number,
            levels: 0 as number,
            serviceHours: 0 as number,
            traderCharacterName: '' as string | null,
            traderOtherPlayer: '' as string | null,
            description: '' as string | null,
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
            cookAndSubmitCharacterLog();
        } else {
            setLogError({...logError, ...errorsFound});
        }
    };

    const cookAndSubmitCharacterLog = () => {
        let rawLog = {...log};

        if (!rawLog.lengthHours) {
            rawLog.lengthHours = 0;
        } else if (typeof rawLog.lengthHours == "string") {
            rawLog.lengthHours = parseInt(rawLog.lengthHours);
        }
        if (!rawLog.levels) {
            rawLog.levels = 0;
        } else if (typeof rawLog.levels == "string") {
            rawLog.levels = parseInt(rawLog.levels);
        }
        if (!rawLog.gold) {
            rawLog.gold = 0;
        } else if (typeof rawLog.gold == "string") {
            rawLog.gold = parseFloat(rawLog.gold);
        }
        if (!rawLog.downtime) {
            rawLog.downtime = 0;
        } else if (typeof rawLog.downtime == "string") {
            rawLog.downtime = parseInt(rawLog.downtime);
        }
        if (!rawLog.serviceHours) {
            rawLog.serviceHours = 0;
        } else if (typeof rawLog.serviceHours == "string") {
            rawLog.serviceHours = parseInt(rawLog.serviceHours);
        }

        if (!rawLog.dmName) {
            rawLog.dmName = null;
        }
        if (!rawLog.dmDci) {
            rawLog.dmDci = null;
        }
        if (!rawLog.traderCharacterName) {
            rawLog.traderCharacterName = null;
        }
        if (!rawLog.traderOtherPlayer) {
            rawLog.traderOtherPlayer = null;
        }
        if (!rawLog.description) {
            rawLog.description = null;
        }

        axios.post(`/api/characters/${characterId}/character-logs/${logId || 'create'}`, rawLog).then(_ => {
            navigate(`/characters/${characterId}`);
        });
    };

    useEffect(() => {
        if (currentLog) {
            setLog({
                type: currentLog.type,
                title: currentLog.title,
                timestamp: new Date(currentLog.timestamp),
                location: currentLog.location,
                dmName: currentLog.dmName === null ? '' : currentLog.dmName,
                dmDci: currentLog.dmDci === null ? '' : currentLog.dmDci,
                lengthHours: currentLog.lengthHours,
                gold: currentLog.gold,
                downtime: currentLog.downtime,
                levels: currentLog.levels,
                serviceHours: currentLog.serviceHours,
                traderCharacterName: currentLog.traderCharacterName === null ? '' : currentLog.traderCharacterName,
                traderOtherPlayer: currentLog.traderOtherPlayer === null ? '' : currentLog.traderOtherPlayer,
                description: currentLog.description === null ? '' : currentLog.description,
            });
            setIsLogLoading(false);
        }
    }, [currentLog]);

    return (
        <>
            { (character && (!logId || (logId && !isLogLoading))) ? (
                <Container maxWidth="md">
                    <BreadcrumbsMenu 
                        characterId={characterId}
                        characterName={character.name}
                        currentPageTitle={(logId ? (isViewing ? "View" : "Edit") : "New") + " Character Log"}
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
                                    {(logId ? (isViewing ? "View" : "Edit") : "New") + " Character Log"}
                                </Typography>
                            </Grid>
                            <Grid item md={8} xs={12}>
                                <TextField 
                                    error={logError.title}
                                    disabled={isViewing}
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
                                    disabled={isViewing}
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
                                    disabled={logId != null}
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
                                    isViewing={isViewing}
                                    requiredFieldErrorMessage={requiredFieldErrorMessage}
                                    handleLogTextChange={handleLogTextChange}
                                    handleRequiredFieldValidation={handleRequiredFieldValidation}
                                />
                            }
                            { (log.type == CharacterLogType.Merchant || log.type == CharacterLogType.Downtime) &&
                                <MerchantLogFields
                                    log={log}
                                    logError={logError}
                                    isViewing={isViewing}
                                    requiredFieldErrorMessage={requiredFieldErrorMessage}
                                    handleLogTextChange={handleLogTextChange}
                                    handleRequiredFieldValidation={handleRequiredFieldValidation}
                                />
                            }
                            { log.type == CharacterLogType.Trade &&
                                <TradeLogFields
                                    log={log}
                                    logError={logError}
                                    isViewing={isViewing}
                                    requiredFieldErrorMessage={requiredFieldErrorMessage}
                                    handleLogTextChange={handleLogTextChange}
                                    handleRequiredFieldValidation={handleRequiredFieldValidation}
                                />
                            }
                            { log.type == CharacterLogType.ServiceAward &&
                                <ServiceAwardLogFields
                                    log={log}
                                    logError={logError}
                                    isViewing={isViewing}
                                    requiredFieldErrorMessage={requiredFieldErrorMessage}
                                    handleLogTextChange={handleLogTextChange}
                                    handleRequiredFieldValidation={handleRequiredFieldValidation}
                                />
                            }
                            { log.type != null && log.type != CharacterLogType.Trade &&
                                <>
                                    <Grid item xs={12}>
                                        <Divider variant="fullWidth"/>
                                    </Grid>
                                    <CharacterLogMagicItemTable 
                                        magicItems={currentMagicItems}
                                    />
                                    <Grid item xs={12}>
                                        <Divider variant="fullWidth"/>
                                    </Grid>
                                    <CharacterLogStoryAwardTable 
                                        storyAwards={currentStoryAwards}
                                    />
                                </>
                            }
                            { !(isViewing || log.type == null) &&
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