# 🚀 Realvora
**"Real insight. Real growth. Real impact."**

Realvora adalah **AI Business Health Platform untuk UMKM Indonesia**. Dibangun sebagai solusi cerdas berkelas *Enterprise / SaaS* untuk membantu UMKM mendiagnosis kesehatan bisnis secara praktis tanpa butuh pengetahuan akuntansi yang rumit, memberikan wawasan pasar, dan memberikan langkah aksi konkret yang didukung oleh Kecerdasan Buatan (Google Gemini 2.5 Flash).

---

## 🏆 TechSprint Innovation Cup 2026
Proyek ini dibangun dan dideploy khusus untuk diikutsertakan dalam kompetisi **TechSprint Innovation Cup 2026**.
- **Tema Lomba:** Smart Digital Solution for Real World Problems
- **Subtema:** Smart Business & Digital Economy
- **Tim:** Successful Failures: From Error to Impact

### 👨‍💻 Tim Pengembang (Information Technology - President University)
Proyek ini dikembangkan dengan kolaborasi oleh mahasiswa Program Studi Information Technology dari President University:
1. **Wisnu Alfian Nur Ashar**
2. **Reza Fahlevi**
3. **Prasia Anastasya Pandoh**

---

## ✨ Fitur Utama
1. **AI Business Diagnosis:** Form diagnosis bisnis dalam 4 langkah simpel yang mengevaluasi profitabilitas, struktur operasional, dan kanal pemasaran UMKM.
2. **Real-time Market Insights:** Dashboard intuitif yang menyediakan tren sektor wirausaha terkini (didukung data agregat nyata).
3. **SaaS Dashboard Experience:** Tampilan profesional kelas Enterprise 100% Mobile Responsive dengan navigasi pintar.
4. **Smart Scoring & Recommendation:** Memberikan "*Business Health Score*", diagnosis masalah mendesak, serta prioritas perbaikan seketika dalam bahasa Indonesia yang membumi.

## 🛠 Tech Stack
- **Frontend / Framework:** Next.js 14 (App Router), React, TypeScript
- **Styling:** Tailwind CSS (dengan Utility Glasses & Micro-animations)
- **Database & Auth:** Supabase (PostgreSQL)
- **AI Engine:** Google Gemini 2.5 Flash API
- **Deployment:** Vercel

---

## 💻 Panduan Menjalankan Proyek (Bekerjasama / Testing)

Bagi teman setim atau kontributor yang ingin melakukan pengujian secara lokal, ikuti langkah berikut:

1. **Clone Repository ini:**
   ```bash
   git clone https://github.com/wi5nuu/realvora.git
   cd realvora
   ```

2. **Install Dependensi:**
   ```bash
   npm install
   # atau yarn install
   ```

3. **Atur Environment Variables (Kunci API):**
   Duplikat file `.env.example` lalu ubah namanya menjadi `.env.local`
   ```bash
   cp .env.example .env.local
   ```
   Buka file `.env.local` dan masukkan kunci rahasia (*API keys*) untuk Supabase dan Gemini yang sudah disediakan tim.

4. **Jalankan Server Lokal:**
   ```bash
   npm run dev
   ```
   Aplikasi akan menyala! Buka [http://localhost:3000](http://localhost:3000) pada peramban Anda. Aplikasi berjalan sepenuhnya responsif menyesuaikan antara antarmuka mobile dan desktop secara cerdas. 

---
*© 2026 Realvora. Dibuat dengan antusiasme oleh mahasiswa Information Technology, President University.*
