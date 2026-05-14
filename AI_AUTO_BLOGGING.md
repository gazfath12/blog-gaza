# Gaza Alfath Blog - AI Auto Blogging Setup

Website ini dilengkapi dengan sistem **AI Auto Blogging** yang otomatis mencari topik trending dan membuat artikel berkualitas tinggi menggunakan Gemini AI.

## 🚀 Cara Kerja
1. **GitHub Actions** berjalan setiap 12 jam (scheduler).
2. Script mengambil topik trending dari Hacker News, Dev.to, dan GitHub.
3. **Gemini AI** memilih topik terbaik dan membuat artikel lengkap (>1200 kata) dengan format Markdown.
4. Artikel dikirim ke API internal website dan disimpan ke **Neon PostgreSQL**.
5. Artikel otomatis muncul di halaman depan blog.

## 🛠️ Setup Scheduller (GitHub Actions)
Untuk mengaktifkan otomasi, ikuti langkah berikut:

1.  **Dapatkan API Key**:
    *   Ambil **Gemini API Key** dari [Google AI Studio](https://aistudio.google.com/).
    *   Buat password acak untuk `ADMIN_API_KEY` (sebagai pengaman API).
2.  **Atur GitHub Secrets**:
    *   Buka repository di GitHub.
    *   Pergi ke **Settings > Secrets and variables > Actions**.
    *   Tambahkan Secrets baru:
        *   `GEMINI_API_KEY`: (Isi dengan API Key Gemini)
        *   `ADMIN_API_KEY`: (Isi dengan password acak yang sama dengan di `.env`)
        *   `DATABASE_URL`: (Sudah ada dari Neon)
3.  **Update Site URL**:
    *   Di file `.github/workflows/auto-blog.yml`, pastikan `SITE_URL` mengarah ke domain produksi Anda (misal: `https://blog.gazaalfath.my.id`).

## 📝 Konfigurasi Tambahan
*   **Waktu Eksekusi**: Ubah nilai `cron` di `.github/workflows/auto-blog.yml` jika ingin mengubah jadwal (misal: setiap 24 jam).
*   **Prompt AI**: Anda bisa memodifikasi instruksi ke Gemini di file `scripts/auto-blog.js` untuk mengubah gaya bahasa atau fokus topik.

## 🛡️ Keamanan
API route `/api/admin/auto-post` dilindungi oleh `ADMIN_API_KEY`. Pastikan key ini tetap rahasia dan tidak di-push ke GitHub (gunakan GitHub Secrets).
