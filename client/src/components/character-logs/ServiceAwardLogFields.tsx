import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";

interface ServiceAwardLogFieldsProps {
    log: any,
    logError: any,
    requiredFieldErrorMessage: string,
    handleLogTextChange: (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>, fieldName: string) => void,
    handleRequiredFieldValidation: (fieldName: string) => void,
};

const ServiceAwardLogFields = (props: ServiceAwardLogFieldsProps) => {
    return (
        <>
            <Grid item xs={12}>
                <TextField 
                    error={props.logError.location}
                    required
                    id="log-location"
                    label="Location"
                    helperText={props.logError.location ? props.requiredFieldErrorMessage : ''}
                    onChange={e => props.handleLogTextChange(e, "location")}
                    onBlur={_ => props.handleRequiredFieldValidation("location")}
                    value={props.log.location}
                    fullWidth
                />
            </Grid>
            <Grid item md={3} xs={12}>
                <TextField 
                    id="log-levels"
                    label="Levels"
                    onChange={e => props.handleLogTextChange(e, "levels")}
                    value={props.log.levels}
                    type="number"
                    fullWidth
                />
            </Grid>
            <Grid item md={3} xs={12}>
                <TextField 
                    id="log-gold"
                    label="Gold"
                    onChange={e => props.handleLogTextChange(e, "gold")}
                    value={props.log.gold}
                    type="number"
                    fullWidth
                />
            </Grid>
            <Grid item md={3} xs={12}>
                <TextField 
                    id="log-downtime"
                    label="Downtime"
                    onChange={e => props.handleLogTextChange(e, "downtime")}
                    value={props.log.downtime}
                    type="number"
                    fullWidth
                />
            </Grid>
            <Grid item md={3} xs={12}>
                <TextField 
                    id="log-service-hours"
                    label="Service Hours"
                    onChange={e => props.handleLogTextChange(e, "serviceHours")}
                    value={props.log.serviceHours}
                    type="number"
                    fullWidth
                />
            </Grid>
            <Grid item xs={12}>
                <TextField 
                    id="log-description"
                    label="Description"
                    onChange={e => props.handleLogTextChange(e, "description")}
                    value={props.log.description}
                    multiline
                    rows={8}
                    fullWidth
                />
            </Grid>
        </>
    );
};

export default ServiceAwardLogFields;