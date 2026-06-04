"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

const styles = {
  wrapper: {
    minHeight: "100vh",
    background: "#050a14",
    color: "#e0eaff",
    fontFamily: "'Rajdhani', sans-serif",
    padding: "40px 24px",
  },
  header: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "32px",
  },
  title: {
    fontFamily: "'Orbitron', sans-serif",
    fontSize: "18px",
    color: "#00e5ff",
    letterSpacing: "2px",
  },
  logoutBtn: {
    padding: "8px 16px",
    background: "transparent",
    border: "1px solid #ff00aa",
    borderRadius: "4px",
    color: "#ff00aa",
    fontFamily: "'Orbitron', sans-serif",
    fontSize: "11px",
    letterSpacing: "1px",
    cursor: "pointer",
  },
  addBtn: {
    padding: "8px 16px",
    background: "transparent",
    border: "1px solid #00e5ff",
    borderRadius: "4px",
    color: "#00e5ff",
    fontFamily: "'Orbitron', sans-serif",
    fontSize: "11px",
    letterSpacing: "1px",
    cursor: "pointer",
    marginRight: "12px",
  },
  card: {
    background: "#0d1526",
    border: "1px solid rgba(0,229,255,0.15)",
    borderRadius: "8px",
    padding: "16px 20px",
    marginBottom: "12px",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },
  shopName: {
    fontSize: "15px",
    fontWeight: "bold",
    color: "#e0eaff",
  },
  shopMeta: {
    fontSize: "12px",
    color: "#7b93bc",
    marginTop: "4px",
  },
  accent: { color: "#00e5ff" },
  divider: {
    height: "1px",
    background: "linear-gradient(90deg, #7b2fff, #00e5ff, #ff00aa)",
    marginBottom: "32px",
  },
  editBtn: {
    padding: "6px 12px",
    background: "transparent",
    border: "1px solid #00e5ff",
    borderRadius: "4px",
    color: "#00e5ff",
    fontSize: "11px",
    cursor: "pointer",
    marginRight: "8px",
  },
  deleteBtn: {
    padding: "6px 12px",
    background: "transparent",
    border: "1px solid #ff00aa",
    borderRadius: "4px",
    color: "#ff00aa",
    fontSize: "11px",
    cursor: "pointer",
  },
};

export default function AdminPage() {
  const [shops, setShops] = useState([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  const fetchShops = () => {
    fetch("/api/shops")
      .then((res) => res.json())
      .then((data) => {
        setShops(data);
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchShops();
  }, []);

  const handleLogout = async () => {
    await fetch("/api/admin/logout", { method: "POST" });
    router.push("/admin/login");
  };

  const handleDelete = async (id, name) => {
    if (!confirm(`「${name}」を削除しますか？`)) return;
    const res = await fetch(`/api/admin/shops/${id}`, { method: "DELETE" });
    if (res.ok) {
      fetchShops();
    } else {
      alert("削除に失敗しました");
    }
  };

  return (
    <div style={styles.wrapper}>
      <div style={styles.header}>
        <h1 style={styles.title}>ADMIN DASHBOARD</h1>
        <div>
          <button style={styles.addBtn} onClick={() => router.push("/admin/shops/new")}>
            + ADD SHOP
          </button>
          <button style={styles.logoutBtn} onClick={handleLogout}>
            LOGOUT
          </button>
        </div>
      </div>
      <div style={styles.divider} />

      <p style={{ fontSize: "13px", color: "#7b93bc", marginBottom: "20px" }}>
        店舗一覧 —{" "}
        <span style={styles.accent}>{loading ? "..." : shops.length} 件</span>
      </p>

      {loading ? (
        <p style={{ color: "#7b93bc" }}>読み込み中...</p>
      ) : (
        shops.map((shop) => (
          <div key={shop.id} style={styles.card}>
            <div>
              <p style={styles.shopName}>{shop.name}</p>
              <p style={styles.shopMeta}>
                {shop.highlightGenre} / {shop.budget}
              </p>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
              <button
                style={styles.editBtn}
                onClick={() => router.push(`/admin/shops/${shop.id}/edit`)}
              >
                EDIT
              </button>
              <button
                style={styles.deleteBtn}
                onClick={() => handleDelete(shop.id, shop.name)}
              >
                DELETE
              </button>
            </div>
          </div>
        ))
      )}
    </div>
  );
}