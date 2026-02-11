import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import LinearProgress from "@mui/material/LinearProgress";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { Link } from "react-router-dom";
import { useAuth } from '../components/shared/AuthContext';

function Home() {
    // Auth context loading reference
    const { user, isLoading } = useAuth();

    return (
        <>
            { isLoading ? (
                <LinearProgress />
            ) : (
                <Box
                    sx={{
                    height: "100vh",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    }}
                >
                    <Stack spacing={3} alignItems="center">
                        <Typography variant="h3" component="h1">
                            Pakpak's Chateau
                        </Typography>
                        { user &&
                            <Stack direction="row" spacing={2}>
                                <Button 
                                    component={Link}
                                    to="/characters"
                                    variant="contained"
                                >
                                    Characters
                                </Button>
                                <Button
                                    component={Link}
                                    to="/magic-items"
                                    variant="contained"
                                >
                                    Magic Items
                                </Button>
                                <Button 
                                    component={Link}
                                    to="/dm-logs"
                                    variant="contained"
                                >
                                    DM Logs
                                </Button>
                            </Stack>
                        }
                    </Stack>
                </Box>
            )}
        </>
    );
}

export default Home;
