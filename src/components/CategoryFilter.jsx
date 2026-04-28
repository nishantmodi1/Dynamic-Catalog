import { CATEGORY_CONFIG, CATEGORIES } from '../config/categories'

export default function CategoryFilter({ active, onChange, counts }) {
  return (
    <div className="flex items-center gap-2 scroll-container pb-1">
      {CATEGORIES.map(cat => {
        const config = cat === 'All' ? null : CATEGORY_CONFIG[cat]
        const isActive = active === cat
        const count = cat === 'All'
          ? Object.values(counts).reduce((a, b) => a + b, 0)
          : (counts[cat] || 0)

        return (
          <button
            key={cat}
            onClick={() => onChange(cat)}
            className="cat-pill flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-sm font-semibold font-jakarta whitespace-nowrap transition-all duration-200"
            style={{
              background: isActive
                ? (config ? config.color : 'white')
                : 'rgba(255,255,255,0.05)',
              color: isActive
                ? (config ? '#07090f' : '#07090f')
                : 'rgba(255,255,255,0.5)',
              border: isActive
                ? 'none'
                : '1px solid rgba(255,255,255,0.08)',
              boxShadow: isActive && config
                ? `0 4px 20px ${config.glow}`
                : 'none',
            }}
          >
            {config && <span style={{ fontSize: '13px' }}>{config.emoji}</span>}
            {cat}
            <span
              className="text-xs px-1.5 py-0.5 rounded-md"
              style={{
                background: isActive ? 'rgba(0,0,0,0.2)' : 'rgba(255,255,255,0.08)',
                color: isActive ? 'rgba(0,0,0,0.7)' : 'rgba(255,255,255,0.3)',
                fontWeight: 600,
              }}
            >
              {count}
            </span>
          </button>
        )
      })}
    </div>
  )
}
