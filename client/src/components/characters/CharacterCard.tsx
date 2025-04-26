import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Grid from '@mui/material/Grid';
import Icon from '@mui/material/Icon';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";
import { Link } from "react-router-dom";
import { Character } from "../../data/Types";

interface CharacterCardProps {
    character: Character,
};

const CharacterCard = (props: CharacterCardProps) => {
    // Reference to theme
    const theme = useTheme();
    // Helper boolean to apply properties conditional on screen size
    const isScreenLgOrLarger = useMediaQuery(theme.breakpoints.up("lg"));

    // Destructuring props
    const { character } = props;

    return (
        <Grid item xs={12} md={6}>
            <Card sx={{ display: 'flex', flexDirection: 'column' }}>
                <Box sx={{ display: 'flex' }}>
                    <CardMedia
                        component="img"
                        src={character.imageUrl || "https://cdn.pixabay.com/photo/2016/08/08/09/17/avatar-1577909_960_720.png"}
                        width={isScreenLgOrLarger ? 200 : 150}
                        alt={`Avatar image for a character named ${character.name}.`}
                    />
                    <CardContent sx={{ flex: 1 }}>
                        <Typography component="h2" variant="h4">
                            {character.name}
                        </Typography>
                        <Typography component="div" variant="subtitle1">
                            {`${character.lineage} ${character.classes}`}
                        </Typography>
                        <Typography component="div" variant="subtitle1">
                            {`Level ?`}
                        </Typography>
                    </CardContent>
                </Box>
                <CardActions disableSpacing>
                    <IconButton 
                        aria-label={`View character ${character.name}`}
                        color="primary"
                        component={Link}
                        to={`/characters/${character.id}`}
                    >
                        <Icon>visibility</Icon>
                    </IconButton>
                    <IconButton 
                        aria-label={`Edit character ${character.name}`}
                        color="primary"
                        component={Link}
                        to={`/characters/${character.id}/edit`}
                    >
                        <Icon>edit</Icon>
                    </IconButton>
                    <IconButton 
                        aria-label={`Delete character ${character.name}`}
                        color="error"
                        /*onClick={() => handleDeleteOpen(item)}*/
                    >
                        <Icon>delete</Icon>
                    </IconButton>
                </CardActions>
            </Card>
        </Grid>
    );
};

export default CharacterCard;
