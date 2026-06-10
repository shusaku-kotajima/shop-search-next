"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

const inputStyle = {
  width: "100%",
  padding: "10px 12px",
  background: "#050a14",
  border: "1px solid rgba(0,229,255,0.2)",
  borderRadius: "6px",
  color: "#e0eaff",
  fontSize: "14px",
  marginBottom: "16px",
  boxSizing: "border-box",
  fontFamily: "'Rajdhani', sans-serif",
};

const labelStyle = {
  fontSize: "11px",
  color: "#00e5ff",
  letterSpacing: "1px",
  textTransform: "uppercase",
  display: "block",
  marginBottom: "4px",
};

export default function NewShopPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    name: "", area: "", category: "", address: "",
    budget: "", tags: "", highlightName: "", highlightGenre: "",
    lastOrder: "", walkMinutes: "", siteurlSrc: "", mapEmbedSrc: "", notes: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    setLoading(true);
    const body = {
      ...form,
      walkMinutes: form.walkMinutes ? Number(form.walkMinutes) : undefined,
    };
    const res = await fetch("/api/admin/shops", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });
    setLoading(false);
    if (res.ok) {
      router.push("/admin");
    } else {
      const err = await res.json().catch(() => ({}));
      alert("登録に失敗しました\n" + JSON.stringify(err, null, 2));
    }
  };

  return (
    <div style={{
      minHeight: "100vh",
      background: "#050a14",
      color: "#e0eaff",
      fontFamily: "'Rajdhani', sans-serif",
      padding: "40px 24px",
      maxWidth: "720px",
      margin: "0 auto",
    }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "32px" }}>
        <h1 style={{ fontFamily: "'Orbitron', sans-serif", fontSize: "16px", color: "#00e5ff", letterSpacing: "2px" }}>
          ADD SHOP
        </h1>
        <button onClick={() => router.push("/admin")} style={{
          padding: "8px 16px", background: "transparent",
          border: "1px solid #7b93bc", borderRadius: "4px",
          color: "#7b93bc", fontSize: "11px", cursor: "pointer",
        }}>← BACK</button>
      </div>

      <div style={{ height: "1px", background: "linear-gradient(90deg, #7b2fff, #00e5ff, #ff00aa)", marginBottom: "32px" }} />

      {[
        { label: "店名 *", name: "name" },
        { label: "エリア", name: "area" },
        { label: "カテゴリ", name: "category" },
        { label: "住所", name: "address" },
        { label: "予算", name: "budget" },
        { label: "タグ（カンマ区切り）", name: "tags" },
        { label: "目玉商品名", name: "highlightName" },
        { label: "ジャンル", name: "highlightGenre" },
        { label: "ラストオーダー", name: "lastOrder" },
        { label: "徒歩何分", name: "walkMinutes" },
        { label: "サイトURL", name: "siteurlSrc" },
        { label: "地図URL", name: "mapEmbedSrc" },
        { label: "備考", name: "notes", multiline: true },
      ].map(({ label, name, multiline }) => (
        <div key={name}>
          <label style={labelStyle}>{label}</label>
          {multiline ? (
            <textarea
              name={name}
              value={form[name]}
              onChange={handleChange}
              style={{ ...inputStyle, height: "80px", resize: "vertical" }}
            />
          ) : (
            <input
              name={name}
              value={form[name]}
              onChange={handleChange}
              style={inputStyle}
            />
          )}
        </div>
      ))}

      <button
        onClick={handleSubmit}
        disabled={loading}
        style={{
          width: "100%", padding: "12px",
          background: "transparent",
          border: "1px solid #00e5ff",
          borderRadius: "6px", color: "#00e5ff",
          fontFamily: "'Orbitron', sans-serif",
          fontSize: "12px", letterSpacing: "1px",
          cursor: loading ? "not-allowed" : "pointer",
          opacity: loading ? 0.5 : 1,
        }}
      >
        {loading ? "登録中..." : "REGISTER"}
      </button>
    </div>
  );
}