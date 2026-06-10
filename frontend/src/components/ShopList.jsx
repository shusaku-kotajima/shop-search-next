// src/components/ShopList.jsx

function ShopList({ shops, onSelectShop }) {
  return (
    <section className="results-section">
      <div className="results-header">
        <h2 className="card-title">検索結果</h2>
        <span className="results-count">{shops.length}件</span>
      </div>

      {shops.length === 0 ? (
        <p className="results-empty">条件に合うお店がありませんでした。</p>
      ) : (
        <ul className="shop-list">
          {shops.map((shop) => (
            <li
              key={shop.id}
              className="card shop-card shop-card-clickable"
              onClick={() => onSelectShop(shop)}
            >
              <div className="shop-card-inner">
                {/* 左側：テキスト情報 */}
                <div className="shop-info">
                  <p className="shop-label">お店名前</p>
                  <h3 className="shop-name">{shop.name}</h3>

                  <p className="shop-highlight">
                    <span className="shop-highlight-label">おすすめ商品：</span>
                    {shop.highlightName}（{shop.highlightGenre}）
                  </p>

                  <p className="shop-meta">
                    {shop.area} / {shop.category}
                  </p>

                  <p className="shop-budget">予算：{shop.budget}</p>

                  <p className="shop-lo">
                    L.O.：{shop.lastOrder} ／ 徒歩約 {shop.walkMinutes} 分
                  </p>

                  <p className="shop-address">住所：{shop.address}</p>

                  <p className="shop-tags">
                    タグ：<span>{shop.tags.join("、")}</span>
                  </p>

                  <button
                    type="button"
                    className="button button-link"
                    onClick={(e) => {
                      e.stopPropagation(); // カード全体のクリックを止める
                      onSelectShop(shop);
                    }}
                  >
                    地図を大きく見る
                  </button>
                </div>

                {/* 右側：サムネ画像 */}
                <div className="shop-thumbnail-area">
                  <img
                    src={shop.thumbnailUrl}
                    alt={shop.highlightName}
                    className="shop-thumbnail"
                  />
                </div>
              </div>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}

export default ShopList;
