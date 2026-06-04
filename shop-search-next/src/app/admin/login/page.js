"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function AdminLogin() {
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await fetch("/api/admin/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ password }),
    });
    if (res.ok) {
      router.push("/admin");
    } else {
      setError("パスワードが違います");
    }
  };

  return (
    <div style={{
      minHeight: "100vh",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      fontFamily: "'Rajdhani', sans-serif",
      color: "#e0eaff",
    }}>
      <div style={{
        background: "#0d1526",
        border: "1px solid rgba(0,229,255,0.2)",
        borderRadius: "8px",
        padding: "40px",
        width: "320px",
        position: "relative",
        overflow: "hidden",
      }}>
        <div style={{
          position: "absolute", top: 0, left: 0, right: 0, height: "2px",
          background: "linear-gradient(90deg, #7b2fff, #00e5ff, #ff00aa)",
        }} />
        <h1 style={{
          fontFamily: "'Orbitron', sans-serif",
          fontSize: "16px",
          color: "#00e5ff",
          letterSpacing: "2px",
          marginBottom: "24px",
        }}>ADMIN LOGIN</h1>

        <div onKeyDown={(e) => e.key === "Enter" && handleSubmit(e)}>
          <input
            type="password"
            placeholder="パスワード"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            style={{
              width: "100%",
              padding: "10px 12px",
              background: "#050a14",
              border: "1px solid rgba(0,229,255,0.2)",
              borderRadius: "6px",
              color: "#e0eaff",
              fontSize: "14px",
              marginBottom: "12px",
              boxSizing: "border-box",
            }}
          />
          {error && <p style={{ color: "#ff00aa", fontSize: "12px", marginBottom: "12px" }}>{error}</p>}
          <button
            onClick={handleSubmit}
            style={{
              width: "100%",
              padding: "10px",
              background: "transparent",
              border: "1px solid #00e5ff",
              borderRadius: "6px",
              color: "#00e5ff",
              fontFamily: "'Orbitron', sans-serif",
              fontSize: "12px",
              letterSpacing: "1px",
              cursor: "pointer",
            }}
          >
            LOGIN
          </button>
        </div>
      </div>
    </div>
  );
}