# Sistem Pakar Diagnosis Penyakit Tanaman Cabai 

Selamat datang di repositori **Sistem Pakar Diagnosis Penyakit Tanaman Cabai**. Project ini adalah aplikasi berbasis web yang dirancang untuk membantu petani maupun penghobi tanaman cabai dalam mengidentifikasi penyakit pada tanaman mereka secara dini dan akurat menggunakan metode **Certainty Factor**.

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

## Cara Menjalankan Project

Ikuti langkah-langkah berikut untuk menjalankan aplikasi di komputer lokal Anda. Pastikan sudah menginstall **Node.js** dan **MongoDB**.

### 1. Persiapan Backend (Server)

1.  Buka terminal dan masuk ke folder `backend`:
    ```bash
    cd backend
    ```
2.  Install dependencies:
    ```bash
    pnpm install
    # atau
    npm install
    ```
3.  **PENTING**: Masukkan data awal (penyakit & gejala) ke database:
    ```bash
    npm run seed
    ```
    *Pastikan MongoDB sudah berjalan sebelum menjalankan perintah ini.*
4.  Jalankan server:
    ```bash
    npm start
    ```
    Server akan berjalan di `http://localhost:3000`.

### 2. Persiapan Frontend (Tampilan)

1.  Buka terminal baru (jangan matikan terminal backend), masuk ke folder `frontend`:
    ```bash
    cd frontend
    ```
2.  Install dependencies:
    ```bash
    pnpm install
    ```
3.  Jalankan aplikasi:
    ```bash
    pnpm dev
    ```
4.  Buka browser dan akses alamat yang muncul (biasanya `http://localhost:5173`).

---

## Penjelasan Metode Certainty Factor (CF)

Sistem ini menggunakan algoritma **Certainty Factor (CF)** untuk meniru cara berpikir seorang pakar dalam mendiagnosis penyakit dengan tingkat keyakinan tertentu.

### Apa itu MB, MD, dan CF?

Dalam sistem pakar ini, setiap gejala memiliki bobot keyakinan terhadap suatu penyakit.

1.  **MB (Measure of Belief)**
    *   **Definisi**: Ukuran kenaikan kepercayaan (keyakinan) terhadap hipotesis (penyakit) jika diberikan bukti (gejala) tertentu.
    *   **Sederhananya**: Seberapa yakin pakar bahwa "Jika ada gejala X, maka penyakitnya adalah Y".
    *   **Rentang Nilai**: 0 sampai 1.

2.  **MD (Measure of Disbelief)**
    *   **Definisi**: Ukuran kenaikan ketidakpercayaan terhadap hipotesis jika diberikan bukti tertentu.
    *   **Sederhananya**: Seberapa yakin pakar bahwa gejala tersebut *bukan* disebabkan oleh penyakit lain, atau tingkat keraguan pakar.
    *   **Rentang Nilai**: 0 sampai 1.

3.  **CF (Certainty Factor)**
    *   **Definisi**: Nilai kepastian akhir yang didapat dari selisih antara keyakinan (MB) dan ketidakpercayaan (MD).
    *   **Rumus Dasar**:
        $$CF = MB - MD$$
    *   **Rentang Nilai**: -1 sampai 1.
        *   Nilai mendekati **1** berarti **Sangat Yakin**.
        *   Nilai mendekati **-1** berarti **Sangat Yakin Tidak**.
        *   Nilai **0** berarti **Tidak Tahu**.

### Bagaimana Perhitungannya dalam Sistem?

Ketika user memilih lebih dari satu gejala, sistem menggunakan **Aturan Kombinasi (Parallel Combination Rule)**:

1.  **Hitung CF untuk setiap gejala**:
    $$CF_{gejala} = MB_{gejala} - MD_{gejala}$$
    *(Dikali dengan bobot user jika ada input tingkat keyakinan user)*

2.  **Gabungkan CF (CF Combine)**:
    Jika ada gejala 1 dan gejala 2, maka CF gabungan dihitung bertahap:
    
    $$CF_{old} + CF_{new} \times (1 - CF_{old})$$
    
    Proses ini diulang terus menerus untuk semua gejala yang dipilih user hingga didapatkan nilai CF Final untuk setiap penyakit.

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
│   │   ├── components/  # Komponen UI (Navbar, Card, dll)
│   │   ├── pages/       # Halaman (Dashboard, Konsultasi, Hasil)
│   │   └── services/    # Koneksi ke Backend API
└── README.md        # Dokumentasi ini
```

---
*Dibuat untuk memenuhi tugas Sistem Pakar Mata Kuliah RSBP Teknik Informatika ITS 2025/2026.*