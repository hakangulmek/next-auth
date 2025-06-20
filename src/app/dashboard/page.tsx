"use client";
import React from "react";
import { useSession, signOut } from "next-auth/react";
import Link from "next/link";
import { AdminOnly } from "@/components/AdminOnly";
import { UserOnly } from "@/components/userOnly";
import { useRole } from "@/hooks/useRole";

function page() {
  const { data: session, status } = useSession();
  const { isAdmin, isUser, role } = useRole();

  if (status === "loading") {
    return <div>Yükleniyor...</div>;
  }

  if (!session) {
    return <div>Giriş yapmadınız.</div>;
  }

  const handleSignOut = async () => {
    try {
      // Auth0'dan tamamen çıkış yapmak için logout URL'ini kullan
      const auth0LogoutUrl = `${
        process.env.AUTH0_ISSUER_BASE_URL
      }/v2/logout?returnTo=${encodeURIComponent(
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

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="bg-white rounded-lg shadow p-6 mb-6">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
              <p className="text-gray-600 mt-2">
                Hoş geldiniz, {session.user?.name}!
              </p>
            </div>
            <div className="text-right">
              <p className="text-sm text-gray-500">
                Email: {session.user?.email}
              </p>
              <p className="text-sm font-medium text-blue-600">
                Rol: {role === "admin" ? "Yönetici" : "Kullanıcı"}
              </p>
            </div>
          </div>
        </div>

        {/* Navigation Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
          {/* Herkes için */}
          <Link
            href="/profile"
            className="bg-white rounded-lg shadow hover:shadow-md transition-shadow p-6"
          >
            <h3 className="text-lg font-semibold mb-2">👤 Profil</h3>
            <p className="text-gray-600">Profil bilgilerinizi görüntüleyin</p>
          </Link>

          {/* Sadece Admin için */}
          <AdminOnly>
            <Link
              href="/admin/users"
              className="bg-red-50 border border-red-200 rounded-lg shadow hover:shadow-md transition-shadow p-6"
            >
              <h3 className="text-lg font-semibold mb-2 text-red-700">
                🔧 Kullanıcı Yönetimi
              </h3>
              <p className="text-red-600">Kullanıcıları yönetin</p>
            </Link>

            <Link
              href="/admin/settings"
              className="bg-red-50 border border-red-200 rounded-lg shadow hover:shadow-md transition-shadow p-6"
            >
              <h3 className="text-lg font-semibold mb-2 text-red-700">
                ⚙️ Sistem Ayarları
              </h3>
              <p className="text-red-600">Sistem ayarlarını yapılandırın</p>
            </Link>
          </AdminOnly>

          {/* User ve Admin için */}
          <UserOnly>
            <Link
              href="/user/documents"
              className="bg-blue-50 border border-blue-200 rounded-lg shadow hover:shadow-md transition-shadow p-6"
            >
              <h3 className="text-lg font-semibold mb-2 text-blue-700">
                📄 Belgelerim
              </h3>
              <p className="text-blue-600">Belgelerinizi görüntüleyin</p>
            </Link>
          </UserOnly>
        </div>

        {/* Role-specific content */}
        <div className="bg-white rounded-lg shadow p-6 mb-6">
          <h2 className="text-xl font-semibold mb-4">Role Bilgileri</h2>

          <AdminOnly
            fallback={
              <div className="bg-blue-50 border border-blue-200 rounded p-4">
                <p className="text-blue-800">🧑‍💼 Kullanıcı yetkileriniz var</p>
                <ul className="mt-2 text-blue-700 text-sm">
                  <li>• Belgeleri görüntüleme</li>
                  <li>• Profil düzenleme</li>
                  <li>• Temel özellikler</li>
                </ul>
              </div>
            }
          >
            <div className="bg-red-50 border border-red-200 rounded p-4">
              <p className="text-red-800">👑 Yönetici yetkileriniz var</p>
              <ul className="mt-2 text-red-700 text-sm">
                <li>• Tüm kullanıcıları yönetme</li>
                <li>• Sistem ayarlarını değiştirme</li>
                <li>• Tüm sayfaları görüntüleme</li>
                <li>• Kullanıcı rollerini değiştirme</li>
              </ul>
            </div>
          </AdminOnly>
        </div>

        {/* Actions */}
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex justify-between items-center">
            <div>
              <h3 className="text-lg font-semibold">Hesap İşlemleri</h3>
              <p className="text-gray-600 text-sm">
                Hesabınızla ilgili işlemler
              </p>
            </div>
            <button
              onClick={handleSignOut}
              className="px-6 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
            >
              Çıkış Yap
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default page;
