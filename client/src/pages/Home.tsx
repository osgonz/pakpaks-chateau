import { Button, Stack, Box, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";

function Home() {
  const navigate = useNavigate();

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
          <Button onClick={() => navigate("/characters")} variant="contained">
            Characters
          </Button>
          <Button onClick={() => navigate("/dm-logs")} variant="contained">
            Dm Logs
          </Button>
        </Stack>
      </Stack>
    </Box>
  );
}

export default Home;
