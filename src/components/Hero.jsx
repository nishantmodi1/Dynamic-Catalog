import { CATEGORY_CONFIG } from '../config/Catagories'

export default function Hero({ totalItems }) {
  const categories = Object.entries(CATEGORY_CONFIG)

  return (
    <div className="relative pt-28 pb-16 overflow-hidden">
      {/* Ambient background blobs */}
      <div
        className="absolute top-10 left-1/4 w-96 h-96 rounded-full pointer-events-none"
        style={{
          background: 'radial-gradient(circle, rgba(230,57,70,0.08) 0%, transparent 70%)',
          filter: 'blur(40px)',
        }}
      />
      <div
        className="absolute top-20 right-1/4 w-80 h-80 rounded-full pointer-events-none"
        style={{
          background: 'radial-gradient(circle, rgba(76,201,240,0.07) 0%, transparent 70%)',
          filter: 'blur(40px)',
        }}
      />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        {/* Title */}
        <h1
          className="font-syne font-extrabold text-white my-4"
          style={{
            fontSize: 'clamp(2.5rem, 6vw, 5rem)',
            lineHeight: 1.05,
            letterSpacing: '-0.03em',
          }}
        >
          Everything in one{' '}
          <span
            style={{
              background: 'linear-gradient(135deg, #E63946 0%, #F4A261 50%, #4CC9F0 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}
          >
            place.
          </span>
        </h1>

        <p
          className="font-jakarta max-w-lg mx-auto mb-10 text-base"
          style={{ color: 'rgba(255,255,255,0.45)', lineHeight: 1.7 }}
        >
          Browse cars, bikes, phones, and computers. Tap any item to explore
          its full spec sheet.
        </p>

      </div>
    </div>
  )
}
