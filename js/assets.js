// ===== 현대적인 아바타 에셋 & 색상 (iPhone 이모지 스타일) =====
// 전역에 노출되는 상수: AVATAR_ASSETS, AVATAR_COLORS

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

  hair: {
    short_01: `
      <defs>
        <linearGradient id="hairGradient_short1" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" style="stop-color:var(--hair-color);stop-opacity:1" />
          <stop offset="100%" style="stop-color:var(--hair-color);stop-opacity:0.85" />
        </linearGradient>
        <filter id="hairShadow">
          <feGaussianBlur in="SourceAlpha" stdDeviation="2"/>
          <feOffset dx="0" dy="2" result="offsetblur"/>
          <feComponentTransfer><feFuncA type="linear" slope="0.25"/></feComponentTransfer>
          <feMerge><feMergeNode/><feMergeNode in="SourceGraphic"/></feMerge>
        </filter>
      </defs>
      <path d="M 256 135 Q 155 138 115 205 Q 112 180 115 160 Q 118 110 256 95 Q 394 110 397 160 Q 400 180 400 205 Q 357 138 256 135 Z" 
            fill="url(#hairGradient_short1)" stroke="rgba(0,0,0,0.15)" stroke-width="1" filter="url(#hairShadow)"/>
      <path d="M 175 140 Q 215 125 256 130 Q 297 125 337 140" 
            stroke="rgba(255,255,255,0.25)" stroke-width="2.5" fill="none" stroke-linecap="round"/>
      <path d="M 190 150 Q 220 140 256 143 Q 292 140 322 150" 
            stroke="rgba(0,0,0,0.08)" stroke-width="1.5" fill="none"/>
      <ellipse cx="200" cy="145" rx="12" ry="8" fill="rgba(255,255,255,0.15)"/>
      <ellipse cx="312" cy="145" rx="12" ry="8" fill="rgba(255,255,255,0.15)"/>
    `,
    short_02: `
      <defs>
        <linearGradient id="hairGradient_short2" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" style="stop-color:var(--hair-color);stop-opacity:1" />
          <stop offset="100%" style="stop-color:var(--hair-color);stop-opacity:0.88" />
        </linearGradient>
      </defs>
      <path d="M 256 115 Q 135 118 105 185 Q 105 150 108 130 Q 113 100 256 90 Q 399 100 404 130 Q 407 150 407 185 Q 377 118 256 115 Z" 
            fill="url(#hairGradient_short2)" stroke="rgba(0,0,0,0.15)" stroke-width="1" filter="url(#hairShadow)"/>
      <path d="M 160 125 Q 208 105 256 110 Q 304 105 352 125" 
            stroke="rgba(255,255,255,0.3)" stroke-width="3" fill="none" stroke-linecap="round"/>
      <ellipse cx="185" cy="118" rx="18" ry="12" fill="rgba(255,255,255,0.18)"/>
      <ellipse cx="327" cy="118" rx="18" ry="12" fill="rgba(255,255,255,0.18)"/>
      <path d="M 175 135 Q 215 120 256 125 Q 297 120 337 135" 
            stroke="rgba(0,0,0,0.1)" stroke-width="2" fill="none"/>
    `,
    medium_01: `
      <defs>
        <linearGradient id="hairGradient_medium1" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" style="stop-color:var(--hair-color);stop-opacity:1" />
          <stop offset="100%" style="stop-color:var(--hair-color);stop-opacity:0.82" />
        </linearGradient>
      </defs>
      <path d="M 256 95 Q 115 98 95 205 L 95 240 Q 98 220 115 205 Q 118 148 256 130 Q 394 148 397 205 Q 414 220 417 240 L 417 205 Q 397 98 256 95 Z" 
            fill="url(#hairGradient_medium1)" stroke="rgba(0,0,0,0.15)" stroke-width="1" filter="url(#hairShadow)"/>
      <path d="M 125 160 Q 185 130 256 135 Q 327 130 387 160" 
            stroke="rgba(255,255,255,0.22)" stroke-width="3" fill="none" stroke-linecap="round"/>
      <path d="M 140 180 Q 195 155 256 158 Q 317 155 372 180" 
            stroke="rgba(255,255,255,0.15)" stroke-width="2" fill="none" stroke-linecap="round"/>
      <ellipse cx="170" cy="145" rx="15" ry="10" fill="rgba(255,255,255,0.2)"/>
      <ellipse cx="342" cy="145" rx="15" ry="10" fill="rgba(255,255,255,0.2)"/>
      <path d="M 115 200 Q 125 210 138 218" stroke="rgba(0,0,0,0.08)" stroke-width="2" fill="none"/>
      <path d="M 397 200 Q 387 210 374 218" stroke="rgba(0,0,0,0.08)" stroke-width="2" fill="none"/>
    `,
    long_01: `
      <defs>
        <linearGradient id="hairGradient_long1" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" style="stop-color:var(--hair-color);stop-opacity:1" />
          <stop offset="70%" style="stop-color:var(--hair-color);stop-opacity:0.88" />
          <stop offset="100%" style="stop-color:var(--hair-color);stop-opacity:0.75" />
        </linearGradient>
      </defs>
      <path d="M 256 95 Q 95 98 85 265 L 85 320 Q 90 295 110 270 Q 118 215 256 145 Q 394 215 402 270 Q 422 295 427 320 L 427 265 Q 417 98 256 95 Z" 
            fill="url(#hairGradient_long1)" stroke="rgba(0,0,0,0.15)" stroke-width="1" filter="url(#hairShadow)"/>
      <path d="M 115 195 Q 175 150 256 155 Q 337 150 397 195" 
            stroke="rgba(255,255,255,0.2)" stroke-width="3.5" fill="none" stroke-linecap="round"/>
      <path d="M 130 225 Q 185 185 256 188 Q 327 185 382 225" 
            stroke="rgba(255,255,255,0.12)" stroke-width="2.5" fill="none" stroke-linecap="round"/>
      <path d="M 102 245 Q 125 225 155 238" stroke="rgba(0,0,0,0.12)" stroke-width="2.5" fill="none" stroke-linecap="round"/>
      <path d="M 410 245 Q 387 225 357 238" stroke="rgba(0,0,0,0.12)" stroke-width="2.5" fill="none" stroke-linecap="round"/>
      <ellipse cx="145" cy="185" rx="18" ry="12" fill="rgba(255,255,255,0.18)"/>
      <ellipse cx="367" cy="185" rx="18" ry="12" fill="rgba(255,255,255,0.18)"/>
    `,
    bun: `
      <defs>
        <radialGradient id="bunGradient" cx="45%" cy="35%">
          <stop offset="0%" style="stop-color:var(--hair-color);stop-opacity:1" />
          <stop offset="100%" style="stop-color:var(--hair-color);stop-opacity:0.78" />
        </radialGradient>
      </defs>
      <path d="M 256 135 Q 155 138 115 205 L 115 170 Q 118 110 256 100 Q 394 110 397 170 L 397 205 Q 357 138 256 135 Z" 
            fill="url(#hairGradient_short1)" stroke="rgba(0,0,0,0.15)" stroke-width="1" filter="url(#hairShadow)"/>
      <circle cx="256" cy="72" r="48" fill="url(#bunGradient)" stroke="rgba(0,0,0,0.2)" stroke-width="1" filter="url(#hairShadow)"/>
      <ellipse cx="235" cy="65" rx="15" ry="10" fill="rgba(255,255,255,0.25)"/>
      <path d="M 225 78 Q 256 85 287 78" stroke="rgba(0,0,0,0.18)" stroke-width="2.5" fill="none" stroke-linecap="round"/>
      <path d="M 230 85 Q 256 90 282 85" stroke="rgba(255,255,255,0.12)" stroke-width="1.5" fill="none" stroke-linecap="round"/>
      <ellipse cx="268" cy="58" rx="8" ry="6" fill="rgba(0,0,0,0.08)"/>
    `,
    bob_ghibli: `
      <defs>
        <linearGradient id="bobGradient" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" style="stop-color:var(--hair-color);stop-opacity:1" />
          <stop offset="100%" style="stop-color:var(--hair-color);stop-opacity:0.85" />
        </linearGradient>
      </defs>
      <path d="M 256 108 Q 155 113 115 193 Q 112 273 165 287 Q 208 300 256 277 Q 304 300 347 287 Q 400 273 400 193 Q 357 113 256 108 Z" 
            fill="url(#bobGradient)" stroke="rgba(0,0,0,0.15)" stroke-width="1" filter="url(#hairShadow)"/>
      <path d="M 140 185 Q 185 135 256 140 Q 327 135 372 185" 
            stroke="rgba(255,255,255,0.28)" stroke-width="3.5" fill="none" stroke-linecap="round"/>
      <ellipse cx="175" cy="215" rx="22" ry="38" fill="rgba(0,0,0,0.09)"/>
      <ellipse cx="337" cy="215" rx="22" ry="38" fill="rgba(0,0,0,0.09)"/>
      <path d="M 165 245 Q 185 255 205 258" stroke="rgba(255,255,255,0.15)" stroke-width="2" fill="none" stroke-linecap="round"/>
      <path d="M 347 245 Q 327 255 307 258" stroke="rgba(255,255,255,0.15)" stroke-width="2" fill="none" stroke-linecap="round"/>
    `,
    wavy: `
      <defs>
        <linearGradient id="wavyGradient" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" style="stop-color:var(--hair-color);stop-opacity:1" />
          <stop offset="80%" style="stop-color:var(--hair-color);stop-opacity:0.88" />
          <stop offset="100%" style="stop-color:var(--hair-color);stop-opacity:0.75" />
        </linearGradient>
      </defs>
      <path d="M 256 105 C 125 135, 85 268, 128 400 Q 180 285 256 210 Q 332 285 384 400 C 427 268, 387 135, 256 105 Z" 
            fill="url(#wavyGradient)" stroke="rgba(0,0,0,0.15)" stroke-width="1" filter="url(#hairShadow)"/>
      <path d="M 132 190 Q 187 120 256 130 Q 325 120 380 190" 
            stroke="rgba(255,255,255,0.32)" stroke-width="4" fill="none" stroke-linecap="round"/>
      <path d="M 152 235 Q 202 185 256 195 Q 310 185 360 235" 
            stroke="rgba(255,255,255,0.22)" stroke-width="3" fill="none" stroke-linecap="round"/>
      <path d="M 172 280 Q 214 245 256 253 Q 298 245 340 280" 
            stroke="rgba(0,0,0,0.1)" stroke-width="2.5" fill="none" stroke-linecap="round"/>
      <ellipse cx="160" cy="220" rx="15" ry="10" fill="rgba(255,255,255,0.2)"/>
      <ellipse cx="352" cy="220" rx="15" ry="10" fill="rgba(255,255,255,0.2)"/>
    `,
    curly: `
      <defs>
        <linearGradient id="curlyGradient" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" style="stop-color:var(--hair-color);stop-opacity:1" />
          <stop offset="100%" style="stop-color:var(--hair-color);stop-opacity:0.82" />
        </linearGradient>
        <radialGradient id="curlGradient" cx="40%" cy="40%">
          <stop offset="0%" style="stop-color:var(--hair-color);stop-opacity:0.8" />
          <stop offset="100%" style="stop-color:var(--hair-color);stop-opacity:0.5" />
        </radialGradient>
      </defs>
      <path d="M 256 100 Q 115 105 95 220 Q 90 295 133 385 Q 192 275 256 220 Q 320 275 379 385 Q 422 295 420 220 Q 397 105 256 100 Z" 
            fill="url(#curlyGradient)" stroke="rgba(0,0,0,0.15)" stroke-width="1" filter="url(#hairShadow)"/>
      <circle cx="147" cy="168" r="24" fill="url(#curlGradient)"/>
      <circle cx="365" cy="168" r="24" fill="url(#curlGradient)"/>
      <circle cx="175" cy="138" r="20" fill="url(#curlGradient)"/>
      <circle cx="337" cy="138" r="20" fill="url(#curlGradient)"/>
      <circle cx="205" cy="122" r="17" fill="url(#curlGradient)"/>
      <circle cx="307" cy="122" r="17" fill="url(#curlGradient)"/>
      <circle cx="256" cy="115" r="15" fill="url(#curlGradient)"/>
      <ellipse cx="137" cy="208" rx="14" ry="20" fill="rgba(255,255,255,0.18)"/>
      <ellipse cx="375" cy="208" rx="14" ry="20" fill="rgba(255,255,255,0.18)"/>
      <path d="M 155 195 Q 175 185 185 175" stroke="rgba(255,255,255,0.2)" stroke-width="2" fill="none" stroke-linecap="round"/>
      <path d="M 357 195 Q 337 185 327 175" stroke="rgba(255,255,255,0.2)" stroke-width="2" fill="none" stroke-linecap="round"/>
    `,
    ponytail: `
      <defs>
        <linearGradient id="ponytailGradient" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" style="stop-color:var(--hair-color);stop-opacity:1" />
          <stop offset="100%" style="stop-color:var(--hair-color);stop-opacity:0.85" />
        </linearGradient>
      </defs>
      <path d="M 256 135 Q 155 138 115 205 L 115 165 Q 118 110 256 100 Q 394 110 397 165 L 397 205 Q 357 138 256 135 Z" 
            fill="url(#hairGradient_short1)" stroke="rgba(0,0,0,0.15)" stroke-width="1" filter="url(#hairShadow)"/>
      <ellipse cx="256" cy="100" rx="42" ry="28" fill="var(--hair-color)" opacity="0.9"/>
      <path d="M 256 85 Q 245 60 248 35" stroke="var(--hair-color)" stroke-width="22" fill="none" stroke-linecap="round" opacity="0.95"/>
      <ellipse cx="248" cy="32" rx="14" ry="18" fill="url(#ponytailGradient)" filter="url(#hairShadow)"/>
      <path d="M 245 40 Q 248 28 250 20" stroke="rgba(255,255,255,0.25)" stroke-width="2" fill="none" stroke-linecap="round"/>
    `
  },

  hairBack: {
    short_01: ``,
    short_02: ``,
    medium_01: `
      <path d="M 105 255 Q 95 320 118 370" 
            stroke="var(--hair-color)" stroke-width="26" fill="none" opacity="0.92" stroke-linecap="round"/>
      <path d="M 407 255 Q 417 320 394 370" 
            stroke="var(--hair-color)" stroke-width="26" fill="none" opacity="0.92" stroke-linecap="round"/>
      <path d="M 110 270 Q 105 315 115 355" 
            stroke="rgba(255,255,255,0.12)" stroke-width="3" fill="none" stroke-linecap="round"/>
      <path d="M 402 270 Q 407 315 397 355" 
            stroke="rgba(255,255,255,0.12)" stroke-width="3" fill="none" stroke-linecap="round"/>
    `,
    long_01: `
      <path d="M 95 300 Q 85 370 98 440" 
            stroke="var(--hair-color)" stroke-width="30" fill="none" opacity="0.9" stroke-linecap="round"/>
      <path d="M 417 300 Q 427 370 414 440" 
            stroke="var(--hair-color)" stroke-width="30" fill="none" opacity="0.9" stroke-linecap="round"/>
      <path d="M 103 315 Q 98 375 108 425" 
            stroke="rgba(255,255,255,0.15)" stroke-width="3.5" fill="none" stroke-linecap="round"/>
      <path d="M 409 315 Q 414 375 404 425" 
            stroke="rgba(255,255,255,0.15)" stroke-width="3.5" fill="none" stroke-linecap="round"/>
      <path d="M 92 340 Q 90 380 95 420" 
            stroke="rgba(0,0,0,0.1)" stroke-width="2" fill="none"/>
      <path d="M 420 340 Q 422 380 417 420" 
            stroke="rgba(0,0,0,0.1)" stroke-width="2" fill="none"/>
    `,
    bun: ``,
    bob_ghibli: `
      <path d="M 115 235 Q 112 340 165 360 Q 208 373 256 365 Q 304 373 347 360 Q 400 340 397 235" 
            stroke="var(--hair-color)" stroke-width="24" fill="none" opacity="0.92" stroke-linecap="round"/>
      <path d="M 120 250 Q 118 330 162 348" 
            stroke="rgba(255,255,255,0.12)" stroke-width="2.5" fill="none" stroke-linecap="round"/>
      <path d="M 392 250 Q 394 330 350 348" 
            stroke="rgba(255,255,255,0.12)" stroke-width="2.5" fill="none" stroke-linecap="round"/>
    `,
    wavy: `
      <path d="M 128 285 Q 118 355 138 415" 
            stroke="var(--hair-color)" stroke-width="28" fill="none" opacity="0.88" stroke-linecap="round"/>
      <path d="M 384 285 Q 394 355 374 415" 
            stroke="var(--hair-color)" stroke-width="28" fill="none" opacity="0.88" stroke-linecap="round"/>
      <path d="M 135 300 Q 128 350 142 400" 
            stroke="rgba(255,255,255,0.15)" stroke-width="3" fill="none" stroke-linecap="round"/>
      <path d="M 377 300 Q 384 350 370 400" 
            stroke="rgba(255,255,255,0.15)" stroke-width="3" fill="none" stroke-linecap="round"/>
    `,
    curly: `
      <path d="M 133 275 Q 123 345 143 405" 
            stroke="var(--hair-color)" stroke-width="32" fill="none" opacity="0.82" stroke-linecap="round"/>
      <path d="M 379 275 Q 389 345 369 405" 
            stroke="var(--hair-color)" stroke-width="32" fill="none" opacity="0.82" stroke-linecap="round"/>
      <circle cx="127" cy="318" r="18" fill="var(--hair-color)" opacity="0.55"/>
      <circle cx="385" cy="318" r="18" fill="var(--hair-color)" opacity="0.55"/>
      <circle cx="135" cy="358" r="16" fill="var(--hair-color)" opacity="0.5"/>
      <circle cx="377" cy="358" r="16" fill="var(--hair-color)" opacity="0.5"/>
    `,
    ponytail: ``
  },

  eyes: {
    normal: `
      <defs>
        <radialGradient id="eyeWhiteGradient" cx="45%" cy="35%">
          <stop offset="0%" stop-color="#ffffff" />
          <stop offset="100%" stop-color="#f8f9fa" />
        </radialGradient>
        <radialGradient id="irisGradient" cx="35%" cy="30%">
          <stop offset="0%" stop-color="rgba(255,255,255,0.8)" />
          <stop offset="15%" stop-color="var(--eyes-color)" />
          <stop offset="75%" stop-color="var(--eyes-color)" />
          <stop offset="100%" style="stop-color:var(--eyes-color);stop-opacity:0.75" />
        </radialGradient>
        <radialGradient id="pupilGradient">
          <stop offset="0%" stop-color="#000000" />
          <stop offset="100%" stop-color="#1a1a1a" />
        </radialGradient>
      </defs>
      <ellipse cx="206" cy="262" rx="26" ry="32" fill="url(#eyeWhiteGradient)" stroke="rgba(0,0,0,0.12)" stroke-width="1"/>
      <ellipse cx="306" cy="262" rx="26" ry="32" fill="url(#eyeWhiteGradient)" stroke="rgba(0,0,0,0.12)" stroke-width="1"/>
      <ellipse cx="206" cy="264" rx="17" ry="21" fill="url(#irisGradient)"/>
      <ellipse cx="306" cy="264" rx="17" ry="21" fill="url(#irisGradient)"/>
      <circle cx="206" cy="266" r="9" fill="url(#pupilGradient)"/>
      <circle cx="306" cy="266" r="9" fill="url(#pupilGradient)"/>
      <circle cx="199" cy="257" r="8" fill="white" opacity="0.95"/>
      <circle cx="299" cy="257" r="8" fill="white" opacity="0.95"/>
      <circle cx="210" cy="261" r="4" fill="white" opacity="0.7"/>
      <circle cx="310" cy="261" r="4" fill="white" opacity="0.7"/>
      <ellipse cx="206" cy="276" rx="8" ry="3" fill="rgba(0,0,0,0.15)"/>
      <ellipse cx="306" cy="276" rx="8" ry="3" fill="rgba(0,0,0,0.15)"/>
    `,
    happy: `
      <defs>
        <linearGradient id="happyEyeGradient" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stop-color="var(--eyes-color)" stop-opacity="1"/>
          <stop offset="100%" stop-color="var(--eyes-color)" stop-opacity="0.8"/>
        </linearGradient>
      </defs>
      <path d="M 183 260 Q 206 276 229 260" 
            stroke="url(#happyEyeGradient)" stroke-width="6" fill="none" stroke-linecap="round"/>
      <path d="M 283 260 Q 306 276 329 260" 
            stroke="url(#happyEyeGradient)" stroke-width="6" fill="none" stroke-linecap="round"/>
      <path d="M 188 257 Q 206 269 224 257" 
            stroke="rgba(0,0,0,0.25)" stroke-width="2.5" fill="none" stroke-linecap="round"/>
      <path d="M 288 257 Q 306 269 324 257" 
            stroke="rgba(0,0,0,0.25)" stroke-width="2.5" fill="none" stroke-linecap="round"/>
      <ellipse cx="206" cy="267" rx="12" ry="5" fill="rgba(0,0,0,0.08)"/>
      <ellipse cx="306" cy="267" rx="12" ry="5" fill="rgba(0,0,0,0.08)"/>
    `,
    sleepy: `
      <defs>
        <linearGradient id="sleepyEyeGradient" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stop-color="var(--eyes-color)" stop-opacity="0.8"/>
          <stop offset="50%" stop-color="var(--eyes-color)" stop-opacity="1"/>
          <stop offset="100%" stop-color="var(--eyes-color)" stop-opacity="0.8"/>
        </linearGradient>
      </defs>
      <line x1="183" y1="267" x2="229" y2="267" 
            stroke="url(#sleepyEyeGradient)" stroke-width="5.5" stroke-linecap="round"/>
      <line x1="283" y1="267" x2="329" y2="267" 
            stroke="url(#sleepyEyeGradient)" stroke-width="5.5" stroke-linecap="round"/>
      <path d="M 183 272 Q 206 274 229 272" 
            stroke="rgba(0,0,0,0.12)" stroke-width="2" fill="none"/>
      <path d="M 283 272 Q 306 274 329 272" 
            stroke="rgba(0,0,0,0.12)" stroke-width="2" fill="none"/>
      <line x1="185" y1="262" x2="188" y2="266" 
            stroke="rgba(255,255,255,0.3)" stroke-width="2" stroke-linecap="round"/>
      <line x1="285" y1="262" x2="288" y2="266" 
            stroke="rgba(255,255,255,0.3)" stroke-width="2" stroke-linecap="round"/>
    `,
    wide: `
      <circle cx="206" cy="262" r="32" fill="url(#eyeWhiteGradient)" stroke="rgba(0,0,0,0.12)" stroke-width="1"/>
      <circle cx="306" cy="262" r="32" fill="url(#eyeWhiteGradient)" stroke="rgba(0,0,0,0.12)" stroke-width="1"/>
      <circle cx="206" cy="264" r="20" fill="url(#irisGradient)"/>
      <circle cx="306" cy="264" r="20" fill="url(#irisGradient)"/>
      <circle cx="206" cy="266" r="11" fill="url(#pupilGradient)"/>
      <circle cx="306" cy="266" r="11" fill="url(#pupilGradient)"/>
      <circle cx="198" cy="256" r="9" fill="white" opacity="1"/>
      <circle cx="298" cy="256" r="9" fill="white" opacity="1"/>
      <circle cx="211" cy="261" r="5" fill="white" opacity="0.75"/>
      <circle cx="311" cy="261" r="5" fill="white" opacity="0.75"/>
      <ellipse cx="206" cy="280" rx="10" ry="4" fill="rgba(0,0,0,0.15)"/>
      <ellipse cx="306" cy="280" rx="10" ry="4" fill="rgba(0,0,0,0.15)"/>
    `,
    wink: `
      <ellipse cx="206" cy="262" rx="26" ry="32" fill="url(#eyeWhiteGradient)" stroke="rgba(0,0,0,0.12)" stroke-width="1"/>
      <ellipse cx="206" cy="264" rx="17" ry="21" fill="url(#irisGradient)"/>
      <circle cx="206" cy="266" r="9" fill="url(#pupilGradient)"/>
      <circle cx="199" cy="257" r="8" fill="white" opacity="0.95"/>
      <circle cx="210" cy="261" r="4" fill="white" opacity="0.7"/>
      <path d="M 283 260 Q 306 276 329 260" 
            stroke="url(#happyEyeGradient)" stroke-width="6" fill="none" stroke-linecap="round"/>
      <path d="M 288 257 Q 306 269 324 257" 
            stroke="rgba(0,0,0,0.25)" stroke-width="2.5" fill="none" stroke-linecap="round"/>
      <ellipse cx="306" cy="267" rx="12" ry="5" fill="rgba(0,0,0,0.08)"/>
    `,
    ghibli: `
      <defs>
        <radialGradient id="ghibliEyeWhite" cx="40%" cy="30%">
          <stop offset="0%" stop-color="#ffffff" />
          <stop offset="100%" stop-color="#f5f5f5" />
        </radialGradient>
        <radialGradient id="ghibliIris" cx="35%" cy="28%">
          <stop offset="0%" stop-color="rgba(255,255,255,0.7)" />
          <stop offset="20%" stop-color="var(--eyes-color)" />
          <stop offset="80%" stop-color="var(--eyes-color)" />
          <stop offset="100%" style="stop-color:var(--eyes-color);stop-opacity:0.85" />
        </radialGradient>
      </defs>
      <ellipse cx="200" cy="264" rx="38" ry="44" fill="url(#ghibliEyeWhite)" stroke="rgba(0,0,0,0.2)" stroke-width="2.5"/>
      <ellipse cx="312" cy="264" rx="38" ry="44" fill="url(#ghibliEyeWhite)" stroke="rgba(0,0,0,0.2)" stroke-width="2.5"/>
      <circle cx="200" cy="268" r="22" fill="url(#ghibliIris)"/>
      <circle cx="312" cy="268" r="22" fill="url(#ghibliIris)"/>
      <circle cx="200" cy="270" r="12" fill="#000000"/>
      <circle cx="312" cy="270" r="12" fill="#000000"/>
      <circle cx="191" cy="258" r="10" fill="white"/>
      <circle cx="303" cy="258" r="10" fill="white"/>
      <circle cx="203" cy="263" r="5" fill="white" opacity="0.6"/>
      <circle cx="315" cy="263" r="5" fill="white" opacity="0.6"/>
      <path d="M 165 228 Q 200 222 235 228" 
            stroke="rgba(0,0,0,0.6)" stroke-width="4" fill="none" stroke-linecap="round"/>
      <path d="M 277 228 Q 312 222 347 228" 
            stroke="rgba(0,0,0,0.6)" stroke-width="4" fill="none" stroke-linecap="round"/>
    `,
    disney: `
      <defs>
        <radialGradient id="disneyEyeWhite" cx="42%" cy="32%">
          <stop offset="0%" stop-color="#ffffff" />
          <stop offset="100%" stop-color="#f8f9fa" />
        </radialGradient>
      </defs>
      <ellipse cx="204" cy="262" rx="30" ry="40" fill="url(#disneyEyeWhite)" stroke="rgba(0,0,0,0.18)" stroke-width="2"/>
      <ellipse cx="308" cy="262" rx="30" ry="40" fill="url(#disneyEyeWhite)" stroke="rgba(0,0,0,0.18)" stroke-width="2"/>
      <ellipse cx="204" cy="265" rx="16" ry="19" fill="url(#irisGradient)"/>
      <ellipse cx="308" cy="265" rx="16" ry="19" fill="url(#irisGradient)"/>
      <circle cx="204" cy="267" r="9" fill="#000000"/>
      <circle cx="308" cy="267" r="9" fill="#000000"/>
      <circle cx="197" cy="256" r="7" fill="white"/>
      <circle cx="301" cy="256" r="7" fill="white"/>
      <circle cx="207" cy="261" r="3" fill="white" opacity="0.7"/>
      <circle cx="311" cy="261" r="3" fill="white" opacity="0.7"/>
      <path d="M 174 225 Q 204 215 234 225" 
            stroke="rgba(0,0,0,0.5)" stroke-width="3.5" fill="none" stroke-linecap="round"/>
      <path d="M 278 225 Q 308 215 338 225" 
            stroke="rgba(0,0,0,0.5)" stroke-width="3.5" fill="none" stroke-linecap="round"/>
    `,
    expressive: `
      <defs>
        <radialGradient id="expressiveIris" cx="35%" cy="30%">
          <stop offset="0%" stop-color="rgba(255,255,255,0.9)" />
          <stop offset="20%" stop-color="var(--eyes-color)" />
          <stop offset="65%" stop-color="var(--eyes-color)" />
          <stop offset="100%" stop-color="rgba(0,0,0,0.4)" />
        </radialGradient>
      </defs>
      <g transform="translate(0, 5)">
        <ellipse cx="198" cy="262" rx="28" ry="24" fill="url(#eyeWhiteGradient)" stroke="rgba(0,0,0,0.15)" stroke-width="1.5"/>
        <ellipse cx="314" cy="262" rx="28" ry="24" fill="url(#eyeWhiteGradient)" stroke="rgba(0,0,0,0.15)" stroke-width="1.5"/>
        <circle cx="198" cy="263" r="12" fill="url(#expressiveIris)"/>
        <circle cx="314" cy="263" r="12" fill="url(#expressiveIris)"/>
        <circle cx="198" cy="264" r="7" fill="#000000"/>
        <circle cx="314" cy="264" r="7" fill="#000000"/>
        <circle cx="192" cy="257" r="5" fill="white"/>
        <circle cx="308" cy="257" r="5" fill="white"/>
        <circle cx="200" cy="260" r="2" fill="white" opacity="0.8"/>
        <circle cx="316" cy="260" r="2" fill="white" opacity="0.8"/>
      </g>
    `
  },

  eyebrows: {
    normal: `
      <defs>
        <linearGradient id="browGradient" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stop-color="var(--eyebrows-color)" stop-opacity="0.7"/>
          <stop offset="50%" stop-color="var(--eyebrows-color)" stop-opacity="1"/>
          <stop offset="100%" stop-color="var(--eyebrows-color)" stop-opacity="0.7"/>
        </linearGradient>
      </defs>
      <path d="M 178 232 Q 208 227 238 232" 
            stroke="url(#browGradient)" stroke-width="7" fill="none" stroke-linecap="round"/>
      <path d="M 274 232 Q 304 227 334 232" 
            stroke="url(#browGradient)" stroke-width="7" fill="none" stroke-linecap="round"/>
      <path d="M 182 230 Q 208 226 234 230" 
            stroke="rgba(0,0,0,0.2)" stroke-width="1" fill="none" stroke-linecap="round"/>
      <path d="M 278 230 Q 304 226 330 230" 
            stroke="rgba(0,0,0,0.2)" stroke-width="1" fill="none" stroke-linecap="round"/>
    `,
    angry: `
      <path d="M 178 237 Q 208 222 238 227" 
            stroke="url(#browGradient)" stroke-width="7" fill="none" stroke-linecap="round"/>
      <path d="M 274 227 Q 304 222 334 237" 
            stroke="url(#browGradient)" stroke-width="7" fill="none" stroke-linecap="round"/>
      <path d="M 182 235 Q 208 223 234 227" 
            stroke="rgba(0,0,0,0.25)" stroke-width="1.5" fill="none" stroke-linecap="round"/>
      <path d="M 278 227 Q 304 223 330 235" 
            stroke="rgba(0,0,0,0.25)" stroke-width="1.5" fill="none" stroke-linecap="round"/>
    `,
    raised: `
      <path d="M 178 227 Q 208 215 238 220" 
            stroke="url(#browGradient)" stroke-width="7" fill="none" stroke-linecap="round"/>
      <path d="M 274 220 Q 304 215 334 227" 
            stroke="url(#browGradient)" stroke-width="7" fill="none" stroke-linecap="round"/>
      <path d="M 182 225 Q 208 216 234 220" 
            stroke="rgba(255,255,255,0.3)" stroke-width="1.5" fill="none" stroke-linecap="round"/>
      <path d="M 278 220 Q 304 216 330 225" 
            stroke="rgba(255,255,255,0.3)" stroke-width="1.5" fill="none" stroke-linecap="round"/>
    `,
    sad: `
      <path d="M 178 232 Q 208 237 238 232" 
            stroke="url(#browGradient)" stroke-width="7" fill="none" stroke-linecap="round"/>
      <path d="M 274 232 Q 304 237 334 232" 
            stroke="url(#browGradient)" stroke-width="7" fill="none" stroke-linecap="round"/>
      <path d="M 182 233 Q 208 237 234 233" 
            stroke="rgba(0,0,0,0.2)" stroke-width="1" fill="none" stroke-linecap="round"/>
      <path d="M 278 233 Q 304 237 330 233" 
            stroke="rgba(0,0,0,0.2)" stroke-width="1" fill="none" stroke-linecap="round"/>
    `,
    thin: `
      <path d="M 178 232 Q 208 229 238 232" 
            stroke="url(#browGradient)" stroke-width="3.5" fill="none" stroke-linecap="round"/>
      <path d="M 274 232 Q 304 229 334 232" 
            stroke="url(#browGradient)" stroke-width="3.5" fill="none" stroke-linecap="round"/>
      <path d="M 182 231 Q 208 229 234 231" 
            stroke="rgba(255,255,255,0.2)" stroke-width="1" fill="none" stroke-linecap="round"/>
      <path d="M 278 231 Q 304 229 330 231" 
            stroke="rgba(255,255,255,0.2)" stroke-width="1" fill="none" stroke-linecap="round"/>
    `,
    gentle: `
      <path d="M 178 232 Q 208 222 238 232" 
            stroke="url(#browGradient)" stroke-width="6" fill="none" stroke-linecap="round"/>
      <path d="M 274 232 Q 304 222 334 232" 
            stroke="url(#browGradient)" stroke-width="6" fill="none" stroke-linecap="round"/>
      <path d="M 183 230 Q 208 223 233 230" 
            stroke="rgba(255,255,255,0.25)" stroke-width="1.5" fill="none" stroke-linecap="round"/>
      <path d="M 279 230 Q 304 223 329 230" 
            stroke="rgba(255,255,255,0.25)" stroke-width="1.5" fill="none" stroke-linecap="round"/>
    `,
    curved: `
      <path d="M 175 237 Q 208 218 238 225" 
            stroke="url(#browGradient)" stroke-width="6.5" fill="none" stroke-linecap="round"/>
      <path d="M 274 225 Q 304 218 337 237" 
            stroke="url(#browGradient)" stroke-width="6.5" fill="none" stroke-linecap="round"/>
    `
  },

  nose: {
    small: `
      <defs>
        <radialGradient id="noseGradient_small" cx="50%" cy="30%">
          <stop offset="0%" stop-color="rgba(0,0,0,0.08)" />
          <stop offset="100%" stop-color="rgba(0,0,0,0.15)" />
        </radialGradient>
      </defs>
      <ellipse cx="256" cy="302" rx="9" ry="13" fill="url(#noseGradient_small)"/>
      <ellipse cx="253" cy="299" rx="3" ry="4" fill="rgba(255,255,255,0.3)"/>
    `,
    normal: `
      <defs>
        <linearGradient id="noseGradient_normal" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stop-color="rgba(0,0,0,0.12)" />
          <stop offset="100%" stop-color="rgba(0,0,0,0.18)" />
        </linearGradient>
      </defs>
      <path d="M 256 280 L 249 306 L 256 310 L 263 306 Z" fill="url(#noseGradient_normal)"/>
      <ellipse cx="252" cy="305" rx="2" ry="3" fill="rgba(0,0,0,0.25)"/>
      <ellipse cx="260" cy="305" rx="2" ry="3" fill="rgba(0,0,0,0.25)"/>
      <line x1="254" y1="285" x2="256" y2="305" stroke="rgba(255,255,255,0.2)" stroke-width="1"/>
    `,
    large: `
      <path d="M 256 270 Q 243 290 246 312 L 266 312 Q 269 290 256 270 Z" fill="url(#noseGradient_normal)"/>
      <ellipse cx="249" cy="309" rx="3" ry="4" fill="rgba(0,0,0,0.3)"/>
      <ellipse cx="263" cy="309" rx="3" ry="4" fill="rgba(0,0,0,0.3)"/>
      <path d="M 253 278 Q 255 295 256 308" stroke="rgba(255,255,255,0.25)" stroke-width="1.5" fill="none"/>
    `,
    button: `
      <defs>
        <radialGradient id="noseGradient_button" cx="40%" cy="30%">
          <stop offset="0%" stop-color="rgba(0,0,0,0.08)" />
          <stop offset="100%" stop-color="rgba(0,0,0,0.15)" />
        </radialGradient>
      </defs>
      <circle cx="256" cy="302" r="11" fill="url(#noseGradient_button)"/>
      <ellipse cx="252" cy="298" rx="4" ry="5" fill="rgba(255,255,255,0.35)"/>
      <ellipse cx="253" cy="308" rx="2" ry="3" fill="rgba(0,0,0,0.2)"/>
      <ellipse cx="259" cy="308" rx="2" ry="3" fill="rgba(0,0,0,0.2)"/>
    `,
    pointed: `
      <path d="M 256 280 L 250 306 L 256 312 L 262 306 Z" fill="url(#noseGradient_normal)"/>
      <line x1="256" y1="283" x2="256" y2="308" stroke="rgba(255,255,255,0.25)" stroke-width="1.5"/>
      <ellipse cx="252" cy="306" rx="2" ry="3" fill="rgba(0,0,0,0.25)"/>
      <ellipse cx="260" cy="306" rx="2" ry="3" fill="rgba(0,0,0,0.25)"/>
    `,
    soft: `
      <path d="M 256 282 Q 251 302 256 312 Q 261 302 256 282 Z" fill="url(#noseGradient_small)"/>
      <ellipse cx="252" cy="296" rx="2" ry="3" fill="rgba(255,255,255,0.3)"/>
      <path d="M 251 309 L 256 311 L 261 309" stroke="rgba(0,0,0,0.2)" stroke-width="1.5" fill="none" stroke-linecap="round"/>
    `,
    cute: `
      <ellipse cx="256" cy="304" rx="7" ry="10" fill="rgba(0,0,0,0.12)"/>
      <ellipse cx="253" cy="300" rx="3" ry="4" fill="rgba(255,255,255,0.4)"/>
      <line x1="248" y1="307" x2="251" y2="309" stroke="rgba(0,0,0,0.15)" stroke-width="1.5" stroke-linecap="round"/>
      <line x1="264" y1="307" x2="261" y2="309" stroke="rgba(0,0,0,0.15)" stroke-width="1.5" stroke-linecap="round"/>
    `
  },

  mouth: {
    smile: `
      <defs>
        <linearGradient id="mouthGradient" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stop-color="var(--mouth-color)" stop-opacity="0.9"/>
          <stop offset="100%" stop-color="var(--mouth-color)" stop-opacity="1"/>
        </linearGradient>
      </defs>
      <path d="M 218 332 Q 256 354 294 332" 
            stroke="url(#mouthGradient)" stroke-width="5" fill="none" stroke-linecap="round"/>
      <path d="M 223 335 Q 256 350 289 335" 
            stroke="rgba(0,0,0,0.15)" stroke-width="1.5" fill="none" stroke-linecap="round"/>
      <ellipse cx="256" cy="346" rx="20" ry="6" fill="var(--mouth-color)" opacity="0.15"/>
    `,
    laugh: `
      <path d="M 218 332 Q 256 365 294 332" 
            stroke="url(#mouthGradient)" stroke-width="5.5" fill="none" stroke-linecap="round"/>
      <path d="M 228 338 Q 256 358 284 338" fill="var(--mouth-color)" opacity="0.35"/>
      <path d="M 235 345 Q 256 352 277 345" 
            stroke="rgba(255,255,255,0.3)" stroke-width="1.5" fill="none" stroke-linecap="round"/>
      <ellipse cx="256" cy="348" rx="24" ry="8" fill="rgba(0,0,0,0.1)"/>
    `,
    neutral: `
      <line x1="228" y1="342" x2="284" y2="342" 
            stroke="url(#mouthGradient)" stroke-width="4.5" stroke-linecap="round"/>
      <line x1="230" y1="341" x2="282" y2="341" 
            stroke="rgba(255,255,255,0.2)" stroke-width="1" stroke-linecap="round"/>
    `,
    sad: `
      <path d="M 218 348 Q 256 333 294 348" 
            stroke="url(#mouthGradient)" stroke-width="5" fill="none" stroke-linecap="round"/>
      <path d="M 223 346 Q 256 336 289 346" 
            stroke="rgba(0,0,0,0.15)" stroke-width="1.5" fill="none" stroke-linecap="round"/>
    `,
    open: `
      <defs>
        <radialGradient id="mouthOpenGradient" cx="50%" cy="40%">
          <stop offset="0%" stop-color="rgba(0,0,0,0.4)" />
          <stop offset="100%" stop-color="rgba(0,0,0,0.6)" />
        </radialGradient>
      </defs>
      <ellipse cx="256" cy="342" rx="32" ry="22" fill="var(--mouth-color)"/>
      <ellipse cx="256" cy="337" rx="27" ry="17" fill="url(#mouthOpenGradient)"/>
      <path d="M 230 338 Q 256 345 282 338" 
            stroke="rgba(255,255,255,0.15)" stroke-width="1" fill="none"/>
      <ellipse cx="244" cy="340" rx="4" ry="6" fill="white" opacity="0.8"/>
      <ellipse cx="268" cy="340" rx="4" ry="6" fill="white" opacity="0.8"/>
    `,
    softSmile: `
      <path d="M 218 342 Q 256 362 294 342" 
            stroke="url(#mouthGradient)" stroke-width="4" fill="none" stroke-linecap="round"/>
      <ellipse cx="256" cy="348" rx="20" ry="7" fill="var(--mouth-color)" opacity="0.25"/>
      <path d="M 225 344 Q 256 358 287 344" 
            stroke="rgba(255,255,255,0.2)" stroke-width="1.5" fill="none" stroke-linecap="round"/>
    `,
    bigSmile: `
      <path d="M 210 332 Q 256 370 302 332" 
            stroke="url(#mouthGradient)" stroke-width="6" fill="none" stroke-linecap="round"/>
      <path d="M 220 340 Q 256 365 292 340" fill="var(--mouth-color)" opacity="0.3"/>
      <path d="M 230 348 Q 256 358 282 348" 
            stroke="rgba(255,255,255,0.35)" stroke-width="2" fill="none" stroke-linecap="round"/>
      <ellipse cx="240" cy="352" rx="6" ry="4" fill="white" opacity="0.7"/>
      <ellipse cx="272" cy="352" rx="6" ry="4" fill="white" opacity="0.7"/>
    `
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
  }
};

const AVATAR_COLORS = {
  skin: ['#FFE0D4', '#FCCAAE', '#F7B896', '#E8A87C', '#D49574', '#C68563', '#A56F52', '#8D5524', '#6B4423'],
  hair: ['#090806', '#2C1B18', '#4E3329', '#6F4C3E', '#8B5A3C', '#A0634F', '#B89778', '#D4B896', '#E8D4BA', '#F5E8D6'],
  eyes: ['#1C1C1C', '#3E2723', '#5D4037', '#6D4C41', '#795548', '#1976D2', '#2196F3', '#4FC3F7', '#4CAF50', '#8BC34A', '#9C27B0', '#AB47BC', '#78909C', '#90A4AE'],
  eyebrows: ['#090806', '#2C1B18', '#4E3329', '#6F4C3E', '#8B5A3C', '#A0634F'],
  mouth: ['#C45B5D', '#D36769', '#E07B7D', '#E88B8D', '#F4A7A9', '#F5B9BB', '#8B5A5C', '#A5696B'],
  top: ['#EF5350', '#EC407A', '#AB47BC', '#7E57C2', '#5C6BC0', '#42A5F5', '#29B6F6', '#26C6DA', '#26A69A', '#66BB6A', '#9CCC65', '#D4E157', '#FFEE58', '#FFCA28', '#FFA726', '#FF7043', '#8D6E63', '#BDBDBD', '#78909C']
};

window.AVATAR_ASSETS = AVATAR_ASSETS;
window.AVATAR_COLORS = AVATAR_COLORS;
