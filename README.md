# 🔐 Next.js + Auth0 + NextAuth + JWT Kimlik Doğrulama Sistemi

Bu proje, **Next.js 14 App Router** ile oluşturulmuş, **Auth0** üzerinden OAuth 2.0 giriş sağlayan, **NextAuth.js** ile JWT tabanlı oturum yönetimi yapan ve **Middleware** ile sayfa erişimi kontrol eden bir kimlik doğrulama ve yetkilendirme sistemidir.

## 🚀 Özellikler

- ✅ **OAuth 2.0 ile Giriş** – Auth0 entegrasyonu
- ✅ **JWT Tabanlı Oturum** – NextAuth.js desteğiyle güvenli kimlik doğrulama
- ✅ **Rol Bazlı Yetkilendirme** – `admin` / `user` rolleriyle erişim kontrolü
- ✅ **Route Koruma** – Next.js Middleware ile sadece yetkili kullanıcı erişimi
- ✅ **Şık UI** – TailwindCSS ile responsive ve kullanıcı dostu arayüz
- ✅ **12 Factor App** uyumluluğu – Çevresel yapılandırma, taşınabilirlik


---

## 🛠️ Kurulum

### 1. Projeyi Klonla

```bash
git clone https://github.com/kullaniciadi/next-auth.git
cd next-auth
git checkout dev/v1.0.0
