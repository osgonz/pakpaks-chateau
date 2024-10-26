import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";
import { Link } from "react-router-dom";
import { CampaignDictionary } from "../../data/Dictionaries";
import { Character, MagicItem } from "../../data/Types";

interface SummaryProps {
    character: Character,
    level: number,
    gold: number,
    downtime: number,
    consumableMagicItems: MagicItem[],
    permanentMagicItems: MagicItem[],
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
            rowSpacing={2}
            columnSpacing={2}
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
            <Grid 
                container 
                item
                alignContent="center"
                justifyContent="center" 
                md={3} 
                sx={{ display: { xs: 'none', md: 'flex' } }}
            >
                <img 
                    src={props.character.imageUrl || "https://cdn.pixabay.com/photo/2016/08/08/09/17/avatar-1577909_960_720.png"}
                    height={isScreenLgOrLarger ? 200 : 150} 
                    width={isScreenLgOrLarger? 200: 150} 
                />
            </Grid>
            <Grid alignItems="center" container item xs={12} md={4.5}>
                <Grid item xs={4}>
                    <Typography gutterBottom>Campaign:</Typography>
                </Grid>
                <Grid item xs={8} sx={{ pl: 1 }}>
                    <Typography gutterBottom>{CampaignDictionary.get(props.character.campaign)}</Typography>
                </Grid>
                <Grid item xs={4}>
                    <Typography gutterBottom>Lineage:</Typography>
                </Grid>
                <Grid item xs={8} sx={{ pl: 1 }}>
                    <Typography gutterBottom>{props.character.lineage}</Typography>
                </Grid>
                <Grid item xs={4}>
                    <Typography gutterBottom>Class:</Typography>
                </Grid>
                <Grid item xs={8} sx={{ pl: 1 }}>
                    <Typography gutterBottom>{props.character.classes}</Typography>
                </Grid>
                <Grid item xs={4}>
                    <Typography gutterBottom>Level:</Typography>
                </Grid>
                <Grid item xs={8} sx={{ pl: 1 }}>
                    <Typography gutterBottom>{props.level}</Typography>
                </Grid>
                <Grid item xs={4}>
                    <Typography gutterBottom>Background:</Typography>
                </Grid>
                <Grid item xs={8} sx={{ pl: 1 }}>
                    <Typography gutterBottom>{props.character.background}</Typography>
                </Grid>
                <Grid item xs={4}>
                    <Typography gutterBottom>Gold:</Typography>
                </Grid>
                <Grid item xs={8} sx={{ pl: 1 }}>
                    <Typography gutterBottom>{parseFloat(props.gold.toFixed(2))}</Typography>
                </Grid>
                <Grid item xs={4}>
                    <Typography gutterBottom>Downtime:</Typography>
                </Grid>
                <Grid item xs={8} sx={{ pl: 1 }}>
                    <Typography gutterBottom>{props.downtime}</Typography>
                </Grid>
            </Grid>
            <Grid alignItems="center" container item xs={12} md={4.5}>
                <Grid item xs={4}>
                    <Typography gutterBottom>Carried Magic Items:</Typography>
                </Grid>
                <Grid item xs={8} sx={{ pl: 1 }}>
                    { props.permanentMagicItems.filter((item) => item.isEquipped).map((item) =>(
                        <Typography key={item.id} gutterBottom>
                            {item.flavorName ? `${item.flavorName} (${item.name})` : item.name}{item.requiresAttunement ? ' [A]' : ''}
                        </Typography>
                    ))}
                </Grid>
                <Grid item xs={6}>
                    <Button 
                        component={Link}
                        to={`/characters/${props.character.id}/logs/new`}
                        variant="contained"
                        fullWidth
                    >
                        Add Character Log
                    </Button>
                </Grid>
                { props.character.characterSheetLink &&
                    <Grid item xs={6} sx={{ pl: 1 }}>
                        <Button 
                            href={props.character.characterSheetLink}
                            target="_blank"
                            variant="contained"
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