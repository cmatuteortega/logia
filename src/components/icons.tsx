type P = { size?: number; width?: number; strokeWidth?: number };

const stroke = (sw: number) => ({
  viewBox: '0 0 24 24',
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: sw,
  strokeLinecap: 'round' as const,
});

export const IconDoorArrow = ({ size = 20, strokeWidth = 1.8 }: P) => (
  <svg width={size} height={size} {...stroke(strokeWidth)}>
    <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
    <path d="M16 17l5-5-5-5" />
    <path d="M21 12H9" />
  </svg>
);

export const IconBell = ({ size = 21 }: P) => (
  <svg width={size} height={size} {...stroke(1.8)}>
    <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />
    <path d="M13.7 21a2 2 0 0 1-3.4 0" />
  </svg>
);

export const IconCamera = ({ size = 24 }: P) => (
  <svg width={size} height={size} {...stroke(1.8)}>
    <path d="M14.5 4h-5L8 6.5H4.5A1.5 1.5 0 0 0 3 8v10a1.5 1.5 0 0 0 1.5 1.5h15A1.5 1.5 0 0 0 21 18V8a1.5 1.5 0 0 0-1.5-1.5H16z" />
    <circle cx="12" cy="13" r="3.6" />
  </svg>
);

export const IconChecklist = ({ size = 24 }: P) => (
  <svg width={size} height={size} {...stroke(1.8)}>
    <path d="M9 5h10" />
    <path d="M9 12h10" />
    <path d="M9 19h10" />
    <path d="M4 5l1.4 1.4L8 3.8" />
    <path d="M4 12l1.4 1.4L8 10.8" />
    <path d="M4.2 17.8l3 3" />
    <path d="M7.2 17.8l-3 3" />
  </svg>
);

export const IconRotura = ({ size = 24 }: P) => (
  <svg width={size} height={size} {...stroke(1.8)}>
    <path d="M3.5 20.5h17" />
    <path d="M6 20.5V11l4-2.5 1.5 3.5 3-4 3.5 4v8.5" />
    <path d="M12.5 3.5 11 7l3.5-.8L13 10" />
  </svg>
);

/** The "destello" the user picked over the sparkle. */
export const IconDestello = ({ size = 18 }: P) => (
  <svg width={size} height={size} {...stroke(1.8)} strokeLinejoin="round">
    <path d="M12 4v16" />
    <path d="M4 12h16" />
    <path d="M6.5 6.5l11 11" />
    <path d="M17.5 6.5l-11 11" />
  </svg>
);

export const IconArrowUp = ({ size = 23 }: P) => (
  <svg width={size} height={size} {...stroke(2)}>
    <path d="M12 19V5" />
    <path d="M6 11l6-6 6 6" />
  </svg>
);

export const IconMic = ({ size = 23 }: P) => (
  <svg width={size} height={size} {...stroke(1.9)} strokeLinejoin="round">
    <rect x="9" y="2.5" width="6" height="11.5" rx="3" />
    <path d="M5.5 11.5a6.5 6.5 0 0 0 13 0" />
    <path d="M12 18v3.5" />
  </svg>
);

export const IconBack = ({ size = 24 }: P) => (
  <svg width={size} height={size} {...stroke(2)}>
    <path d="M15 5l-7 7 7 7" />
  </svg>
);

export const IconClock = ({ size = 22 }: P) => (
  <svg width={size} height={size} {...stroke(1.8)}>
    <path d="M12 7v5l3.5 2" />
    <circle cx="12" cy="12" r="8.5" />
  </svg>
);

export const IconTorch = ({ size = 21 }: P) => (
  <svg width={size} height={size} {...stroke(1.8)}>
    <path d="M13 2 4.5 13.5H11l-1 8.5 8.5-11.5H12z" />
  </svg>
);

export const IconFlag = ({ size = 22 }: P) => (
  <svg width={size} height={size} {...stroke(1.8)}>
    <path d="M5 21V4" />
    <path d="M5 4h11l-1.5 4L16 12H5" />
  </svg>
);

export const IconBarcode = ({ size = 24 }: P) => (
  <svg width={size} height={size} {...stroke(1.8)}>
    <path d="M4 6v12" />
    <path d="M7.5 6v12" />
    <path d="M11 6v12" />
    <path d="M14.5 6v12" />
    <path d="M18 6v12" />
    <path d="M20.5 6v12" />
  </svg>
);

export const IconDoc = ({ size = 24 }: P) => (
  <svg width={size} height={size} {...stroke(1.8)}>
    <path d="M5 3.5h9l5 5v12H5z" />
    <path d="M8 12h8" />
    <path d="M8 16h5" />
  </svg>
);

export const IconChevronDown = ({ size = 18 }: P) => (
  <svg width={size} height={size} {...stroke(2)} strokeLinejoin="round">
    <path d="m6 9 6 6 6-6" />
  </svg>
);

export const IconCheck = ({ size = 17, strokeWidth = 2.4 }: P) => (
  <svg width={size} height={size} {...stroke(strokeWidth)} strokeLinejoin="round">
    <path d="M20 6 9 17l-5-5" />
  </svg>
);

export const IconWarning = ({ size = 18 }: P) => (
  <svg width={size} height={size} {...stroke(2)}>
    <path d="M12 9v5" />
    <path d="M12 17.5h.01" />
    <path d="M10.3 3.9 2.6 17.4A1.9 1.9 0 0 0 4.3 20.3h15.4a1.9 1.9 0 0 0 1.7-2.9L13.7 3.9a1.9 1.9 0 0 0-3.4 0z" />
  </svg>
);

export const IconBox = ({ size = 24 }: P) => (
  <svg width={size} height={size} {...stroke(1.8)}>
    <path d="M3.5 8.5 12 4l8.5 4.5v7L12 20l-8.5-4.5z" />
    <path d="M3.5 8.5 12 13l8.5-4.5" />
    <path d="M12 13v7" />
  </svg>
);

export const IconTimer = ({ size = 24 }: P) => (
  <svg width={size} height={size} {...stroke(1.8)}>
    <path d="M12 7.5v5l3 2" />
    <circle cx="12" cy="12.5" r="8" />
    <path d="M9 2.5h6" />
  </svg>
);

export const IconCameraSmall = ({ size = 19 }: P) => (
  <svg width={size} height={size} {...stroke(1.9)}>
    <path d="M4 8V7a2 2 0 0 1 2-2h1.6l1-1.6h4.8l1 1.6H16a2 2 0 0 1 2 2v1" />
    <rect x="3" y="8" width="18" height="12" rx="3" />
    <circle cx="12" cy="14" r="3.2" />
  </svg>
);

export const IconToastCheck = ({ size = 18 }: P) => (
  <svg width={size} height={size} {...stroke(2.4)}>
    <path d="M4 12.5l5 5L20 6.5" />
  </svg>
);
