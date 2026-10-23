type P = { size?: number; filled?: boolean };

const base = (size: number) => ({
  width: size,
  height: size,
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.9,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
  "aria-hidden": true,
});

export const Heart = ({ size = 28, filled }: P) => (
  <svg {...base(size)} fill={filled ? "currentColor" : "none"}>
    <path d="M12 20.5s-7.5-4.4-7.5-10.2A4.3 4.3 0 0 1 12 7.6a4.3 4.3 0 0 1 7.5 2.7c0 5.8-7.5 10.2-7.5 10.2Z" />
  </svg>
);
export const Bubble = ({ size = 28 }: P) => (
  <svg {...base(size)}>
    <path d="M20 11.5a7.5 7.5 0 0 1-11 6.6L4.5 19.5l1.4-4.1A7.5 7.5 0 1 1 20 11.5Z" />
  </svg>
);
export const Send = ({ size = 28 }: P) => (
  <svg {...base(size)}>
    <path d="M20.5 3.5 10 14M20.5 3.5l-6.5 17-4-6.5-6.5-4 17-6.5Z" />
  </svg>
);
export const Flag = ({ size = 26 }: P) => (
  <svg {...base(size)}>
    <path d="M5 21V4m0 0h11l-2 4 2 4H5" />
  </svg>
);
export const SpeakerOn = ({ size = 22 }: P) => (
  <svg {...base(size)}>
    <path d="M4 9.5h3.5L12 5.5v13l-4.5-4H4v-5Z" />
    <path d="M15.5 9a4 4 0 0 1 0 6M18 6.5a7.5 7.5 0 0 1 0 11" />
  </svg>
);
export const SpeakerOff = ({ size = 22 }: P) => (
  <svg {...base(size)}>
    <path d="M4 9.5h3.5L12 5.5v13l-4.5-4H4v-5Z" />
    <path d="m16 9.5 5 5m0-5-5 5" />
  </svg>
);
export const PlayGlyph = ({ size = 64 }: P) => (
  <svg width={size} height={size} viewBox="0 0 24 24" aria-hidden>
    <path d="M8 5.5v13l10.5-6.5L8 5.5Z" fill="currentColor" />
  </svg>
);
export const Home = ({ size = 24 }: P) => (
  <svg {...base(size)}>
    <path d="M4 11 12 4l8 7v8.5a1 1 0 0 1-1 1h-4.5V15h-5v5.5H5a1 1 0 0 1-1-1V11Z" />
  </svg>
);
export const Shorts = ({ size = 24 }: P) => (
  <svg {...base(size)}>
    <rect x="6.5" y="3" width="11" height="18" rx="3" />
    <path d="m10.5 9.5 4 2.5-4 2.5v-5Z" fill="currentColor" />
  </svg>
);
export const Compass = ({ size = 24 }: P) => (
  <svg {...base(size)}>
    <circle cx="12" cy="12" r="8.5" />
    <path d="m15.5 8.5-2 5-5 2 2-5 5-2Z" />
  </svg>
);
export const Plus = ({ size = 24 }: P) => (
  <svg {...base(size)}>
    <path d="M12 5v14M5 12h14" />
  </svg>
);
export const Users = ({ size = 24 }: P) => (
  <svg {...base(size)}>
    <circle cx="9" cy="8.5" r="3.5" />
    <path d="M3 20c.6-3.4 3-5.5 6-5.5s5.4 2.1 6 5.5M16 5.2a3.5 3.5 0 0 1 0 6.6M18 14.8c1.6.8 2.7 2.6 3 5.2" />
  </svg>
);
export const User = ({ size = 24 }: P) => (
  <svg {...base(size)}>
    <circle cx="12" cy="8.5" r="4" />
    <path d="M4.5 20.5c.8-4 3.8-6.5 7.5-6.5s6.7 2.5 7.5 6.5" />
  </svg>
);
export const Search = ({ size = 20 }: P) => (
  <svg {...base(size)}>
    <circle cx="11" cy="11" r="6.5" />
    <path d="m20 20-4.2-4.2" />
  </svg>
);
export const Bell = ({ size = 22 }: P) => (
  <svg {...base(size)}>
    <path d="M6 16.5V11a6 6 0 0 1 12 0v5.5l1.5 2h-15l1.5-2ZM10 20.5a2.2 2.2 0 0 0 4 0" />
  </svg>
);
export const Bookmark = ({ size = 26, filled }: P) => (
  <svg {...base(size)} fill={filled ? "currentColor" : "none"}>
    <path d="M6.5 3.5h11v17L12 16.5l-5.5 4v-17Z" />
  </svg>
);
export const More = ({ size = 24 }: P) => (
  <svg {...base(size)}>
    <circle cx="5" cy="12" r="1.3" fill="currentColor" />
    <circle cx="12" cy="12" r="1.3" fill="currentColor" />
    <circle cx="19" cy="12" r="1.3" fill="currentColor" />
  </svg>
);
export const Expand = ({ size = 20 }: P) => (
  <svg {...base(size)}>
    <path d="M4 9V4h5M20 9V4h-5M4 15v5h5M20 15v5h-5" />
  </svg>
);
export const Pause = ({ size = 20 }: P) => (
  <svg width={size} height={size} viewBox="0 0 24 24" aria-hidden>
    <path d="M7 5h3.5v14H7zM13.5 5H17v14h-3.5z" fill="currentColor" />
  </svg>
);
export const Crown = ({ size = 22 }: P) => (
  <svg width={size} height={size} viewBox="0 0 24 24" aria-hidden>
    <path d="M3 8l4.5 4L12 5l4.5 7L21 8l-1.8 10.5H4.8L3 8Z" fill="currentColor" />
  </svg>
);
export const Mail = ({ size = 24 }: P) => (
  <svg {...base(size)}>
    <rect x="3.5" y="5.5" width="17" height="13" rx="2.5" />
    <path d="m4.5 7.5 7.5 5.5 7.5-5.5" />
  </svg>
);
export const Check = ({ size = 16 }: P) => (
  <svg {...base(size)}>
    <path d="m5 12.5 4.5 4.5L19 7.5" />
  </svg>
);
export const UploadArrow = ({ size = 20 }: P) => (
  <svg {...base(size)}>
    <path d="M12 16V4m0 0-4.5 4.5M12 4l4.5 4.5M5 15v4.5h14V15" />
  </svg>
);
export const Verified = ({ size = 16 }: P) => (
  <svg width={size} height={size} viewBox="0 0 24 24" aria-label="Verified" role="img">
    <path d="M12 2.5l2.6 1.9 3.2-.1 1 3 2.6 1.9-1 3 1 3-2.6 1.9-1 3-3.2-.1L12 21.5l-2.6-1.9-3.2.1-1-3L2.6 14.8l1-3-1-3 2.6-1.9 1-3 3.2.1L12 2.5Z" fill="var(--purple)" />
    <path d="m8.3 12.2 2.5 2.5 4.9-5" fill="none" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);
export const Gamepad = ({ size = 28 }: P) => (
  <svg width={size} height={size} viewBox="0 0 48 32" aria-hidden>
    <path d="M12 2h24c6 0 10 5 11 12l1 8c.6 5-4.4 8.4-8 5l-6-5H14l-6 5c-3.6 3.4-8.6 0-8-5l1-8C2 7 6 2 12 2Z" fill="var(--blue)" />
    <path d="M11 13h8M15 9v8" stroke="#fff" strokeWidth="3.2" strokeLinecap="round" />
    <circle cx="33" cy="11" r="2.6" fill="var(--lime)" /><circle cx="38" cy="15" r="2.6" fill="var(--orange)" />
    <circle cx="33" cy="19" r="2.6" fill="#ff4f7a" /><circle cx="28" cy="15" r="2.6" fill="#ffd23f" />
  </svg>
);
export const Lock = ({ size = 22 }: P) => (
  <svg {...base(size)}>
    <rect x="5" y="10.5" width="14" height="10" rx="2.5" />
    <path d="M8.5 10.5V8a3.5 3.5 0 0 1 7 0v2.5" />
  </svg>
);
export const PlaySolid = ({ size = 26 }: P) => (
  <svg width={size} height={size} viewBox="0 0 24 24" aria-hidden><path d="M7 4.5v15l12.5-7.5L7 4.5Z" fill="currentColor" /></svg>
);
export const Close = ({ size = 24 }: P) => (
  <svg {...base(size)}><path d="M6 6l12 12M18 6 6 18" /></svg>
);
export const Arrow = ({ size = 18 }: P) => (
  <svg {...base(size)}><path d="M5 12h14m-5-5 5 5-5 5" /></svg>
);
