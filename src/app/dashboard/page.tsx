"use client";
import React from "react";
import { useSession, signOut } from "next-auth/react";

function page() {
  const { data: session, status } = useSession();

  if (status === "loading") {
    return <div>Yükleniyor...</div>;
  }

  if (!session) {
    return <div>Giriş yapmadınız.</div>;
  }

  return (
    <div>
      <h1>Dashboard</h1>
      <p>Hoş geldiniz, {session.user?.name}!</p>
      <p>Email: {session.user?.email}</p>
      <p>Rol: {session.user?.role}</p>
      <button
        onClick={() => signOut({ callbackUrl: "/login" })}
        className="mt-4 px-4 py-2 bg-red-600 text-white rounded"
      >
        Çıkış Yap
      </button>
    </div>
  );
}

export default page;
