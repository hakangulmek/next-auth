"use client";
import React from "react";
import { useSession, signOut } from "next-auth/react";
import { useRole } from "@/hooks/useRole";

export default function Page() {
  const { data: session, status } = useSession();
  const { role } = useRole();

  if (status === "loading")
    return <div className="text-center mt-10">Yükleniyor...</div>;
  if (!session)
    return <div className="text-center mt-10">Giriş yapmadınız.</div>;

  const handleSignOut = () => {
    signOut({ callbackUrl: "/login" });
  };

  return (
    <div className=" min-h-screen  bg-gray-100 p-4 md:p-8">
      <div className="max-w-3xl mx-auto bg-white shadow-md rounded-lg p-6 space-y-6">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between md:items-center border-b pb-4">
          <div>
            <h1 className="text-xl font-semibold text-gray-800">
              Hoş geldiniz,
            </h1>
            <p className="text-gray-600">{session.user?.name || "Kullanıcı"}</p>
          </div>
          <div className="text-sm text-gray-600 mt-4 md:mt-0 text-right">
            <p>Email: {session.user?.email}</p>
            <p>Rol: {role === "admin" ? "Yönetici" : "Kullanıcı"}</p>
          </div>
        </div>

        {/* Rol Bilgisi */}
        <div>
          <h2 className="text-lg font-medium text-gray-800 mb-2">
            🛡 Rol Bilgileri
          </h2>
          <div className="bg-gray-50 border border-gray-300 rounded p-4 text-sm text-gray-700">
            <p className="font-medium">⚠️ Kullanıcı yetkileriniz var:</p>
            <ul className="list-disc list-inside mt-2 space-y-1">
              <li>Belgeleri görüntüleme</li>
              <li>Profil düzenleme</li>
              <li>Temel özellikler</li>
            </ul>
          </div>
        </div>

        {/* Hesap İşlemleri */}
        <div className="flex justify-between items-center pt-4 border-t">
          <div>
            <h3 className="text-lg font-medium text-gray-800">
              🔐 Hesap İşlemleri
            </h3>
            <p className="text-sm text-gray-500">Hesabınızla ilgili işlemler</p>
          </div>
          <button
            onClick={handleSignOut}
            className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded"
          >
            Çıkış Yap
          </button>
        </div>
      </div>
    </div>
  );
}
