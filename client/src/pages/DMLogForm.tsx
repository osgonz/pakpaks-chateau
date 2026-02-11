import axios from 'axios';
import { useState, useEffect } from 'react';
import { useLocation, useNavigate, useParams } from "react-router-dom";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import LinearProgress from "@mui/material/LinearProgress";
import Paper from "@mui/material/Paper";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import { useDMLog } from "../hooks/useDMLog";
import { useAuth } from '../components/shared/AuthContext';
import BreadcrumbsMenu from '../components/shared/BreadcrumbsMenu';

const DMLogForm = () => {
    // Auth context loading reference
    const { isLoading } = useAuth();
    // Log id value fetched from URL params
    const { logId } = useParams();
    // DM log details
    const currentLog = logId ? useDMLog(logId) : null;
    // Hook used to navigate programmatically
    const navigate = useNavigate();
    // Flag indicating if form is in view mode
    const isViewing = !(logId == null || useLocation().pathname.includes("/edit"));
    // Default error message for required fields
    const requiredFieldErrorMessage = "This field is required.";

    // State object containing user-provided log info
    const [log, setLog] = useState({
        title: '' as string,
        timestamp: new Date() as Date | null,
        location: '' as string,
        lengthHours: 0 as number,
        serviceHours: 0 as number,
        description: '' as string | null,
    });

    // State object containing error flags for fields requiring validation
    const [logError, setLogError] = useState({
        title: false,
        timestamp: false,
        location: false,
    });

    // State object containing loading flag for View/Edit scenarios
    const [isLogLoading, setIsLogLoading] = useState(true);

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
        if (log.location === null || log.location === "")
            errorsFound['location'] = true;

        if (Object.keys(errorsFound).length === 0) {
            cookAndSubmitDMLog();
        } else {
            setLogError({...logError, ...errorsFound});
        }
    };

    const cookAndSubmitDMLog = () => {
        let rawLog = {...log};

        if (!rawLog.lengthHours) {
            rawLog.lengthHours = 0;
        } else if (typeof rawLog.lengthHours == "string") {
            rawLog.lengthHours = parseInt(rawLog.lengthHours);
        }
        if (!rawLog.serviceHours) {
            rawLog.serviceHours = 0;
        } else if (typeof rawLog.serviceHours == "string") {
            rawLog.serviceHours = parseInt(rawLog.serviceHours);
        }
        if (!rawLog.description) {
            rawLog.description = null;
        }

        axios.post(`/api/dm-logs/${logId || 'create'}`, rawLog).then(_ => {
            navigate(`/dm-logs`);
        });
    };

    useEffect(() => {
        if (currentLog) {
            setLog({
                title: currentLog.title,
                timestamp: new Date(currentLog.timestamp),
                location: currentLog.location,
                lengthHours: currentLog.lengthHours,
                serviceHours: currentLog.serviceHours,
                description: currentLog.description === null ? '' : currentLog.description,
            });
            setIsLogLoading(false);
        }
    }, [currentLog]);

    return (
        <>
            { !isLoading && (!logId || (logId && !isLogLoading)) ? (
                <Container maxWidth="md">
                    <BreadcrumbsMenu 
                        currentPageTitle={(logId ? (isViewing ? "View" : "Edit") : "New") + " DM Log"}
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
                                    {(logId ? (isViewing ? "View" : "Edit") : "New") + " DM Log"}
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
                            <Grid item md={6} xs={12}>
                                <TextField 
                                    error={logError.location}
                                    disabled={isViewing}
                                    required
                                    id="log-location"
                                    label="Location"
                                    helperText={logError.location ? requiredFieldErrorMessage : ''}
                                    onChange={e => handleLogTextChange(e, "location")}
                                    onBlur={_ => handleRequiredFieldValidation("location")}
                                    value={log.location}
                                    fullWidth
                                />
                            </Grid>
                            <Grid item md={3} xs={12}>
                                <TextField 
                                    disabled={isViewing}
                                    id="log-length-hours"
                                    label="Hours"
                                    onChange={e => handleLogTextChange(e, "lengthHours")}
                                    value={log.lengthHours}
                                    type="number"
                                    fullWidth
                                />
                            </Grid>
                            <Grid item md={3} xs={12}>
                                <TextField 
                                    disabled={isViewing}
                                    id="log-service-hours"
                                    label="Service Hours"
                                    onChange={e => handleLogTextChange(e, "serviceHours")}
                                    value={log.serviceHours}
                                    type="number"
                                    fullWidth
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField 
                                    disabled={isViewing}
                                    id="log-description"
                                    label="Description"
                                    onChange={e => handleLogTextChange(e, "description")}
                                    value={log.description}
                                    multiline
                                    rows={10}
                                    fullWidth
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

export default DMLogForm;