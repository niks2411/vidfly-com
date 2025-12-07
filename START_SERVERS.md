# 🚀 How to Start Your Servers

## The Error You're Seeing

`ERR_CONNECTION_REFUSED` on `localhost:5173` means the **frontend server is not running**.

## ✅ Solution: Start Both Servers

You need **TWO terminal windows** running simultaneously:

### Terminal 1: Backend Server

```bash
cd backend
npm run dev
```

**Wait for this message:**
```
MongoDB connected
Server running on port 5000
```

### Terminal 2: Frontend Server

```bash
cd frontend
npm run dev
```

**Wait for this message:**
```
VITE v5.x.x  ready in xxx ms

➜  Local:   http://localhost:5173/
```

## ✅ Once Both Are Running

1. **Backend** should show: `Server running on port 5000`
2. **Frontend** should show: `Local: http://localhost:5173/`

Then:
- Go to `http://localhost:5173` in your browser
- Create a campaign
- Click "Continue" → Payment checkout should work!

## 🔍 Quick Check

**Is backend running?**
- Open: `http://localhost:5000/health`
- Should show: `{"status":"ok"}`

**Is frontend running?**
- Open: `http://localhost:5173`
- Should show your Vidfly homepage

## ⚠️ Common Issues

### "Port already in use"
**Solution:** 
- Find and close the process using that port
- Or change the port in the config

### "Cannot find module"
**Solution:**
```bash
cd backend
npm install

cd ../frontend
npm install
```

### "MongoDB connection error"
**Solution:**
- Make sure MongoDB is running
- Check `MONGODB_URI` in `.env` file

---

**Start both servers, then try the payment flow again!** 🎉

