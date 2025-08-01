import { useAuth } from "@/contexts/AuthContext";
import { LogOut } from "lucide-react";
import { ActionButton } from "@/components/ui/Button";

export default function LogoutButton() {
  const { isAuthenticated, user, logout } = useAuth();

  if (!isAuthenticated) return null;

  return (
    <ActionButton onClick={logout} title={`Logout from '${user?.username}'`}>
      <LogOut size={18} />
      <span>{user?.username}</span>
    </ActionButton>
  );
}
