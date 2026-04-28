import { useState, useMemo } from 'react'
import catalog from '../config/catalog.json'
import { CATEGORY_CONFIG } from '../config/categories'
import Hero from '../components/Hero'
import CategoryFilter from '../components/CategoryFilter'
import CategorySection from '../components/CategorySection'
import SearchBar from '../components/SearchBar'
import ItemCard from '../components/ItemCard'

export default function Home() {
  const [activeCategory, setActiveCategory] = useState('All')
  const [search, setSearch] = useState('')

  // Count per category
  const counts = useMemo(() => {
    const c = {}
    catalog.forEach(item => {
      c[item.category] = (c[item.category] || 0) + 1
    })
    return c
  }, [])

  // Filtered items based on search + category
  const filtered = useMemo(() => {
    let items = catalog
    if (activeCategory !== 'All') {
      items = items.filter(i => i.category === activeCategory)
    }
    if (search.trim()) {
      const q = search.toLowerCase()
      items = items.filter(
        i =>
          i.itemname.toLowerCase().includes(q) ||
          i.category.toLowerCase().includes(q) ||
          i.itemprops.some(
            p =>
              p.label.toLowerCase().includes(q) ||
              p.value.toLowerCase().includes(q)
          )
      )
    }
    return items
  }, [activeCategory, search])

  // Group by category (for 'All' grouped view, unless searching)
  const grouped = useMemo(() => {
    if (activeCategory !== 'All' || search.trim()) return null
    const g = {}
    filtered.forEach(item => {
      if (!g[item.category]) g[item.category] = []
      g[item.category].push(item)
    })
    return g
  }, [activeCategory, search, filtered])

  const isSearching = search.trim().length > 0
  const isSingleCategory = activeCategory !== 'All'

  return (
    <main>
      <Hero totalItems={catalog.length} />

      {/* Controls bar */}
      <div
        className="sticky top-16 z-40 py-3"
        style={{
          background: 'rgba(7,9,15,0.88)',
          backdropFilter: 'blur(16px)',
          WebkitBackdropFilter: 'blur(16px)',
          borderBottom: '1px solid rgba(255,255,255,0.05)',
        }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
            <div className="flex-1">
              <CategoryFilter
                active={activeCategory}
                onChange={cat => {
                  setActiveCategory(cat)
                  setSearch('')
                }}
                counts={counts}
              />
            </div>
            <SearchBar value={search} onChange={setSearch} />
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">

        {/* Search results */}
        {isSearching && (
          <div>
            <div className="flex items-center gap-3 mb-8">
              <p className="font-jakarta text-sm" style={{ color: 'rgba(255,255,255,0.4)' }}>
                {filtered.length === 0
                  ? 'No results for '
                  : `${filtered.length} result${filtered.length !== 1 ? 's' : ''} for `}
                <span className="text-white font-semibold">"{search}"</span>
              </p>
            </div>

            {filtered.length === 0 ? (
              <EmptyState search={search} onClear={() => setSearch('')} />
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
                {filtered.map((item, i) => (
                  <div key={item.itemname} className="fade-up" style={{ animationDelay: `${i * 40}ms` }}>
                    <ItemCard item={item} index={i} />
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Single category flat grid */}
        {!isSearching && isSingleCategory && (
          <div>
            <div className="flex items-center justify-between mb-8">
              <div className="flex items-center gap-3">
                <div
                  className="w-1 h-8 rounded-full"
                  style={{ background: CATEGORY_CONFIG[activeCategory]?.color }}
                />
                <h2 className="font-syne font-bold text-white text-2xl" style={{ letterSpacing: '-0.02em' }}>
                  {CATEGORY_CONFIG[activeCategory]?.emoji} {activeCategory}
                </h2>
              </div>
              <span
                className="text-sm font-jakarta"
                style={{ color: 'rgba(255,255,255,0.35)' }}
              >
                {filtered.length} items
              </span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
              {filtered.map((item, i) => (
                <div key={item.itemname} className="fade-up" style={{ animationDelay: `${i * 40}ms` }}>
                  <ItemCard item={item} index={i} />
                </div>
              ))}
            </div>
          </div>
        )}

        {/* All categories grouped */}
        {!isSearching && !isSingleCategory && grouped && (
          Object.entries(grouped).map(([cat, items]) => (
            <CategorySection key={cat} category={cat} items={items} />
          ))
        )}
      </div>
    </main>
  )
}

function EmptyState({ search, onClear }) {
  return (
    <div className="flex flex-col items-center justify-center py-24 text-center">
      <div className="text-5xl mb-4">🔍</div>
      <h3 className="font-syne font-bold text-white text-xl mb-2">
        Nothing found
      </h3>
      <p className="font-jakarta text-sm mb-6" style={{ color: 'rgba(255,255,255,0.35)' }}>
        No items match <span className="text-white">"{search}"</span>. Try a different keyword.
      </p>
      <button
        onClick={onClear}
        className="px-4 py-2 rounded-xl text-sm font-semibold font-jakarta transition-all duration-200"
        style={{
          background: 'rgba(230,57,70,0.15)',
          color: '#E63946',
          border: '1px solid rgba(230,57,70,0.3)',
        }}
        onMouseEnter={e => e.currentTarget.style.background = 'rgba(230,57,70,0.25)'}
        onMouseLeave={e => e.currentTarget.style.background = 'rgba(230,57,70,0.15)'}
      >
        Clear search
      </button>
    </div>
  )
}
