import { useState, useEffect, useRef } from "react";
import axios from "axios";

function App() {
  const [question, setQuestion] = useState("");
  const [chat, setChat] = useState([]);
  const [loading, setLoading] = useState(false);
  const chatEndRef = useRef(null);

  // Load chat history
  useEffect(() => {
    const fetchHistory = async () => {
      try {
        const res = await axios.get("https://ai-assistant-git-main-navya-thottempudis-projects.vercel.app/history");

        const formatted = res.data.reverse().flatMap(chat => [
          { type: "user", text: chat.question },
          { type: "bot", text: chat.response }
        ]);

        setChat(formatted);
      } catch {
        console.log("Error loading history");
      }
    };

    fetchHistory();
  }, []);

  // Auto scroll
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [chat]);

  const askQuestion = async () => {
    if (!question.trim()) return;

    const userMsg = { type: "user", text: question };
    setChat(prev => [...prev, userMsg]);

    setLoading(true);
    setQuestion("");

    try {
      // Ask question
   const res = await axios.post(
  "https://ai-assistant-git-main-navya-thottempudis-projects.vercel.app/ask",
  { question });

      const botMsg = { type: "bot", text: res.data.answer };
      setChat(prev => [...prev, botMsg]);
    } catch {
      setChat(prev => [
        ...prev,
        { type: "bot", text: "⚠️ Error fetching response" },
      ]);
    }

    setLoading(false);
  };

  return (
    <div style={styles.app}>
      <div style={styles.header}>🤖  AI ASSISTANT</div>

      <div style={styles.chatContainer}>
        {chat.map((msg, i) => (
          <div
            key={i}
            style={{
              ...styles.messageRow,
              justifyContent:
                msg.type === "user" ? "flex-end" : "flex-start",
            }}
          >
            <div
              style={{
                ...styles.message,
                background:
                  msg.type === "user"
                    ? "linear-gradient(135deg, #4facfe, #00f2fe)"
                    : "#2a2a2a",
                color: msg.type === "user" ? "white" : "#eee",
              }}
            >
              {msg.text}
            </div>
          </div>
        ))}

        {loading && (
          <div style={styles.messageRow}>
            <div style={styles.botLoader}>Typing...</div>
          </div>
        )}

        <div ref={chatEndRef} />
      </div>

      <div style={styles.inputBar}>
        <input
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && askQuestion()}
          placeholder="Ask anything..."
          style={styles.input}
        />
        <button onClick={askQuestion} style={styles.sendBtn}>
          ➤
        </button>
      </div>
    </div>
  );
}

const styles = {
  app: {
    height: "100vh",
    display: "flex",
    flexDirection: "column",
    background: "#0f0f0f",
    fontFamily: "Segoe UI, sans-serif",
  },

  header: {
    padding: "15px 20px",
    fontSize: "20px",
    fontWeight: "600",
    color: "white",
    borderBottom: "1px solid #222",
  },

  chatContainer: {
    flex: 1,
    padding: "20px",
    overflowY: "auto",
    display: "flex",
    flexDirection: "column",
  },

  messageRow: {
    display: "flex",
    marginBottom: "12px",
  },

  message: {
    padding: "12px 16px",
    borderRadius: "16px",
    maxWidth: "70%",
    fontSize: "14px",
    lineHeight: "1.5",
  },

  botLoader: {
    background: "#2a2a2a",
    padding: "10px 14px",
    borderRadius: "12px",
    color: "#aaa",
    fontSize: "13px",
  },

  inputBar: {
    display: "flex",
    padding: "15px",
    borderTop: "1px solid #222",
    background: "#111",
  },

  input: {
    flex: 1,
    padding: "12px",
    borderRadius: "10px",
    border: "none",
    outline: "none",
    background: "#1e1e1e",
    color: "white",
    fontSize: "14px",
  },

  sendBtn: {
    marginLeft: "10px",
    padding: "0 18px",
    borderRadius: "10px",
    border: "none",
    background: "linear-gradient(135deg, #ff7a18, #ffb347)",
    color: "white",
    fontSize: "18px",
    cursor: "pointer",
  },
};

export default App;