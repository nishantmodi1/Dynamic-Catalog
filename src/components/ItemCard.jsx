import { useNavigate } from 'react-router-dom'
import { useState } from 'react'
import { CATEGORY_CONFIG } from '../config/categories'

function slugify(name) {
  return name.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '')
}

export default function ItemCard({ item, index }) {
  const navigate = useNavigate()
  const [imgError, setImgError] = useState(false)
  const [imgLoaded, setImgLoaded] = useState(false)
  const config = CATEGORY_CONFIG[item.category] || {}

  const handleClick = () => {
    navigate(`/item/${slugify(item.itemname)}`, { state: { item } })
  }

  return (
    <div
      className="card-root group relative rounded-2xl overflow-hidden cursor-pointer transition-all duration-300"
      style={{
        background: 'rgba(13,17,23,0.9)',
        border: `1px solid ${config.border || 'rgba(255,255,255,0.08)'}`,
        animationDelay: `${index * 60}ms`,
        animationFillMode: 'both',
      }}
      onClick={handleClick}
      onMouseEnter={e => {
        e.currentTarget.style.transform = 'translateY(0px)'
        e.currentTarget.style.boxShadow = `0 20px 60px ${config.glow || 'rgba(0,0,0,0.3)'}`
        e.currentTarget.style.borderColor = config.color || 'rgba(255,255,255,0.2)'
      }}
      onMouseLeave={e => {
        e.currentTarget.style.transform = 'translateY(0)'
        e.currentTarget.style.boxShadow = 'none'
        e.currentTarget.style.borderColor = config.border || 'rgba(255,255,255,0.08)'
      }}
    >
      {/* Image */}
      <div
        className="relative overflow-hidden"
        style={{ height: '190px', background: '#0d1117' }}
      >
        {!imgLoaded && !imgError && (
          <div className="absolute inset-0 shimmer" />
        )}
        {!imgError ? (
          <img
            src={item.image}
            alt={item.itemname}
            className="card-img w-full h-full object-cover"
            style={{ opacity: imgLoaded ? 1 : 0, transition: 'opacity 0.4s ease' }}
            onLoad={() => setImgLoaded(true)}
            onError={() => setImgError(true)}
          />
        ) : (
          <div
            className="w-full h-full flex flex-col items-center justify-center gap-2"
            style={{ background: config.bg }}
          >
            <span className="text-4xl">{config.emoji}</span>
            <span className="text-xs" style={{ color: 'rgba(255,255,255,0.3)' }}>
              No image
            </span>
          </div>
        )}

        {/* Category pill */}
        <div
          className="absolute top-3 right-3 flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold font-jakarta"
          style={{
            background: 'rgba(7,9,15,0.85)',
            backdropFilter: 'blur(8px)',
            color: config.color,
            border: `1px solid ${config.border}`,
          }}
        >
          <span style={{ fontSize: '10px' }}>{config.emoji}</span>
          {item.category}
        </div>

        {/* Gradient overlay */}
        <div
          className="absolute bottom-0 left-0 right-0 h-16"
          style={{
            background: 'linear-gradient(to top, rgba(13,17,23,0.95), transparent)',
          }}
        />
      </div>

      {/* Content */}
      <div className="p-4">
        <h3
          className="font-syne font-bold text-white text-base leading-tight mb-2 group-hover:text-opacity-90"
        >
          {item.itemname}
        </h3>

        {/* Props */}
        <div className="flex flex-wrap gap-1.5">
          {item.itemprops.slice(0, 3).map((prop) => (
            <span
              key={prop.label}
              className="text-xs px-2 py-0.5 rounded-md font-jakarta"
              style={{
                background: config.bg,
                color: 'rgba(255,255,255,0.55)',
                border: `1px solid ${config.border}`,
              }}
            >
              <span style={{ color: config.color, fontWeight: 600 }}>
                {prop.label}:
              </span>{' '}
              {prop.value}
            </span>
          ))}
          {item.itemprops.length > 3 && (
            <span
              className="text-xs px-2 py-0.5 rounded-md font-jakarta"
              style={{
                background: 'rgba(255,255,255,0.04)',
                color: 'rgba(255,255,255,0.3)',
              }}
            >
              +{item.itemprops.length - 3} more
            </span>
          )}
        </div>

        {/* View arrow */}
        <div
          className="mt-3 flex items-center gap-1 text-xs font-medium transition-all duration-200 opacity-0 group-hover:opacity-100 -translate-x-1 group-hover:translate-x-0"
          style={{ color: config.color }}
        >
          View details
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M5 12h14M12 5l7 7-7 7" />
          </svg>
        </div>
      </div>
    </div>
  )
}
