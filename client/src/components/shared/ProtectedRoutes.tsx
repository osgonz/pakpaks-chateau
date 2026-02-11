import { Navigate, Outlet } from "react-router-dom";
import LinearProgress from "@mui/material/LinearProgress";
import { useAuth } from "./AuthContext";

const ProtectedRoutes = () => {
    // Reference to logged in user
    const { isLoading, user } = useAuth();

    return (
        <>
            { isLoading ? (
                <LinearProgress />
            ) : (
                user ? <Outlet /> : <Navigate to="/" replace />
            )}
        </>
    );
};

export default ProtectedRoutes;