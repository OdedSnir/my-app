# 🧠 CodeBlocks: Real-Time Collaborative Coding Platform

CodeBlocks is a real-time web platform where **mentors** and **students** collaborate on code blocks. Students solve problems while mentors monitor their progress live. The system uses **FastAPI** for the backend, **React (Vite)** for the frontend, **WebSockets** for real-time updates, and **MongoDB Atlas** for data storage.

---

## 🔧 Tech Stack

- **Frontend**: React + Vite + PrismJS + WebSockets
- **Backend**: FastAPI + Uvicorn + WebSockets + Motor (MongoDB)
- **Database**: MongoDB Atlas
- **Deployment**: EC2, `serve` for frontend, no Nginx

---

## 🚀 Full Deployment Guide via SSH (AWS EC2)

### 🛠️  EC2 Setup

- Launch an **Ubuntu EC2 instance**
- Allocate an **Elastic IP**
- Attach the Elastic IP to your instance
- Add **security group rules**:
  - Port `22` (SSH)
  - Port `80` (HTTP)
  - Port `8000` (backend)
  - Port `3000` (frontend)

---

### 🖥️ 2. SSH into your instance

```bash
ssh -i /path/to/your-key.pem ubuntu@YOUR_EC2_PUBLIC_IP
```

###🌐 3. Set Up the Frontend
Clone your frontend repo & enter the folder:

```bash
git clone https://github.com/OdedSnir/my-app
cd frontend-folder
```

Install Node.js & npm (if not installed):

```bash
sudo apt update
sudo apt install nodejs npm -y
```
Update .env file

```bash
nano .env
```
Paste in:
VITE_API_URL=http://YOUR_EC2_PUBLIC_IP:8000 || 13.49.146.156 at this time
VITE_WS_URL=ws://YOUR_EC2_PUBLIC_IP:8000/ws

Install dependencies and build:
```bash
npm install
npm run build
```

Serve the frontend:
```bash
sudo npm install -g serve
serve -s dist -l tcp://0.0.0.0:3000

```
### 💡 Keap in mind tha you nead to run backend to get data...