import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import LinearProgress from "@mui/material/LinearProgress";
import Paper from "@mui/material/Paper";
import Typography from '@mui/material/Typography';
import BreadcrumbsMenu from '../components/shared/BreadcrumbsMenu';
import CharacterCard from "../components/characters/CharacterCard";
import { useCharacters } from "../hooks/useCharacter";

const CharactersMenu = () => {
    const characters = useCharacters();

    return (
        <>
            { characters ? (
                <Container maxWidth="lg">
                    <BreadcrumbsMenu 
                        currentPageTitle="Characters"
                    />
                    <Paper 
                        elevation={1}
                        sx={{
                            p: 3 
                        }}
                    >
                        <Grid item xs={12}>
                            <Typography variant="h3" component="h1" gutterBottom textAlign="center">
                                Characters
                            </Typography>
                        </Grid>
                        <Grid 
                            container 
                            spacing={4}
                        >
                            { characters.map((character) => (
                                <CharacterCard
                                    key={character.id}
                                    character={character}
                                />
                            ))}
                        </Grid>
                    </Paper>
                </Container>
            ) : (
                <LinearProgress />
            )}
        </>
    );
};

export default CharactersMenu;