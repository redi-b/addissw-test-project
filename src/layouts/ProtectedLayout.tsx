import { useAuth } from "@/contexts/AuthContext";
import { Navigate, Outlet } from "react-router";

const ProtectedLayout: React.FC = () => {
  const { isAuthenticated } = useAuth();

  if (!isAuthenticated) {
    return <Navigate to="/signin" replace />;
  }

  return <Outlet />;
};

export default ProtectedLayout;
