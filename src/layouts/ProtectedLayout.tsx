import { useAuth } from "@/contexts/AuthContext";
import { Navigate, Outlet } from "react-router";

const ProtectedLayout: React.FC = () => {
  const { isAuthenticated, loading } = useAuth();

  if (loading) {
    return (
      <div style={{ textAlign: "center", marginTop: "20px" }}>Loading...</div>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to="/signin" replace />;
  }

  return <Outlet />;
};

export default ProtectedLayout;
