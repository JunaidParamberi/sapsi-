// icons.jsx — inline SVG icon set, sized via fontSize/color (currentColor)

const Icon = ({ name, size = 24, color = "currentColor", strokeWidth = 1.6, ...rest }) => {
  const s = { width: size, height: size, color, display: "inline-block", verticalAlign: "middle", flexShrink: 0 };
  const sw = strokeWidth;
  const paths = {
    shield: (
      <g fill="none" stroke="currentColor" strokeWidth={sw} strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 3 4 6v6c0 5 3.5 8.5 8 9 4.5-.5 8-4 8-9V6l-8-3Z" />
      </g>
    ),
    shieldCheck: (
      <g fill="none" stroke="currentColor" strokeWidth={sw} strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 3 4 6v6c0 5 3.5 8.5 8 9 4.5-.5 8-4 8-9V6l-8-3Z" />
        <path d="m8.5 12 2.5 2.5L16 10" />
      </g>
    ),
    check: (
      <g fill="none" stroke="currentColor" strokeWidth={sw} strokeLinecap="round" strokeLinejoin="round">
        <path d="m5 12 4.5 4.5L19 7" />
      </g>
    ),
    checkCircle: (
      <g fill="none" stroke="currentColor" strokeWidth={sw} strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="9" />
        <path d="m8 12 3 3 5-6" />
      </g>
    ),
    badge: (
      <g fill="none" stroke="currentColor" strokeWidth={sw} strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="5" width="18" height="14" rx="2" />
        <circle cx="9" cy="11" r="2.2" />
        <path d="M14 9h4M14 12h4M7 16h10" />
      </g>
    ),
    lock: (
      <g fill="none" stroke="currentColor" strokeWidth={sw} strokeLinecap="round" strokeLinejoin="round">
        <rect x="4.5" y="10.5" width="15" height="10" rx="2" />
        <path d="M8 10.5V8a4 4 0 1 1 8 0v2.5" />
      </g>
    ),
    doc: (
      <g fill="none" stroke="currentColor" strokeWidth={sw} strokeLinecap="round" strokeLinejoin="round">
        <path d="M14 3H7a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V8l-5-5Z" />
        <path d="M14 3v5h5M8.5 13h7M8.5 17h5" />
      </g>
    ),
    docUp: (
      <g fill="none" stroke="currentColor" strokeWidth={sw} strokeLinecap="round" strokeLinejoin="round">
        <path d="M14 3H7a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V8l-5-5Z" />
        <path d="M14 3v5h5" />
        <path d="M12 18v-6m-2.5 2.5L12 12l2.5 2.5" />
      </g>
    ),
    users: (
      <g fill="none" stroke="currentColor" strokeWidth={sw} strokeLinecap="round" strokeLinejoin="round">
        <circle cx="9" cy="8" r="3.2" />
        <path d="M3.5 19a5.5 5.5 0 0 1 11 0" />
        <circle cx="16.5" cy="9" r="2.4" />
        <path d="M15 19a4 4 0 0 1 6-3.4" />
      </g>
    ),
    chart: (
      <g fill="none" stroke="currentColor" strokeWidth={sw} strokeLinecap="round" strokeLinejoin="round">
        <path d="M4 20V8M10 20v-7M16 20v-4M22 20H2" />
        <path d="m4 12 6-5 6 4 6-6" />
      </g>
    ),
    user: (
      <g fill="none" stroke="currentColor" strokeWidth={sw} strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="8.5" r="3.6" />
        <path d="M4.5 20.5a7.5 7.5 0 0 1 15 0" />
      </g>
    ),
    userPlus: (
      <g fill="none" stroke="currentColor" strokeWidth={sw} strokeLinecap="round" strokeLinejoin="round">
        <circle cx="10" cy="8.5" r="3.6" />
        <path d="M3 20.5a7.5 7.5 0 0 1 14 0" />
        <path d="M19 8v6M16 11h6" />
      </g>
    ),
    userCheck: (
      <g fill="none" stroke="currentColor" strokeWidth={sw} strokeLinecap="round" strokeLinejoin="round">
        <circle cx="10" cy="8.5" r="3.6" />
        <path d="M3 20.5a7.5 7.5 0 0 1 14 0" />
        <path d="m16 12 2 2 4-4" />
      </g>
    ),
    idCard: (
      <g fill="none" stroke="currentColor" strokeWidth={sw} strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="5" width="18" height="14" rx="2" />
        <circle cx="9" cy="12" r="2.4" />
        <path d="M14 10h5M14 13h5M14 16h3" />
      </g>
    ),
    qr: (
      <g fill="none" stroke="currentColor" strokeWidth={sw} strokeLinecap="round" strokeLinejoin="round">
        <rect x="3.5" y="3.5" width="6.5" height="6.5" rx="1.2" />
        <rect x="14" y="3.5" width="6.5" height="6.5" rx="1.2" />
        <rect x="3.5" y="14" width="6.5" height="6.5" rx="1.2" />
        <path d="M14 14h2.5v2.5H14zM18 14h2.5M14 18v2.5M18 18h2.5v2.5H18z" />
      </g>
    ),
    arrowRight: (
      <g fill="none" stroke="currentColor" strokeWidth={sw} strokeLinecap="round" strokeLinejoin="round">
        <path d="M5 12h14M13 5l7 7-7 7" />
      </g>
    ),
    sparkle: (
      <g fill="none" stroke="currentColor" strokeWidth={sw} strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 3v3M12 18v3M3 12h3M18 12h3M5.6 5.6l2 2M16.4 16.4l2 2M5.6 18.4l2-2M16.4 7.6l2-2" />
      </g>
    ),
    bolt: (
      <g fill="none" stroke="currentColor" strokeWidth={sw} strokeLinecap="round" strokeLinejoin="round">
        <path d="M13 3 5 14h6l-1 7 8-11h-6l1-7Z" />
      </g>
    ),
    building: (
      <g fill="none" stroke="currentColor" strokeWidth={sw} strokeLinecap="round" strokeLinejoin="round">
        <path d="M4 21V6l8-3 8 3v15" />
        <path d="M9 21v-6h6v6M8 9h.01M12 9h.01M16 9h.01M8 13h.01M16 13h.01" />
      </g>
    ),
    target: (
      <g fill="none" stroke="currentColor" strokeWidth={sw} strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="9" />
        <circle cx="12" cy="12" r="5" />
        <circle cx="12" cy="12" r="1.6" fill="currentColor" />
      </g>
    ),
    eye: (
      <g fill="none" stroke="currentColor" strokeWidth={sw} strokeLinecap="round" strokeLinejoin="round">
        <path d="M2.5 12s3.5-7 9.5-7 9.5 7 9.5 7-3.5 7-9.5 7S2.5 12 2.5 12Z" />
        <circle cx="12" cy="12" r="2.8" />
      </g>
    ),
    diamond: (
      <g fill="none" stroke="currentColor" strokeWidth={sw} strokeLinecap="round" strokeLinejoin="round">
        <path d="M6 3h12l4 6-10 12L2 9l4-6Z" />
        <path d="M2 9h20M9 3l3 6 3-6M12 9 9 3M12 9l3-6" />
      </g>
    ),
    flag: (
      <g fill="none" stroke="currentColor" strokeWidth={sw} strokeLinecap="round" strokeLinejoin="round">
        <path d="M5 21V4M5 4h12l-2 4 2 4H5" />
      </g>
    ),
    bell: (
      <g fill="none" stroke="currentColor" strokeWidth={sw} strokeLinecap="round" strokeLinejoin="round">
        <path d="M6 17V11a6 6 0 1 1 12 0v6l1.5 2H4.5L6 17ZM10 21h4" />
      </g>
    ),
    download: (
      <g fill="none" stroke="currentColor" strokeWidth={sw} strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 4v11m-4-4 4 4 4-4M5 20h14" />
      </g>
    ),
    alert: (
      <g fill="none" stroke="currentColor" strokeWidth={sw} strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 3 2 20h20L12 3Z" />
        <path d="M12 10v5M12 18.5v.01" />
      </g>
    ),
    handshake: (
      <g fill="none" stroke="currentColor" strokeWidth={sw} strokeLinecap="round" strokeLinejoin="round">
        <path d="M2 13.5 6 9l5 1 3-1.5L21 12l-3 3.5-3-2-3 3-3-1.5-3 2L2 13.5Z" />
        <path d="m11 13 2 2M14 11l2.5 2.5" />
      </g>
    ),
    sun: (
      <g fill="none" stroke="currentColor" strokeWidth={sw} strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="4" />
        <path d="M12 3v2M12 19v2M3 12h2M19 12h2M5.6 5.6l1.4 1.4M17 17l1.4 1.4M5.6 18.4 7 17M17 7l1.4-1.4" />
      </g>
    ),
    moon: (
      <g fill="none" stroke="currentColor" strokeWidth={sw} strokeLinecap="round" strokeLinejoin="round">
        <path d="M20 14A8 8 0 0 1 10 4a8 8 0 1 0 10 10Z" />
      </g>
    ),
  };
  return (
    <svg viewBox="0 0 24 24" style={s} aria-hidden="true" {...rest}>
      {paths[name] || null}
    </svg>
  );
};

// SAPSI shield mark (custom)
const SapsiMark = ({ size = 44 }) => (
  <svg width={size} height={size} viewBox="0 0 64 64" aria-hidden="true">
    <defs>
      <linearGradient id="sapsiG" x1="0" x2="0" y1="0" y2="1">
        <stop offset="0" stopColor="#1d3a91" />
        <stop offset="1" stopColor="#0a1845" />
      </linearGradient>
    </defs>
    <path d="M32 3 8 10v18c0 14 10.5 24.5 24 30 13.5-5.5 24-16 24-30V10L32 3Z" fill="url(#sapsiG)" />
    <path d="M32 7 12 13v15c0 11.4 8.5 20 20 24.5C44.5 48 53 39.4 53 28V13L32 7Z" fill="none" stroke="rgba(255,255,255,0.18)" strokeWidth="1.2" />
    <text x="32" y="29" textAnchor="middle" fontFamily="Geist, sans-serif" fontWeight="800" fontSize="11" fill="#fff" letterSpacing="0.5">SAPSI</text>
    <path d="M22 36 30 44 44 30" fill="none" stroke="#32d583" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const VerifymanMark = ({ size = 44 }) => (
  <svg width={size} height={size} viewBox="0 0 64 64" aria-hidden="true">
    <path d="M32 4 10 12v16c0 13 9.5 22.5 22 28 12.5-5.5 22-15 22-28V12L32 4Z" fill="none" stroke="#0d1f5c" strokeWidth="3" />
    <path d="M22 32 30 40 44 26" fill="none" stroke="#12b76a" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

Object.assign(window, { Icon, SapsiMark, VerifymanMark });
