import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";

function Home() {
  const navigate = useNavigate();

  return (
    <div
      style={{
        background:
          "linear-gradient(to bottom right, rgba(236, 72, 153, 0.15), rgba(59, 130, 246, 0.15))",
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "10px",
        }}
      >
        <h3 style={{ fontSize: "25px" }}>Home Page</h3>
        <div style={{ display: "flex", gap: "10px" }}>
          <Button onClick={() => navigate("/characters")} variant="contained">
            Characters
          </Button>
          <Button onClick={() => navigate("/dm-logs")} variant="contained">
            Dm Logs
          </Button>
        </div>
      </div>
    </div>
  );
}

export default Home;
