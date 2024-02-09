import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import { CampaignDictionary, LifestyleDictionary } from "../data/Dictionaries";
import { Character } from "../data/Types";

export interface SummaryProps {
    character: Character,
    level: number,
    gold: number,
    downtime: number,
};

const CharacterSummary = (props: SummaryProps) => {
    return (
        <Grid 
            container 
            direction="row" 
            justifyContent="center" 
            spacing={2}
            sx={{
                pb: 2,
                pr: 2,
                ml: "auto",
                mr: "auto",

            }}
        >
            <Grid item xs={12}>
                <Typography variant="h3" component="h1" gutterBottom textAlign="center">{props.character.name}</Typography>
            </Grid>
            <Grid item md={3} sx={{ display: { xs: 'none', md: 'block' } }}></Grid>
            <Grid container item xs={12} md={6}>
                <Grid item xs={6}>
                    <Typography gutterBottom>Campaign:</Typography>
                </Grid>
                <Grid item xs={6}>
                    <Typography gutterBottom>{CampaignDictionary.get(props.character.campaign)}</Typography>
                </Grid>
                <Grid item xs={6}>
                    <Typography gutterBottom>Lineage:</Typography>
                </Grid>
                <Grid item xs={6}>
                    <Typography gutterBottom>{props.character.lineage}</Typography>
                </Grid>
                <Grid item xs={6}>
                    <Typography gutterBottom>Class:</Typography>
                </Grid>
                <Grid item xs={6}>
                    <Typography gutterBottom>{props.character.classes}</Typography>
                </Grid>
                <Grid item xs={6}>
                    <Typography gutterBottom>Level:</Typography>
                </Grid>
                <Grid item xs={6}>
                    <Typography gutterBottom>{props.level}</Typography>
                </Grid>
                <Grid item xs={6}>
                    <Typography gutterBottom>Background:</Typography>
                </Grid>
                <Grid item xs={6}>
                    <Typography gutterBottom>{props.character.background}</Typography>
                </Grid>
                <Grid item xs={6}>
                    <Typography gutterBottom>Faction:</Typography>
                </Grid>
                <Grid item xs={6}>
                    <Typography gutterBottom>{props.character.faction}</Typography>
                </Grid>
                <Grid item xs={6}>
                    <Typography gutterBottom>Lifestyle:</Typography>
                </Grid>
                <Grid item xs={6}>
                    <Typography gutterBottom>{LifestyleDictionary.get(props.character.lifestyle)}</Typography>
                </Grid>
                <Grid item xs={6}>
                    <Typography gutterBottom>Gold:</Typography>
                </Grid>
                <Grid item xs={6}>
                    <Typography gutterBottom>{props.gold}</Typography>
                </Grid>
                <Grid item xs={6}>
                    <Typography gutterBottom>Downtime:</Typography>
                </Grid>
                <Grid item xs={6}>
                    <Typography gutterBottom>{props.downtime}</Typography>
                </Grid>
            </Grid>
            <Grid item md={3} sx={{ display: { xs: 'none', md: 'block' } }}></Grid>
        </Grid>
    );
};

export default CharacterSummary;