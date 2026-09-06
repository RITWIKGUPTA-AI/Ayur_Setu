# AyurSetu Fullstack Deployment Guide

AyurSetu is an industry-academia bridge platform built with **React, TypeScript, Tailwind CSS, Node.js, and Express**.

---

## 🚀 1. Local Hosting (Quick Start)

### Option A: Development Mode (Hot Reload for Frontend & Backend)
Starts the backend on port `5001` and the Vite frontend on `5173` with automatic proxying:
```bash
npm run dev
```
* **Frontend:** [http://localhost:5173](http://localhost:5173)
* **Backend API:** [http://localhost:5001/api/health](http://localhost:5001/api/health)

### Option B: Production Unified Server (Single Port)
Builds both client and server, then hosts everything together from port `5001`:
```bash
npm run build
npm start
```
* **Full Application:** [http://localhost:5001](http://localhost:5001)

---

## ☁️ 2. Free Cloud Hosting

### Method 1: Render.com (Recommended - 1-Click Monorepo)
1. Push your changes to GitHub:
   ```bash
   git add .
   git commit -m "Add fullstack backend and deployment config"
   git push origin main
   ```
2. Log in to [Render.com](https://render.com) and click **New + > Web Service**.
3. Select your repository `AryanChauhan-26/AyurSetu`.
4. Render will auto-detect `render.yaml`, or use these settings:
   - **Environment:** `Node`
   - **Build Command:** `npm install && npm --prefix server install && npm run build`
   - **Start Command:** `npm start`
5. Click **Deploy Web Service**! You'll receive a live HTTPS URL (e.g. `https://ayursetu.onrender.com`).

---

### Method 2: Decoupled Hosting (Vercel + Render / Railway)

#### Frontend on Vercel:
1. Import repository on [Vercel](https://vercel.com).
2. Framework Preset: `Vite`.
3. Set Environment Variable:
   - `VITE_API_URL` = your live backend URL (e.g. `https://ayursetu-api.onrender.com/api`).
4. Click **Deploy**.

#### Backend on Render:
1. Create a Web Service pointing to the root repository.
2. Root Directory: `server`.
3. Build Command: `npm install && npm run build`.
4. Start Command: `npm start`.

---

## 🐳 3. Docker Deployment

To build and run the Docker container locally or on a VPS:
```bash
docker build -t ayursetu:latest .
docker run -p 5001:5001 ayursetu:latest
```
Visit [http://localhost:5001](http://localhost:5001).
