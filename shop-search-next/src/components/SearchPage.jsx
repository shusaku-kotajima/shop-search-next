"use client";

import "../app/App.css";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useShopSearch } from "../hooks/useShopSearch";
import SearchForm from "./SearchForm";
import ShopList from "./ShopList";

export default function SearchPage() {
  const {
    keyword,
    handleKeywordChange,
    handleKeywordCommit,
    selectedArea,
    setSelectedArea,
    selectedCategory,
    setSelectedCategory,
    areas,
    categories,
    filteredShops,
    loading,
    error,
    handleReset,
  } = useShopSearch();

  const router = useRouter();
  const [rouletteShop, setRouletteShop] = useState(null);
  const [isSpinning, setIsSpinning] = useState(false);

  const handleRoulette = () => {
    if (filteredShops.length === 0) return;
    setIsSpinning(true);
    setRouletteShop(null);
    setTimeout(() => {
      const picked = filteredShops[Math.floor(Math.random() * filteredShops.length)];
      setRouletteShop(picked);
      setIsSpinning(false);
    }, 800);
  };

  if (loading) {
    return <div className="app">読み込み中...</div>;
  }

  if (error) {
    return <div className="app">エラー：{error}</div>;
  }

  return (
    <div className="app">
      <header className="app-header">
        <h1 className="app-title">お店検索アプリ（仮）</h1>
        <p className="app-subtitle">
          気になるお店をキーワードやエリアでサクッと検索
        </p>
      </header>

      <main className="app-main">
        <SearchForm
          keyword={keyword}
          selectedArea={selectedArea}
          selectedCategory={selectedCategory}
          areas={areas}
          categories={categories}
          onKeywordChange={handleKeywordChange}
          onKeywordCommit={handleKeywordCommit}
          onAreaChange={setSelectedArea}
          onCategoryChange={setSelectedCategory}
          onReset={handleReset}
        />

        <div style={{ textAlign: "center", margin: "16px 0" }}>
          <button
            onClick={handleRoulette}
            disabled={isSpinning || filteredShops.length === 0}
            style={{
              padding: "12px 32px",
              background: "transparent",
              border: "1px solid #ff00aa",
              borderRadius: "6px",
              color: "#ff00aa",
              fontFamily: "'Orbitron', sans-serif",
              fontSize: "13px",
              letterSpacing: "1px",
              cursor: isSpinning || filteredShops.length === 0 ? "not-allowed" : "pointer",
              opacity: isSpinning || filteredShops.length === 0 ? 0.5 : 1,
            }}
          >
            {isSpinning ? "選んでいます..." : "ランダムで選ぶ"}
          </button>
        </div>

        <ShopList shops={filteredShops} />
      </main>

      {rouletteShop && (
        <div
          onClick={() => setRouletteShop(null)}
          style={{
            position: "fixed",
            inset: 0,
            background: "rgba(0,0,0,0.75)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 1000,
            padding: "24px",
          }}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            style={{
              background: "#0d1526",
              border: "1px solid rgba(0,229,255,0.3)",
              borderRadius: "8px",
              padding: "28px",
              maxWidth: "480px",
              width: "100%",
              position: "relative",
              overflow: "hidden",
            }}
          >
            <div style={{
              position: "absolute", top: 0, left: 0, right: 0, height: "2px",
              background: "linear-gradient(90deg, #7b2fff, #00e5ff, #ff00aa)",
            }} />

            <p style={{ margin: "0 0 8px", fontSize: "11px", color: "#ff00aa", letterSpacing: "2px", fontFamily: "'Orbitron', sans-serif" }}>TODAY'S PICK</p>
            <h2 style={{ margin: "0 0 16px", fontSize: "22px", fontFamily: "'Orbitron', sans-serif", color: "#e0eaff" }}>{rouletteShop.name}</h2>

            <p style={{ margin: "0 0 6px", fontSize: "14px", color: "#ff00aa" }}>
              おすすめ商品：{rouletteShop.highlightName}{rouletteShop.highlightGenre ? `（${rouletteShop.highlightGenre}）` : ""}
            </p>
            {rouletteShop.budget && <p style={{ margin: "0 0 4px", fontSize: "13px", color: "#6b7fa8" }}>予算：{rouletteShop.budget}</p>}
            {rouletteShop.walkMinutes > 0 && <p style={{ margin: "0 0 4px", fontSize: "13px", color: "#6b7fa8" }}>徒歩約 {rouletteShop.walkMinutes} 分</p>}
            {rouletteShop.lastOrder && <p style={{ margin: "0 0 4px", fontSize: "13px", color: "#6b7fa8" }}>L.O.：{rouletteShop.lastOrder}</p>}
            {rouletteShop.notes && <p style={{ margin: "8px 0 0", fontSize: "13px", color: "#ffd166" }}>備考：{rouletteShop.notes}</p>}

            <div style={{ display: "flex", gap: "12px", marginTop: "20px" }}>
              <button
                onClick={() => router.push(`/shops/${rouletteShop.id}`)}
                style={{
                  flex: 1,
                  padding: "10px",
                  background: "transparent",
                  border: "1px solid #00e5ff",
                  borderRadius: "6px",
                  color: "#00e5ff",
                  fontFamily: "'Orbitron', sans-serif",
                  fontSize: "11px",
                  letterSpacing: "1px",
                  cursor: "pointer",
                }}
              >
                詳細を見る
              </button>
              <button
                onClick={() => setRouletteShop(null)}
                style={{
                  flex: 1,
                  padding: "10px",
                  background: "transparent",
                  border: "1px solid #7b93bc",
                  borderRadius: "6px",
                  color: "#7b93bc",
                  fontFamily: "'Orbitron', sans-serif",
                  fontSize: "11px",
                  letterSpacing: "1px",
                  cursor: "pointer",
                }}
              >
                閉じる
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
