import type { SVGProps } from "react";

type IconProps = SVGProps<SVGSVGElement>;

export function CalendarIcon(props: IconProps) {
  return (
    <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true" {...props}>
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
      />
    </svg>
  );
}

export function PhoneIcon(props: IconProps) {
  return (
    <svg fill="currentColor" viewBox="0 0 20 20" aria-hidden="true" {...props}>
      <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
    </svg>
  );
}

export function MenuIcon(props: IconProps) {
  return (
    <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true" {...props}>
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
    </svg>
  );
}

export function CloseIcon(props: IconProps) {
  return (
    <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true" {...props}>
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
    </svg>
  );
}

export function ChevronDownIcon(props: IconProps) {
  return (
    <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5} aria-hidden="true" {...props}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
    </svg>
  );
}

export function UsFlagIcon(props: IconProps) {
  const stars = [
    [2, 1.6],
    [4, 1.6],
    [6, 1.6],
    [8, 1.6],
    [3, 3.2],
    [5, 3.2],
    [7, 3.2],
    [2, 4.8],
    [4, 4.8],
    [6, 4.8],
    [8, 4.8],
    [3, 6.4],
    [5, 6.4],
    [7, 6.4],
  ];

  return (
    <svg viewBox="0 0 24 16" width="24" height="16" aria-hidden="true" {...props}>
      <defs>
        <clipPath id="us-flag-shape">
          <rect width="24" height="16" rx="2" />
        </clipPath>
      </defs>
      <g clipPath="url(#us-flag-shape)">
        <rect width="24" height="16" fill="#b22234" />
        <path d="M0 2.46h24M0 4.92h24M0 7.38h24M0 9.85h24M0 12.31h24M0 14.77h24" stroke="#fff" strokeWidth="1.23" />
        <rect width="10" height="8.62" fill="#3c3b6e" />
        <g fill="#fff" opacity="0.95">
          {stars.map(([cx, cy]) => (
            <circle key={`${cx}-${cy}`} cx={cx} cy={cy} r="0.6" />
          ))}
        </g>
      </g>
    </svg>
  );
}
