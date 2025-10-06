# Renart Jewelry - Case Study

Premium mücevher koleksiyonu için modern web uygulaması.

## 🌐 Demo

- **Frontend**: [https://renartglobal.netlify.app](https://renartglobal.netlify.app) (Netlify)
- **Backend API**: [https://renart-backend-tp1s.onrender.com](https://renart-backend-tp1s.onrender.com) (Render)

## 🛠️ Tech Stack

**Frontend**: React, TypeScript, Tailwind CSS, Swiper.js  
**Backend**: Node.js, Express, TypeScript  
**Deployment**: Netlify + Render  
**Other**: Docker, Real-time Gold Price API

## ✨ Özellikler

- Modern responsive tasarım
- Ürün arama ve sıralama
- Gerçek zamanlı altın fiyatları
- Metal renk seçenekleri (sarı/beyaz/rose)
- Horizontal carousel görünüm

## 🚀 Local Development

```bash
git clone https://github.com/ykdid/renart-case-study.git
cd renart-case-study

# Backend
cd server && npm install && npm run dev

# Frontend (yeni terminal)
cd client && npm install && npm run dev
```

## 🌐 Deployment

**Frontend (Netlify)**:
- Build command: `npm run build`
- Publish directory: `dist`
- Auto-deploy from GitHub

**Backend (Render)**:
- Build command: `npm run build`
- Start command: `node dist/index.js`
- Environment variables gerekli

## 👨‍💻 Geliştirici

**Yusuf Kaya**  
Bu proje Renart Jewelry için case study amacıyla geliştirilmiştir.