import { useAuth } from "@/contexts/AuthContext";
import { LogOut } from "lucide-react";
import { ActionButton, ActionButtonSkeleton } from "@/components/ui/Button";

export default function LogoutButton() {
  const { isAuthenticated, loading, user, logout } = useAuth();

  if (loading) return <ActionButtonSkeleton />
  if (!isAuthenticated) return null;

  return (
    <ActionButton onClick={logout} title={`Logout from '${user?.username}'`}>
      <LogOut size={18} />
      <span>{user?.username}</span>
    </ActionButton>
  );
}
