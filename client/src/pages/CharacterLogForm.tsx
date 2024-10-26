import { useState, useMemo } from 'react';
import { useParams } from "react-router-dom";
import Autocomplete from "@mui/material/Autocomplete";
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

    // Helper function triggered when updating an Autocomplete field
    const handleLogAutocompleteChange = (_: React.BaseSyntheticEvent, value: string | CharacterLogType | null, fieldName: string) => {
        setLog({ ...log, [fieldName]: value });
    };
    // Helper function triggered when updating a text field
    const handleLogTextChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>, fieldName: string) => {
        setLog({ ...log, [fieldName]: event.target.value });
    };

    return (
        <>
            { character ? (
                <Container maxWidth="lg">
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
                                    options={characterLogTypeArray}
                                    getOptionLabel={(o) => CharacterLogTypeDictionary.get(o) || ''}
                                    onChange={(e, v) => handleLogAutocompleteChange(e, v, "type")}
                                    value={log.type}
                                    fullWidth
                                    renderInput={(params) => (
                                        <TextField {...params} label="Type" />
                                    )}
                                />
                            </Grid>
                            { log.type == CharacterLogType.Adventure &&
                                <AdventureLogFields
                                    log={log}
                                    handleLogTextChange={handleLogTextChange}
                                />
                            }
                            { (log.type == CharacterLogType.Merchant || log.type == CharacterLogType.Downtime) &&
                                <MerchantLogFields
                                    log={log}
                                    handleLogTextChange={handleLogTextChange}
                                />
                            }
                            { log.type == CharacterLogType.Trade &&
                                <TradeLogFields
                                    log={log}
                                    handleLogTextChange={handleLogTextChange}
                                />
                            }
                            { log.type == CharacterLogType.ServiceAward &&
                                <ServiceAwardLogFields
                                    log={log}
                                    handleLogTextChange={handleLogTextChange}
                                />
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