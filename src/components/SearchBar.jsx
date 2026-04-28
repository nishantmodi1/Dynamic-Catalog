export default function SearchBar({ value, onChange }) {
  return (
    <div className="relative w-full max-w-md">
      {/* Icon */}
      <div
        className="absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none"
        style={{ color: 'rgba(255,255,255,0.3)' }}
      >
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="11" cy="11" r="8" />
          <path d="m21 21-4.35-4.35" />
        </svg>
      </div>

      <input
        type="text"
        value={value}
        onChange={e => onChange(e.target.value)}
        placeholder="Search items, categories..."
        className="w-full pl-10 pr-10 py-2.5 rounded-xl text-sm font-jakarta outline-none transition-all duration-200"
        style={{
          background: 'rgba(255,255,255,0.05)',
          border: '1px solid rgba(255,255,255,0.1)',
          color: 'rgba(255,255,255,0.85)',
          caretColor: '#E63946',
        }}
        onFocus={e => {
          e.target.style.background = 'rgba(255,255,255,0.07)'
          e.target.style.borderColor = 'rgba(255,255,255,0.2)'
          e.target.style.boxShadow = '0 0 0 3px rgba(230,57,70,0.1)'
        }}
        onBlur={e => {
          e.target.style.background = 'rgba(255,255,255,0.05)'
          e.target.style.borderColor = 'rgba(255,255,255,0.1)'
          e.target.style.boxShadow = 'none'
        }}
      />

      {/* Clear button */}
      {value && (
        <button
          onClick={() => onChange('')}
          className="absolute right-3 top-1/2 -translate-y-1/2 transition-all duration-150 hover:scale-110"
          style={{ color: 'rgba(255,255,255,0.3)' }}
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M18 6 6 18M6 6l12 12" />
          </svg>
        </button>
      )}
    </div>
  )
}
