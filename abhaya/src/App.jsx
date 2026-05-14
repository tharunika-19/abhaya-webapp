import { useState, useEffect } from "react"
import { Shield, Phone, MapPin, Bot, Map, BookOpen, Brain, Settings, AlertTriangle } from "lucide-react"

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
  {
    icon: <Phone style={{ width: 28, height: 28 }} />,
    label: "Fake Call",
    sub: "Escape awkward situations",
    color: "#48bb78",
    glow: "rgba(72,187,120,0.35)",
    bg: "linear-gradient(135deg, rgba(72,187,120,0.12), rgba(72,187,120,0.04))",
    border: "rgba(72,187,120,0.3)",
  },
  {
    icon: <MapPin style={{ width: 28, height: 28 }} />,
    label: "My Location",
    sub: "Share live location instantly",
    color: "#63b3ed",
    glow: "rgba(99,179,237,0.35)",
    bg: "linear-gradient(135deg, rgba(99,179,237,0.12), rgba(99,179,237,0.04))",
    border: "rgba(99,179,237,0.3)",
  },
  {
    icon: <Bot style={{ width: 28, height: 28 }} />,
    label: "AI Assistant",
    sub: "Safety guidance anytime",
    color: "#b794f4",
    glow: "rgba(183,148,244,0.35)",
    bg: "linear-gradient(135deg, rgba(183,148,244,0.12), rgba(183,148,244,0.04))",
    border: "rgba(183,148,244,0.3)",
  },
  {
    icon: <Map style={{ width: 28, height: 28 }} />,
    label: "Safe Map",
    sub: "View unsafe zones near you",
    color: "#f6ad55",
    glow: "rgba(246,173,85,0.35)",
    bg: "linear-gradient(135deg, rgba(246,173,85,0.12), rgba(246,173,85,0.04))",
    border: "rgba(246,173,85,0.3)",
  },
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
  const greeting = getGreeting()

  useEffect(() => {
    const interval = setInterval(() => {
      setTipIndex(prev => (prev + 1) % tips.length)
    }, 4000)
    return () => clearInterval(interval)
  }, [])

  return (
    <div style={{ background: "#080c14", minHeight: "100vh", color: "#fff", fontFamily: "'Inter', 'Segoe UI', sans-serif" }}>

      {/* Top Navbar */}
      <nav style={{
        background: "rgba(8,12,20,0.95)",
        backdropFilter: "blur(12px)",
        borderBottom: "1px solid rgba(255,255,255,0.06)",
        padding: "0 48px",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        height: 68,
        position: "sticky",
        top: 0,
        zIndex: 100,
      }}>
        {/* Logo */}
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <div style={{
            width: 36, height: 36, borderRadius: 10,
            background: "linear-gradient(135deg, #c53030, #e53e3e)",
            display: "flex", alignItems: "center", justifyContent: "center",
            boxShadow: "0 0 16px rgba(229,62,62,0.5)",
          }}>
            <Shield style={{ width: 20, height: 20, color: "#fff" }} />
          </div>
          <div>
            <span style={{ fontSize: 18, fontWeight: 900, color: "#fff", letterSpacing: 4 }}>ABHAYA</span>
            <span style={{ fontSize: 11, color: "#4a5568", marginLeft: 10 }}>अभय — Be Fearless</span>
          </div>
        </div>

        {/* Nav links */}
        <div style={{ display: "flex", gap: 4 }}>
          {navItems.map(item => {
            const Icon = item.icon
            const isActive = activeTab === item.id
            return (
              <button key={item.id} onClick={() => setActiveTab(item.id)} style={{
                background: isActive ? "linear-gradient(135deg, rgba(229,62,62,0.2), rgba(197,48,48,0.1))" : "transparent",
                border: isActive ? "1px solid rgba(229,62,62,0.35)" : "1px solid transparent",
                borderRadius: 10,
                padding: "8px 18px",
                color: isActive ? "#fc8181" : "#718096",
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                gap: 7,
                fontSize: 14,
                fontWeight: isActive ? 600 : 400,
                transition: "all 0.2s",
                boxShadow: isActive ? "0 0 12px rgba(229,62,62,0.2)" : "none",
              }}>
                <Icon style={{ width: 15, height: 15 }} />
                {item.label}
              </button>
            )
          })}
        </div>
      </nav>

      {/* HOME PAGE */}
      {activeTab === "home" && (
        <div style={{ maxWidth: 1280, margin: "0 auto", padding: "40px 48px" }}>

          {/* Hero Card */}
          <div style={{
            background: "linear-gradient(135deg, #0f1923 0%, #111827 50%, #0f1923 100%)",
            border: "1px solid rgba(255,255,255,0.07)",
            borderRadius: 20,
            padding: "40px 48px",
            marginBottom: 36,
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            position: "relative",
            overflow: "hidden",
          }}>
            {/* Background glow */}
            <div style={{
              position: "absolute", top: -60, right: 200,
              width: 300, height: 300,
              background: "radial-gradient(circle, rgba(229,62,62,0.08) 0%, transparent 70%)",
              pointerEvents: "none",
            }} />

            {/* Left: Greeting */}
            <div style={{ flex: 1 }}>
              <p style={{ color: "#4a5568", fontSize: 11, textTransform: "uppercase", letterSpacing: 3, marginBottom: 12 }}>
                Welcome back
              </p>
              <h1 style={{ fontSize: 38, fontWeight: 900, color: "#fff", marginBottom: 10, lineHeight: 1.2 }}>
                {greeting.text} 👋
              </h1>
              <p style={{ color: "#718096", fontSize: 15, marginBottom: 24 }}>{greeting.sub}</p>

              {/* Tip ticker */}
              <div style={{
                background: "rgba(229,62,62,0.06)",
                border: "1px solid rgba(229,62,62,0.15)",
                borderRadius: 10,
                padding: "12px 18px",
                display: "inline-flex",
                alignItems: "center",
                gap: 10,
                maxWidth: 480,
              }}>
                <div style={{
                  width: 8, height: 8, borderRadius: "50%",
                  background: "#e53e3e",
                  boxShadow: "0 0 8px rgba(229,62,62,0.8)",
                  flexShrink: 0,
                }} />
                <span style={{ color: "#fc8181", fontSize: 13, lineHeight: 1.5 }}>
                  {tips[tipIndex]}
                </span>
              </div>
            </div>

            {/* Right: SOS Button */}
            <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 12, marginLeft: 60 }}>
              <div style={{ position: "relative", width: 180, height: 180, display: "flex", alignItems: "center", justifyContent: "center" }}>
                {/* Pulse rings */}
                <div style={{
                  position: "absolute", inset: 0, borderRadius: "50%",
                  border: "2px solid rgba(229,62,62,0.3)",
                  animation: "ripple 2s ease-out infinite",
                }} />
                <div style={{
                  position: "absolute", inset: -16, borderRadius: "50%",
                  border: "2px solid rgba(229,62,62,0.15)",
                  animation: "ripple 2s ease-out infinite 0.5s",
                }} />
                <div style={{
                  position: "absolute", inset: -32, borderRadius: "50%",
                  border: "1px solid rgba(229,62,62,0.08)",
                  animation: "ripple 2s ease-out infinite 1s",
                }} />

                {/* Button */}
                <div
                  onMouseDown={() => setSosPressed(true)}
                  onMouseUp={() => setSosPressed(false)}
                  onMouseLeave={() => setSosPressed(false)}
                  style={{
                    width: 160, height: 160, borderRadius: "50%",
                    background: sosPressed
                      ? "linear-gradient(135deg, #9b2c2c, #c53030)"
                      : "linear-gradient(135deg, #c53030, #e53e3e, #fc4444)",
                    display: "flex", flexDirection: "column",
                    alignItems: "center", justifyContent: "center",
                    cursor: "pointer",
                    boxShadow: sosPressed
                      ? "0 0 30px rgba(229,62,62,0.4)"
                      : "0 0 50px rgba(229,62,62,0.6), 0 0 100px rgba(229,62,62,0.2)",
                    border: "3px solid rgba(252,129,129,0.5)",
                    transform: sosPressed ? "scale(0.94)" : "scale(1)",
                    transition: "all 0.15s",
                    position: "relative", zIndex: 1,
                  }}
                >
                  <AlertTriangle style={{ width: 34, height: 34, color: "#fff", marginBottom: 4 }} />
                  <span style={{ fontSize: 24, fontWeight: 900, color: "#fff", letterSpacing: 4 }}>SOS</span>
                  <span style={{ fontSize: 10, color: "rgba(255,255,255,0.7)", marginTop: 2 }}>EMERGENCY</span>
                </div>
              </div>
              <p style={{ color: "#4a5568", fontSize: 12, textAlign: "center" }}>
                Silently sends location<br />to your emergency contacts
              </p>
            </div>
          </div>

          {/* Quick Actions */}
          <p style={{ color: "#4a5568", fontSize: 11, textTransform: "uppercase", letterSpacing: 3, marginBottom: 16 }}>Quick Actions</p>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 16, marginBottom: 36 }}>
            {quickActions.map(item => (
              <div key={item.label}
                onMouseEnter={e => {
                  e.currentTarget.style.transform = "translateY(-6px)"
                  e.currentTarget.style.boxShadow = `0 12px 32px ${item.glow}`
                  e.currentTarget.style.borderColor = item.color
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.transform = "translateY(0)"
                  e.currentTarget.style.boxShadow = "none"
                  e.currentTarget.style.borderColor = item.border
                }}
                style={{
                  background: item.bg,
                  border: `1px solid ${item.border}`,
                  borderRadius: 16,
                  padding: "28px 24px",
                  cursor: "pointer",
                  transition: "all 0.25s",
                }}>
                <div style={{ color: item.color, marginBottom: 16, filter: `drop-shadow(0 0 8px ${item.glow})` }}>
                  {item.icon}
                </div>
                <p style={{ fontWeight: 700, fontSize: 16, color: "#fff", marginBottom: 6 }}>{item.label}</p>
                <p style={{ fontSize: 12, color: "#718096", lineHeight: 1.5 }}>{item.sub}</p>
              </div>
            ))}
          </div>

          {/* Emergency Helplines */}
          <p style={{ color: "#4a5568", fontSize: 11, textTransform: "uppercase", letterSpacing: 3, marginBottom: 16 }}>Emergency Helplines</p>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 16 }}>
            {helplines.map(h => (
              <div key={h.name} style={{
                background: "linear-gradient(135deg, #0f1923, #111827)",
                border: "1px solid rgba(255,255,255,0.06)",
                borderRadius: 16,
                padding: "24px 28px",
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                transition: "border-color 0.2s",
              }}
                onMouseEnter={e => e.currentTarget.style.borderColor = "rgba(255,255,255,0.15)"}
                onMouseLeave={e => e.currentTarget.style.borderColor = "rgba(255,255,255,0.06)"}
              >
                <div>
                  <p style={{ fontWeight: 700, color: "#e2e8f0", fontSize: 15, marginBottom: 4 }}>{h.name}</p>
                  <p style={{ color: "#4a5568", fontSize: 12 }}>{h.desc}</p>
                </div>
                <a href={`tel:${h.number}`} style={{
                  background: "transparent",
                  color: h.color,
                  border: `1px solid ${h.color}`,
                  borderRadius: 10,
                  padding: "10px 18px",
                  fontWeight: 800,
                  fontSize: 16,
                  cursor: "pointer",
                  textDecoration: "none",
                  boxShadow: `0 0 16px ${h.glow}`,
                  transition: "all 0.2s",
                  letterSpacing: 1,
                }}
                  onMouseEnter={e => {
                    e.currentTarget.style.background = h.color
                    e.currentTarget.style.color = "#000"
                  }}
                  onMouseLeave={e => {
                    e.currentTarget.style.background = "transparent"
                    e.currentTarget.style.color = h.color
                  }}
                >{h.number}</a>
              </div>
            ))}
          </div>
        </div>
      )}


      {/* CONTACTS PAGE */}
{activeTab === "contacts" && (
  <div style={{ maxWidth: 1280, margin: "0 auto", padding: "40px 48px" }}>
    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 32 }}>

      {/* LEFT — Personal Contacts */}
      <div>
        <p style={{ color: "#4a5568", fontSize: 11, textTransform: "uppercase", letterSpacing: 3, marginBottom: 20 }}>
          My Emergency Contacts
        </p>

        {/* Add Contact Form */}
        <div style={{
          background: "linear-gradient(135deg, #0f1923, #111827)",
          border: "1px solid rgba(255,255,255,0.07)",
          borderRadius: 16, padding: "24px", marginBottom: 20,
        }}>
          <p style={{ color: "#e2e8f0", fontWeight: 700, fontSize: 15, marginBottom: 16 }}>Add New Contact</p>
          <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            <input
              id="contactName"
              placeholder="Contact name (e.g. Mom)"
              style={{
                background: "rgba(255,255,255,0.05)",
                border: "1px solid rgba(255,255,255,0.1)",
                borderRadius: 10, padding: "12px 16px",
                color: "#fff", fontSize: 14, outline: "none",
                fontFamily: "Inter, sans-serif",
              }}
            />
            <input
              id="contactPhone"
              placeholder="Phone number (e.g. 9876543210)"
              type="tel"
              style={{
                background: "rgba(255,255,255,0.05)",
                border: "1px solid rgba(255,255,255,0.1)",
                borderRadius: 10, padding: "12px 16px",
                color: "#fff", fontSize: 14, outline: "none",
                fontFamily: "Inter, sans-serif",
              }}
            />
            <button
              onClick={() => {
                const name = document.getElementById("contactName").value.trim()
                const phone = document.getElementById("contactPhone").value.trim()
                if (!name || !phone) return
                setPersonalContacts(prev => [...prev, { id: Date.now(), name, phone }])
                document.getElementById("contactName").value = ""
                document.getElementById("contactPhone").value = ""
              }}
              style={{
                background: "linear-gradient(135deg, #c53030, #e53e3e)",
                border: "none", borderRadius: 10,
                padding: "12px", color: "#fff",
                fontWeight: 700, fontSize: 14, cursor: "pointer",
                boxShadow: "0 0 20px rgba(229,62,62,0.3)",
                fontFamily: "Inter, sans-serif",
              }}>
              Save Contact
            </button>
          </div>
        </div>

        {/* Saved Contacts List */}
        <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          {personalContacts.length === 0 && (
            <div style={{
              background: "rgba(255,255,255,0.02)",
              border: "1px dashed rgba(255,255,255,0.08)",
              borderRadius: 16, padding: "32px",
              textAlign: "center", color: "#4a5568", fontSize: 14,
            }}>
              No contacts saved yet.<br />Add someone you trust above.
            </div>
          )}
          {personalContacts.map(contact => (
            <div key={contact.id} style={{
              background: "linear-gradient(135deg, #0f1923, #111827)",
              border: "1px solid rgba(255,255,255,0.07)",
              borderRadius: 14, padding: "18px 20px",
              display: "flex", alignItems: "center", justifyContent: "space-between",
              transition: "border-color 0.2s",
            }}
              onMouseEnter={e => e.currentTarget.style.borderColor = "rgba(255,255,255,0.15)"}
              onMouseLeave={e => e.currentTarget.style.borderColor = "rgba(255,255,255,0.07)"}
            >
              <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
                <div style={{
                  width: 42, height: 42, borderRadius: "50%",
                  background: "linear-gradient(135deg, rgba(229,62,62,0.3), rgba(197,48,48,0.2))",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  fontSize: 18, fontWeight: 800, color: "#fc8181",
                }}>
                  {contact.name[0].toUpperCase()}
                </div>
                <div>
                  <p style={{ fontWeight: 700, color: "#e2e8f0", fontSize: 15 }}>{contact.name}</p>
                  <p style={{ color: "#4a5568", fontSize: 13, marginTop: 2 }}>{contact.phone}</p>
                </div>
              </div>
              <div style={{ display: "flex", gap: 8 }}>
                <a href={"tel:" + contact.phone} style={{
                  background: "rgba(72,187,120,0.1)",
                  border: "1px solid rgba(72,187,120,0.3)",
                  borderRadius: 8, padding: "8px 14px",
                  color: "#48bb78", fontSize: 13, fontWeight: 600,
                  textDecoration: "none",
                  boxShadow: "0 0 10px rgba(72,187,120,0.2)",
                }}>Call</a>
                <a
                  href={"https://wa.me/91" + contact.phone + "?text=EMERGENCY! I may be in danger. Please help me immediately!"}
                  target="_blank" rel="noreferrer"
                  style={{
                    background: "rgba(229,62,62,0.1)",
                    border: "1px solid rgba(229,62,62,0.3)",
                    borderRadius: 8, padding: "8px 14px",
                    color: "#fc8181", fontSize: 13, fontWeight: 600,
                    textDecoration: "none",
                    boxShadow: "0 0 10px rgba(229,62,62,0.2)",
                  }}>SOS</a>
                <button
                  onClick={() => setPersonalContacts(prev => prev.filter(c => c.id !== contact.id))}
                  style={{
                    background: "rgba(255,255,255,0.04)",
                    border: "1px solid rgba(255,255,255,0.08)",
                    borderRadius: 8, padding: "8px 12px",
                    color: "#4a5568", fontSize: 13, cursor: "pointer",
                    fontFamily: "Inter, sans-serif",
                  }}>X</button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* RIGHT — Helplines */}
      <div>
        <p style={{ color: "#4a5568", fontSize: 11, textTransform: "uppercase", letterSpacing: 3, marginBottom: 20 }}>
          Helpline Directory
        </p>
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
            <div key={h.name} style={{
              background: "linear-gradient(135deg, #0f1923, #111827)",
              border: "1px solid rgba(255,255,255,0.07)",
              borderRadius: 14, padding: "16px 20px",
              display: "flex", alignItems: "center", justifyContent: "space-between",
              transition: "border-color 0.2s",
            }}
              onMouseEnter={e => e.currentTarget.style.borderColor = h.color + "44"}
              onMouseLeave={e => e.currentTarget.style.borderColor = "rgba(255,255,255,0.07)"}
            >
              <div>
                <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 3 }}>
                  <p style={{ fontWeight: 700, color: "#e2e8f0", fontSize: 14 }}>{h.name}</p>
                  <span style={{
                    background: h.color + "22",
                    border: "1px solid " + h.color + "44",
                    borderRadius: 4, padding: "1px 7px",
                    fontSize: 10, color: h.color, fontWeight: 600,
                    textTransform: "uppercase", letterSpacing: 1,
                  }}>{h.tag}</span>
                </div>
                <p style={{ color: "#4a5568", fontSize: 12 }}>{h.desc}</p>
              </div>
              <a href={"tel:" + h.number}
                onMouseEnter={e => {
                  e.currentTarget.style.background = h.color
                  e.currentTarget.style.color = "#000"
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.background = "transparent"
                  e.currentTarget.style.color = h.color
                }}
                style={{
                  background: "transparent",
                  border: "1px solid " + h.color,
                  borderRadius: 8, padding: "8px 16px",
                  color: h.color, fontWeight: 800,
                  fontSize: 15, textDecoration: "none",
                  boxShadow: "0 0 12px " + h.glow,
                  letterSpacing: 1, transition: "all 0.2s",
                  whiteSpace: "nowrap",
                }}>{h.number}</a>
            </div>
          ))}
        </div>
      </div>
    </div>
  </div>
)}

{/* Placeholder for other tabs */}
{activeTab !== "home" && activeTab !== "contacts" && (
  <div style={{
    display: "flex", alignItems: "center", justifyContent: "center",
    height: "calc(100vh - 68px)", flexDirection: "column", gap: 16, color: "#4a5568",
  }}>
    <Shield style={{ width: 48, height: 48, opacity: 0.15 }} />
    <p>Building this next...</p>
  </div>
)}
      
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&display=swap');
        * { margin: 0; padding: 0; box-sizing: border-box; }
        @keyframes ripple {
          0% { transform: scale(1); opacity: 1; }
          100% { transform: scale(1.4); opacity: 0; }
        }
      `}</style>
    </div>
  )
}