import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Grid from '@mui/material/Grid';
import Icon from '@mui/material/Icon';
import IconButton from '@mui/material/IconButton';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { Link } from "react-router-dom";
import { CampaignDictionary } from '../../data/Dictionaries';
import { CharacterRow } from "../../data/Types";

interface CharacterCardProps {
    character: CharacterRow,
};

const CharacterCard = (props: CharacterCardProps) => {
    // Destructuring props
    const { character } = props;

    return (
        <Grid item xs={12} md={6}>
            <Card sx={{ display: 'flex' }}>
                <Stack sx={{ flex: 1 }}>
                    <CardContent>
                        <Typography component="h2" variant="h4" gutterBottom>
                            {character.name}
                        </Typography>
                        <Typography component="div" variant="subtitle1">
                            {`${character.lineage} ${character.classes}`}
                        </Typography>
                        <Typography component="div" variant="subtitle1">
                            {`Level ${character.characterLevel || 1}`}
                        </Typography>
                        <Typography component="div" variant="subtitle1" color="text.secondary">
                            {`${CampaignDictionary.get(character.campaign)} Campaign`}
                        </Typography>
                    </CardContent>
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
                </Stack>
                <CardMedia
                    component="img"
                    sx={{ display: { xs: 'none', sm: 'block' }, flex: '0 0 200px', width: 200 }}
                    src={character.imageUrl || "https://cdn.pixabay.com/photo/2016/08/08/09/17/avatar-1577909_960_720.png"}
                    alt={`Avatar image for a character named ${character.name}.`}
                />
            </Card>
        </Grid>
    );
};

export default CharacterCard;
