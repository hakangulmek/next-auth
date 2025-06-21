"use client";
import React from "react";
import { useRole } from "../hooks/useRole";

interface RoleGuardProps {
  allowedRoles: string[];
  children: React.ReactNode;
  fallback?: React.ReactNode;
}

export function RoleGuard({
  allowedRoles,
  children,
  fallback,
}: RoleGuardProps) {
  const { hasAnyRole, isLoading } = useRole();

  if (isLoading) {
    return <div>Yükleniyor...</div>;
  }

  if (!hasAnyRole(allowedRoles)) {
    return fallback || <div>Bu sayfaya erişim yetkiniz yok.</div>;
  }

  return <>{children}</>;
}
