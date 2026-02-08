import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";
import { Link } from "react-router-dom";
import { CampaignDictionary } from "../../data/Dictionaries";
import { Character } from "../../data/Types";

interface SummaryProps {
    character: Character,
    level: number,
    gold: number,
    downtime: number,
};

const CharacterSummary = (props: SummaryProps) => {
    // Reference to theme
    const theme = useTheme();
    // Helper boolean to apply properties conditional on screen size
    const isScreenLgOrLarger = useMediaQuery(theme.breakpoints.up("lg"));

    return (
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
                <Typography variant="h3" component="h1" gutterBottom textAlign="center">{props.character.name}</Typography>
            </Grid>
            <Grid 
                container 
                item
                alignContent="center"
                md={3} 
                sx={{ display: { xs: 'none', md: 'flex' } }}
            >
                <img 
                    src={props.character.imageUrl || "https://cdn.pixabay.com/photo/2016/08/08/09/17/avatar-1577909_960_720.png"}
                    height={isScreenLgOrLarger ? 200 : 150} 
                    width={isScreenLgOrLarger? 200: 150} 
                    alt={`Avatar image for a character named ${props.character.name}.`}
                />
            </Grid>
            <Grid alignItems="center" container item xs={12} md={4.5}>
                <Grid item xs={4}>
                    <Typography gutterBottom><b>Campaign:</b></Typography>
                </Grid>
                <Grid item xs={8} sx={{ pl: 1 }}>
                    <Typography gutterBottom>{CampaignDictionary.get(props.character.campaign)}</Typography>
                </Grid>
                <Grid item xs={4}>
                    <Typography gutterBottom><b>Species:</b></Typography>
                </Grid>
                <Grid item xs={8} sx={{ pl: 1 }}>
                    <Typography gutterBottom>{props.character.lineage}</Typography>
                </Grid>
                <Grid item xs={4}>
                    <Typography gutterBottom><b>Class:</b></Typography>
                </Grid>
                <Grid item xs={8} sx={{ pl: 1 }}>
                    <Typography gutterBottom>{props.character.classes}</Typography>
                </Grid>
                <Grid item xs={4}>
                    <Typography gutterBottom><b>Level:</b></Typography>
                </Grid>
                <Grid item xs={8} sx={{ pl: 1 }}>
                    <Typography gutterBottom>{props.level}</Typography>
                </Grid>
                <Grid item xs={4}>
                    <Typography gutterBottom><b>Background:</b></Typography>
                </Grid>
                <Grid item xs={8} sx={{ pl: 1 }}>
                    <Typography gutterBottom>{props.character.background}</Typography>
                </Grid>
                <Grid item xs={4}>
                    <Typography gutterBottom><b>Gold:</b></Typography>
                </Grid>
                <Grid item xs={8} sx={{ pl: 1 }}>
                    <Typography gutterBottom>{parseFloat(props.gold.toFixed(2))}</Typography>
                </Grid>
                <Grid item xs={4}>
                    <Typography gutterBottom><b>Downtime:</b></Typography>
                </Grid>
                <Grid item xs={8} sx={{ pl: 1 }}>
                    <Typography gutterBottom>{props.downtime}</Typography>
                </Grid>
            </Grid>
            <Grid alignItems="center" container item xs={12} md={4.5}>
                <Grid item xs={12} sx={{ pb: '0.35em' }}>
                    <Button 
                        component={Link}
                        to={`/characters/${props.character.id}/logs/new`}
                        variant="outlined"
                        fullWidth
                    >
                        Add Character Log
                    </Button>
                </Grid>
                <Grid item xs={12} sx={{ pb: '0.35em' }}>
                    <Button 
                        component={Link}
                        to={`/characters/${props.character.id}/magic-items/new`}
                        variant="outlined"
                        fullWidth
                    >
                        Add Magic Item
                    </Button>
                </Grid>
                <Grid item xs={12} sx={{ pb: '0.35em' }}>
                    <Button 
                        component={Link}
                        to={`/characters/${props.character.id}/story-awards/new`}
                        variant="outlined"
                        fullWidth
                    >
                        Add Story Award
                    </Button>
                </Grid>
                { props.character.characterSheetLink &&
                    <Grid item xs={12} sx={{ pb: '0.35em' }}>
                        <Button 
                            href={props.character.characterSheetLink}
                            target="_blank"
                            variant="outlined"
                            fullWidth
                        >
                            Character Sheet
                        </Button>
                    </Grid>
                }
            </Grid>
        </Grid>
    );
};

export default CharacterSummary;