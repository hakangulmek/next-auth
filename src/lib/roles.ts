export const roles = {
  ADMIN: "admin",
  USER: "user",
} as const;

export function hasPermission(
  userRole: keyof typeof roles,
  requiredRole: keyof typeof roles
): boolean {
  const roleHierarchy: Record<keyof typeof roles, string[]> = {
    ADMIN: ["admin", "user"],
    USER: ["user"],
  };

  return roleHierarchy[userRole]?.includes(requiredRole) || false;
}
