import React from 'react';

export function StateWheel() {
  return (
    <svg viewBox="0 0 403 403" width="100%" height="100%">
      <defs>
        <linearGradient id="StateWheel_svg__a" x1="90.77%" x2="44.557%" y1="44.747%" y2="87.832%">
          <stop offset="0%" stopColor="#3CC9B1" />
          <stop offset="100%" stopColor="#8E66C5" />
        </linearGradient>
        <linearGradient id="StateWheel_svg__b" x1="45.491%" x2="89.193%" y1="11.804%" y2="56.659%">
          <stop offset="0%" stopColor="#EF3749" />
          <stop offset="100%" stopColor="#3CC9B1" />
        </linearGradient>
        <linearGradient id="StateWheel_svg__c" x1="90.77%" x2="44.557%" y1="44.747%" y2="87.832%">
          <stop offset="0%" stopColor="#EFDA53" />
          <stop offset="100%" stopColor="#8E66C5" />
        </linearGradient>
        <linearGradient id="StateWheel_svg__d" x1="45.491%" x2="87.711%" y1="11.804%" y2="55.138%">
          <stop offset="0%" stopColor="#EF3749" />
          <stop offset="100%" stopColor="#EFDA53" />
        </linearGradient>
        <linearGradient id="StateWheel_svg__e" x1="0%" y1="0%" y2="100%">
          <stop offset="0%" stopColor="#EF3749" />
          <stop offset="100%" stopColor="#EFDA53" />
        </linearGradient>
        <linearGradient id="StateWheel_svg__f" x1="0%" x2="98.449%" y1="0%" y2="98.449%">
          <stop offset="0%" stopColor="#3CC9B1" />
          <stop offset="100%" stopColor="#EF3749" />
        </linearGradient>
        <linearGradient id="StateWheel_svg__g" x1="0%" x2="98.449%" y1="0%" y2="98.449%">
          <stop offset="0%" stopColor="#EFDA53" />
          <stop offset="100%" stopColor="#8E66C5" />
        </linearGradient>
        <linearGradient id="StateWheel_svg__h" x1="0%" x2="96.186%" y1="0%" y2="96.186%">
          <stop offset="0%" stopColor="#8E66C5" />
          <stop offset="100%" stopColor="#3CC9B1" />
        </linearGradient>
      </defs>
      <g fill="none" fillRule="evenodd">
        <path
          stroke="url(#StateWheel_svg__a)"
          strokeWidth={5}
          d="M64.5 339c75.94 0 137.5-61.56 137.5-137.5"
          transform="matrix(-1 0 0 1 266.5 0)"
        />
        <path
          stroke="url(#StateWheel_svg__b)"
          strokeWidth={5}
          d="M202 201.5C202 125.56 140.44 64 64.5 64"
          transform="matrix(-1 0 0 1 266.5 0)"
        />
        <path stroke="url(#StateWheel_svg__c)" strokeWidth={5} d="M201.5 339c75.94 0 137.5-61.56 137.5-137.5" />
        <path stroke="url(#StateWheel_svg__d)" strokeWidth={5} d="M339 201.5C339 125.56 277.44 64 201.5 64" />
        <g transform="translate(137)">
          <circle cx={64} cy={64} r={64} fill="#EF3749" fillRule="nonzero" />
          <text fill="#FFF" fontFamily="Roboto-Bold, Roboto" fontSize={16} fontWeight="bold" letterSpacing={1.2}>
            <tspan x={33.951} y={70}>
              {'EXITED'}
            </tspan>
          </text>
        </g>
        <g transform="translate(275 138)">
          <circle cx={64} cy={64} r={64} fill="#EFDA53" fillRule="nonzero" />
          <text fill="#292929" fontFamily="Roboto-Bold, Roboto" fontSize={16} fontWeight="bold" letterSpacing={1.2}>
            <tspan x={21.18} y={70}>
              {'ENTERING'}
            </tspan>
          </text>
        </g>
        <g transform="translate(137 275)">
          <circle cx={64} cy={64} r={64} fill="#8E66C5" fillRule="nonzero" />
          <text fill="#FFF" fontFamily="Roboto-Bold, Roboto" fontSize={16} fontWeight="bold" letterSpacing={1.2}>
            <tspan x={25.511} y={70}>
              {'ENTERED'}
            </tspan>
          </text>
        </g>
        <g transform="translate(0 138)">
          <circle cx={64} cy={64} r={64} fill="#3CC9B1" fillRule="nonzero" />
          <text fill="#FFF" fontFamily="Roboto-Bold, Roboto" fontSize={16} fontWeight="bold" letterSpacing={1.2}>
            <tspan x={29.62} y={70}>
              {'EXITING'}
            </tspan>
          </text>
        </g>
        <path
          fill="url(#StateWheel_svg__e)"
          fillRule="nonzero"
          d="M372.198 130.05c-21.311-50.855-64.55-89.915-117.494-105.786a1.5 1.5 0 11.861-2.873c53.86 16.144 97.829 55.897 119.463 107.651l7.611-2.71-2.577 21.086-15.322-14.713 7.458-2.655z"
        />
        <path
          fill="url(#StateWheel_svg__f)"
          d="M21.433 24.21a1.5 1.5 0 11.86-2.874c53.86 16.145 97.83 55.898 119.465 107.652l7.61-2.71-2.576 21.086-15.323-14.713 7.458-2.655C117.616 79.141 74.377 40.081 21.433 24.21z"
          transform="rotate(-90 84.865 84.318)"
        />
        <path
          fill="url(#StateWheel_svg__g)"
          d="M372.196 363.36c-21.31-50.856-64.55-89.916-117.494-105.787a1.5 1.5 0 01.861-2.874c53.86 16.145 97.83 55.898 119.464 107.652l7.61-2.71-2.576 21.086-15.323-14.713 7.458-2.655z"
          transform="rotate(90 318.135 317.682)"
        />
        <path
          fill="url(#StateWheel_svg__h)"
          d="M138.38 363.812c-21.311-50.855-64.55-89.915-117.494-105.786a1.5 1.5 0 11.861-2.874c53.86 16.145 97.829 55.898 119.464 107.652l7.61-2.71-2.576 21.086-15.323-14.713 7.458-2.655z"
          transform="rotate(180 84.318 318.135)"
        />
      </g>
    </svg>
  );
}
