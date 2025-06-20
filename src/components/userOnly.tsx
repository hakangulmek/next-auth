import { RoleGuard } from "./roleGuard";
interface AdminOnlyProps {
  children: React.ReactNode;
  fallback?: React.ReactNode;
}
export function UserOnly({ children, fallback }: AdminOnlyProps) {
  return (
    <RoleGuard
      allowedRoles={["user", "admin"]} // Admin da user sayfalarını görebilir
      fallback={fallback}
    >
      {children}
    </RoleGuard>
  );
}
