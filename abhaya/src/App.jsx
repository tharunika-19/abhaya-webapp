import { useState, useEffect } from "react"
import { Shield, Phone, MapPin, Bot, Map, BookOpen, Settings, AlertTriangle } from "lucide-react"

const getGreeting = () => {
  const hour = new Date().getHours()
  if (hour < 12) return { text: "Good Morning", sub: "Start your day safe and fearless 🌅" }
  if (hour < 17) return { text: "Good Afternoon", sub: "Stay aware, stay strong ☀️" }
  if (hour < 21) return { text: "Good Evening", sub: "You are never alone 🌆" }
  return { text: "Stay Safe Tonight", sub: "Abhaya is always with you 🌙" }
}

const tips = [
  "Always share your live location with a trusted contact when traveling alone.",
  "Save emergency numbers on speed dial — 112 works anywhere in India.",
  "Trust your instincts. If something feels wrong, it probably is.",
  "Keep your phone charged when stepping out at night.",
  "Sit near the driver in autos — avoid isolated back seats at night.",
]

const navItems = [
  { id: "home", icon: Shield, label: "Home" },
  { id: "contacts", icon: Phone, label: "Contacts" },
  { id: "learn", icon: BookOpen, label: "Learn" },
  { id: "chatbot", icon: Bot, label: "AI Chatbot" },
  { id: "more", icon: Settings, label: "More" },
]

const quickActions = [
  { icon: <Phone style={{ width: 28, height: 28 }} />, label: "Fake Call", sub: "Escape awkward situations", color: "#48bb78", glow: "rgba(72,187,120,0.35)", bg: "linear-gradient(135deg, rgba(72,187,120,0.12), rgba(72,187,120,0.04))", border: "rgba(72,187,120,0.3)" },
  { icon: <MapPin style={{ width: 28, height: 28 }} />, label: "My Location", sub: "Share live location instantly", color: "#63b3ed", glow: "rgba(99,179,237,0.35)", bg: "linear-gradient(135deg, rgba(99,179,237,0.12), rgba(99,179,237,0.04))", border: "rgba(99,179,237,0.3)" },
  { icon: <Bot style={{ width: 28, height: 28 }} />, label: "AI Assistant", sub: "Safety guidance anytime", color: "#b794f4", glow: "rgba(183,148,244,0.35)", bg: "linear-gradient(135deg, rgba(183,148,244,0.12), rgba(183,148,244,0.04))", border: "rgba(183,148,244,0.3)" },
  { icon: <Map style={{ width: 28, height: 28 }} />, label: "Safe Map", sub: "View unsafe zones near you", color: "#f6ad55", glow: "rgba(246,173,85,0.35)", bg: "linear-gradient(135deg, rgba(246,173,85,0.12), rgba(246,173,85,0.04))", border: "rgba(246,173,85,0.3)" },
]

const helplines = [
  { name: "National Emergency", number: "112", desc: "Works anywhere in India", color: "#fc8181", glow: "rgba(252,129,129,0.4)" },
  { name: "Women Helpline", number: "1091", desc: "24/7 women safety helpline", color: "#f6ad55", glow: "rgba(246,173,85,0.4)" },
  { name: "Police", number: "100", desc: "Nearest police station", color: "#63b3ed", glow: "rgba(99,179,237,0.4)" },
]

export default function App() {
  const [activeTab, setActiveTab] = useState("home")
  const [tipIndex, setTipIndex] = useState(0)
  const [sosPressed, setSosPressed] = useState(false)
  const [personalContacts, setPersonalContacts] = useState([])
  const [learnTab, setLearnTab] = useState("Safety Hub")
  const [flashcardIndex, setFlashcardIndex] = useState(0)
  const [flipped, setFlipped] = useState(false)
  const [messages, setMessages] = useState([])
  const [chatInput, setChatInput] = useState("")
  const [aiTyping, setAiTyping] = useState(false)
  const [showFakeCall, setShowFakeCall] = useState(false)
  const [nightMode, setNightMode] = useState(false)
  const [checklist, setChecklist] = useState([
    { label: "Share my live location with a trusted contact", done: false },
    { label: "Save emergency contacts on Abhaya", done: false },
    { label: "Verify cab number plate matches app", done: false },
    { label: "Keep phone fully charged", done: false },
    { label: "Enable GPS on my phone", done: false },
    { label: "Note down driver name and cab number", done: false },
    { label: "Inform someone about my destination", done: false },
    { label: "Keep power bank charged", done: false },
  ])

  const greeting = getGreeting()

  useEffect(() => {
    const interval = setInterval(() => {
      setTipIndex(prev => (prev + 1) % tips.length)
    }, 4000)
    return () => clearInterval(interval)
  }, [])

  const handleSend = async (text) => {
    if (!text.trim()) return
    setChatInput("")
    const userMsg = { role: "user", content: text }
    setMessages(prev => [...prev, userMsg])
    setAiTyping(true)
    try {
      const res = await fetch("https://api.groq.com/openai/v1/chat/completions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${import.meta.env.VITE_GROQ_API_KEY}`,
        },
        body: JSON.stringify({
          model: "llama-3.1-8b-instant",
          messages: [
            {
              role: "system",
              content: `You are Abhaya, a calm and knowledgeable AI safety assistant for women in India. You help women with what to do in dangerous situations, women safety laws in India, emergency helpline numbers, cyber safety, travel safety tips, and self defense basics. Always be calm, clear and supportive. Keep responses concise and practical. Important helplines: 112 (emergency), 1091 (women), 100 (police), 1930 (cyber crime).`
            },
            ...messages,
            userMsg,
          ],
          max_tokens: 500,
        })
      })
      const data = await res.json()
      const reply = data.choices?.[0]?.message?.content || "Sorry, I couldn't respond. Please try again."
      setMessages(prev => [...prev, { role: "assistant", content: reply }])
    } catch {
      setMessages(prev => [...prev, { role: "assistant", content: "Connection error. Please check your internet and try again." }])
    }
    setAiTyping(false)
  }

  const flashcards = [
    { question: "What is IPC Section 354?", answer: "Assault or criminal force against a woman to outrage her modesty. Punishable with up to 2 years imprisonment." },
    { question: "Which helpline number works anywhere in India for emergencies?", answer: "112 — the National Emergency Number. Works even without a SIM card or balance." },
    { question: "What should you shout in public if attacked?", answer: "Shout FIRE instead of HELP — people respond faster to fire alerts in crowded places." },
    { question: "What is the POCSO Act?", answer: "Protection of Children from Sexual Offences Act 2012 — protects anyone under 18 from sexual abuse." },
    { question: "Which website do you visit to report cyber crime in India?", answer: "cybercrime.gov.in — or call 1930, the National Cyber Crime Helpline." },
    { question: "What is IPC Section 509?", answer: "Words, gestures or acts intended to insult a woman's modesty — includes catcalling and eve-teasing." },
    { question: "What is the weakest point of an attacker's grip on your wrist?", answer: "The thumb — rotate your arm toward their thumb to break free from any wrist grab." },
    { question: "What is the Women Helpline number in India?", answer: "1091 — available 24/7 specifically for women's safety emergencies." },
  ]

  const handleSOS = () => {
    if (personalContacts.length === 0) {
      alert("No emergency contacts saved! Please add contacts first.")
      return
    }
    navigator.geolocation.getCurrentPosition(pos => {
      const { latitude, longitude } = pos.coords
      const locationUrl = "https://maps.google.com/?q=" + latitude + "," + longitude
      const message = "EMERGENCY! I may be in danger. Please help me immediately! My location: " + locationUrl
      personalContacts.forEach((contact, i) => {
        setTimeout(() => {
          window.open("https://wa.me/91" + contact.phone + "?text=" + encodeURIComponent(message), "_blank")
        }, i * 1500)
      })
    }, () => {
      const message = "EMERGENCY! I may be in danger. Please help me immediately!"
      personalContacts.forEach((contact, i) => {
        setTimeout(() => {
          window.open("https://wa.me/91" + contact.phone + "?text=" + encodeURIComponent(message), "_blank")
        }, i * 1500)
      })
    })
  }

  const handleLocation = () => {
    if (personalContacts.length === 0) {
      alert("No emergency contacts saved! Please add contacts first.")
      return
    }
    navigator.geolocation.getCurrentPosition(pos => {
      const { latitude, longitude } = pos.coords
      const locationUrl = "https://maps.google.com/?q=" + latitude + "," + longitude
      const message = "Hi! I am sharing my live location with you. " + locationUrl
      personalContacts.forEach((contact, i) => {
        setTimeout(() => {
          window.open("https://wa.me/91" + contact.phone + "?text=" + encodeURIComponent(message), "_blank")
        }, i * 1500)
      })
    }, () => alert("Please allow location access!"))
  }

  return (
    <div style={{ background: "#080c14", minHeight: "100vh", color: "#fff", fontFamily: "'Inter', 'Segoe UI', sans-serif", filter: nightMode ? "brightness(0.5)" : "brightness(1)", transition: "filter 0.3s" }}>

      {/* Top Navbar */}
      <nav style={{ background: "rgba(8,12,20,0.95)", backdropFilter: "blur(12px)", borderBottom: "1px solid rgba(255,255,255,0.06)", padding: "0 48px", display: "flex", alignItems: "center", justifyContent: "space-between", height: 68, position: "sticky", top: 0, zIndex: 100 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <div style={{ width: 36, height: 36, borderRadius: 10, background: "linear-gradient(135deg, #c53030, #e53e3e)", display: "flex", alignItems: "center", justifyContent: "center", boxShadow: "0 0 16px rgba(229,62,62,0.5)" }}>
            <Shield style={{ width: 20, height: 20, color: "#fff" }} />
          </div>
          <div>
            <span style={{ fontSize: 18, fontWeight: 900, color: "#fff", letterSpacing: 4 }}>ABHAYA</span>
            <span style={{ fontSize: 11, color: "#4a5568", marginLeft: 10 }}>अभय — Be Fearless</span>
          </div>
        </div>
        <div className="nav-links" style={{ display: "flex", gap: 4 }}>
          {navItems.map(item => {
            const Icon = item.icon
            const isActive = activeTab === item.id
            return (
              <button key={item.id} onClick={() => setActiveTab(item.id)} style={{ background: isActive ? "linear-gradient(135deg, rgba(229,62,62,0.2), rgba(197,48,48,0.1))" : "transparent", border: isActive ? "1px solid rgba(229,62,62,0.35)" : "1px solid transparent", borderRadius: 10, padding: "8px 18px", color: isActive ? "#fc8181" : "#718096", cursor: "pointer", display: "flex", alignItems: "center", gap: 7, fontSize: 14, fontWeight: isActive ? 600 : 400, transition: "all 0.2s", boxShadow: isActive ? "0 0 12px rgba(229,62,62,0.2)" : "none", fontFamily: "Inter, sans-serif" }}>
                <Icon style={{ width: 15, height: 15 }} />
                {item.label}
              </button>
            )
          })}
        </div>
      </nav>

      {/* HOME PAGE */}
      {activeTab === "home" && (
        <div className="page-content" style={{ maxWidth: 1280, margin: "0 auto", padding: "40px 48px" }}>

          {/* Hero Card */}
          <div className="hero-card" style={{ background: "linear-gradient(135deg, #0f1923 0%, #111827 50%, #0f1923 100%)", border: "1px solid rgba(255,255,255,0.07)", borderRadius: 20, padding: "40px 48px", marginBottom: 36, display: "flex", alignItems: "center", justifyContent: "space-between", position: "relative", overflow: "hidden" }}>
            <div style={{ position: "absolute", top: -60, right: 200, width: 300, height: 300, background: "radial-gradient(circle, rgba(229,62,62,0.08) 0%, transparent 70%)", pointerEvents: "none" }} />

            <div className="hero-left" style={{ flex: 1 }}>
              <p style={{ color: "#4a5568", fontSize: 11, textTransform: "uppercase", letterSpacing: 3, marginBottom: 12 }}>Welcome back</p>
              <h1 style={{ fontSize: 38, fontWeight: 900, color: "#fff", marginBottom: 10, lineHeight: 1.2 }}>{greeting.text} 👋</h1>
              <p style={{ color: "#718096", fontSize: 15, marginBottom: 24 }}>{greeting.sub}</p>
              <div style={{ background: "rgba(229,62,62,0.06)", border: "1px solid rgba(229,62,62,0.15)", borderRadius: 10, padding: "12px 18px", display: "inline-flex", alignItems: "center", gap: 10, maxWidth: 480 }}>
                <div style={{ width: 8, height: 8, borderRadius: "50%", background: "#e53e3e", boxShadow: "0 0 8px rgba(229,62,62,0.8)", flexShrink: 0 }} />
                <span style={{ color: "#fc8181", fontSize: 13, lineHeight: 1.5 }}>{tips[tipIndex]}</span>
              </div>
            </div>

            <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 12 }}>
              <div className="sos-wrap" style={{ position: "relative", width: 180, height: 180, display: "flex", alignItems: "center", justifyContent: "center" }}>
                <div style={{ position: "absolute", inset: 0, borderRadius: "50%", border: "2px solid rgba(229,62,62,0.3)", animation: "ripple 2s ease-out infinite" }} />
                <div style={{ position: "absolute", inset: -16, borderRadius: "50%", border: "2px solid rgba(229,62,62,0.15)", animation: "ripple 2s ease-out infinite 0.5s" }} />
                <div style={{ position: "absolute", inset: -32, borderRadius: "50%", border: "1px solid rgba(229,62,62,0.08)", animation: "ripple 2s ease-out infinite 1s" }} />
                <div
                  className="sos-btn"
                  onClick={handleSOS}
                  onMouseDown={() => setSosPressed(true)}
                  onMouseUp={() => setSosPressed(false)}
                  onMouseLeave={() => setSosPressed(false)}
                  style={{ width: 160, height: 160, borderRadius: "50%", background: sosPressed ? "linear-gradient(135deg, #9b2c2c, #c53030)" : "linear-gradient(135deg, #c53030, #e53e3e, #fc4444)", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", cursor: "pointer", boxShadow: sosPressed ? "0 0 30px rgba(229,62,62,0.4)" : "0 0 50px rgba(229,62,62,0.6), 0 0 100px rgba(229,62,62,0.2)", border: "3px solid rgba(252,129,129,0.5)", transform: sosPressed ? "scale(0.94)" : "scale(1)", transition: "all 0.15s", position: "relative", zIndex: 1 }}
                >
                  <AlertTriangle style={{ width: 34, height: 34, color: "#fff", marginBottom: 4 }} />
                  <span style={{ fontSize: 24, fontWeight: 900, color: "#fff", letterSpacing: 4 }}>SOS</span>
                  <span style={{ fontSize: 10, color: "rgba(255,255,255,0.7)", marginTop: 2 }}>EMERGENCY</span>
                </div>
              </div>
              <p style={{ color: "#4a5568", fontSize: 12, textAlign: "center" }}>Silently sends location<br />to your emergency contacts</p>
            </div>
          </div>

          {/* Quick Actions */}
          <p style={{ color: "#4a5568", fontSize: 11, textTransform: "uppercase", letterSpacing: 3, marginBottom: 16 }}>Quick Actions</p>
          <div className="quick-grid" style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 16, marginBottom: 36 }}>
            {quickActions.map(item => (
              <div key={item.label}
                onClick={() => {
                  if (item.label === "AI Assistant") setActiveTab("chatbot")
                  if (item.label === "My Location") handleLocation()
                  if (item.label === "Fake Call") setShowFakeCall(true)
                  if (item.label === "Safe Map") setActiveTab("more")
                }}
                onMouseEnter={e => { e.currentTarget.style.transform = "translateY(-6px)"; e.currentTarget.style.boxShadow = "0 12px 32px " + item.glow; e.currentTarget.style.borderColor = item.color }}
                onMouseLeave={e => { e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.boxShadow = "none"; e.currentTarget.style.borderColor = item.border }}
                style={{ background: item.bg, border: "1px solid " + item.border, borderRadius: 16, padding: "28px 24px", cursor: "pointer", transition: "all 0.25s" }}>
                <div style={{ color: item.color, marginBottom: 16, filter: "drop-shadow(0 0 8px " + item.glow + ")" }}>{item.icon}</div>
                <p style={{ fontWeight: 700, fontSize: 16, color: "#fff", marginBottom: 6 }}>{item.label}</p>
                <p style={{ fontSize: 12, color: "#718096", lineHeight: 1.5 }}>{item.sub}</p>
              </div>
            ))}
          </div>

          {/* Emergency Helplines */}
          <p style={{ color: "#4a5568", fontSize: 11, textTransform: "uppercase", letterSpacing: 3, marginBottom: 16 }}>Emergency Helplines</p>
          <div className="helpline-grid" style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 16 }}>
            {helplines.map(h => (
              <div key={h.name} style={{ background: "linear-gradient(135deg, #0f1923, #111827)", border: "1px solid rgba(255,255,255,0.06)", borderRadius: 16, padding: "24px 28px", display: "flex", alignItems: "center", justifyContent: "space-between", transition: "border-color 0.2s" }}
                onMouseEnter={e => e.currentTarget.style.borderColor = "rgba(255,255,255,0.15)"}
                onMouseLeave={e => e.currentTarget.style.borderColor = "rgba(255,255,255,0.06)"}
              >
                <div>
                  <p style={{ fontWeight: 700, color: "#e2e8f0", fontSize: 15, marginBottom: 4 }}>{h.name}</p>
                  <p style={{ color: "#4a5568", fontSize: 12 }}>{h.desc}</p>
                </div>
                <a href={"tel:" + h.number}
                  onMouseEnter={e => { e.currentTarget.style.background = h.color; e.currentTarget.style.color = "#000" }}
                  onMouseLeave={e => { e.currentTarget.style.background = "transparent"; e.currentTarget.style.color = h.color }}
                  style={{ background: "transparent", color: h.color, border: "1px solid " + h.color, borderRadius: 10, padding: "10px 18px", fontWeight: 800, fontSize: 16, cursor: "pointer", textDecoration: "none", boxShadow: "0 0 16px " + h.glow, transition: "all 0.2s", letterSpacing: 1 }}
                >{h.number}</a>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* CONTACTS PAGE */}
      {activeTab === "contacts" && (
        <div className="page-content" style={{ maxWidth: 1280, margin: "0 auto", padding: "40px 48px" }}>
          <div className="contacts-grid" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 32 }}>
            <div>
              <p style={{ color: "#4a5568", fontSize: 11, textTransform: "uppercase", letterSpacing: 3, marginBottom: 20 }}>My Emergency Contacts</p>
              <div style={{ background: "linear-gradient(135deg, #0f1923, #111827)", border: "1px solid rgba(255,255,255,0.07)", borderRadius: 16, padding: "24px", marginBottom: 20 }}>
                <p style={{ color: "#e2e8f0", fontWeight: 700, fontSize: 15, marginBottom: 16 }}>Add New Contact</p>
                <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                  <input id="contactName" placeholder="Contact name (e.g. Mom)" style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)", borderRadius: 10, padding: "12px 16px", color: "#fff", fontSize: 14, outline: "none", fontFamily: "Inter, sans-serif" }} />
                  <input id="contactPhone" placeholder="Phone number (e.g. 9876543210)" type="tel" style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)", borderRadius: 10, padding: "12px 16px", color: "#fff", fontSize: 14, outline: "none", fontFamily: "Inter, sans-serif" }} />
                  <button onClick={() => {
                    const name = document.getElementById("contactName").value.trim()
                    const phone = document.getElementById("contactPhone").value.trim()
                    if (!name || !phone) return
                    setPersonalContacts(prev => [...prev, { id: Date.now(), name, phone }])
                    document.getElementById("contactName").value = ""
                    document.getElementById("contactPhone").value = ""
                  }} style={{ background: "linear-gradient(135deg, #c53030, #e53e3e)", border: "none", borderRadius: 10, padding: "12px", color: "#fff", fontWeight: 700, fontSize: 14, cursor: "pointer", boxShadow: "0 0 20px rgba(229,62,62,0.3)", fontFamily: "Inter, sans-serif" }}>
                    Save Contact
                  </button>
                </div>
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                {personalContacts.length === 0 && (
                  <div style={{ background: "rgba(255,255,255,0.02)", border: "1px dashed rgba(255,255,255,0.08)", borderRadius: 16, padding: "32px", textAlign: "center", color: "#4a5568", fontSize: 14 }}>
                    No contacts saved yet.<br />Add someone you trust above.
                  </div>
                )}
                {personalContacts.map(contact => (
                  <div key={contact.id} style={{ background: "linear-gradient(135deg, #0f1923, #111827)", border: "1px solid rgba(255,255,255,0.07)", borderRadius: 14, padding: "18px 20px", display: "flex", alignItems: "center", justifyContent: "space-between", transition: "border-color 0.2s" }}
                    onMouseEnter={e => e.currentTarget.style.borderColor = "rgba(255,255,255,0.15)"}
                    onMouseLeave={e => e.currentTarget.style.borderColor = "rgba(255,255,255,0.07)"}
                  >
                    <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
                      <div style={{ width: 42, height: 42, borderRadius: "50%", background: "linear-gradient(135deg, rgba(229,62,62,0.3), rgba(197,48,48,0.2))", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 18, fontWeight: 800, color: "#fc8181" }}>
                        {contact.name[0].toUpperCase()}
                      </div>
                      <div>
                        <p style={{ fontWeight: 700, color: "#e2e8f0", fontSize: 15 }}>{contact.name}</p>
                        <p style={{ color: "#4a5568", fontSize: 13, marginTop: 2 }}>{contact.phone}</p>
                      </div>
                    </div>
                    <div style={{ display: "flex", gap: 8 }}>
                      <a href={"tel:" + contact.phone} style={{ background: "rgba(72,187,120,0.1)", border: "1px solid rgba(72,187,120,0.3)", borderRadius: 8, padding: "8px 14px", color: "#48bb78", fontSize: 13, fontWeight: 600, textDecoration: "none", boxShadow: "0 0 10px rgba(72,187,120,0.2)" }}>Call</a>
                      <a href={"https://wa.me/91" + contact.phone + "?text=EMERGENCY! I may be in danger. Please help me immediately!"} target="_blank" rel="noreferrer" style={{ background: "rgba(229,62,62,0.1)", border: "1px solid rgba(229,62,62,0.3)", borderRadius: 8, padding: "8px 14px", color: "#fc8181", fontSize: 13, fontWeight: 600, textDecoration: "none", boxShadow: "0 0 10px rgba(229,62,62,0.2)" }}>SOS</a>
                      <button onClick={() => setPersonalContacts(prev => prev.filter(c => c.id !== contact.id))} style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: 8, padding: "8px 12px", color: "#4a5568", fontSize: 13, cursor: "pointer", fontFamily: "Inter, sans-serif" }}>X</button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <p style={{ color: "#4a5568", fontSize: 11, textTransform: "uppercase", letterSpacing: 3, marginBottom: 20 }}>Helpline Directory</p>
              <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                {[
                  { name: "National Emergency", number: "112", desc: "Works anywhere in India", tag: "emergency", color: "#fc8181", glow: "rgba(252,129,129,0.3)" },
                  { name: "Women Helpline", number: "1091", desc: "24/7 women safety helpline", tag: "women", color: "#f6ad55", glow: "rgba(246,173,85,0.3)" },
                  { name: "Police", number: "100", desc: "Nearest police station", tag: "police", color: "#63b3ed", glow: "rgba(99,179,237,0.3)" },
                  { name: "Ambulance", number: "108", desc: "Medical emergency", tag: "medical", color: "#68d391", glow: "rgba(104,211,145,0.3)" },
                  { name: "Cyber Crime", number: "1930", desc: "Report online harassment", tag: "cyber", color: "#b794f4", glow: "rgba(183,148,244,0.3)" },
                  { name: "Child Helpline", number: "1098", desc: "For children in distress", tag: "child", color: "#76e4f7", glow: "rgba(118,228,247,0.3)" },
                  { name: "Anti Stalking", number: "1096", desc: "Report stalking incidents", tag: "women", color: "#f6ad55", glow: "rgba(246,173,85,0.3)" },
                  { name: "Road Accident", number: "1073", desc: "Highway emergencies", tag: "emergency", color: "#fc8181", glow: "rgba(252,129,129,0.3)" },
                ].map(h => (
                  <div key={h.name} style={{ background: "linear-gradient(135deg, #0f1923, #111827)", border: "1px solid rgba(255,255,255,0.07)", borderRadius: 14, padding: "16px 20px", display: "flex", alignItems: "center", justifyContent: "space-between", transition: "border-color 0.2s" }}
                    onMouseEnter={e => e.currentTarget.style.borderColor = h.color + "44"}
                    onMouseLeave={e => e.currentTarget.style.borderColor = "rgba(255,255,255,0.07)"}
                  >
                    <div>
                      <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 3 }}>
                        <p style={{ fontWeight: 700, color: "#e2e8f0", fontSize: 14 }}>{h.name}</p>
                        <span style={{ background: h.color + "22", border: "1px solid " + h.color + "44", borderRadius: 4, padding: "1px 7px", fontSize: 10, color: h.color, fontWeight: 600, textTransform: "uppercase", letterSpacing: 1 }}>{h.tag}</span>
                      </div>
                      <p style={{ color: "#4a5568", fontSize: 12 }}>{h.desc}</p>
                    </div>
                    <a href={"tel:" + h.number}
                      onMouseEnter={e => { e.currentTarget.style.background = h.color; e.currentTarget.style.color = "#000" }}
                      onMouseLeave={e => { e.currentTarget.style.background = "transparent"; e.currentTarget.style.color = h.color }}
                      style={{ background: "transparent", border: "1px solid " + h.color, borderRadius: 8, padding: "8px 16px", color: h.color, fontWeight: 800, fontSize: 15, textDecoration: "none", boxShadow: "0 0 12px " + h.glow, letterSpacing: 1, transition: "all 0.2s", whiteSpace: "nowrap" }}
                    >{h.number}</a>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* LEARN PAGE */}
      {activeTab === "learn" && (
        <div className="page-content" style={{ maxWidth: 1280, margin: "0 auto", padding: "40px 48px" }}>
          <div style={{ display: "flex", gap: 8, marginBottom: 36 }}>
            {["Safety Hub", "Flashcards"].map(t => (
              <button key={t} onClick={() => setLearnTab(t)} style={{ background: learnTab === t ? "linear-gradient(135deg, rgba(229,62,62,0.2), rgba(197,48,48,0.1))" : "transparent", border: learnTab === t ? "1px solid rgba(229,62,62,0.35)" : "1px solid rgba(255,255,255,0.08)", borderRadius: 10, padding: "10px 24px", color: learnTab === t ? "#fc8181" : "#718096", cursor: "pointer", fontSize: 14, fontWeight: learnTab === t ? 700 : 400, fontFamily: "Inter, sans-serif", boxShadow: learnTab === t ? "0 0 12px rgba(229,62,62,0.2)" : "none", transition: "all 0.2s" }}>{t}</button>
            ))}
          </div>

          {learnTab === "Safety Hub" && (
            <div className="learn-grid" style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: 20 }}>
              {[
                { title: "Women Safety Laws", color: "#fc8181", icon: "⚖️", items: [{ law: "IPC Section 354", desc: "Assault or criminal force against a woman with intent to outrage her modesty. Punishable up to 2 years." }, { law: "IPC Section 375 & 376", desc: "Defines rape and its punishment — minimum 7 years, can extend to life imprisonment." }, { law: "IPC Section 509", desc: "Words, gestures or acts intended to insult a woman's modesty — includes catcalling and eve-teasing." }, { law: "Protection of Women from DV Act 2005", desc: "Protects women from physical, emotional, sexual and economic abuse within domestic relationships." }, { law: "POCSO Act 2012", desc: "Protection of Children from Sexual Offences — covers anyone under 18." }] },
                { title: "Cyber Safety", color: "#b794f4", icon: "🔒", items: [{ law: "IT Act Section 66E", desc: "Punishment for capturing or publishing private images of a person without consent. Up to 3 years imprisonment." }, { law: "IT Act Section 67", desc: "Publishing obscene material in electronic form — up to 5 years imprisonment." }, { law: "Cyber Stalking — IPC 354D", desc: "Monitoring a woman's internet activity or contacting her repeatedly against her will is a criminal offence." }, { law: "Report Cyber Crime", desc: "Visit cybercrime.gov.in or call 1930 to report any online harassment immediately." }] },
                { title: "Travel Safety Tips", color: "#f6ad55", icon: "🚗", items: [{ law: "Share your ride details", desc: "Always share cab number, driver name and route with a trusted contact before starting your journey." }, { law: "Sit strategically", desc: "In autos and cabs, sit behind the driver — never in the front seat when traveling alone at night." }, { law: "Verify before boarding", desc: "Cross-check the cab number plate with what's shown in the app before getting in." }, { law: "Trust your gut", desc: "If something feels wrong, ask the driver to stop at a public place. Your instinct is your first defence." }] },
                { title: "Self Defense Basics", color: "#68d391", icon: "💪", items: [{ law: "Palm Strike", desc: "Use the heel of your palm to strike the attacker's nose or chin — more effective than a closed fist." }, { law: "Knee to Groin", desc: "If grabbed from the front, a swift knee to the groin creates enough time to escape." }, { law: "Wrist Release", desc: "If your wrist is grabbed, rotate your arm toward the attacker's thumb — the weakest point of their grip." }, { law: "Use your voice", desc: "Shout FIRE instead of HELP — people respond faster to fire alerts in public spaces." }] },
              ].map(category => (
                <div key={category.title} style={{ background: "linear-gradient(135deg, #0f1923, #111827)", border: "1px solid rgba(255,255,255,0.07)", borderRadius: 16, overflow: "hidden", transition: "border-color 0.2s" }}
                  onMouseEnter={e => e.currentTarget.style.borderColor = category.color + "44"}
                  onMouseLeave={e => e.currentTarget.style.borderColor = "rgba(255,255,255,0.07)"}
                >
                  <div style={{ padding: "20px 24px", borderBottom: "1px solid rgba(255,255,255,0.05)", display: "flex", alignItems: "center", gap: 12, background: "rgba(255,255,255,0.02)" }}>
                    <span style={{ fontSize: 24 }}>{category.icon}</span>
                    <h3 style={{ fontWeight: 800, fontSize: 16, color: category.color }}>{category.title}</h3>
                  </div>
                  <div style={{ padding: "16px 24px", display: "flex", flexDirection: "column", gap: 14 }}>
                    {category.items.map((item, i) => (
                      <div key={i} style={{ borderLeft: "3px solid " + category.color + "66", paddingLeft: 14 }}>
                        <p style={{ fontWeight: 700, color: "#e2e8f0", fontSize: 13, marginBottom: 4 }}>{item.law}</p>
                        <p style={{ color: "#718096", fontSize: 12, lineHeight: 1.6 }}>{item.desc}</p>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )}

          {learnTab === "Flashcards" && (
            <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 32 }}>
              <p style={{ color: "#4a5568", fontSize: 13 }}>Click the card to reveal the answer</p>
              <div className="flashcard" onClick={() => setFlipped(prev => !prev)} style={{ width: 600, minHeight: 280, background: flipped ? "linear-gradient(135deg, rgba(229,62,62,0.15), rgba(197,48,48,0.08))" : "linear-gradient(135deg, #0f1923, #111827)", border: flipped ? "1px solid rgba(229,62,62,0.3)" : "1px solid rgba(255,255,255,0.08)", borderRadius: 20, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: "40px 48px", cursor: "pointer", textAlign: "center", boxShadow: flipped ? "0 0 40px rgba(229,62,62,0.15)" : "none", transition: "all 0.4s" }}>
                <p style={{ color: "#4a5568", fontSize: 11, textTransform: "uppercase", letterSpacing: 3, marginBottom: 20 }}>{flipped ? "Answer" : "Question"} — {flashcardIndex + 1} / {flashcards.length}</p>
                <p style={{ fontSize: 22, fontWeight: 800, color: flipped ? "#fc8181" : "#e2e8f0", lineHeight: 1.5 }}>{flipped ? flashcards[flashcardIndex].answer : flashcards[flashcardIndex].question}</p>
                <p style={{ color: "#4a5568", fontSize: 12, marginTop: 24 }}>{flipped ? "Click to see question" : "Click to reveal answer"}</p>
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
                <button onClick={() => { setFlashcardIndex(prev => (prev - 1 + flashcards.length) % flashcards.length); setFlipped(false) }} style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)", borderRadius: 10, padding: "10px 24px", color: "#718096", cursor: "pointer", fontSize: 14, fontFamily: "Inter, sans-serif" }}>Previous</button>
                <span style={{ color: "#4a5568", fontSize: 13 }}>{flashcardIndex + 1} of {flashcards.length}</span>
                <button onClick={() => { setFlashcardIndex(prev => (prev + 1) % flashcards.length); setFlipped(false) }} style={{ background: "linear-gradient(135deg, #c53030, #e53e3e)", border: "none", borderRadius: 10, padding: "10px 24px", color: "#fff", cursor: "pointer", fontSize: 14, fontWeight: 700, fontFamily: "Inter, sans-serif", boxShadow: "0 0 16px rgba(229,62,62,0.4)" }}>Next</button>
              </div>
            </div>
          )}
        </div>
      )}

      {/* AI CHATBOT PAGE */}
      {activeTab === "chatbot" && (
        <div className="page-content" style={{ maxWidth: 1000, margin: "0 auto", padding: "40px 48px", display: "flex", flexDirection: "column", height: "calc(100vh - 68px)" }}>
          <p style={{ color: "#4a5568", fontSize: 11, textTransform: "uppercase", letterSpacing: 3, marginBottom: 24 }}>AI Safety Assistant</p>
          <div style={{ flex: 1, overflowY: "auto", display: "flex", flexDirection: "column", gap: 16, marginBottom: 20, paddingRight: 4, scrollbarWidth: "thin", scrollbarColor: "#21262d transparent" }}>
            {messages.length === 0 && (
              <div style={{ textAlign: "center", marginTop: 40, padding: "0 40px" }}>
                <div style={{ fontSize: 72, marginBottom: 20, lineHeight: 1 }}>🦸‍♀️</div>
                <p style={{ color: "#e2e8f0", fontSize: 22, fontWeight: 800, marginBottom: 10, letterSpacing: 0.5 }}>Abhaya AI Assistant</p>
                <p style={{ color: "#4a5568", fontSize: 15, marginBottom: 40, lineHeight: 1.6, maxWidth: 500, margin: "0 auto 40px" }}>Ask me anything about women safety, Indian laws, or what to do in an emergency situation</p>
                <div style={{ display: "flex", flexWrap: "wrap", gap: 10, justifyContent: "center", maxWidth: 700, margin: "0 auto" }}>
                  {["What should I do if someone follows me?", "What are women safety laws in India?", "How do I report cyber harassment?", "What to do in a cab at night?", "Which helpline should I call in emergency?"].map(q => (
                    <button key={q} onClick={() => handleSend(q)} style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.1)", borderRadius: 24, padding: "10px 20px", color: "#718096", fontSize: 13, cursor: "pointer", fontFamily: "Inter, sans-serif", transition: "all 0.2s", lineHeight: 1.4 }}
                      onMouseEnter={e => { e.currentTarget.style.borderColor = "rgba(229,62,62,0.4)"; e.currentTarget.style.color = "#fc8181"; e.currentTarget.style.background = "rgba(229,62,62,0.06)" }}
                      onMouseLeave={e => { e.currentTarget.style.borderColor = "rgba(255,255,255,0.1)"; e.currentTarget.style.color = "#718096"; e.currentTarget.style.background = "rgba(255,255,255,0.04)" }}
                    >{q}</button>
                  ))}
                </div>
              </div>
            )}
            {messages.map((msg, i) => (
              <div key={i} style={{ display: "flex", justifyContent: msg.role === "user" ? "flex-end" : "flex-start", alignItems: "flex-end", gap: 10 }}>
                {msg.role === "assistant" && (
                  <div style={{ width: 36, height: 36, borderRadius: "50%", flexShrink: 0, background: "linear-gradient(135deg, rgba(229,62,62,0.2), rgba(197,48,48,0.1))", border: "1px solid rgba(229,62,62,0.3)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 18 }}>🦸‍♀️</div>
                )}
                <div style={{ maxWidth: "65%", background: msg.role === "user" ? "linear-gradient(135deg, #c53030, #e53e3e)" : "linear-gradient(135deg, #0f1923, #161b22)", border: msg.role === "user" ? "none" : "1px solid rgba(255,255,255,0.08)", borderRadius: msg.role === "user" ? "20px 20px 4px 20px" : "20px 20px 20px 4px", padding: "14px 20px", boxShadow: msg.role === "user" ? "0 0 20px rgba(229,62,62,0.25)" : "none" }}>
                  <p style={{ color: "#fff", fontSize: 14, lineHeight: 1.8, margin: 0 }} dangerouslySetInnerHTML={{ __html: msg.content.replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>").replace(/\n/g, "<br/>") }} />
                </div>
              </div>
            ))}
            {aiTyping && (
              <div style={{ display: "flex", justifyContent: "flex-start", alignItems: "flex-end", gap: 10 }}>
                <div style={{ width: 36, height: 36, borderRadius: "50%", flexShrink: 0, background: "linear-gradient(135deg, rgba(229,62,62,0.2), rgba(197,48,48,0.1))", border: "1px solid rgba(229,62,62,0.3)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 18 }}>🦸‍♀️</div>
                <div style={{ background: "linear-gradient(135deg, #0f1923, #161b22)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: "20px 20px 20px 4px", padding: "14px 20px" }}>
                  <p style={{ color: "#4a5568", fontSize: 14, margin: 0 }}>Abhaya is thinking...</p>
                </div>
              </div>
            )}
          </div>
          <div style={{ display: "flex", gap: 12, background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: 16, padding: "8px 8px 8px 20px", alignItems: "center" }}>
            <input value={chatInput} onChange={e => setChatInput(e.target.value)} onKeyDown={e => e.key === "Enter" && handleSend(chatInput)} placeholder="Ask anything about safety..." style={{ flex: 1, background: "transparent", border: "none", color: "#fff", fontSize: 14, outline: "none", fontFamily: "Inter, sans-serif", padding: "8px 0" }} />
            <button onClick={() => handleSend(chatInput)} style={{ background: "linear-gradient(135deg, #c53030, #e53e3e)", border: "none", borderRadius: 10, padding: "12px 28px", color: "#fff", fontWeight: 700, fontSize: 14, cursor: "pointer", boxShadow: "0 0 16px rgba(229,62,62,0.35)", fontFamily: "Inter, sans-serif", flexShrink: 0 }}>Send</button>
          </div>
        </div>
      )}

      {/* MORE PAGE */}
      {activeTab === "more" && (
        <div className="page-content" style={{ maxWidth: 1000, margin: "0 auto", padding: "40px 48px" }}>
          <p style={{ color: "#4a5568", fontSize: 11, textTransform: "uppercase", letterSpacing: 3, marginBottom: 32 }}>More Features</p>
          <div className="more-grid" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 24 }}>

            <div style={{ background: "linear-gradient(135deg, #0f1923, #111827)", border: "1px solid rgba(255,255,255,0.07)", borderRadius: 16, padding: "28px", gridColumn: "1 / -1" }}>
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 12 }}>
                <div>
                  <p style={{ fontWeight: 800, fontSize: 18, color: "#fff", marginBottom: 6 }}>⚡ Quick Exit</p>
                  <p style={{ color: "#4a5568", fontSize: 13, lineHeight: 1.6 }}>Instantly hides Abhaya and opens a fake calculator page. Use this if someone is watching your screen.</p>
                </div>
                <button onClick={() => {
                  document.title = "Calculator"
                  document.body.innerHTML = `<div style="background:#1a1a1a;min-height:100vh;display:flex;align-items:center;justify-content:center;font-family:sans-serif;"><div style="background:#2a2a2a;border-radius:20px;padding:24px;width:280px;"><div style="background:#1a1a1a;border-radius:10px;padding:16px;text-align:right;font-size:36px;color:#fff;margin-bottom:16px;">0</div><div style="display:grid;grid-template-columns:repeat(4,1fr);gap:10px;">${["C", "±", "%", "÷", "7", "8", "9", "×", "4", "5", "6", "−", "1", "2", "3", "+", "0", ".", "="].map(k => `<div style="background:${k === "=" ? "#e53e3e" : ["÷", "×", "−", "+"].includes(k) ? "#ff9500" : "#3a3a3a"};color:#fff;border-radius:10px;padding:18px;text-align:center;font-size:20px;cursor:pointer;">${k}</div>`).join("")}</div></div></div>`
                }} style={{ background: "linear-gradient(135deg, #c53030, #e53e3e)", border: "none", borderRadius: 12, padding: "14px 28px", color: "#fff", fontWeight: 800, fontSize: 15, cursor: "pointer", boxShadow: "0 0 24px rgba(229,62,62,0.4)", fontFamily: "Inter, sans-serif", whiteSpace: "nowrap", marginLeft: 24 }}>
                  EXIT NOW
                </button>
              </div>
              <div style={{ background: "rgba(229,62,62,0.06)", border: "1px solid rgba(229,62,62,0.15)", borderRadius: 8, padding: "10px 16px", display: "inline-flex", alignItems: "center", gap: 8 }}>
                <div style={{ width: 6, height: 6, borderRadius: "50%", background: "#e53e3e" }} />
                <span style={{ color: "#fc8181", fontSize: 12 }}>Tip: Add this page to your bookmark for fastest access</span>
              </div>
            </div>

            <div style={{ background: "linear-gradient(135deg, #0f1923, #111827)", border: "1px solid rgba(255,255,255,0.07)", borderRadius: 16, padding: "28px" }}>
              <p style={{ fontWeight: 800, fontSize: 18, color: "#fff", marginBottom: 8 }}>🌙 Night Mode</p>
              <p style={{ color: "#4a5568", fontSize: 13, lineHeight: 1.6, marginBottom: 20 }}>Reduces screen brightness for night use. Keeps you less visible in dark areas.</p>
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                <span style={{ color: nightMode ? "#fc8181" : "#4a5568", fontSize: 14, fontWeight: 600 }}>{nightMode ? "Night Mode ON" : "Night Mode OFF"}</span>
                <div onClick={() => setNightMode(prev => !prev)} style={{ width: 56, height: 28, borderRadius: 14, background: nightMode ? "rgba(229,62,62,0.4)" : "rgba(255,255,255,0.1)", border: nightMode ? "1px solid rgba(229,62,62,0.5)" : "1px solid rgba(255,255,255,0.15)", cursor: "pointer", position: "relative", transition: "all 0.3s" }}>
                  <div style={{ width: 20, height: 20, borderRadius: "50%", background: nightMode ? "#e53e3e" : "#4a5568", position: "absolute", top: 3, left: nightMode ? 32 : 4, transition: "all 0.3s", boxShadow: nightMode ? "0 0 8px rgba(229,62,62,0.6)" : "none" }} />
                </div>
              </div>
              {nightMode && <div style={{ marginTop: 16, background: "rgba(229,62,62,0.06)", border: "1px solid rgba(229,62,62,0.15)", borderRadius: 8, padding: "10px 16px" }}><p style={{ color: "#fc8181", fontSize: 12 }}>Screen dimming active — stay safe 🌙</p></div>}
            </div>

            <div style={{ background: "linear-gradient(135deg, #0f1923, #111827)", border: "1px solid rgba(255,255,255,0.07)", borderRadius: 16, padding: "28px" }}>
              <p style={{ fontWeight: 800, fontSize: 18, color: "#fff", marginBottom: 8 }}>Travel Safety Checklist</p>
              <p style={{ color: "#4a5568", fontSize: 13, lineHeight: 1.6, marginBottom: 20 }}>Complete this before traveling alone.</p>
              <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                {checklist.map((item, i) => (
                  <div key={i} onClick={() => setChecklist(prev => prev.map((c, idx) => idx === i ? { ...c, done: !c.done } : c))} style={{ display: "flex", alignItems: "center", gap: 12, cursor: "pointer", padding: "8px 0", borderBottom: "1px solid rgba(255,255,255,0.04)" }}>
                    <div style={{ width: 22, height: 22, borderRadius: 6, flexShrink: 0, border: item.done ? "none" : "2px solid rgba(255,255,255,0.2)", background: item.done ? "linear-gradient(135deg, #276749, #48bb78)" : "transparent", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 13, transition: "all 0.2s", boxShadow: item.done ? "0 0 8px rgba(72,187,120,0.4)" : "none" }}>
                      {item.done && "✓"}
                    </div>
                    <span style={{ fontSize: 13, color: item.done ? "#4a5568" : "#e2e8f0", textDecoration: item.done ? "line-through" : "none", transition: "all 0.2s" }}>{item.label}</span>
                  </div>
                ))}
              </div>
              <div style={{ marginTop: 16, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <span style={{ color: "#4a5568", fontSize: 12 }}>{checklist.filter(c => c.done).length}/{checklist.length} completed</span>
                <button onClick={() => setChecklist(prev => prev.map(c => ({ ...c, done: false })))} style={{ background: "transparent", border: "1px solid rgba(255,255,255,0.1)", borderRadius: 8, padding: "6px 14px", color: "#4a5568", fontSize: 12, cursor: "pointer", fontFamily: "Inter, sans-serif" }}>Reset</button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* MOBILE BOTTOM NAV */}
      <div className="mobile-nav" style={{ display: "none", position: "fixed", bottom: 0, left: 0, right: 0, background: "rgba(8,12,20,0.98)", backdropFilter: "blur(12px)", borderTop: "1px solid rgba(255,255,255,0.06)", padding: "8px 0 16px", zIndex: 200 }}>
        <div style={{ display: "flex", justifyContent: "space-around" }}>
          {navItems.map(item => {
            const Icon = item.icon
            const isActive = activeTab === item.id
            return (
              <button key={item.id} onClick={() => setActiveTab(item.id)} style={{ background: "none", border: "none", display: "flex", flexDirection: "column", alignItems: "center", gap: 4, color: isActive ? "#fc8181" : "#4a5568", cursor: "pointer", padding: "4px 12px", fontFamily: "Inter, sans-serif" }}>
                <Icon style={{ width: 20, height: 20 }} />
                <span style={{ fontSize: 10, fontWeight: isActive ? 700 : 400 }}>{item.label}</span>
              </button>
            )
          })}
        </div>
      </div>

      {/* FAKE CALL OVERLAY */}
      {showFakeCall && (
        <div style={{ position: "fixed", inset: 0, zIndex: 999, background: "rgba(0,0,0,0.95)", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 32 }}>
          <div style={{ textAlign: "center" }}>
            <div style={{ width: 100, height: 100, borderRadius: "50%", background: "linear-gradient(135deg, rgba(229,62,62,0.3), rgba(197,48,48,0.2))", border: "2px solid rgba(229,62,62,0.4)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 48, margin: "0 auto 20px", boxShadow: "0 0 40px rgba(229,62,62,0.3)" }}>👩</div>
            <p style={{ color: "#fff", fontSize: 28, fontWeight: 800, marginBottom: 8 }}>Mom</p>
            <p style={{ color: "#4a5568", fontSize: 16 }}>Incoming Call...</p>
          </div>
          <div style={{ width: 160, height: 160, borderRadius: "50%", border: "2px solid rgba(72,187,120,0.4)", display: "flex", alignItems: "center", justifyContent: "center", animation: "ripple 1.5s ease-out infinite", position: "relative" }}>
            <div style={{ width: 120, height: 120, borderRadius: "50%", border: "2px solid rgba(72,187,120,0.6)", display: "flex", alignItems: "center", justifyContent: "center" }}>
              <div style={{ width: 80, height: 80, borderRadius: "50%", background: "linear-gradient(135deg, #276749, #48bb78)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 32, boxShadow: "0 0 24px rgba(72,187,120,0.5)" }}>📞</div>
            </div>
          </div>
          <div style={{ display: "flex", gap: 48, marginTop: 20 }}>
            <div style={{ textAlign: "center", cursor: "pointer" }} onClick={() => setShowFakeCall(false)}>
              <div style={{ width: 72, height: 72, borderRadius: "50%", background: "linear-gradient(135deg, #c53030, #e53e3e)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 28, marginBottom: 8, boxShadow: "0 0 24px rgba(229,62,62,0.5)" }}>📵</div>
              <p style={{ color: "#718096", fontSize: 13 }}>Decline</p>
            </div>
            <div style={{ textAlign: "center", cursor: "pointer" }} onClick={() => setShowFakeCall(false)}>
              <div style={{ width: 72, height: 72, borderRadius: "50%", background: "linear-gradient(135deg, #276749, #48bb78)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 28, marginBottom: 8, boxShadow: "0 0 24px rgba(72,187,120,0.5)" }}>📞</div>
              <p style={{ color: "#718096", fontSize: 13 }}>Accept</p>
            </div>
          </div>
          <p style={{ color: "#4a5568", fontSize: 13, marginTop: 16 }}>This is a fake call to help you escape unsafe situations</p>
        </div>
      )}

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&display=swap');
        * { margin: 0; padding: 0; box-sizing: border-box; }
        @keyframes ripple {
          0% { transform: scale(1); opacity: 1; }
          100% { transform: scale(1.4); opacity: 0; }
        }
        @media (max-width: 768px) {
          .nav-links { display: none !important; }
          .mobile-nav { display: block !important; }
          .hero-card { flex-direction: column !important; padding: 24px 20px !important; }
          .hero-left h1 { font-size: 28px !important; }
          .quick-grid { grid-template-columns: repeat(2, 1fr) !important; }
          .helpline-grid { grid-template-columns: 1fr !important; }
          .page-content { padding: 24px 16px 80px !important; }
          .contacts-grid { grid-template-columns: 1fr !important; }
          .learn-grid { grid-template-columns: 1fr !important; }
          .more-grid { grid-template-columns: 1fr !important; }
          .flashcard { width: 90% !important; }
          .sos-btn { width: 130px !important; height: 130px !important; }
          .sos-wrap { width: 150px !important; height: 150px !important; }
          .hero-card {
          align-items: center !important;
           }

          .sos-wrap {
          margin: 0 auto !important;
          }
        }
      `}</style>
    </div>
  )
}