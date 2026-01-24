export const BadgeIcons = {
  FirstCommit: ({ className = "w-full h-full" }) => (
    <svg
      viewBox="0 0 100 100"
      className={className}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <linearGradient
          id="leafGradient"
          x1="20"
          y1="80"
          x2="80"
          y2="20"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#4ade80" />
          <stop offset="1" stopColor="#22c55e" />
        </linearGradient>
        <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
          <feGaussianBlur stdDeviation="2" result="blur" />
          <feComposite in="SourceGraphic" in2="blur" operator="over" />
        </filter>
      </defs>
      <circle
        cx="50"
        cy="50"
        r="45"
        stroke="url(#leafGradient)"
        strokeWidth="2"
        strokeOpacity="0.3"
        fill="#22c55e"
        fillOpacity="0.1"
      />
      <path
        d="M50 80V50"
        stroke="#22c55e"
        strokeWidth="4"
        strokeLinecap="round"
      />
      <path
        d="M50 50C50 50 30 45 25 30C22 20 30 15 35 15C45 15 50 50 50 50Z"
        fill="url(#leafGradient)"
        filter="url(#glow)"
      />
      <path
        d="M50 50C50 50 70 45 75 30C78 20 70 15 65 15C55 15 50 50 50 50Z"
        fill="url(#leafGradient)"
        filter="url(#glow)"
      />
    </svg>
  ),

  Consistency: ({ className = "w-full h-full" }) => (
    <svg
      viewBox="0 0 100 100"
      className={className}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <linearGradient
          id="fireGradient"
          x1="50"
          y1="100"
          x2="50"
          y2="0"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#f97316" />
          <stop offset="0.5" stopColor="#ef4444" />
          <stop offset="1" stopColor="#fbbf24" />
        </linearGradient>
        <radialGradient
          id="fireGlow"
          cx="50"
          cy="60"
          r="40"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#f97316" stopOpacity="0.4" />
          <stop offset="1" stopColor="#f97316" stopOpacity="0" />
        </radialGradient>
      </defs>
      <circle
        cx="50"
        cy="50"
        r="45"
        stroke="#f97316"
        strokeWidth="2"
        strokeOpacity="0.3"
        fill="url(#fireGlow)"
      />
      <path
        d="M50 85C50 85 75 70 75 45C75 25 60 15 50 15C40 15 25 25 25 45C25 70 50 85 50 85Z"
        fill="url(#fireGradient)"
      />
      <path
        d="M50 80C50 80 65 65 65 45C65 30 55 25 50 25C45 25 35 30 35 45C35 65 50 80 50 80Z"
        fill="#feb019"
        fillOpacity="0.6"
      />
    </svg>
  ),

  Momentum: ({ className = "w-full h-full" }) => (
    <svg
      viewBox="0 0 100 100"
      className={className}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <linearGradient
          id="rocketBody"
          x1="30"
          y1="70"
          x2="70"
          y2="30"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#3b82f6" />
          <stop offset="1" stopColor="#60a5fa" />
        </linearGradient>
      </defs>
      <circle
        cx="50"
        cy="50"
        r="45"
        stroke="#3b82f6"
        strokeWidth="2"
        strokeOpacity="0.3"
        fill="#3b82f6"
        fillOpacity="0.05"
      />
      <path
        d="M30 70L70 30"
        stroke="#94a3b8"
        strokeWidth="2"
        strokeDasharray="4 4"
      />
      {/* Rocket body */}
      <path d="M40 80L35 65L45 55L60 70L55 85L40 80Z" fill="#ef4444" />
      <path
        d="M35 65L75 25C80 20 85 20 85 25C85 25 85 30 80 35L40 75L35 65Z"
        fill="url(#rocketBody)"
      />
      {/* Window */}
      <circle cx="65" cy="45" r="5" fill="#bae6fd" />
    </svg>
  ),

  Explorer: ({ className = "w-full h-full" }) => (
    <svg
      viewBox="0 0 100 100"
      className={className}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <linearGradient
          id="globeGradient"
          x1="20"
          y1="80"
          x2="80"
          y2="20"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#0ea5e9" />
          <stop offset="1" stopColor="#38bdf8" />
        </linearGradient>
      </defs>
      <circle
        cx="50"
        cy="50"
        r="45"
        stroke="#0ea5e9"
        strokeWidth="2"
        strokeOpacity="0.3"
        fill="#0ea5e9"
        fillOpacity="0.05"
      />
      <circle
        cx="50"
        cy="50"
        r="30"
        stroke="url(#globeGradient)"
        strokeWidth="2"
      />
      <path
        d="M50 20V80"
        stroke="#0ea5e9"
        strokeWidth="1"
        strokeOpacity="0.5"
      />
      <path
        d="M20 50H80"
        stroke="#0ea5e9"
        strokeWidth="1"
        strokeOpacity="0.5"
      />
      <path
        d="M29 29L71 71"
        stroke="#0ea5e9"
        strokeWidth="1"
        strokeOpacity="0.3"
      />
      <path
        d="M29 71L71 29"
        stroke="#0ea5e9"
        strokeWidth="1"
        strokeOpacity="0.3"
      />
      {/* Compass Needle */}
      <path d="M50 35L55 50L50 65L45 50L50 35Z" fill="#f43f5e" />
    </svg>
  ),

  Mastery: ({ className = "w-full h-full" }) => (
    <svg
      viewBox="0 0 100 100"
      className={className}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <linearGradient
          id="goldGradient"
          x1="20"
          y1="20"
          x2="80"
          y2="80"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#eab308" />
          <stop offset="0.5" stopColor="#facc15" />
          <stop offset="1" stopColor="#a16207" />
        </linearGradient>
      </defs>
      <circle
        cx="50"
        cy="50"
        r="45"
        stroke="#eab308"
        strokeWidth="2"
        strokeOpacity="0.3"
        fill="#eab308"
        fillOpacity="0.05"
      />
      <path
        d="M30 35H70L65 60C65 70 55 75 50 75C45 75 35 70 35 60L30 35Z"
        fill="url(#goldGradient)"
      />
      <path
        d="M30 35H20C15 35 15 45 20 45H32"
        stroke="#eab308"
        strokeWidth="3"
        strokeLinecap="round"
      />
      <path
        d="M70 35H80C85 35 85 45 80 45H68"
        stroke="#eab308"
        strokeWidth="3"
        strokeLinecap="round"
      />
      <path
        d="M50 75V85M40 85H60"
        stroke="#eab308"
        strokeWidth="3"
        strokeLinecap="round"
      />
    </svg>
  ),

  RisingStar: ({ className = "w-full h-full" }) => (
    <svg
      viewBox="0 0 100 100"
      className={className}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <linearGradient
          id="starGradient"
          x1="50"
          y1="0"
          x2="50"
          y2="100"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#8b5cf6" />
          <stop offset="1" stopColor="#d946ef" />
        </linearGradient>
      </defs>
      <circle
        cx="50"
        cy="50"
        r="45"
        stroke="#8b5cf6"
        strokeWidth="2"
        strokeOpacity="0.3"
        fill="#8b5cf6"
        fillOpacity="0.05"
      />
      <path
        d="M50 15L61 40L88 40L66 58L75 83L50 68L25 83L34 58L12 40L39 40L50 15Z"
        fill="url(#starGradient)"
        stroke="#c026d3"
        strokeWidth="1"
      />
    </svg>
  ),

  Dedicated: ({ className = "w-full h-full" }) => (
    <svg
      viewBox="0 0 100 100"
      className={className}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <linearGradient
          id="shieldGradient"
          x1="20"
          y1="20"
          x2="80"
          y2="80"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#14b8a6" />
          <stop offset="1" stopColor="#0f766e" />
        </linearGradient>
      </defs>
      <circle
        cx="50"
        cy="50"
        r="45"
        stroke="#14b8a6"
        strokeWidth="2"
        strokeOpacity="0.3"
        fill="#14b8a6"
        fillOpacity="0.05"
      />
      <path
        d="M50 20L80 30V55C80 75 50 90 50 90C50 90 20 75 20 55V30L50 20Z"
        fill="url(#shieldGradient)"
      />
      <path d="M50 35L60 60H40L50 35Z" fill="#ccfbf1" fillOpacity="0.5" />
    </svg>
  ),
};
