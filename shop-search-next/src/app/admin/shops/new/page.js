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
  const [thumbnailFile, setThumbnailFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [form, setForm] = useState({
    name: "", area: "", category: "", address: "",
    budget: "", tags: "", highlightName: "", highlightGenre: "",
    lastOrder: "", walkMinutes: "", siteurlSrc: "", mapEmbedSrc: "", notes: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setThumbnailFile(file);
    setPreviewUrl(URL.createObjectURL(file));
  };

  const handleSubmit = async () => {
    setLoading(true);

    let thumbnailUrl = undefined;
    if (thumbnailFile) {
      const uploadForm = new FormData();
      uploadForm.append("file", thumbnailFile);
      const uploadRes = await fetch("/api/admin/upload", {
        method: "POST",
        body: uploadForm,
      });
      if (!uploadRes.ok) {
        const err = await uploadRes.json().catch(() => ({}));
        alert("画像のアップロードに失敗しました\n" + JSON.stringify(err, null, 2));
        setLoading(false);
        return;
      }
      const uploadData = await uploadRes.json();
      thumbnailUrl = { url: uploadData.url };
    }

    const body = {
      ...form,
      walkMinutes: form.walkMinutes ? Number(form.walkMinutes) : undefined,
      ...(thumbnailUrl && { thumbnailUrl }),
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
        { label: "おすすめ商品名", name: "highlightName" },
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

      {/* 画像アップロード */}
      <div>
        <label style={labelStyle}>サムネイル画像</label>
        <input
          type="file"
          accept="image/*"
          onChange={handleFileChange}
          style={{ ...inputStyle, cursor: "pointer" }}
        />
        {previewUrl && (
          <img
            src={previewUrl}
            alt="プレビュー"
            style={{
              width: "100%",
              maxHeight: "200px",
              objectFit: "cover",
              borderRadius: "6px",
              marginBottom: "16px",
              border: "1px solid rgba(0,229,255,0.2)",
            }}
          />
        )}
      </div>

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
