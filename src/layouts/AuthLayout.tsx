import { useAuth } from "@/contexts/AuthContext";
import styled from "@emotion/styled";
import { Navigate, Outlet } from "react-router";

const AuthContainer = styled.div`
  min-height: calc(100vh - 68px);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const AuthLayout = () => {
  const { isAuthenticated } = useAuth();

  if (isAuthenticated) return <Navigate to="/" replace />

  return (
    <AuthContainer>
      <Outlet />
    </AuthContainer>
  );
};

export default AuthLayout;
