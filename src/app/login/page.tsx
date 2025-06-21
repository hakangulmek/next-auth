"use client";
import { signIn, getSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function LoginPage() {
  const router = useRouter();

  useEffect(() => {
    getSession().then((session) => {
      if (session) router.push("/dashboard");
    });
  }, [router]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-100 to-gray-200 px-4">
      <div className="max-w-md w-full bg-white p-8 rounded-lg shadow-lg">
        <h2 className="text-center text-2xl font-bold text-gray-800 mb-6">
          Hesabınıza Giriş Yapın
        </h2>
        <button
          onClick={() => signIn("auth0", { callbackUrl: "/dashboard" })}
          className="w-full py-2 px-4 bg-indigo-600 hover:bg-indigo-700 text-white font-medium rounded transition duration-200"
        >
          Auth0 ile Giriş Yap
        </button>
      </div>
    </div>
  );
}
