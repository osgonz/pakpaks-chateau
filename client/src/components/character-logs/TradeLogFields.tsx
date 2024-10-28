import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";

interface TradeLogFieldsProps {
    log: any,
    logError: any,
    isViewing: boolean,
    requiredFieldErrorMessage: string,
    handleLogTextChange: (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>, fieldName: string) => void,
    handleRequiredFieldValidation: (fieldName: string) => void,
};

const TradeLogFields = (props: TradeLogFieldsProps) => {
    return (
        <>
            <Grid item md={6} xs={12}>
                <TextField 
                    error={props.logError.location}
                    disabled={props.isViewing}
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
                    disabled={props.isViewing}
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
                    disabled={props.isViewing}
                    id="log-downtime"
                    label="Downtime"
                    onChange={e => props.handleLogTextChange(e, "downtime")}
                    value={props.log.downtime}
                    type="number"
                    fullWidth
                />
            </Grid>
            <Grid item md={6} xs={12}>
                <TextField 
                    error={props.logError.traderCharacterName}
                    disabled={props.isViewing}
                    required
                    id="log-trader-character-name"
                    label="Trader Character"
                    helperText={props.logError.traderCharacterName ? props.requiredFieldErrorMessage : ''}
                    onChange={e => props.handleLogTextChange(e, "traderCharacterName")}
                    onBlur={_ => props.handleRequiredFieldValidation("traderCharacterName")}
                    value={props.log.traderCharacterName}
                    fullWidth
                />
            </Grid>
            <Grid item md={6} xs={12}>
                <TextField 
                    error={props.logError.traderOtherPlayer}
                    disabled={props.isViewing}
                    required
                    id="log-trader-other-player"
                    label="Trader Player"
                    helperText={props.logError.traderOtherPlayer ? props.requiredFieldErrorMessage : ''}
                    onChange={e => props.handleLogTextChange(e, "traderOtherPlayer")}
                    onBlur={_ => props.handleRequiredFieldValidation("traderOtherPlayer")}
                    value={props.log.traderOtherPlayer}
                    fullWidth
                />
            </Grid>
            <Grid item xs={12}>
                <TextField 
                    disabled={props.isViewing}
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

export default TradeLogFields;