import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "./AuthContext";

const ProtectedRoutes = () => {
    // Reference to logged in user
    const { user } = useAuth();

    return user ? <Outlet /> : <Navigate to="/" replace />;
};

export default ProtectedRoutes;