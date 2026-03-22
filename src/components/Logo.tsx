import { motion } from 'motion/react';

interface LogoProps {
  reduceMotion?: boolean;
  className?: string;
}

export default function Logo({ reduceMotion = false, className = '' }: LogoProps) {
  return (
    <svg
      viewBox="0 0 80 80"
      className={className}
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        {/* Glow filter */}
        <filter id="logo-glow">
          <feGaussianBlur stdDeviation="2" result="coloredBlur"/>
          <feMerge>
            <feMergeNode in="coloredBlur"/>
            <feMergeNode in="SourceGraphic"/>
          </feMerge>
        </filter>
        
        {/* Gradient for the letters */}
        <linearGradient id="logo-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" style={{ stopColor: '#0078d4', stopOpacity: 1 }} />
          <stop offset="100%" style={{ stopColor: '#00a8e8', stopOpacity: 1 }} />
        </linearGradient>
      </defs>
      
      {/* Outer orbital ring */}
      <motion.circle
        cx="40"
        cy="40"
        r="36"
        fill="none"
        stroke="#0078d4"
        strokeWidth="0.5"
        opacity="0.3"
        strokeDasharray="4 4"
        animate={!reduceMotion ? { rotate: 360 } : {}}
        transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
        style={{ originX: "40px", originY: "40px" }}
      />
      
      {/* Middle orbital ring */}
      <motion.circle
        cx="40"
        cy="40"
        r="32"
        fill="none"
        stroke="#0078d4"
        strokeWidth="0.5"
        opacity="0.4"
        strokeDasharray="2 2"
        animate={!reduceMotion ? { rotate: -360 } : {}}
        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
        style={{ originX: "40px", originY: "40px" }}
      />
      
      {/* Circuit board pattern background */}
      <g opacity="0.2" stroke="#0078d4" strokeWidth="0.5">
        {/* Horizontal circuit lines */}
        <line x1="10" y1="20" x2="25" y2="20" />
        <line x1="55" y1="20" x2="70" y2="20" />
        <line x1="10" y1="60" x2="25" y2="60" />
        <line x1="55" y1="60" x2="70" y2="60" />
        
        {/* Vertical circuit lines */}
        <line x1="20" y1="10" x2="20" y2="25" />
        <line x1="60" y1="10" x2="60" y2="25" />
        <line x1="20" y1="55" x2="20" y2="70" />
        <line x1="60" y1="55" x2="60" y2="70" />
        
        {/* Circuit nodes */}
        <circle cx="20" cy="20" r="1.5" fill="#0078d4" />
        <circle cx="60" cy="20" r="1.5" fill="#0078d4" />
        <circle cx="20" cy="60" r="1.5" fill="#0078d4" />
        <circle cx="60" cy="60" r="1.5" fill="#0078d4" />
      </g>
      
      {/* Hexagon background (tech aesthetic) */}
      <path
        d="M 40 12 L 56 22 L 56 42 L 40 52 L 24 42 L 24 22 Z"
        fill="none"
        stroke="#0078d4"
        strokeWidth="1"
        opacity="0.2"
      />
      
      {/* Inner glow circle */}
      <circle
        cx="40"
        cy="40"
        r="24"
        fill="#0078d4"
        opacity="0.05"
      />
      
      {/* Letter "H" */}
      <g filter="url(#logo-glow)">
        <path
          d="M 22 26 L 22 54 M 22 40 L 32 40 M 32 26 L 32 54"
          stroke="url(#logo-gradient)"
          strokeWidth="3"
          strokeLinecap="round"
          strokeLinejoin="round"
          fill="none"
        />
      </g>
      
      {/* Letter "S" with modern angular style */}
      <g filter="url(#logo-glow)">
        <path
          d="M 56 28 L 50 26 L 46 26 L 44 28 L 44 32 L 46 34 L 54 36 L 56 38 L 56 50 L 54 52 L 46 52 L 44 50"
          stroke="url(#logo-gradient)"
          strokeWidth="3"
          strokeLinecap="round"
          strokeLinejoin="round"
          fill="none"
        />
      </g>
      
      {/* Orbital dots/satellites */}
      {[0, 120, 240].map((angle, i) => {
        const x = 40 + 32 * Math.cos((angle * Math.PI) / 180);
        const y = 40 + 32 * Math.sin((angle * Math.PI) / 180);
        return (
          <motion.circle
            key={angle}
            cx={x}
            cy={y}
            r="1.5"
            fill="#0078d4"
            opacity="0.8"
            animate={!reduceMotion ? {
              scale: [1, 1.5, 1],
              opacity: [0.6, 1, 0.6]
            } : {}}
            transition={{
              duration: 2,
              repeat: Infinity,
              delay: i * 0.3,
              ease: "easeInOut"
            }}
          />
        );
      })}
      
      {/* Connecting lines to satellites */}
      <g opacity="0.2" stroke="#0078d4" strokeWidth="0.5">
        {[0, 120, 240].map((angle) => {
          const x = 40 + 32 * Math.cos((angle * Math.PI) / 180);
          const y = 40 + 32 * Math.sin((angle * Math.PI) / 180);
          return (
            <line key={angle} x1="40" y1="40" x2={x} y2={y} strokeDasharray="2 2" />
          );
        })}
      </g>
    </svg>
  );
}