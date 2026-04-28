# 📊 Tracer Alumni Dashboard - Big Data Management

Aplikasi sistem pelacakan alumni berbasis web yang dirancang untuk menangani database skala besar (90.000+ data alumni) dengan performa yang dioptimasi.

## 🚀 Fitur Utama
- **High Performance Table**: Optimasi rendering untuk database 90.000 alumni menggunakan teknik *client-side pagination*.
- **Smart Tracking**: Pencarian instan berdasarkan Nama Alumni atau Instansi tempat bekerja.
- **Data Slide**: Fitur navigasi per halaman (50, 100, hingga 500 data per slide).
- **Secure Authentication**: Sistem login terproteksi untuk akses dashboard admin.
- **Dark Mode UI**: Antarmuka modern yang nyaman di mata untuk penggunaan jangka panjang.

## 🛠️ Teknologi yang Digunakan
- **Framework**: Next.js 14
- **Library**: React.js (Hooks: useState, useEffect)
- **Styling**: Inline CSS & JSX Styling (Zero external CSS for portability)
- **Data Source**: Local API Routes & JSON Database


## 🧪 Rencana & Hasil Pengujian (Manual Testing)

Pengujian dilakukan untuk memastikan sistem stabil saat menangani 90.000 data dan fungsi otentikasi berjalan benar.

| ID | Skenario Pengujian | Prosedur | Hasil Diharapkan | Status |
|----|--------------------|----------|------------------|--------|
| 01 | **Login Auth** | Input user/pass salah | Muncul alert "Username atau Password salah!" | ✅ Pass |
| 02 | **Login Auth** | Input user/pass benar | Dialihkan ke halaman `/dashboard` | ✅ Pass |
| 03 | **Security** | Akses `/dashboard` tanpa login | Otomatis ditendang balik ke `/login` | ✅ Pass |
| 04 | **Big Data Load** | Memuat 90.000 data | Halaman tidak crash, muncul loading spinner | ✅ Pass |
| 05 | **Pagination** | Klik tombol "Selanjutnya" | Data slide ke-2 (nomor 51-100) muncul instan | ✅ Pass |
| 06 | **Pencarian** | Ketik nama alumni di search bar | Tabel memfilter data secara *real-time* | ✅ Pass |
| 07 | **Logout** | Klik tombol Logout | Session terhapus dan kembali ke halaman login | ✅ Pass |

## 📈 Analisis Performa
- **Data Handling**: Menggunakan metode `.slice()` pada array 90.000 data menghasilkan *latency* kurang dari 100ms untuk setiap perpindahan halaman.
- **Memory Footprint**: RAM browser tetap stabil karena DOM hanya merender 50 baris data dalam satu waktu (tidak merender 90.000 baris sekaligus).
