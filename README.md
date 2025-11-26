# Sistem Pakar Diagnosis Penyakit Tanaman Cabai

Selamat datang di repositori Sistem Pakar Diagnosis Penyakit Tanaman Cabai. Project ini adalah aplikasi berbasis web yang dirancang untuk membantu petani maupun penghobi tanaman cabai dalam mengidentifikasi penyakit pada tanaman mereka secara dini dan akurat menggunakan metode Certainty Factor.

## Nama Anggota Kelompok

| Nama | NRP | Pembagian Tugas |
|------|-----|-----------------|
| Nabil Julian Syah | 5025231023 | Membuat Frontend |
| Alvin Zanua Putra | 5025231064 | Mengintegrasikan Frontend dan Backend hingga Revisi |
| Christoforus Indra Bagus Pratama | 5025231124 | Membuat Ringkasan Laporan dari Jurnal |
| Choirul Anam | 5025231145 |  Membuat Backend serta Rumus MB MD dan CF dalam Backend |

---

## Referensi Jurnal

[KLIK: Untuk melihat jurnal "Sistem Pakar Diagnosis Penyakit Tanaman Cabai"](https://digilib.pnc.ac.id/index.php?p=fstream-pdf&fid=633&bid=33479)

---

## Struktur Project (Monorepo)

Project ini telah dikonfigurasi untuk berjalan sebagai satu kesatuan (Monorepo).

- **Root**: Mengatur dependensi gabungan dan script utama.
- **backend/**: Kode backend (Fastify).
- **frontend/**: Kode frontend (React + Vite).
- **api/**: Entry point untuk Vercel Serverless Function.

## Cara Menjalankan di Lokal

Ikuti langkah-langkah berikut untuk menjalankan aplikasi di komputer lokal Anda. Pastikan sudah menginstall **Node.js** dan **MongoDB**.

### 1. Instalasi Dependensi

Jalankan perintah berikut di root folder untuk menginstall dependensi backend dan frontend sekaligus:

```bash
pnpm install
```

### 2. Konfigurasi Environment

Pastikan Anda memiliki file `.env` di folder `backend` dengan konfigurasi database MongoDB Anda.

Contoh `backend/.env`:
```env
MONGODB_URI="mongodb+srv://..."
```

### 3. Isi Data Awal (Seeding)

Masukkan data penyakit dan gejala ke database:

```bash
pnpm seed
```

### 4. Menjalankan Aplikasi

Untuk menjalankan Frontend dan Backend secara bersamaan dalam mode development:

```bash
pnpm dev
```

- Frontend: http://localhost:5173
- Backend: http://localhost:3001

---

## Panduan Deployment ke Vercel

Project ini siap dideploy ke Vercel sebagai satu project tunggal.

1.  Push kode ke GitHub.
2.  Buka Vercel dan "Add New Project".
3.  Import repository GitHub Anda.
4.  **Konfigurasi Project**:
    - **Framework Preset**: Vite.
    - **Root Directory**: `.` (root).
    - **Build Command**: `pnpm build` (atau `cd frontend && pnpm run build`).
    - **Output Directory**: `frontend/dist`.
    - **Environment Variables**:
        - `MONGODB_URI`: Connection string MongoDB Atlas Anda.
        - `VITE_API_BASE_URL`: `/api/v1`
5.  Deploy.

Aplikasi akan berjalan di domain Vercel Anda (contoh: `https://certaintyfactordiagnosis.vercel.app`).

---

## Penjelasan Metode Certainty Factor (CF)

Sistem ini menggunakan algoritma Certainty Factor (CF) untuk meniru cara berpikir seorang pakar dalam mendiagnosis penyakit dengan tingkat keyakinan tertentu.

### Apa itu MB, MD, dan CF?

Dalam sistem pakar ini, setiap gejala memiliki bobot keyakinan terhadap suatu penyakit.

1.  **MB (Measure of Belief)**
    *   **Definisi**: Ukuran kenaikan kepercayaan (keyakinan) terhadap hipotesis (penyakit) jika diberikan bukti (gejala) tertentu.
    *   **Rentang Nilai**: 0 sampai 1.

2.  **MD (Measure of Disbelief)**
    *   **Definisi**: Ukuran kenaikan ketidakpercayaan terhadap hipotesis jika diberikan bukti tertentu.
    *   **Rentang Nilai**: 0 sampai 1.

3.  **CF (Certainty Factor)**
    *   **Definisi**: Nilai kepastian akhir yang didapat dari selisih antara keyakinan (MB) dan ketidakpercayaan (MD).
    *   **Rumus Dasar**:
        $$CF = MB - MD$$
    *   **Rentang Nilai**: -1 sampai 1.

### Perhitungan dalam Sistem

Ketika user memilih lebih dari satu gejala, sistem menggunakan **Aturan Kombinasi (Parallel Combination Rule)**:

1.  **Hitung CF untuk setiap gejala**:
    $$CF_{gejala} = MB_{gejala} - MD_{gejala}$$

2.  **Gabungkan CF (CF Combine)**:
    $$CF_{old} + CF_{new} \times (1 - CF_{old})$$

3.  **Hasil Akhir**:
    Penyakit dengan nilai CF Final tertinggi akan ditampilkan sebagai hasil diagnosis utama.

---

## Struktur Folder

```
expertsystem/
├── backend/         # Server API & Logika CF
│   ├── src/
│   │   ├── algorithm/   # Implementasi rumus CF
│   │   ├── controllers/ # Pengendali request
│   │   ├── models/      # Skema Database (Penyakit, Gejala)
│   │   └── seed/        # Data awal sistem
├── frontend/        # Tampilan Web React
│   ├── src/
│   │   ├── components/  # Komponen UI
│   │   ├── pages/       # Halaman Web
│   │   └── services/    # Koneksi ke Backend API
└── api/             # Adapter Vercel Serverless
```

---
*Dibuat untuk memenuhi tugas Sistem Pakar Mata Kuliah RSBP Teknik Informatika ITS 2025/2026.*
