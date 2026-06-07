<div align="center">

<img src="https://img.shields.io/badge/Abhaya-Women%20Safety%20Platform-ff4d6d?style=for-the-badge&logo=shield&logoColor=white" />

# 🛡️ ABHAYA
### *Because Every Woman Deserves to Feel Safe*

<p align="center">
  <img src="https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB" />
  <img src="https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=white" />
  <img src="https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white" />
  <img src="https://img.shields.io/badge/Groq_AI-FF6B35?style=for-the-badge&logo=openai&logoColor=white" />
  <img src="https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black" />
</p>

<p align="center">
  <img src="https://img.shields.io/github/stars/tharunika-19/abhaya-webapp?style=social" />
  <img src="https://img.shields.io/github/forks/tharunika-19/abhaya-webapp?style=social" />
  <img src="https://img.shields.io/badge/Status-Live-brightgreen?style=flat-square" />
  <img src="https://img.shields.io/badge/Mobile-Responsive-blue?style=flat-square" />
</p>

---

> **"Abhaya"** (अभया) — Sanskrit for *fearlessness*.  
> A real-time women safety web app built for emergencies, awareness, and empowerment.

[🚀 Live Demo]( https://abhaya-webapp.vercel.app) · [📸 Screenshots](#screenshots) · [🛠️ Features](#features) · [⚙️ Setup](#setup)

</div>

---

## ✨ What is Abhaya?

Abhaya is a **full-stack women safety platform** designed for real emergencies and everyday awareness. Built as a second-year CS student's portfolio project, it packs production-level features:

- 🔴 One-tap **SOS** that silently sends your GPS location to ALL saved contacts via WhatsApp
- 🤖 An **AI Safety Chatbot** (powered by Groq + Llama 3.1) that answers emergency questions instantly
- 📚 A **Safety Learning Hub** with Indian women's laws, self-defense tips & interactive flashcards
- ⚡ **Quick Exit** — disguises the app as a calculator in one tap

---

## 🔥 Features

### 🚨 Emergency Tools

| Feature | Description |
|--------|-------------|
| 🔴 **SOS Button** | Silently captures live GPS → sends WhatsApp alert to ALL contacts at once |
| 📍 **My Location** | Share real-time location link to all saved contacts instantly |
| 📞 **Fake Call** | Simulate an incoming call to escape unsafe situations |
| ⚡ **Quick Exit** | Instantly replaces app UI with a fake calculator screen |

### 👥 Contacts & Helplines

| Feature | Description |
|--------|-------------|
| 👤 **Personal Contacts** | Save trusted people with one-tap call & WhatsApp access |
| 📋 **Helpline Directory** | National emergency numbers (Police 100, Women Helpline 1091, etc.) with direct call |

### 📚 Safety Education

| Feature | Description |
|--------|-------------|
| 🤖 **AI Chatbot** | Groq-powered assistant — asks what to do in emergencies, legal rights, safety tips |
| 🃏 **Flashcards** | Interactive flip cards on Indian women safety laws (POCSO, IPC 354, etc.) |
| 📖 **Safety Hub** | Cyber safety, travel tips, self-defense basics all in one place |
| ✅ **Travel Checklist** | Pre-trip safety checklist so nothing is missed |

### 📱 UX & Design

| Feature | Description |
|--------|-------------|
| 🌙 **Night Mode** | Dims screen for dark areas — stay discreet |
| 📱 **Mobile Responsive** | Full bottom navigation layout built for phones first |

---

## 🖥️ Tech Stack

```
Frontend      → React + Vite
Styling       → Tailwind CSS + Lucide React Icons
AI            → Groq API (Llama 3.1 8B Instant)
Location      → Browser Geolocation API
Alerts        → WhatsApp Deep Linking (wa.me)
Calls         → tel: URI scheme
Version Ctrl  → Git + GitHub
```

---

## 📸 Screenshots

> *(Add screenshots here — SOS page, Chatbot, Safety Hub, Mobile view)*
><img width="1904" height="954" alt="image" src="https://github.com/user-attachments/assets/beabeeff-c7f3-4c10-bbec-87a4c6e3a0bd" />

><img width="1894" height="938" alt="image" src="https://github.com/user-attachments/assets/67e8e36a-4622-4282-ae54-85b7efa1809d" />

><img width="1880" height="959" alt="image" src="https://github.com/user-attachments/assets/116fc548-b9fc-479b-92f9-a946bce7cd83" />

><img width="1906" height="973" alt="image" src="https://github.com/user-attachments/assets/11acdb0c-ac92-4a5e-b56a-3102e9d45896" />


---

## ⚙️ Setup & Run Locally

### Prerequisites
- Node.js v18+
- A free [Groq API Key](https://console.groq.com)

### Steps

```bash
# 1. Clone the repo
git clone https://github.com/tharunika-19/abhaya-webapp.git
cd abhaya-webapp

# 2. Install dependencies
npm install

# 3. Add your Groq API key
# Create a .env file in root:
echo "VITE_GROQ_API_KEY=your_api_key_here" > .env

# 4. Start the dev server
npm run dev
```

Open `http://localhost:5173` — you're in! 🎉

---

## 🌐 Deploy on Vercel

```bash
npm run build
# Then drag the /dist folder to vercel.com OR connect your GitHub repo
```

> ⚠️ Don't forget to add `VITE_GROQ_API_KEY` in your Vercel environment variables!

---

## 📁 Project Structure

```
abhaya-webapp/
├── public/
├── src/
│   ├── components/
│   │   ├── SOSButton.jsx        # Emergency SOS
│   │   ├── FakeCall.jsx         # Fake call simulator
│   │   ├── Chatbot.jsx          # AI safety assistant
│   │   ├── Contacts.jsx         # Personal + helplines
│   │   ├── SafetyHub.jsx        # Laws, tips, self defense
│   │   ├── Flashcards.jsx       # Interactive law cards
│   │   └── TravelChecklist.jsx  # Pre-trip checklist
│   ├── App.jsx
│   └── main.jsx
├── .env                         # VITE_GROQ_API_KEY (gitignored)
├── tailwind.config.js
├── vite.config.js
└── package.json
```

---

## 🧠 What I Learned Building This

This was my **first-ever React project** — built from absolute zero. Here's what I learned along the way:

- ⚛️ React fundamentals — `useState`, `useEffect`, components, props
- 🎨 Tailwind CSS utility-first styling
- 🔌 REST API integration with `fetch` + Authorization headers
- 📡 Browser Geolocation API for real GPS
- 🔗 WhatsApp deep linking (`wa.me`) for real emergency alerts
- 🐛 Reading & fixing JSX syntax errors from the console
- 🌍 Git workflow — commit, push, recover from mistakes
- 📱 Mobile-first responsive design with CSS media queries

---

## 🚀 Future Improvements

- [ ] Backend with user authentication
- [ ] Push notifications for SOS alerts
- [ ] Shake-to-SOS (motion sensor trigger)
- [ ] Live location tracking on map (Google Maps API)
- [ ] Offline mode with service workers
- [ ] Hindi / Telugu language support

---

## 👩‍💻 Author

**Tharunika** — 2nd Year B.Tech CS/AIML Student  
📍 Hyderabad, India  
🎯 Targeting FAANG+ | Building real things to get there

[![GitHub](https://img.shields.io/badge/GitHub-tharunika--19-181717?style=for-the-badge&logo=github)](https://github.com/tharunika-19/abhaya-webapp)

---

## ⭐ Support

If this project helped you or inspired you — drop a ⭐ on the repo!  
Every star motivates a student builder. 🙏

---

<div align="center">

**Built with ❤️ and a lot of debugging sessions**

*"Any sufficiently determined student with a GitHub account can build something meaningful."*

</div>
