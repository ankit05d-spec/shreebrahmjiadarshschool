import React from 'react';

interface LogoProps {
  className?: string;
  size?: number;
}

export default function SaraswatiLogo({ className = '', size = 80 }: LogoProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 200 200"
      className={`${className} filter drop-shadow-md select-none`}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Outer Circle Ring */}
      <circle cx="100" cy="100" r="95" className="fill-stone-50 stroke-amber-800" strokeWidth="6" />
      <circle cx="100" cy="100" r="85" className="stroke-red-800" strokeWidth="3" />
      
      {/* Sun Ray Rays of Wisdom Pattern */}
      <g opacity="0.15">
        {Array.from({ length: 12 }).map((_, i) => (
          <line
            key={i}
            x1="100"
            y1="100"
            x2={100 + 75 * Math.cos((i * Math.PI) / 6)}
            y2={100 + 75 * Math.sin((i * Math.PI) / 6)}
            className="stroke-amber-600"
            strokeWidth="3"
            strokeDasharray="4 2"
          />
        ))}
      </g>

      <circle cx="100" cy="100" r="55" className="fill-white stroke-orange-100" strokeWidth="2" />

      {/* Decorative Lotus Pedestal */}
      <path
        d="M 75 142 C 60 148 50 155 70 160 C 90 165 110 165 130 160 C 150 155 140 148 125 142 C 115 148 85 148 75 142 Z"
        className="fill-orange-400 stroke-orange-600"
        strokeWidth="1.5"
      />
      <path
        d="M 60 145 C 50 155 65 160 100 160 C 135 160 150 155 140 145"
        className="fill-none stroke-red-500"
        strokeWidth="2.5"
      />

      {/* Inner Saraswati Veena Stylization */}
      {/* Veena / Sitar Strings Stem */}
      <rect x="94" y="58" width="12" height="74" rx="4" className="fill-amber-900 stroke-amber-950" strokeWidth="1.5" />
      <circle cx="100" cy="132" r="14" className="fill-orange-500 stroke-amber-950" strokeWidth="1.5" />
      <circle cx="100" cy="56" r="10" className="fill-amber-700 stroke-amber-950" strokeWidth="1.5" />
      
      {/* Strings */}
      <line x1="97" y1="56" x2="97" y2="132" className="stroke-yellow-300" strokeWidth="1" />
      <line x1="100" y1="56" x2="100" y2="132" className="stroke-yellow-100" strokeWidth="1" />
      <line x1="103" y1="56" x2="103" y2="132" className="stroke-yellow-300" strokeWidth="1" />

      {/* Handholding gestures or Book & Rosary Accent */}
      {/* Left side book */}
      <rect x="62" y="90" width="14" height="12" rx="1" className="fill-red-100 stroke-red-800" strokeWidth="1" />
      <line x1="65" y1="94" x2="73" y2="94" className="stroke-red-800" strokeWidth="0.8" />
      <line x1="65" y1="97" x2="71" y2="97" className="stroke-red-800" strokeWidth="0.8" />

      {/* Right side rosary/माला */}
      <path d="M 125 90 C 130 98 135 90 128 85" className="fill-none stroke-orange-600" strokeWidth="2" strokeDasharray="3 1" />

      {/* Circular Text labels */}
      {/* We can place the top text nicely using an arc or standard lettering. 
          To make it simple and reliable in raw SVG without path text issues: */}
      <path id="text-path-top" d="M 22 100 A 78 78 0 0 1 178 100" fill="none" />
      <path id="text-path-bottom" d="M 178 100 A 78 78 0 0 1 22 100" fill="none" />

      <text className="font-sans text-[9px] font-bold fill-red-800 tracking-[0.02em]">
        <textPath href="#text-path-top" startOffset="50%" textAnchor="middle">
          SHREE BRAMH JI ADARSH H.P. SCHOOL
        </textPath>
      </text>

      <text className="font-sans text-[8.5px] font-semibold fill-amber-900 tracking-[0.04em]">
        <textPath href="#text-path-bottom" startOffset="50%" textAnchor="middle">
          MOTICHAK, KUSHINAGAR (U.P.)
        </textPath>
      </text>

      {/* Core Sanskrit/Hindi Ribbon tagline at the very bottom center */}
      <rect x="45" y="152" width="110" height="20" rx="3" className="fill-amber-850 stroke-red-900" strokeWidth="1" fillOpacity="0.95" />
      <text x="100" y="165" textAnchor="middle" className="font-sans text-[10px] font-bold fill-yellow-300">
        अमृतं हि विद्या
      </text>
    </svg>
  );
}
