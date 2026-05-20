import { useNavigate } from "react-router";
import { useTheme } from "next-themes";
import { toast } from "sonner";
import {
  useCurrentUser,
  useLogout,
} from "@/features/authentication/hooks/useAuthQueries";
import { getFullName } from "@/shared/utils/user.utils";

export function useUserMenu() {
  const navigate = useNavigate();
  const { theme, setTheme } = useTheme();
  const { data: user } = useCurrentUser();
  const logoutMutation = useLogout();

  const userFirstName = user?.firstName ?? "User";
  const userLastName = user?.lastName ?? "";
  const userFullName = user
    ? getFullName(user.firstName, user.lastName)
    : "User";
  const userImageUrl = user?.imageUrl ?? null;
  const isDarkTheme = theme === "dark";
  const userEmail = user?.email ?? "";

  const toggleTheme = () => {
    setTheme(isDarkTheme ? "light" : "dark");
  };

  const logout = async () => {
    try {
      await logoutMutation.mutateAsync();
      toast.success("Logged out successfully");
      navigate("/login");
    } catch {
      toast.error("Failed to logout");
    }
  };

  return {
    isDarkTheme,
    isLoggingOut: logoutMutation.isPending,
    logout,
    toggleTheme,
    userFirstName,
    userLastName,
    userFullName,
    userImageUrl,
    userEmail,
  };
}
