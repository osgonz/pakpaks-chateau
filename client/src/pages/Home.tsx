import { Button, Stack, Box, Typography } from "@mui/material";
import { Link } from "react-router-dom";

function Home() {
    return (
        <Box
            sx={{
            background:
                "linear-gradient(to bottom right, rgba(236, 72, 153, 0.15), rgba(59, 130, 246, 0.15))",
            height: "100vh",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            }}
        >
            <Stack spacing={2} alignItems="center">
                <Typography variant="h4" component="h3">
                    Home Page
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
