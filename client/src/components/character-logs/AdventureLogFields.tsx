import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";

interface AdventureLogFieldsProps {
    log: any,
    handleLogTextChange: (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>, fieldName: string) => void,
};

const AdventureLogFields = (props: AdventureLogFieldsProps) => {
    return (
        <>
            <Grid item md={4} xs={12}>
                <TextField 
                    id="log-length-hours"
                    label="Hours"
                    onChange={e => props.handleLogTextChange(e, "lengthHours")}
                    value={props.log.lengthHours}
                    type="number"
                    fullWidth
                />
            </Grid>
            <Grid item md={8} xs={12}>
                <TextField 
                    required
                    id="log-location"
                    label="Location"
                    onChange={e => props.handleLogTextChange(e, "location")}
                    value={props.log.location}
                    fullWidth
                />
            </Grid>
            <Grid item md={6} xs={12}>
                <TextField 
                    id="log-dm-name"
                    label="DM Name"
                    onChange={e => props.handleLogTextChange(e, "dmName")}
                    value={props.log.dmName}
                    fullWidth
                />
            </Grid>
            <Grid item md={6} xs={12}>
                <TextField 
                    id="log-dm-dci"
                    label="DCI"
                    onChange={e => props.handleLogTextChange(e, "dmDci")}
                    value={props.log.dmDci}
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
                    rows={6}
                    fullWidth
                />
            </Grid>
        </>
    );
};

export default AdventureLogFields;