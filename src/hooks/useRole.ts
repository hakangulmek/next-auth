// hooks/useRole.ts
import { useSession } from "next-auth/react";

export function useRole() {
  const { data: session, status } = useSession();

  const isAdmin = session?.user?.role === "admin";
  const isUser = session?.user?.role === "user";
  const isAuthenticated = status === "authenticated";
  const isLoading = status === "loading";

  const hasRole = (role: string | string[]) => {
    if (!session?.user?.role) return false;

    if (Array.isArray(role)) {
      return role.includes(session.user.role);
    }

    return session.user.role === role;
  };

  const hasAnyRole = (roles: string[]) => {
    return roles.some((role) => hasRole(role));
  };

  return {
    user: session?.user,
    role: session?.user?.role,
    isAdmin,
    isUser,
    isAuthenticated,
    isLoading,
    hasRole,
    hasAnyRole,
  };
}
