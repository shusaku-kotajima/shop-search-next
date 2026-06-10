// src/components/SearchForm.jsx

function SearchForm({
  keyword,
  selectedArea,
  selectedCategory,
  areas,
  categories,
  onKeywordChange,
  onKeywordCommit,
  onAreaChange,
  onCategoryChange,
  onReset,
}) {
  return (
    <section className="card search-card">
      <h2 className="card-title">検索条件</h2>

      <div className="form-row">
        <label className="form-label">
          キーワード（店名・タグ）
          <input
            type="text"
            value={keyword}
            onChange={(e) => onKeywordChange(e.target.value)}
            onBlur={onKeywordCommit}
            onKeyDown={(e) => e.key === "Enter" && onKeywordCommit()}
            placeholder="例：ラーメン / カフェ / 個室"
            className="input text-input"
          />
        </label>
      </div>

      <div className="form-row form-row-inline">
        <label className="form-label">
          エリア
          <select
            value={selectedArea}
            onChange={(e) => onAreaChange(e.target.value)}
            className="input select-input"
          >
            <option value="">すべて</option>
            {areas.map((area) => (
              <option key={`area-${area}`} value={area}>
                {area}
              </option>
            ))}
          </select>
        </label>

        <label className="form-label">
          ジャンル
          <select
            value={selectedCategory}
            onChange={(e) => onCategoryChange(e.target.value)}
            className="input select-input"
          >
            <option value="">すべて</option>
            {categories.map((category) => (
              <option key={`category-${category}`} value={category}>
                {category}
              </option>
            ))}
          </select>
        </label>
      </div>

      <div className="form-actions">
        <button
          type="button"
          onClick={onReset}
          className="button button-secondary"
        >
          条件をリセット
        </button>
      </div>
    </section>
  );
}

export default SearchForm;
