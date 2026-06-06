# 🧠 AI Optimizer — Optimization Algorithm Simulator

<div align="center">

![AI Optimizer Banner](https://img.shields.io/badge/AI%20Optimizer-Simulator%20Platform-cyan?style=for-the-badge&logo=data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0IiBmaWxsPSJub25lIiBzdHJva2U9ImN1cnJlbnRDb2xvciIgc3Ryb2tlLXdpZHRoPSIyIj48cmVjdCB4PSI0IiB5PSI0IiB3aWR0aD0iMTYiIGhlaWdodD0iMTYiIHJ4PSIyIiByeT0iMiIvPjxyZWN0IHg9IjkiIHk9IjkiIHdpZHRoPSI2IiBoZWlnaHQ9IjYiLz48bGluZSB4MT0iOSIgeTE9IjEiIHgyPSI5IiB5Mj0iNCIvPjxsaW5lIHgxPSIxNSIgeTE9IjEiIHgyPSIxNSIgeTI9IjQiLz48bGluZSB4MT0iOSIgeTE9IjIwIiB4Mj0iOSIgeTI9IjIzIi8+PGxpbmUgeDE9IjE1IiB5MT0iMjAiIHgyPSIxNSIgeTI9IjIzIi8+PGxpbmUgeDE9IjIwIiB5MT0iOSIgeDI9IjIzIiB5Mj0iOSIvPjxsaW5lIHgxPSIyMCIgeTE9IjE1IiB4Mj0iMjMiIHkyPSIxNSIvPjxsaW5lIHgxPSIxIiB5MT0iOSIgeDI9IjQiIHkyPSI5Ii8+PGxpbmUgeDE9IjEiIHkxPSIxNSIgeDI9IjQiIHkyPSIxNSIvPjwvc3ZnPg==)

[![Python](https://img.shields.io/badge/Python-3.11-3776AB?style=flat-square&logo=python&logoColor=white)](https://python.org)
[![Flask](https://img.shields.io/badge/Flask-3.0-000000?style=flat-square&logo=flask&logoColor=white)](https://flask.palletsprojects.com)
[![React](https://img.shields.io/badge/React-18.2-61DAFB?style=flat-square&logo=react&logoColor=black)](https://reactjs.org)
[![Vite](https://img.shields.io/badge/Vite-5.0-646CFF?style=flat-square&logo=vite&logoColor=white)](https://vitejs.dev)
[![TailwindCSS](https://img.shields.io/badge/TailwindCSS-3.4-06B6D4?style=flat-square&logo=tailwindcss&logoColor=white)](https://tailwindcss.com)
[![Docker](https://img.shields.io/badge/Docker-Ready-2496ED?style=flat-square&logo=docker&logoColor=white)](https://docker.com)

**Platform simulasi interaktif untuk memvisualisasikan dan membandingkan algoritma optimasi metaheuristik secara real-time.**

[🚀 Live Demo](#-live-demo) • [📖 Dokumentasi](#-deskripsi-proyek) • [⚙️ Instalasi](#%EF%B8%8F-instalasi--menjalankan-program) • [🗂️ Struktur Proyek](#%EF%B8%8F-struktur-proyek)

</div>

---

## 📖 Deskripsi Proyek

**AI Optimizer** adalah platform simulasi berbasis web yang memungkinkan pengguna untuk menjalankan, mengonfigurasi, dan memvisualisasikan tiga algoritma optimasi metaheuristik secara interaktif. Semua algoritma diuji menggunakan **fungsi benchmark Rastrigin** — fungsi non-convex multi-modal yang sering digunakan untuk menguji performa algoritma optimasi global.

### ✨ Fitur Utama

| Fitur | Deskripsi |
|---|---|
| 🏔️ **Hill Climbing** | Tiga varian: Simple Ascent, Steepest-Ascent, dan Stochastic |
| 🔥 **Simulated Annealing** | Dengan jadwal pendinginan eksponensial, kontrol suhu awal & cooling rate |
| 🧬 **Genetic Algorithm** | Kontrol lengkap: ukuran populasi, generasi, mutasi, dan crossover rate |
| 📈 **Convergence Chart** | Grafik konvergensi interaktif menggunakan Chart.js |
| 🌐 **3D Landscape** | Visualisasi 3D topologi fungsi Rastrigin menggunakan Plotly.js |
| 📊 **Statistik Real-Time** | Iterasi, nilai fitness terbaik, dan waktu eksekusi (ms) |
| ⚙️ **System Config** | Toggle render 3D, auto-refresh chart, dan konfigurasi random seed |
| 📱 **Responsive UI** | Desain mobile-friendly dengan sidebar collapsible |

### 🎯 Fungsi Benchmark — Rastrigin

Fungsi Rastrigin adalah fungsi uji optimasi klasik yang sangat menantang karena memiliki banyak minima lokal:

$$f(\mathbf{x}) = An + \sum_{i=1}^{n} \left[ x_i^2 - A\cos(2\pi x_i) \right]$$

- **Domain**: $x_i \in [-5.12, 5.12]$
- **Global minimum**: $f(\mathbf{0}) = 0$
- **Dimensi**: 2D (untuk visualisasi 3D)

---

## 🛠️ Teknologi yang Digunakan

### Backend
| Teknologi | Versi | Fungsi |
|---|---|---|
| **Python** | 3.11 | Runtime utama backend |
| **Flask** | 3.0.0 | REST API framework |
| **Flask-CORS** | 4.0.0 | Cross-Origin Resource Sharing |
| **NumPy** | 1.26.2 | Komputasi numerik & array |
| **SciPy** | 1.11.4 | Fungsi matematika saintifik |
| **Gunicorn** | 21.2.0 | Production WSGI server |

### Frontend
| Teknologi | Versi | Fungsi |
|---|---|---|
| **React** | 18.2 | UI component library |
| **Vite** | 5.0 | Build tool & dev server |
| **TailwindCSS** | 3.4 | Utility-first CSS framework |
| **Plotly.js** | 2.27 | Visualisasi 3D interaktif |
| **Chart.js** | 4.4 | Grafik konvergensi 2D |
| **Axios** | 1.6 | HTTP client untuk REST API |
| **React Router DOM** | 7.17 | Client-side routing |
| **Lucide React** | Latest | Ikon UI modern |

### DevOps & Deployment
| Teknologi | Fungsi |
|---|---|
| **Docker** | Containerisasi multi-stage build |
| **Hugging Face Spaces** | Hosting & deployment gratis |

---

## 🗂️ Struktur Proyek

```
optimization-simulator/
├── 📁 backend/
│   ├── app.py                    # Flask REST API & static file serving
│   ├── requirements.txt          # Python dependencies
│   ├── 📁 algorithms/
│   │   ├── hill_climbing.py      # HC: Simple, Steepest-Ascent, Stochastic
│   │   ├── simulated_annealing.py# SA: Exponential cooling schedule
│   │   └── genetic_algorithm.py  # GA: Selection, crossover, mutasi
│   └── 📁 problems/
│       └── rastrigin.py          # Fungsi benchmark Rastrigin + surface generator
│
├── 📁 frontend/
│   ├── index.html
│   ├── vite.config.js
│   ├── tailwind.config.js
│   └── 📁 src/
│       ├── App.jsx               # Komponen utama, state management, form params
│       ├── main.jsx
│       └── 📁 components/
│           ├── ConvergenceChart.jsx  # Grafik konvergensi (Chart.js)
│           ├── Plotly3D.jsx          # Visualisasi 3D Rastrigin (Plotly)
│           └── Layout.jsx            # Layout wrapper
│
├── Dockerfile                    # Multi-stage build (Node → Python)
├── .dockerignore
└── README.md
```

---

## ⚙️ Instalasi & Menjalankan Program

### Prasyarat
Pastikan sudah terinstal:
- **Python** ≥ 3.11 → [Download](https://python.org/downloads/)
- **Node.js** ≥ 18 + **npm** → [Download](https://nodejs.org/)
- **Git** → [Download](https://git-scm.com/)

---

### 🔧 Cara 1: Menjalankan Secara Lokal (Development)

#### 1. Clone Repository
```bash
git clone https://github.com/hasbibaihaqi/optimization-simulator2.git
cd optimization-simulator2
```

#### 2. Setup Backend (Python/Flask)

```bash
# Masuk ke direktori backend
cd backend

# Buat dan aktifkan virtual environment
python -m venv venv

# Windows
venv\Scripts\activate

# macOS/Linux
source venv/bin/activate

# Install dependencies
pip install -r requirements.txt

# Jalankan Flask development server
python app.py
```

> ✅ Backend akan berjalan di: **http://localhost:5000**

#### 3. Setup Frontend (React/Vite)

Buka terminal baru (jangan tutup terminal backend):

```bash
# Masuk ke direktori frontend
cd frontend

# Install dependencies
npm install

# Jalankan Vite development server
npm run dev
```

> ✅ Frontend akan berjalan di: **http://localhost:5173**

#### 4. Buka Aplikasi

Buka browser dan akses: **http://localhost:5173**

---

### 🐳 Cara 2: Menggunakan Docker

Pastikan Docker sudah terinstal dan berjalan.

```bash
# Clone repository (jika belum)
git clone https://github.com/hasbibaihaqi/optimization-simulator2.git
cd optimization-simulator2

# Build Docker image
docker build -t ai-optimizer .

# Jalankan container
docker run -p 7860:7860 ai-optimizer
```

> ✅ Aplikasi akan berjalan di: **http://localhost:7860**

Docker menggunakan **multi-stage build**:
1. **Stage 1** — Node.js Alpine: build React frontend (`npm run build`)
2. **Stage 2** — Python Slim: jalankan Flask + serve static files via Gunicorn

---

### 📦 API Endpoints

Backend menyediakan REST API berikut:

| Method | Endpoint | Deskripsi |
|--------|----------|-----------|
| `POST` | `/api/optimize/hill-climbing` | Jalankan Hill Climbing |
| `POST` | `/api/optimize/simulated-annealing` | Jalankan Simulated Annealing |
| `POST` | `/api/optimize/genetic-algorithm` | Jalankan Genetic Algorithm |
| `GET` | `/health` | Cek status server |

#### Contoh Request — Hill Climbing
```json
POST /api/optimize/hill-climbing
{
  "variant": "simple",
  "max_iter": 500,
  "step_size": 0.1,
  "random_seed": 42
}
```

#### Contoh Request — Simulated Annealing
```json
POST /api/optimize/simulated-annealing
{
  "t0": 100,
  "cooling_rate": 0.95,
  "random_seed": 42
}
```

#### Contoh Request — Genetic Algorithm
```json
POST /api/optimize/genetic-algorithm
{
  "pop_size": 50,
  "generations": 100,
  "mutation_rate": 0.1,
  "crossover_rate": 0.8,
  "random_seed": 42
}
```

#### Format Response (semua algoritma)
```json
{
  "algorithm": "Hill Climbing",
  "best_position": [x, y],
  "best_energy": 0.0,
  "history": [...],
  "execution_time": 0.012,
  "surface": { "x": [...], "y": [...], "z": [...] }
}
```

---

## 🚀 Live Demo

> 🌐 **Aplikasi di-deploy di Hugging Face Spaces:**
>
> **[👉 Buka Demo Live]( http://optimizationsimulator.my.id )**

---

## 📸 Tampilan Aplikasi

### Dashboard Utama
- Sidebar navigasi dengan 3 algoritma: Hill Climbing, Simulated Annealing, Genetic Algorithm
- Panel konfigurasi hyperparameter di kiri
- Visualisasi konvergensi + 3D landscape di kanan
- Kartu statistik: iterasi, best fitness, execution time, active algorithm

### Fitur Sistem
- **Toggle 3D Render** — matikan visualisasi 3D untuk performa lebih ringan
- **Auto Refresh Chart** — otomatis reset chart saat parameter diubah
- **Random Seed** — seed tetap (`42`) untuk hasil yang reproducible

---

## 🤝 Kontribusi

Kontribusi, bug report, dan feature request sangat diterima!

1. Fork repository ini
2. Buat branch fitur: `git checkout -b feature/nama-fitur`
3. Commit perubahan: `git commit -m 'feat: tambah fitur X'`
4. Push ke branch: `git push origin feature/nama-fitur`
5. Buat Pull Request

---

## 📄 Lisensi

Proyek ini dibuat untuk keperluan akademik mata kuliah **Kecerdasan Buatan** — Semester 4.

---

<div align="center">

**Dibuat dengan ❤️ menggunakan React + Flask**

[![Hugging Face](https://hasbi09-optimization-simulator.hf.space/)

</div>
