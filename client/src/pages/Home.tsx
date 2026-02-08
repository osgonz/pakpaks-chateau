import { Button, Stack, Box, Typography } from "@mui/material";
import { Link } from "react-router-dom";

function Home() {
    return (
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
            </Stack>
        </Box>
    );
}

export default Home;
