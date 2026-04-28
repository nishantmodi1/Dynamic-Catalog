import { useLocation, useNavigate, useParams } from 'react-router-dom'
import { useEffect, useState } from 'react'
import catalog from '../config/catalog.json'
import { CATEGORY_CONFIG } from '../config/Catagories'

function slugify(name) {
  return name.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '')
}

export default function ItemDetail() {
  const { state } = useLocation()
  const { itemSlug } = useParams()
  const navigate = useNavigate()
  const [imgLoaded, setImgLoaded] = useState(false)
  const [imgError, setImgError] = useState(false)

  // Support direct URL access (no router state)
  const item = state?.item || catalog.find(i => slugify(i.itemname) === itemSlug)
  const config = item ? CATEGORY_CONFIG[item.category] : {}

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  if (!item) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen text-center px-4">
        <div className="text-5xl mb-4">😕</div>
        <h2 className="font-syne font-bold text-white text-2xl mb-2">Item not found</h2>
        <p className="font-jakarta text-sm mb-6" style={{ color: 'rgba(255,255,255,0.4)' }}>
          The item you're looking for doesn't exist.
        </p>
        <button
          onClick={() => navigate('/')}
          className="px-5 py-2.5 rounded-xl text-sm font-semibold font-jakarta"
          style={{ background: '#E63946', color: 'white' }}
        >
          Go home
        </button>
      </div>
    )
  }

  // Related items — same category, excluding current
  const related = catalog
    .filter(i => i.category === item.category && i.itemname !== item.itemname)
    .slice(0, 4)

  return (
    <main className="min-h-screen pb-20">
      {/* Hero */}
      <div
        className="relative pt-20 overflow-hidden"
        style={{
          background: `linear-gradient(180deg, ${config.glow || 'rgba(0,0,0,0)'} 0%, transparent 100%)`,
        }}
      >
        {/* Glow blob */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: `radial-gradient(ellipse at 50% 0%, ${config.glow || 'transparent'} 0%, transparent 65%)`,
          }}
        />

        <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-10">
          {/* Breadcrumb */}
          <div className="flex items-center gap-2 mb-8 text-sm font-jakarta">
            <button
              onClick={() => navigate('/')}
              className="transition-colors duration-150 hover:text-white"
              style={{ color: 'rgba(255,255,255,0.35)' }}
            >
              Home
            </button>
            <span style={{ color: 'rgba(255,255,255,0.2)' }}>/</span>
            <button
              onClick={() => navigate('/')}
              className="transition-colors duration-150 hover:text-white"
              style={{ color: 'rgba(255,255,255,0.35)' }}
            >
              {item.category}
            </button>
            <span style={{ color: 'rgba(255,255,255,0.2)' }}>/</span>
            <span style={{ color: 'rgba(255,255,255,0.65)' }}>{item.itemname}</span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
            {/* Image */}
            <div
              className="relative rounded-2xl overflow-hidden fade-up"
              style={{
                border: `1px solid ${config.border || 'rgba(255,255,255,0.08)'}`,
                background: '#0d1117',
                aspectRatio: '4/3',
              }}
            >
              {!imgLoaded && !imgError && (
                <div className="absolute inset-0 shimmer" />
              )}

              {!imgError ? (
                <img
                  src={item.image}
                  alt={item.itemname}
                  className="w-full h-full object-cover transition-opacity duration-500"
                  style={{ opacity: imgLoaded ? 1 : 0 }}
                  onLoad={() => setImgLoaded(true)}
                  onError={() => { setImgError(true); setImgLoaded(true) }}
                />
              ) : (
                <div
                  className="w-full h-full flex flex-col items-center justify-center gap-3"
                  style={{ background: config.bg }}
                >
                  <span className="text-6xl">{config.emoji}</span>
                  <span className="text-sm font-jakarta" style={{ color: 'rgba(255,255,255,0.3)' }}>
                    Image unavailable
                  </span>
                </div>
              )}

              {/* Category badge */}
              <div
                className="absolute top-4 left-4 flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold font-jakarta"
                style={{
                  background: 'rgba(7,9,15,0.85)',
                  backdropFilter: 'blur(8px)',
                  color: config.color,
                  border: `1px solid ${config.border}`,
                }}
              >
                {config.emoji} {item.category}
              </div>
            </div>

            {/* Info */}
            <div className="fade-up" style={{ animationDelay: '100ms' }}>
              <div className="mb-6">
                <h1
                  className="font-syne font-extrabold text-white mb-3"
                  style={{
                    fontSize: 'clamp(2rem, 4vw, 3rem)',
                    lineHeight: 1.05,
                    letterSpacing: '-0.03em',
                  }}
                >
                  {item.itemname}
                </h1>

                <div className="flex items-center gap-2">
                  <div
                    className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-sm font-semibold font-jakarta"
                    style={{
                      background: config.bg,
                      color: config.color,
                      border: `1px solid ${config.border}`,
                    }}
                  >
                    {config.emoji} {item.category}
                  </div>
                  <span
                    className="text-sm font-jakarta"
                    style={{ color: 'rgba(255,255,255,0.3)' }}
                  >
                    {item.itemprops.length} specification{item.itemprops.length !== 1 ? 's' : ''}
                  </span>
                </div>
              </div>

              {/* Specs */}
              <div
                className="rounded-2xl p-5 mb-6"
                style={{
                  background: 'rgba(13,17,23,0.9)',
                  border: `1px solid ${config.border || 'rgba(255,255,255,0.08)'}`,
                }}
              >
                <h3
                  className="font-syne font-bold text-sm uppercase tracking-widest mb-4"
                  style={{ color: 'rgba(255,255,255,0.35)' }}
                >
                  Specifications
                </h3>
                <div className="space-y-0">
                  {item.itemprops.map((prop, i) => (
                    <div
                      key={prop.label}
                      className="flex items-center justify-between py-3"
                      style={{
                        borderBottom: i < item.itemprops.length - 1
                          ? '1px solid rgba(255,255,255,0.05)'
                          : 'none',
                      }}
                    >
                      <span
                        className="font-jakarta text-sm"
                        style={{ color: 'rgba(255,255,255,0.4)' }}
                      >
                        {prop.label}
                      </span>
                      <span
                        className="font-jakarta font-semibold text-sm text-right max-w-[60%]"
                        style={{ color: 'rgba(255,255,255,0.9)' }}
                      >
                        {prop.value}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Action buttons */}
              <div className="flex items-center gap-3">
                <button
                  onClick={() => navigate('/')}
                  className="flex-1 flex items-center justify-center gap-2 py-3 rounded-xl text-sm font-semibold font-jakarta transition-all duration-200"
                  style={{
                    background: config.color,
                    color: '#07090f',
                  }}
                  onMouseEnter={e => e.currentTarget.style.opacity = '0.88'}
                  onMouseLeave={e => e.currentTarget.style.opacity = '1'}
                >
                  ← Back to Catalog
                </button>
                <button
                  className="px-4 py-3 rounded-xl text-sm font-semibold font-jakarta transition-all duration-200"
                  style={{
                    background: 'rgba(255,255,255,0.05)',
                    color: 'rgba(255,255,255,0.55)',
                    border: '1px solid rgba(255,255,255,0.1)',
                  }}
                  onMouseEnter={e => {
                    e.currentTarget.style.background = 'rgba(255,255,255,0.09)'
                    e.currentTarget.style.color = 'white'
                  }}
                  onMouseLeave={e => {
                    e.currentTarget.style.background = 'rgba(255,255,255,0.05)'
                    e.currentTarget.style.color = 'rgba(255,255,255,0.55)'
                  }}
                  onClick={() => {
                    navigator.clipboard?.writeText(window.location.href)
                  }}
                  title="Copy link"
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8" />
                    <polyline points="16 6 12 2 8 6" />
                    <line x1="12" y1="2" x2="12" y2="15" />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Related items */}
      {related.length > 0 && (
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 mt-20">
          <div className="flex items-center gap-3 mb-6">
            <div
              className="w-1 h-6 rounded-full"
              style={{ background: config.color }}
            />
            <h2 className="font-syne font-bold text-white text-xl">
              More in {item.category}
            </h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {related.map((rel, i) => {
              const rc = CATEGORY_CONFIG[rel.category]
              return (
                <div
                  key={rel.itemname}
                  className="rounded-2xl overflow-hidden cursor-pointer transition-all duration-250 fade-up"
                  style={{
                    background: 'rgba(13,17,23,0.9)',
                    border: `1px solid ${rc.border}`,
                    animationDelay: `${i * 60}ms`,
                  }}
                  onClick={() =>
                    navigate(`/item/${slugify(rel.itemname)}`, { state: { item: rel } })
                  }
                  onMouseEnter={e => {
                    e.currentTarget.style.transform = 'translateY(-3px)'
                    e.currentTarget.style.borderColor = rc.color
                  }}
                  onMouseLeave={e => {
                    e.currentTarget.style.transform = 'translateY(0)'
                    e.currentTarget.style.borderColor = rc.border
                  }}
                >
                  <div style={{ height: '140px', overflow: 'hidden', background: '#0d1117' }}>
                    <img
                      src={rel.image}
                      alt={rel.itemname}
                      className="w-full h-full object-cover"
                      style={{ transition: 'transform 0.4s ease' }}
                      onMouseEnter={e => e.target.style.transform = 'scale(1.06)'}
                      onMouseLeave={e => e.target.style.transform = 'scale(1)'}
                      onError={e => e.target.style.display = 'none'}
                    />
                  </div>
                  <div className="p-3">
                    <p className="font-syne font-bold text-white text-sm">{rel.itemname}</p>
                    {rel.itemprops[0] && (
                      <p className="font-jakarta text-xs mt-1" style={{ color: 'rgba(255,255,255,0.35)' }}>
                        <span style={{ color: rc.color }}>{rel.itemprops[0].label}:</span>{' '}
                        {rel.itemprops[0].value}
                      </p>
                    )}
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      )}
    </main>
  )
}
