// ===== 아바타 에셋 & 색상 (모듈형) =====
// 전역에 노출되는 상수: AVATAR_ASSETS, AVATAR_COLORS

const AVATAR_ASSETS = {
  faceShape: {
    oval: `<ellipse cx="256" cy="280" rx="140" ry="160" fill="var(--skin-color)" stroke="var(--line-color)" stroke-width="2"/>`,
    round: `<circle cx="256" cy="280" r="150" fill="var(--skin-color)" stroke="var(--line-color)" stroke-width="2"/>`,
    square: `<rect x="116" y="130" width="280" height="300" rx="40" fill="var(--skin-color)" stroke="var(--line-color)" stroke-width="2"/>`,
    heart: `<path d="M 256 130 Q 180 130 140 200 Q 140 280 256 400 Q 372 280 372 200 Q 332 130 256 130 Z" fill="var(--skin-color)" stroke="var(--line-color)" stroke-width="2"/>`,
    long: `<ellipse cx="256" cy="280" rx="120" ry="180" fill="var(--skin-color)" stroke="var(--line-color)" stroke-width="2"/>`,
    soft_round: `<path d="M 256 120 Q 150 140 140 240 Q 140 360 256 410 Q 372 360 372 240 Q 362 140 256 120 Z" fill="var(--skin-color)" stroke="var(--line-color)" stroke-width="2"/>`,
    natural: `
      <defs>
        <radialGradient id="skinGradient" cx="50%" cy="40%" r="60%">
          <stop offset="0%" stop-color="var(--skin-color)" />
          <stop offset="100%" stop-color="#e1b99a" />
        </radialGradient>
      </defs>
      <path d="M256 120
               C150 130, 100 240, 140 340
               C170 420, 340 420, 372 340
               C410 240, 362 130, 256 120Z"
            fill="url(#skinGradient)" stroke="var(--line-color)" stroke-width="2"/>
      <ellipse cx="200" cy="300" rx="22" ry="14" fill="#ffb3b3" opacity="0.15"/>
      <ellipse cx="312" cy="300" rx="22" ry="14" fill="#ffb3b3" opacity="0.15"/>
    `
  },

  ears: {
    normal: `<ellipse cx="120" cy="280" rx="25" ry="35" fill="var(--skin-color)" stroke="var(--line-color)" stroke-width="1.5"/>
            <ellipse cx="392" cy="280" rx="25" ry="35" fill="var(--skin-color)" stroke="var(--line-color)" stroke-width="1.5"/>`,
    small: `<ellipse cx="120" cy="280" rx="18" ry="28" fill="var(--skin-color)" stroke="var(--line-color)" stroke-width="1.5"/>
           <ellipse cx="392" cy="280" rx="18" ry="28" fill="var(--skin-color)" stroke="var(--line-color)" stroke-width="1.5"/>`,
    large: `<ellipse cx="120" cy="280" rx="30" ry="42" fill="var(--skin-color)" stroke="var(--line-color)" stroke-width="1.5"/>
           <ellipse cx="392" cy="280" rx="30" ry="42" fill="var(--skin-color)" stroke="var(--line-color)" stroke-width="1.5"/>`,
    elf: `<path d="M 120 250 Q 100 260 110 290 Q 115 280 120 280 Z" fill="var(--skin-color)" stroke="var(--line-color)" stroke-width="1.5"/>
         <path d="M 392 250 Q 412 260 402 290 Q 397 280 392 280 Z" fill="var(--skin-color)" stroke="var(--line-color)" stroke-width="1.5"/>`,
    rounded: `
      <ellipse cx="120" cy="280" rx="25" ry="32" fill="var(--skin-color)" stroke="var(--line-color)" stroke-width="1.2"/>
      <ellipse cx="392" cy="280" rx="25" ry="32" fill="var(--skin-color)" stroke="var(--line-color)" stroke-width="1.2"/>
      <ellipse cx="120" cy="280" rx="10" ry="12" fill="rgba(0,0,0,0.05)" />
      <ellipse cx="392" cy="280" rx="10" ry="12" fill="rgba(0,0,0,0.05)" />
    `,
    droopy: `
      <ellipse cx="120" cy="290" rx="22" ry="36" fill="var(--skin-color)" stroke="var(--line-color)" stroke-width="1.2"/>
      <ellipse cx="392" cy="290" rx="22" ry="36" fill="var(--skin-color)" stroke="var(--line-color)" stroke-width="1.2"/>
    `
  },

  hair: {
    short_01: `<path d="M 256 140 Q 160 140 120 200 L 120 160 Q 120 100 256 100 Q 392 100 392 160 L 392 200 Q 352 140 256 140 Z" fill="var(--hair-color)"/>`,
    short_02: `<path d="M 256 120 Q 140 120 110 180 Q 110 140 256 110 Q 402 140 402 180 Q 372 120 256 120 Z" fill="var(--hair-color)"/>`,
    medium_01: `<path d="M 256 100 Q 120 100 100 200 L 100 220 Q 110 200 120 200 Q 120 140 256 130 Q 392 140 392 200 Q 402 200 412 220 L 412 200 Q 392 100 256 100 Z" fill="var(--hair-color)"/>`,
    long_01: `<path d="M 256 100 Q 100 100 90 250 L 90 300 Q 95 280 110 260 Q 120 200 256 140 Q 392 200 402 260 Q 417 280 422 300 L 422 250 Q 412 100 256 100 Z" fill="var(--hair-color)"/>`,
    bun: `<path d="M 256 140 Q 160 140 120 200 L 120 160 Q 120 100 256 100 Q 392 100 392 160 L 392 200 Q 352 140 256 140 Z" fill="var(--hair-color)"/>
         <circle cx="256" cy="80" r="40" fill="var(--hair-color)"/>`,
    bob_ghibli: `<path d="M 256 115 Q 160 120 120 190 Q 118 260 160 270 Q 200 280 256 260 Q 312 280 352 270 Q 394 260 392 190 Q 352 120 256 115 Z" fill="var(--hair-color)"/>`,
    softWavy: `
      <path d="M256 110
               C130 140, 90 260, 130 380
               Q180 260, 256 200
               Q332 260, 382 380
               C422 260, 382 140, 256 110Z"
            fill="var(--hair-color)" />
      <path d="M130 190 Q180 120 256 130 Q330 120 382 190"
            stroke="rgba(255,255,255,0.25)" stroke-width="3" fill="none"/>
      <path d="M180 190 Q256 150 332 190"
            stroke="rgba(0,0,0,0.1)" stroke-width="2" fill="none"/>
    `
  },

  hairBack: {
    short_01: ``,
    short_02: ``,
    medium_01: `<path d="M 110 240 Q 100 300 120 350 M 402 240 Q 412 300 392 350" stroke="var(--hair-color)" stroke-width="20" fill="none"/>`,
    long_01: `<path d="M 100 280 Q 90 350 100 420 M 412 280 Q 422 350 412 420" stroke="var(--hair-color)" stroke-width="25" fill="none"/>`,
    bun: ``,
    bob_ghibli: `<path d="M 120 220 Q 120 320 160 340 Q 200 360 256 350 Q 312 360 352 340 Q 392 320 392 220" stroke="var(--hair-color)" stroke-width="18" fill="none"/>`
  },

  eyes: {
    normal: `<ellipse cx="210" cy="260" rx="20" ry="25" fill="var(--eyes-color)"/>
            <ellipse cx="302" cy="260" rx="20" ry="25" fill="var(--eyes-color)"/>
            <circle cx="215" cy="258" r="8" fill="white"/>
            <circle cx="307" cy="258" r="8" fill="white"/>`,
    happy: `<path d="M 190 260 Q 210 270 230 260" stroke="var(--eyes-color)" stroke-width="4" fill="none"/>
           <path d="M 282 260 Q 302 270 322 260" stroke="var(--eyes-color)" stroke-width="4" fill="none"/>`,
    sleepy: `<line x1="190" y1="265" x2="230" y2="265" stroke="var(--eyes-color)" stroke-width="4"/>
            <line x1="282" y1="265" x2="322" y2="265" stroke="var(--eyes-color)" stroke-width="4"/>`,
    wide: `<circle cx="210" cy="260" r="25" fill="var(--eyes-color)"/>
          <circle cx="302" cy="260" r="25" fill="var(--eyes-color)"/>
          <circle cx="215" cy="255" r="10" fill="white"/>
          <circle cx="307" cy="255" r="10" fill="white"/>`,
    wink: `<ellipse cx="210" cy="260" rx="20" ry="25" fill="var(--eyes-color)"/>
          <circle cx="215" cy="258" r="8" fill="white"/>
          <path d="M 282 260 Q 302 270 322 260" stroke="var(--eyes-color)" stroke-width="4" fill="none"/>`,
    ghibli: `
      <ellipse cx="206" cy="260" rx="32" ry="36" fill="white" stroke="var(--line-color)" stroke-width="2"/>
      <ellipse cx="306" cy="260" rx="32" ry="36" fill="white" stroke="var(--line-color)" stroke-width="2"/>
      <circle cx="206" cy="260" r="18" fill="var(--eyes-color)"/>
      <circle cx="306" cy="260" r="18" fill="var(--eyes-color)"/>
      <circle cx="198" cy="250" r="6" fill="white"/>
      <circle cx="298" cy="250" r="6" fill="white"/>
      <path d="M 170 225 Q 206 220 242 225" stroke="var(--line-color)" stroke-width="3" fill="none" stroke-linecap="round"/>
      <path d="M 270 225 Q 306 220 342 225" stroke="var(--line-color)" stroke-width="3" fill="none" stroke-linecap="round"/>
    `,
    disney: `
      <ellipse cx="206" cy="260" rx="28" ry="38" fill="white" stroke="var(--line-color)" stroke-width="2"/>
      <ellipse cx="306" cy="260" rx="28" ry="38" fill="white" stroke="var(--line-color)" stroke-width="2"/>
      <ellipse cx="206" cy="260" rx="14" ry="16" fill="var(--eyes-color)"/>
      <ellipse cx="306" cy="260" rx="14" ry="16" fill="var(--eyes-color)"/>
      <circle cx="200" cy="252" r="5" fill="white"/>
      <circle cx="300" cy="252" r="5" fill="white"/>
      <path d="M 178 222 Q 206 212 234 222" stroke="var(--line-color)" stroke-width="3" fill="none" stroke-linecap="round"/>
      <path d="M 278 222 Q 306 212 334 222" stroke="var(--line-color)" stroke-width="3" fill="none" stroke-linecap="round"/>
    `,
    expressive: `
      <g transform="translate(0, 5)">
        <ellipse cx="200" cy="260" rx="26" ry="20" fill="white" stroke="var(--line-color)" stroke-width="1.5"/>
        <circle cx="200" cy="260" r="10" fill="url(#irisGradient)"/>
        <circle cx="195" cy="255" r="4" fill="white"/>
        <ellipse cx="312" cy="260" rx="26" ry="20" fill="white" stroke="var(--line-color)" stroke-width="1.5"/>
        <circle cx="312" cy="260" r="10" fill="url(#irisGradient)"/>
        <circle cx="307" cy="255" r="4" fill="white"/>
        <defs>
          <radialGradient id="irisGradient" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stop-color="white"/>
            <stop offset="40%" stop-color="var(--eyes-color)" />
            <stop offset="100%" stop-color="black" />
          </radialGradient>
        </defs>
      </g>
    `
  },

  eyebrows: {
    normal: `<path d="M 180 230 Q 210 225 240 230" stroke="var(--eyebrows-color)" stroke-width="6" fill="none" stroke-linecap="round"/>
            <path d="M 272 230 Q 302 225 332 230" stroke="var(--eyebrows-color)" stroke-width="6" fill="none" stroke-linecap="round"/>`,
    angry: `<path d="M 180 235 Q 210 220 240 225" stroke="var(--eyebrows-color)" stroke-width="6" fill="none" stroke-linecap="round"/>
           <path d="M 272 225 Q 302 220 332 235" stroke="var(--eyebrows-color)" stroke-width="6" fill="none" stroke-linecap="round"/>`,
    raised: `<path d="M 180 225 Q 210 215 240 220" stroke="var(--eyebrows-color)" stroke-width="6" fill="none" stroke-linecap="round"/>
            <path d="M 272 220 Q 302 215 332 225" stroke="var(--eyebrows-color)" stroke-width="6" fill="none" stroke-linecap="round"/>`,
    sad: `<path d="M 180 230 Q 210 235 240 230" stroke="var(--eyebrows-color)" stroke-width="6" fill="none" stroke-linecap="round"/>
         <path d="M 272 230 Q 302 235 332 230" stroke="var(--eyebrows-color)" stroke-width="6" fill="none" stroke-linecap="round"/>`,
    thin: `<path d="M 180 230 Q 210 228 240 230" stroke="var(--eyebrows-color)" stroke-width="3" fill="none" stroke-linecap="round"/>
          <path d="M 272 230 Q 302 228 332 230" stroke="var(--eyebrows-color)" stroke-width="3" fill="none" stroke-linecap="round"/>`,
    gentle: `
      <path d="M180 230 Q210 220 240 230" stroke="var(--eyebrows-color)" stroke-width="5"
            fill="none" stroke-linecap="round"/>
      <path d="M272 230 Q302 220 332 230" stroke="var(--eyebrows-color)" stroke-width="5"
            fill="none" stroke-linecap="round"/>
    `
  },

  nose: {
    small: `<ellipse cx="256" cy="300" rx="8" ry="12" fill="rgba(0,0,0,0.1)"/>`,
    normal: `<path d="M 256 280 L 250 305 L 256 308 L 262 305 Z" fill="rgba(0,0,0,0.15)"/>`,
    large: `<path d="M 256 270 Q 245 290 248 310 L 264 310 Q 267 290 256 270 Z" fill="rgba(0,0,0,0.15)"/>`,
    button: `<circle cx="256" cy="300" r="10" fill="rgba(0,0,0,0.1)"/>`,
    pointed: `<path d="M 256 280 L 252 305 L 256 310 L 260 305 Z" fill="rgba(0,0,0,0.15)"/>`,
    soft: `
      <path d="M256 280 Q252 300 256 310 Q260 300 256 280Z"
            fill="rgba(0,0,0,0.1)"/>
    `
  },

  mouth: {
    smile: `<path d="M 220 330 Q 256 350 292 330" stroke="var(--mouth-color)" stroke-width="4" fill="none" stroke-linecap="round"/>`,
    laugh: `<path d="M 220 330 Q 256 360 292 330" stroke="var(--mouth-color)" stroke-width="5" fill="none" stroke-linecap="round"/>
           <path d="M 230 335 Q 256 350 282 335" fill="var(--mouth-color)" opacity="0.3"/>`,
    neutral: `<line x1="230" y1="340" x2="282" y2="340" stroke="var(--mouth-color)" stroke-width="4" stroke-linecap="round"/>`,
    sad: `<path d="M 220 345 Q 256 330 292 345" stroke="var(--mouth-color)" stroke-width="4" fill="none" stroke-linecap="round"/>`,
    open: `<ellipse cx="256" cy="340" rx="30" ry="20" fill="var(--mouth-color)"/>
          <ellipse cx="256" cy="335" rx="25" ry="15" fill="rgba(0,0,0,0.3)"/>`,
    softSmile: `
      <path d="M220 340 Q256 360 292 340"
            stroke="var(--mouth-color)" stroke-width="3.5" fill="none"
            stroke-linecap="round"/>
      <ellipse cx="256" cy="345" rx="18" ry="6" fill="var(--mouth-color)" opacity="0.2"/>
    `
  },

  top: {
    tshirt: `<path d="M 140 400 L 160 380 Q 200 360 256 360 Q 312 360 352 380 L 372 400 L 372 512 L 140 512 Z" fill="var(--top-color)"/>
            <path d="M 240 360 Q 256 370 272 360" stroke="white" stroke-width="2" fill="none"/>`,
    hoodie: `<path d="M 130 390 L 150 370 Q 200 350 256 350 Q 312 350 362 370 L 382 390 L 382 512 L 130 512 Z" fill="var(--top-color)"/>
            <path d="M 200 355 Q 256 340 312 355" stroke="rgba(0,0,0,0.2)" stroke-width="3" fill="none"/>
            <circle cx="200" cy="380" r="8" fill="rgba(0,0,0,0.3)"/>
            <circle cx="312" cy="380" r="8" fill="rgba(0,0,0,0.3)"/>`,
    vneck: `<path d="M 140 400 L 160 380 Q 200 360 256 360 Q 312 360 352 380 L 372 400 L 372 512 L 140 512 Z" fill="var(--top-color)"/>
           <path d="M 230 360 L 256 390 L 282 360" stroke="white" stroke-width="3" fill="none"/>`,
    collar: `<path d="M 140 400 L 160 380 Q 200 360 256 360 Q 312 360 352 380 L 372 400 L 372 512 L 140 512 Z" fill="var(--top-color)"/>
            <path d="M 220 360 L 220 385 L 256 375 L 292 385 L 292 360" fill="white"/>`,
    tank: `<path d="M 160 380 L 180 400 L 180 512 L 140 512 L 140 420 Z" fill="var(--top-color)"/>
          <path d="M 352 380 L 332 400 L 332 512 L 372 512 L 372 420 Z" fill="var(--top-color)"/>
          <rect x="180" y="380" width="152" height="132" fill="var(--top-color)"/>`,
    shirt: `
      <path d="M140 400 L160 380 Q200 360 256 360 Q312 360 352 380 L372 400 L372 512 L140 512 Z"
            fill="var(--top-color)" />
      <path d="M230 365 L256 385 L282 365"
            stroke="rgba(255,255,255,0.8)" stroke-width="2" fill="none"/>
      <path d="M180 380 Q256 370 332 380"
            stroke="rgba(0,0,0,0.05)" stroke-width="2" fill="none"/>
    `
  }
};

const AVATAR_COLORS = {
  skin: ['#F8EDEB', '#FCD5CE', '#FEC89A', '#FFD8A8', '#E6B8A2', '#CFA18D', '#B07D62', '#8D5524'],
  hair: ['#2C1B18', '#4E3B31', '#724133', '#A55728', '#B89778', '#F2D6B3', '#6C4A3C', '#2F4550'],
  eyes: ['#2C1B18', '#5C4033', '#8B4513', '#1E90FF', '#228B22', '#9370DB', '#4A6FA5', '#6B705C'],
  eyebrows: ['#2C1B18', '#4E3B31', '#724133', '#A55728', '#6C4A3C', '#2F4550'],
  mouth: ['#D4686B', '#E87C7C', '#C25B5D', '#F4A7B9', '#DC6B9E', '#E5989B'],
  top: ['#A2D2FF', '#BDE0FE', '#FFC8DD', '#FFAFCC', '#FDE2E4', '#E2ECE9', '#DDE5B6', '#CDEAC0']
};

window.AVATAR_ASSETS = AVATAR_ASSETS;
window.AVATAR_COLORS = AVATAR_COLORS;


