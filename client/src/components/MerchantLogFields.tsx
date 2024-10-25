import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";

interface MerchantLogFieldsProps {
    log: any,
    handleLogTextChange: (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>, fieldName: string) => void,
};

const MerchantLogFields = (props: MerchantLogFieldsProps) => {
    return (
        <>
            <Grid item md={6} xs={12}>
                <TextField 
                    required
                    id="log-location"
                    label="Location"
                    onChange={e => props.handleLogTextChange(e, "location")}
                    value={props.log.location}
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

export default MerchantLogFields;