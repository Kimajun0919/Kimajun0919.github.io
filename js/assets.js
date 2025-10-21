// ===== 아바타 에셋 & 색상 (Dicebear 스타일 + 커스텀) =====
// 전역에 노출되는 상수: AVATAR_ASSETS, AVATAR_COLORS

// Dicebear 컴포넌트 import
import { head } from './components/head.js';
import { eyes } from './components/eyes.js';
import { eyebrows } from './components/eyebrows.js';
import { mouth } from './components/mouth.js';
import { nose } from './components/nose.js';
import { hair } from './components/hair.js';
import { beard } from './components/beard.js';
import { glasses } from './components/glasses.js';
import { earrings } from './components/earrings.js';
import { freckles } from './components/freckles.js';
import { hairAccessories } from './components/hairAccessories.js';

const AVATAR_ASSETS = {
  faceShape: {
    oval: `
      <defs>
        <radialGradient id="faceGradient_oval" cx="50%" cy="40%">
          <stop offset="0%" stop-color="var(--skin-color)" />
          <stop offset="70%" style="stop-color:var(--skin-color);stop-opacity:1" />
          <stop offset="100%" style="stop-color:var(--skin-color);stop-opacity:0.85" />
        </radialGradient>
        <filter id="faceShadow">
          <feGaussianBlur in="SourceAlpha" stdDeviation="4"/>
          <feOffset dx="0" dy="3" result="offsetblur"/>
          <feComponentTransfer><feFuncA type="linear" slope="0.3"/></feComponentTransfer>
          <feMerge><feMergeNode/><feMergeNode in="SourceGraphic"/></feMerge>
        </filter>
        <linearGradient id="cheekGradient" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stop-color="#ffb3b3" stop-opacity="0.4"/>
          <stop offset="100%" stop-color="#ffb3b3" stop-opacity="0.1"/>
        </linearGradient>
      </defs>
      <ellipse cx="256" cy="280" rx="145" ry="165" fill="url(#faceGradient_oval)" filter="url(#faceShadow)"/>
      <ellipse cx="256" cy="280" rx="145" ry="165" fill="none" stroke="rgba(0,0,0,0.08)" stroke-width="1"/>
      <ellipse cx="235" cy="260" rx="8" ry="12" fill="rgba(255,255,255,0.4)"/>
      <ellipse cx="200" cy="315" rx="28" ry="20" fill="url(#cheekGradient)"/>
      <ellipse cx="312" cy="315" rx="28" ry="20" fill="url(#cheekGradient)"/>
      <path d="M 256 410 Q 240 412 230 410" stroke="rgba(0,0,0,0.05)" stroke-width="1" fill="none"/>
    `,
    round: `
      <defs>
        <radialGradient id="faceGradient_round" cx="50%" cy="35%">
          <stop offset="0%" stop-color="var(--skin-color)" />
          <stop offset="70%" style="stop-color:var(--skin-color);stop-opacity:1" />
          <stop offset="100%" style="stop-color:var(--skin-color);stop-opacity:0.85" />
        </radialGradient>
      </defs>
      <circle cx="256" cy="280" r="155" fill="url(#faceGradient_round)" filter="url(#faceShadow)"/>
      <circle cx="256" cy="280" r="155" fill="none" stroke="rgba(0,0,0,0.08)" stroke-width="1"/>
      <ellipse cx="230" cy="250" rx="10" ry="15" fill="rgba(255,255,255,0.45)"/>
      <ellipse cx="195" cy="320" rx="30" ry="22" fill="url(#cheekGradient)"/>
      <ellipse cx="317" cy="320" rx="30" ry="22" fill="url(#cheekGradient)"/>
      <path d="M 145 280 Q 140 300 145 320" stroke="rgba(0,0,0,0.03)" stroke-width="2" fill="none"/>
      <path d="M 367 280 Q 372 300 367 320" stroke="rgba(0,0,0,0.03)" stroke-width="2" fill="none"/>
    `,
    square: `
      <defs>
        <linearGradient id="faceGradient_square" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stop-color="var(--skin-color)" />
          <stop offset="100%" style="stop-color:var(--skin-color);stop-opacity:0.9" />
        </linearGradient>
      </defs>
      <rect x="110" y="125" width="292" height="310" rx="55" fill="url(#faceGradient_square)" filter="url(#faceShadow)"/>
      <rect x="110" y="125" width="292" height="310" rx="55" fill="none" stroke="rgba(0,0,0,0.08)" stroke-width="1"/>
      <rect x="130" y="150" width="30" height="40" rx="15" fill="rgba(255,255,255,0.3)"/>
      <ellipse cx="190" cy="315" rx="26" ry="18" fill="url(#cheekGradient)"/>
      <ellipse cx="322" cy="315" rx="26" ry="18" fill="url(#cheekGradient)"/>
    `,
    heart: `
      <defs>
        <radialGradient id="faceGradient_heart" cx="50%" cy="35%">
          <stop offset="0%" stop-color="var(--skin-color)" />
          <stop offset="100%" style="stop-color:var(--skin-color);stop-opacity:0.88" />
        </radialGradient>
      </defs>
      <path d="M 256 125 Q 175 125 132 200 Q 128 285 256 415 Q 384 285 380 200 Q 337 125 256 125 Z" 
            fill="url(#faceGradient_heart)" filter="url(#faceShadow)"/>
      <path d="M 256 125 Q 175 125 132 200 Q 128 285 256 415 Q 384 285 380 200 Q 337 125 256 125 Z" 
            fill="none" stroke="rgba(0,0,0,0.08)" stroke-width="1"/>
      <ellipse cx="190" cy="180" rx="12" ry="18" fill="rgba(255,255,255,0.35)"/>
      <ellipse cx="200" cy="310" rx="28" ry="20" fill="url(#cheekGradient)"/>
      <ellipse cx="312" cy="310" rx="28" ry="20" fill="url(#cheekGradient)"/>
    `,
    long: `
      <defs>
        <radialGradient id="faceGradient_long" cx="50%" cy="38%">
          <stop offset="0%" stop-color="var(--skin-color)" />
          <stop offset="100%" style="stop-color:var(--skin-color);stop-opacity:0.87" />
        </radialGradient>
      </defs>
      <ellipse cx="256" cy="285" rx="125" ry="185" fill="url(#faceGradient_long)" filter="url(#faceShadow)"/>
      <ellipse cx="256" cy="285" rx="125" ry="185" fill="none" stroke="rgba(0,0,0,0.08)" stroke-width="1"/>
      <ellipse cx="235" cy="240" rx="8" ry="12" fill="rgba(255,255,255,0.4)"/>
      <ellipse cx="205" cy="315" rx="24" ry="17" fill="url(#cheekGradient)"/>
      <ellipse cx="307" cy="315" rx="24" ry="17" fill="url(#cheekGradient)"/>
    `,
    soft_round: `
      <defs>
        <radialGradient id="faceGradient_soft" cx="48%" cy="38%">
          <stop offset="0%" stop-color="var(--skin-color)" />
          <stop offset="85%" style="stop-color:var(--skin-color);stop-opacity:0.95" />
          <stop offset="100%" style="stop-color:var(--skin-color);stop-opacity:0.82" />
        </radialGradient>
      </defs>
      <path d="M 256 120 Q 150 140 140 240 Q 140 360 256 415 Q 372 360 372 240 Q 362 140 256 120 Z" 
            fill="url(#faceGradient_soft)" filter="url(#faceShadow)"/>
      <path d="M 256 120 Q 150 140 140 240 Q 140 360 256 415 Q 372 360 372 240 Q 362 140 256 120 Z" 
            fill="none" stroke="rgba(0,0,0,0.08)" stroke-width="1"/>
      <ellipse cx="225" cy="220" rx="15" ry="20" fill="rgba(255,255,255,0.35)"/>
      <ellipse cx="195" cy="310" rx="27" ry="20" fill="url(#cheekGradient)"/>
      <ellipse cx="317" cy="310" rx="27" ry="20" fill="url(#cheekGradient)"/>
    `,
    natural: `
      <defs>
        <radialGradient id="faceGradient_natural" cx="50%" cy="38%" r="65%">
          <stop offset="0%" stop-color="var(--skin-color)" />
          <stop offset="75%" style="stop-color:var(--skin-color);stop-opacity:0.95" />
          <stop offset="100%" stop-color="#e1b99a" />
        </radialGradient>
      </defs>
      <path d="M 256 120 C 150 130, 100 240, 140 340 C 170 420, 340 420, 372 340 C 410 240, 362 130, 256 120 Z"
            fill="url(#faceGradient_natural)" filter="url(#faceShadow)"/>
      <path d="M 256 120 C 150 130, 100 240, 140 340 C 170 420, 340 420, 372 340 C 410 240, 362 130, 256 120 Z"
            fill="none" stroke="rgba(0,0,0,0.08)" stroke-width="1"/>
      <ellipse cx="220" cy="240" rx="12" ry="16" fill="rgba(255,255,255,0.4)"/>
      <ellipse cx="200" cy="310" rx="28" ry="18" fill="url(#cheekGradient)"/>
      <ellipse cx="312" cy="310" rx="28" ry="18" fill="url(#cheekGradient)"/>
      <path d="M 165 360 Q 190 380 220 385" stroke="rgba(0,0,0,0.04)" stroke-width="2" fill="none"/>
      <path d="M 347 360 Q 322 380 292 385" stroke="rgba(0,0,0,0.04)" stroke-width="2" fill="none"/>
    `
  },

  ears: {
    normal: `
      <defs>
        <radialGradient id="earGradient" cx="40%" cy="40%">
          <stop offset="0%" style="stop-color:var(--skin-color);stop-opacity:1" />
          <stop offset="100%" style="stop-color:var(--skin-color);stop-opacity:0.85" />
        </radialGradient>
      </defs>
      <g filter="url(#faceShadow)">
        <ellipse cx="115" cy="280" rx="28" ry="40" fill="url(#earGradient)" stroke="rgba(0,0,0,0.1)" stroke-width="1"/>
        <ellipse cx="397" cy="280" rx="28" ry="40" fill="url(#earGradient)" stroke="rgba(0,0,0,0.1)" stroke-width="1"/>
        <ellipse cx="120" cy="285" rx="14" ry="18" fill="rgba(0,0,0,0.06)"/>
        <ellipse cx="392" cy="285" rx="14" ry="18" fill="rgba(0,0,0,0.06)"/>
        <ellipse cx="118" cy="275" rx="6" ry="8" fill="rgba(255,255,255,0.3)"/>
        <ellipse cx="394" cy="275" rx="6" ry="8" fill="rgba(255,255,255,0.3)"/>
      </g>
    `,
    small: `
      <g filter="url(#faceShadow)">
        <ellipse cx="118" cy="280" rx="22" ry="32" fill="url(#earGradient)" stroke="rgba(0,0,0,0.1)" stroke-width="1"/>
        <ellipse cx="394" cy="280" rx="22" ry="32" fill="url(#earGradient)" stroke="rgba(0,0,0,0.1)" stroke-width="1"/>
        <ellipse cx="122" cy="285" rx="10" ry="13" fill="rgba(0,0,0,0.06)"/>
        <ellipse cx="390" cy="285" rx="10" ry="13" fill="rgba(0,0,0,0.06)"/>
        <ellipse cx="120" cy="276" rx="5" ry="6" fill="rgba(255,255,255,0.3)"/>
        <ellipse cx="392" cy="276" rx="5" ry="6" fill="rgba(255,255,255,0.3)"/>
      </g>
    `,
    large: `
      <g filter="url(#faceShadow)">
        <ellipse cx="112" cy="280" rx="34" ry="48" fill="url(#earGradient)" stroke="rgba(0,0,0,0.1)" stroke-width="1"/>
        <ellipse cx="400" cy="280" rx="34" ry="48" fill="url(#earGradient)" stroke="rgba(0,0,0,0.1)" stroke-width="1"/>
        <ellipse cx="118" cy="286" rx="17" ry="21" fill="rgba(0,0,0,0.06)"/>
        <ellipse cx="394" cy="286" rx="17" ry="21" fill="rgba(0,0,0,0.06)"/>
        <ellipse cx="115" cy="274" rx="7" ry="9" fill="rgba(255,255,255,0.3)"/>
        <ellipse cx="397" cy="274" rx="7" ry="9" fill="rgba(255,255,255,0.3)"/>
      </g>
    `,
    elf: `
      <defs>
        <linearGradient id="elfEarGradient" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" style="stop-color:var(--skin-color);stop-opacity:1" />
          <stop offset="100%" style="stop-color:var(--skin-color);stop-opacity:0.85" />
        </linearGradient>
      </defs>
      <g filter="url(#faceShadow)">
        <path d="M 115 240 Q 90 250 95 280 Q 100 295 118 288 Q 122 265 115 240 Z" 
              fill="url(#elfEarGradient)" stroke="rgba(0,0,0,0.1)" stroke-width="1"/>
        <path d="M 397 240 Q 422 250 417 280 Q 412 295 394 288 Q 390 265 397 240 Z" 
              fill="url(#elfEarGradient)" stroke="rgba(0,0,0,0.1)" stroke-width="1"/>
        <path d="M 105 265 Q 108 270 111 275" stroke="rgba(255,255,255,0.3)" stroke-width="2" fill="none"/>
        <path d="M 407 265 Q 404 270 401 275" stroke="rgba(255,255,255,0.3)" stroke-width="2" fill="none"/>
      </g>
    `,
    rounded: `
      <g filter="url(#faceShadow)">
        <ellipse cx="115" cy="280" rx="26" ry="36" fill="url(#earGradient)" stroke="rgba(0,0,0,0.08)" stroke-width="1"/>
        <ellipse cx="397" cy="280" rx="26" ry="36" fill="url(#earGradient)" stroke="rgba(0,0,0,0.08)" stroke-width="1"/>
        <ellipse cx="120" cy="284" rx="12" ry="15" fill="rgba(0,0,0,0.06)"/>
        <ellipse cx="392" cy="284" rx="12" ry="15" fill="rgba(0,0,0,0.06)"/>
        <ellipse cx="117" cy="273" rx="6" ry="8" fill="rgba(255,255,255,0.35)"/>
        <ellipse cx="395" cy="273" rx="6" ry="8" fill="rgba(255,255,255,0.35)"/>
        <path d="M 108 286 Q 112 290 116 294" stroke="rgba(0,0,0,0.04)" stroke-width="1" fill="none"/>
        <path d="M 404 286 Q 400 290 396 294" stroke="rgba(0,0,0,0.04)" stroke-width="1" fill="none"/>
      </g>
    `,
    droopy: `
      <g filter="url(#faceShadow)">
        <ellipse cx="115" cy="295" rx="24" ry="40" fill="url(#earGradient)" stroke="rgba(0,0,0,0.1)" stroke-width="1"/>
        <ellipse cx="397" cy="295" rx="24" ry="40" fill="url(#earGradient)" stroke="rgba(0,0,0,0.1)" stroke-width="1"/>
        <ellipse cx="119" cy="300" rx="11" ry="16" fill="rgba(0,0,0,0.06)"/>
        <ellipse cx="393" cy="300" rx="11" ry="16" fill="rgba(0,0,0,0.06)"/>
        <ellipse cx="117" cy="288" rx="5" ry="7" fill="rgba(255,255,255,0.3)"/>
        <ellipse cx="395" cy="288" rx="5" ry="7" fill="rgba(255,255,255,0.3)"/>
      </g>
    `
  },

  hairBack: {
    short_modern: ``,
    short_messy: ``,
    undercut_male: ``,
    crew_cut: ``,
    pompadour: ``,
    slicked_back: ``,
    buzz_cut: ``,
    quiff: ``,
    fringe_male: ``,
    medium_side: `
      <!-- 옆머리 뒷부분 -->
      <path d="M 108 258 Q 98 325 120 375" 
            stroke="var(--hair-color)" stroke-width="28" fill="none" opacity="0.94" stroke-linecap="round"/>
      <path d="M 404 258 Q 414 325 392 375" 
            stroke="var(--hair-color)" stroke-width="28" fill="none" opacity="0.94" stroke-linecap="round"/>
      <!-- 하이라이트 -->
      <path d="M 112 275 Q 105 320 117 360" 
            stroke="rgba(255,255,255,0.15)" stroke-width="3.5" fill="none" stroke-linecap="round"/>
      <path d="M 400 275 Q 407 320 395 360" 
            stroke="rgba(255,255,255,0.15)" stroke-width="3.5" fill="none" stroke-linecap="round"/>
      <!-- 그림자 -->
      <path d="M 105 290 Q 100 330 110 365" 
            stroke="rgba(0,0,0,0.1)" stroke-width="2" fill="none"/>
      <path d="M 407 290 Q 412 330 402 365" 
            stroke="rgba(0,0,0,0.1)" stroke-width="2" fill="none"/>
    `,
    long_straight: `
      <!-- 긴 생머리 뒷부분 -->
      <path d="M 98 305 Q 88 375 100 445" 
            stroke="var(--hair-color)" stroke-width="32" fill="none" opacity="0.92" stroke-linecap="round"/>
      <path d="M 414 305 Q 424 375 412 445" 
            stroke="var(--hair-color)" stroke-width="32" fill="none" opacity="0.92" stroke-linecap="round"/>
      <!-- 머리카락 흐름 라인 -->
      <path d="M 105 320 Q 100 380 108 430" 
            stroke="rgba(255,255,255,0.18)" stroke-width="4" fill="none" stroke-linecap="round"/>
      <path d="M 407 320 Q 412 380 404 430" 
            stroke="rgba(255,255,255,0.18)" stroke-width="4" fill="none" stroke-linecap="round"/>
      <!-- 그림자 -->
      <path d="M 95 345 Q 93 385 98 425" 
            stroke="rgba(0,0,0,0.12)" stroke-width="2.5" fill="none"/>
      <path d="M 417 345 Q 419 385 414 425" 
            stroke="rgba(0,0,0,0.12)" stroke-width="2.5" fill="none"/>
      <!-- 추가 레이어 -->
      <path d="M 110 330 Q 108 375 112 420" 
            stroke="var(--hair-color)" stroke-width="18" fill="none" opacity="0.7" stroke-linecap="round"/>
      <path d="M 402 330 Q 404 375 400 420" 
            stroke="var(--hair-color)" stroke-width="18" fill="none" opacity="0.7" stroke-linecap="round"/>
    `,
    bun_high: ``,
    bob_modern: `
      <!-- 밥 뒷머리 -->
      <path d="M 118 240 Q 115 345 168 365 Q 210 378 256 370 Q 302 378 344 365 Q 397 345 394 240" 
            stroke="var(--hair-color)" stroke-width="26" fill="none" opacity="0.94" stroke-linecap="round"/>
      <!-- 하이라이트 -->
      <path d="M 122 255 Q 120 335 165 353" 
            stroke="rgba(255,255,255,0.15)" stroke-width="3" fill="none" stroke-linecap="round"/>
      <path d="M 390 255 Q 392 335 347 353" 
            stroke="rgba(255,255,255,0.15)" stroke-width="3" fill="none" stroke-linecap="round"/>
      <!-- 볼륨 -->
      <path d="M 130 270 Q 128 320 160 348" 
            stroke="var(--hair-color)" stroke-width="16" fill="none" opacity="0.75" stroke-linecap="round"/>
      <path d="M 382 270 Q 384 320 352 348" 
            stroke="var(--hair-color)" stroke-width="16" fill="none" opacity="0.75" stroke-linecap="round"/>
    `,
    wavy_long: `
      <!-- 웨이브 긴 머리 뒷부분 -->
      <path d="M 130 290 Q 120 360 140 420" 
            stroke="var(--hair-color)" stroke-width="30" fill="none" opacity="0.9" stroke-linecap="round"/>
      <path d="M 382 290 Q 392 360 372 420" 
            stroke="var(--hair-color)" stroke-width="30" fill="none" opacity="0.9" stroke-linecap="round"/>
      <!-- 웨이브 디테일 -->
      <path d="M 137 310 Q 130 360 145 405" 
            stroke="rgba(255,255,255,0.18)" stroke-width="3.5" fill="none" stroke-linecap="round"/>
      <path d="M 375 310 Q 382 360 367 405" 
            stroke="rgba(255,255,255,0.18)" stroke-width="3.5" fill="none" stroke-linecap="round"/>
      <!-- 그림자 웨이브 -->
      <path d="M 125 335 Q 122 375 135 410" 
            stroke="rgba(0,0,0,0.1)" stroke-width="2.5" fill="none"/>
      <path d="M 387 335 Q 390 375 377 410" 
            stroke="rgba(0,0,0,0.1)" stroke-width="2.5" fill="none"/>
    `,
    curly_natural: `
      <!-- 곱슬머리 뒷부분 -->
      <path d="M 136 280 Q 126 350 146 410" 
            stroke="var(--hair-color)" stroke-width="34" fill="none" opacity="0.85" stroke-linecap="round"/>
      <path d="M 376 280 Q 386 350 366 410" 
            stroke="var(--hair-color)" stroke-width="34" fill="none" opacity="0.85" stroke-linecap="round"/>
      <!-- 뒷머리 컬 -->
      <circle cx="130" cy="325" r="20" fill="var(--hair-color)" opacity="0.6"/>
      <circle cx="382" cy="325" r="20" fill="var(--hair-color)" opacity="0.6"/>
      <circle cx="138" cy="365" r="18" fill="var(--hair-color)" opacity="0.55"/>
      <circle cx="374" cy="365" r="18" fill="var(--hair-color)" opacity="0.55"/>
      <!-- 작은 컬 -->
      <circle cx="145" cy="395" r="14" fill="var(--hair-color)" opacity="0.5"/>
      <circle cx="367" cy="395" r="14" fill="var(--hair-color)" opacity="0.5"/>
      <!-- 하이라이트 -->
      <ellipse cx="134" cy="340" rx="8" ry="12" fill="rgba(255,255,255,0.2)"/>
      <ellipse cx="378" cy="340" rx="8" ry="12" fill="rgba(255,255,255,0.2)"/>
    `,
    ponytail_high: ``,
    pixie_cut: ``
  },

  top: {
    tshirt: `
      <defs>
        <linearGradient id="tshirtGradient" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stop-color="var(--top-color)" />
          <stop offset="100%" style="stop-color:var(--top-color);stop-opacity:0.85" />
        </linearGradient>
      </defs>
      <path d="M 138 402 L 158 382 Q 198 362 256 362 Q 314 362 354 382 L 374 402 L 374 512 L 138 512 Z" 
            fill="url(#tshirtGradient)"/>
      <path d="M 138 402 L 158 382 Q 198 362 256 362 Q 314 362 354 382 L 374 402" 
            stroke="rgba(0,0,0,0.15)" stroke-width="1" fill="none"/>
      <path d="M 238 362 Q 256 372 274 362" 
            stroke="rgba(255,255,255,0.3)" stroke-width="2.5" fill="none" stroke-linecap="round"/>
      <ellipse cx="190" cy="420" rx="15" ry="10" fill="rgba(255,255,255,0.15)"/>
      <ellipse cx="322" cy="420" rx="15" ry="10" fill="rgba(255,255,255,0.15)"/>
    `,
    hoodie: `
      <defs>
        <linearGradient id="hoodieGradient" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stop-color="var(--top-color)" />
          <stop offset="100%" style="stop-color:var(--top-color);stop-opacity:0.88" />
        </linearGradient>
      </defs>
      <path d="M 128 392 L 148 372 Q 198 352 256 352 Q 314 352 364 372 L 384 392 L 384 512 L 128 512 Z" 
            fill="url(#hoodieGradient)"/>
      <path d="M 195 357 Q 256 342 317 357" 
            stroke="rgba(0,0,0,0.25)" stroke-width="3.5" fill="none" stroke-linecap="round"/>
      <circle cx="198" cy="382" r="9" fill="rgba(0,0,0,0.35)" stroke="rgba(0,0,0,0.2)" stroke-width="1"/>
      <circle cx="314" cy="382" r="9" fill="rgba(0,0,0,0.35)" stroke="rgba(0,0,0,0.2)" stroke-width="1"/>
      <circle cx="198" cy="380" r="3" fill="rgba(255,255,255,0.2)"/>
      <circle cx="314" cy="380" r="3" fill="rgba(255,255,255,0.2)"/>
      <path d="M 220 360 Q 256 352 292 360" 
            stroke="rgba(255,255,255,0.2)" stroke-width="2" fill="none" stroke-linecap="round"/>
      <line x1="256" y1="355" x2="256" y2="385" 
            stroke="rgba(0,0,0,0.2)" stroke-width="2.5"/>
    `,
    vneck: `
      <path d="M 138 402 L 158 382 Q 198 362 256 362 Q 314 362 354 382 L 374 402 L 374 512 L 138 512 Z" 
            fill="url(#tshirtGradient)"/>
      <path d="M 228 362 L 256 392 L 284 362" 
            stroke="rgba(255,255,255,0.4)" stroke-width="3.5" fill="none" stroke-linecap="round"/>
      <path d="M 232 364 L 256 388 L 280 364" 
            stroke="rgba(255,255,255,0.6)" stroke-width="1.5" fill="none" stroke-linecap="round"/>
      <ellipse cx="185" cy="420" rx="15" ry="10" fill="rgba(255,255,255,0.15)"/>
      <ellipse cx="327" cy="420" rx="15" ry="10" fill="rgba(255,255,255,0.15)"/>
    `,
    collar: `
      <path d="M 138 402 L 158 382 Q 198 362 256 362 Q 314 362 354 382 L 374 402 L 374 512 L 138 512 Z" 
            fill="url(#tshirtGradient)"/>
      <path d="M 218 362 L 218 388 L 256 377 L 294 388 L 294 362" 
            fill="rgba(255,255,255,0.9)" stroke="rgba(0,0,0,0.1)" stroke-width="1"/>
      <path d="M 218 362 L 256 377 L 294 362" 
            stroke="rgba(0,0,0,0.15)" stroke-width="1.5" fill="none"/>
      <circle cx="230" cy="370" r="3" fill="rgba(0,0,0,0.3)"/>
      <circle cx="282" cy="370" r="3" fill="rgba(0,0,0,0.3)"/>
    `,
    tank: `
      <path d="M 158 382 L 178 402 L 178 512 L 138 512 L 138 422 Z" fill="url(#tshirtGradient)"/>
      <path d="M 354 382 L 334 402 L 334 512 L 374 512 L 374 422 Z" fill="url(#tshirtGradient)"/>
      <rect x="178" y="382" width="156" height="130" fill="url(#tshirtGradient)"/>
      <path d="M 158 382 Q 178 390 178 402" 
            stroke="rgba(255,255,255,0.2)" stroke-width="2" fill="none"/>
      <path d="M 354 382 Q 334 390 334 402" 
            stroke="rgba(255,255,255,0.2)" stroke-width="2" fill="none"/>
      <ellipse cx="256" cy="420" rx="20" ry="12" fill="rgba(255,255,255,0.15)"/>
    `,
    shirt: `
      <path d="M 138 402 L 158 382 Q 198 362 256 362 Q 314 362 354 382 L 374 402 L 374 512 L 138 512 Z" 
            fill="url(#tshirtGradient)"/>
      <path d="M 228 367 L 256 387 L 284 367" 
            stroke="rgba(255,255,255,0.85)" stroke-width="2.5" fill="none" stroke-linecap="round"/>
      <path d="M 178 382 Q 256 372 334 382" 
            stroke="rgba(0,0,0,0.08)" stroke-width="2.5" fill="none" stroke-linecap="round"/>
      <ellipse cx="188" cy="415" rx="16" ry="11" fill="rgba(255,255,255,0.18)"/>
      <ellipse cx="324" cy="415" rx="16" ry="11" fill="rgba(255,255,255,0.18)"/>
      <circle cx="256" cy="395" r="4" fill="rgba(0,0,0,0.2)"/>
      <circle cx="256" cy="420" r="4" fill="rgba(0,0,0,0.2)"/>
      <circle cx="256" cy="445" r="4" fill="rgba(0,0,0,0.2)"/>
    `
  },

  // Dicebear 컴포넌트 (import)
  head,
  eyes,
  eyebrows,
  mouth,
  nose,
  hair,
  beard,
  glasses,
  earrings,
  freckles,
  hairAccessories
};

const AVATAR_COLORS = {
  skin: ['#FFE0D4', '#FCCAAE', '#F7B896', '#E8A87C', '#D49574', '#C68563', '#A56F52', '#8D5524', '#6B4423'],
  hair: ['#090806', '#2C1B18', '#4E3329', '#6F4C3E', '#8B5A3C', '#A0634F', '#B89778', '#D4B896', '#E8D4BA', '#F5E8D6'],
  eyes: ['#1C1C1C', '#3E2723', '#5D4037', '#6D4C41', '#795548', '#1976D2', '#2196F3', '#4FC3F7', '#4CAF50', '#8BC34A', '#9C27B0', '#AB47BC', '#78909C', '#90A4AE'],
  eyebrows: ['#090806', '#2C1B18', '#4E3329', '#6F4C3E', '#8B5A3C', '#A0634F'],
  mouth: ['#C45B5D', '#D36769', '#E07B7D', '#E88B8D', '#F4A7A9', '#F5B9BB', '#8B5A5C', '#A5696B'],
  nose: ['#D4A791', '#C89A7F', '#BC8D6D', '#B0805B', '#A47349'],
  top: ['#EF5350', '#EC407A', '#AB47BC', '#7E57C2', '#5C6BC0', '#42A5F5', '#29B6F6', '#26C6DA', '#26A69A', '#66BB6A', '#9CCC65', '#D4E157', '#FFEE58', '#FFCA28', '#FFA726', '#FF7043', '#8D6E63', '#BDBDBD', '#78909C'],
  glasses: ['#000000', '#333333', '#666666', '#8B4513', '#D2691E', '#CD853F', '#DEB887', '#1976D2', '#E91E63', '#9C27B0'],
  earrings: ['#FFD700', '#C0C0C0', '#FF1744', '#2979FF', '#00E676', '#FF6D00', '#651FFF'],
  freckles: ['#D4A791', '#C89A7F', '#BC8D6D', '#B0805B'],
  hairAccessories: ['#FF1744', '#F50057', '#D500F9', '#651FFF', '#3D5AFE', '#2979FF', '#00B0FF', '#00E5FF', '#1DE9B6', '#00E676', '#76FF03', '#C6FF00', '#FFEA00', '#FFC400', '#FF9100', '#FF3D00']
};

window.AVATAR_ASSETS = AVATAR_ASSETS;
window.AVATAR_COLORS = AVATAR_COLORS;
