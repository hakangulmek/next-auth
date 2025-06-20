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

  const handleSignOut = async () => {
    try {
      // Auth0'dan tamamen çıkış yapmak için logout URL'ini kullan
      const auth0LogoutUrl = `https://dev-dpcxxbh3ons3vk0m.us.auth0.com/v2/logout?returnTo=${encodeURIComponent(
        window.location.origin + "/login"
      )}&client_id=9Z91tgavS7VpFpAuxJPfPpnPNl0gVHRQ`;

      // NextAuth session'ını temizle
      await signOut({
        callbackUrl: "/login",
        redirect: false,
      });

      // Auth0'dan da çıkış yap
      window.location.href = auth0LogoutUrl;
    } catch (error) {
      console.error("SignOut error:", error);
      // Hata durumunda manuel yönlendirme
      window.location.href = "/login";
    }
  };
  console.log("Session:", session);
  return (
    <div>
      <div>
        <h1>Dashboard</h1>
        <p>Hoş geldiniz, {session.user?.name}!</p>
        <p>Email: {session.user?.email}</p>
        <p>Rol: {session.user?.role}</p>
        <button
          onClick={handleSignOut}
          className="mt-4 px-4 py-2 bg-red-600 text-white rounded"
        >
          Çıkış Yap
        </button>
      </div>
    </div>
  );
}

export default page;
