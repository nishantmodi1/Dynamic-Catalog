import ItemCard from './ItemCard'
import { CATEGORY_CONFIG } from '../config/Catagories'

export default function CategorySection({ category, items }) {
  const config = CATEGORY_CONFIG[category] || {}

  return (
    <section className="mb-16">
      {/* Section Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          {/* Accent bar */}
          <div
            className="w-1 h-8 rounded-full"
            style={{ background: config.color }}
          />
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xl">{config.emoji}</span>
              <h2
                className="font-syne font-bold text-white text-2xl"
                style={{ letterSpacing: '-0.02em' }}
              >
                {category}
              </h2>
            </div>
            <p
              className="text-xs font-jakarta mt-0.5"
              style={{ color: 'rgba(255,255,255,0.35)' }}
            >
              {config.description}
            </p>
          </div>
        </div>

        {/* Count badge */}
        <div
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm font-semibold font-jakarta"
          style={{
            background: config.bg,
            color: config.color,
            border: `1px solid ${config.border}`,
          }}
        >
          {items.length}
          <span style={{ color: 'rgba(255,255,255,0.4)', fontWeight: 400 }}>
            items
          </span>
        </div>
      </div>

      {/* Divider */}
      <div
        className="mb-6 h-px w-full"
        style={{
          background: `linear-gradient(to right, ${config.color}30, transparent)`,
        }}
      />

      {/* Cards grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
        {items.map((item, i) => (
          <div key={item.itemname} className="fade-up" style={{ animationDelay: `${i * 50}ms` }}>
            <ItemCard item={item} index={i} />
          </div>
        ))}
      </div>
    </section>
  )
}
