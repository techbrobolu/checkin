import { Navigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import LoadingScreen from "../pages/LoadingScreen";

function ProtectedRoute({ children, requiredRole }) {
	const { user, role, loading } = useAuth();

	if (loading) return <LoadingScreen />;

	if (!user) return <Navigate to="/login" replace />;

	if (requiredRole && role !== requiredRole) {
		// Logged in, but wrong role — send them to their own dashboard,
		// not back to login (they don't need to log in again)
		return <Navigate to={role === "admin" ? "/admin" : "/attendee"} replace />;
	}

	return children;
}

export default ProtectedRoute;
