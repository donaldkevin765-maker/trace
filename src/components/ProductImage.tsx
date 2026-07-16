"use client"

export function ProductImage({ category, className = "" }: { category: string; className?: string }) {
  const stroke = "#ffffff"
  const fill = "none"
  const sw = 1.5

  switch (category) {
    case "Set":
      return (
        <svg viewBox="0 0 200 260" className={className} fill={fill} stroke={stroke} strokeWidth={sw} strokeLinecap="round" strokeLinejoin="round">
          {/* Stencil border */}
          <rect x="4" y="4" width="192" height="252" rx="4" strokeWidth="1.5" />
          {/* Hoodie */}
          <path d="M60 45 Q100 28 140 45 L150 50 Q155 55 155 65 L155 140 Q155 145 150 145 L50 145 Q45 145 45 140 L45 65 Q45 55 50 50 Z" />
          {/* Hood */}
          <path d="M60 45 Q65 30 80 30 L100 28 L120 30 Q135 30 140 45" />
          {/* Pants */}
          <path d="M50 145 L45 230 Q45 240 50 240 L80 240 Q85 240 85 235 L85 150" />
          <path d="M150 145 L155 230 Q155 240 150 240 L120 240 Q115 240 115 235 L115 150" />
          {/* TRACE tag */}
          <text x="100" y="200" textAnchor="middle" fontFamily="'Space Grotesk','Arial Black',sans-serif" fontSize="7" fontWeight="900" fill="#ffffff" stroke="none" letterSpacing="2">TRACE</text>
        </svg>
      )

    case "Hoodie":
      return (
        <svg viewBox="0 0 200 260" className={className} fill={fill} stroke={stroke} strokeWidth={sw} strokeLinecap="round" strokeLinejoin="round">
          <rect x="4" y="4" width="192" height="252" rx="4" strokeWidth="1.5" />
          <path d="M55 55 Q100 30 145 55 L155 60 Q160 65 160 75 L160 155 Q160 160 155 160 L45 160 Q40 160 40 155 L40 75 Q40 65 45 60 Z" />
          <path d="M55 55 Q60 35 80 35 L100 32 L120 35 Q140 35 145 55" />
          {/* Hood strings */}
          <line x1="90" y1="50" x2="85" y2="75" />
          <circle cx="85" cy="75" r="2" />
          <line x1="110" y1="50" x2="115" y2="75" />
          <circle cx="115" cy="75" r="2" />
          {/* Pocket */}
          <rect x="65" y="95" width="70" height="15" rx="3" />
          <text x="100" y="220" textAnchor="middle" fontFamily="'Space Grotesk','Arial Black',sans-serif" fontSize="7" fontWeight="900" fill="#ffffff" stroke="none" letterSpacing="2">TRACE</text>
        </svg>
      )

    case "Pants":
      return (
        <svg viewBox="0 0 200 260" className={className} fill={fill} stroke={stroke} strokeWidth={sw} strokeLinecap="round" strokeLinejoin="round">
          <rect x="4" y="4" width="192" height="252" rx="4" strokeWidth="1.5" />
          <path d="M60 40 L55 230 Q55 240 60 240 L92 240 Q97 240 97 235 L97 100 Q97 60 100 55 Q103 60 103 100 L103 235 Q103 240 108 240 L140 240 Q145 240 145 230 L140 40" />
          {/* Belt loop */}
          <rect x="70" y="42" width="60" height="6" rx="2" />
          {/* Cargo pocket left */}
          <rect x="62" y="130" width="28" height="30" rx="2" />
          <rect x="62" y="130" width="28" height="8" rx="2" />
          {/* Cargo pocket right */}
          <rect x="110" y="130" width="28" height="30" rx="2" />
          <rect x="110" y="130" width="28" height="8" rx="2" />
          <text x="100" y="220" textAnchor="middle" fontFamily="'Space Grotesk','Arial Black',sans-serif" fontSize="7" fontWeight="900" fill="#ffffff" stroke="none" letterSpacing="2">TRACE</text>
        </svg>
      )

    case "T-Shirt":
      return (
        <svg viewBox="0 0 200 260" className={className} fill={fill} stroke={stroke} strokeWidth={sw} strokeLinecap="round" strokeLinejoin="round">
          <rect x="4" y="4" width="192" height="252" rx="4" strokeWidth="1.5" />
          <path d="M60 50 Q60 38 75 35 L100 32 L125 35 Q140 38 140 50 L148 55 Q155 58 155 65 L155 155 Q155 160 150 160 L50 160 Q45 160 45 155 L45 65 Q45 58 52 55 Z" />
          {/* Collar */}
          <path d="M75 35 Q85 50 100 50 Q115 50 125 35" />
          {/* Stencil print on tee */}
          <rect x="65" y="85" width="70" height="15" rx="2" strokeWidth="1" strokeDasharray="3 2" />
          <text x="100" y="95" textAnchor="middle" fontFamily="'Space Grotesk','Arial Black',sans-serif" fontSize="7" fontWeight="900" fill="#ffffff" stroke="none" letterSpacing="2">TRACE</text>
          <text x="100" y="220" textAnchor="middle" fontFamily="'Space Grotesk','Arial Black',sans-serif" fontSize="7" fontWeight="900" fill="#ffffff" stroke="none" letterSpacing="2">TRACE</text>
        </svg>
      )

    default:
      return (
        <svg viewBox="0 0 200 260" className={className} fill={fill} stroke={stroke} strokeWidth={sw}>
          <rect x="4" y="4" width="192" height="252" rx="4" strokeWidth="1.5" />
          <text x="100" y="135" textAnchor="middle" fontFamily="'Space Grotesk','Arial Black',sans-serif" fontSize="40" fontWeight="900" fill="#ffffff" stroke="none">T</text>
        </svg>
      )
  }
}
