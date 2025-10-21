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
    short_modern: `
      <defs>
        <linearGradient id="hairGradient_short_modern" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" style="stop-color:var(--hair-color);stop-opacity:1" />
          <stop offset="100%" style="stop-color:var(--hair-color);stop-opacity:0.88" />
        </linearGradient>
        <filter id="hairShadow">
          <feGaussianBlur in="SourceAlpha" stdDeviation="2"/>
          <feOffset dx="0" dy="2" result="offsetblur"/>
          <feComponentTransfer><feFuncA type="linear" slope="0.25"/></feComponentTransfer>
          <feMerge><feMergeNode/><feMergeNode in="SourceGraphic"/></feMerge>
        </filter>
      </defs>
      <!-- 메인 헤어 볼륨 -->
      <path d="M 256 115 Q 145 118 110 195 Q 108 170 112 145 Q 120 105 180 95 Q 218 92 256 93 Q 294 92 332 95 Q 392 105 400 145 Q 404 170 404 195 Q 369 118 256 115 Z" 
            fill="url(#hairGradient_short_modern)" filter="url(#hairShadow)"/>
      <!-- 앞머리 레이어 -->
      <path d="M 200 115 Q 228 108 256 110 Q 284 108 312 115 Q 295 130 256 135 Q 217 130 200 115 Z" 
            fill="url(#hairGradient_short_modern)" opacity="0.9"/>
      <!-- 하이라이트 -->
      <path d="M 165 130 Q 210 110 256 115 Q 302 110 347 130" 
            stroke="rgba(255,255,255,0.35)" stroke-width="3.5" fill="none" stroke-linecap="round"/>
      <path d="M 185 145 Q 220 125 256 128 Q 292 125 327 145" 
            stroke="rgba(255,255,255,0.22)" stroke-width="2.5" fill="none" stroke-linecap="round"/>
      <!-- 텍스처 디테일 -->
      <path d="M 175 135 L 180 145 M 200 125 L 205 138 M 225 118 L 228 132" 
            stroke="rgba(0,0,0,0.1)" stroke-width="1.5" stroke-linecap="round"/>
      <path d="M 337 135 L 332 145 M 312 125 L 307 138 M 287 118 L 284 132" 
            stroke="rgba(0,0,0,0.1)" stroke-width="1.5" stroke-linecap="round"/>
      <!-- 볼륨 하이라이트 -->
      <ellipse cx="190" cy="135" rx="16" ry="12" fill="rgba(255,255,255,0.2)"/>
      <ellipse cx="322" cy="135" rx="16" ry="12" fill="rgba(255,255,255,0.2)"/>
      <!-- 얼굴 윤곽선 -->
      <path d="M 115 185 Q 120 195 128 205" stroke="rgba(0,0,0,0.12)" stroke-width="2" fill="none"/>
      <path d="M 397 185 Q 392 195 384 205" stroke="rgba(0,0,0,0.12)" stroke-width="2" fill="none"/>
    `,
    short_messy: `
      <defs>
        <linearGradient id="hairGradient_short_messy" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" style="stop-color:var(--hair-color);stop-opacity:1" />
          <stop offset="100%" style="stop-color:var(--hair-color);stop-opacity:0.85" />
        </linearGradient>
      </defs>
      <!-- 베이스 헤어 -->
      <path d="M 256 105 Q 140 110 108 190 Q 106 165 110 140 Q 118 100 256 95 Q 394 100 402 140 Q 406 165 404 190 Q 372 110 256 105 Z" 
            fill="url(#hairGradient_short_messy)" filter="url(#hairShadow)"/>
      <!-- 볼륨감 있는 앞머리 -->
      <path d="M 220 108 Q 238 95 256 98 Q 274 95 292 108 Q 280 120 256 125 Q 232 120 220 108 Z" 
            fill="url(#hairGradient_short_messy)" opacity="0.95"/>
      <path d="M 190 118 Q 210 105 230 110 L 225 125 Z" 
            fill="url(#hairGradient_short_messy)" opacity="0.9"/>
      <path d="M 322 118 Q 302 105 282 110 L 287 125 Z" 
            fill="url(#hairGradient_short_messy)" opacity="0.9"/>
      <!-- 삐죽한 머리카락 -->
      <path d="M 256 95 L 253 85 M 268 98 L 270 88 M 244 98 L 240 88" 
            stroke="var(--hair-color)" stroke-width="3" stroke-linecap="round" opacity="0.85"/>
      <!-- 하이라이트 -->
      <path d="M 155 138 Q 205 108 256 112 Q 307 108 357 138" 
            stroke="rgba(255,255,255,0.38)" stroke-width="4" fill="none" stroke-linecap="round"/>
      <ellipse cx="180" cy="125" rx="18" ry="13" fill="rgba(255,255,255,0.25)"/>
      <ellipse cx="332" cy="125" rx="18" ry="13" fill="rgba(255,255,255,0.25)"/>
      <!-- 텍스처 -->
      <path d="M 165 150 Q 180 140 195 148 M 347 150 Q 332 140 317 148" 
            stroke="rgba(0,0,0,0.1)" stroke-width="2" stroke-linecap="round"/>
    `,
    medium_side: `
      <defs>
        <linearGradient id="hairGradient_medium_side" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" style="stop-color:var(--hair-color);stop-opacity:1" />
          <stop offset="100%" style="stop-color:var(--hair-color);stop-opacity:0.82" />
        </linearGradient>
      </defs>
      <!-- 베이스 -->
      <path d="M 256 100 Q 125 105 100 210 L 100 245 Q 105 225 118 210 Q 125 155 256 135 Q 387 155 394 210 Q 407 225 412 245 L 412 210 Q 387 105 256 100 Z" 
            fill="url(#hairGradient_medium_side)" filter="url(#hairShadow)"/>
      <!-- 사이드 파트 -->
      <path d="M 220 135 Q 238 115 256 120 L 256 150 Q 240 145 225 155 Z" 
            fill="url(#hairGradient_medium_side)" opacity="0.92"/>
      <path d="M 292 135 Q 274 115 256 120 L 256 150 Q 272 145 287 155 Z" 
            fill="url(#hairGradient_medium_side)" opacity="0.88"/>
      <!-- 옆머리 볼륨 -->
      <path d="M 118 200 Q 125 215 140 228 M 394 200 Q 387 215 372 228" 
            stroke="rgba(0,0,0,0.12)" stroke-width="2.5" fill="none" stroke-linecap="round"/>
      <!-- 하이라이트 -->
      <path d="M 135 165 Q 190 140 256 145 Q 322 140 377 165" 
            stroke="rgba(255,255,255,0.28)" stroke-width="3.5" fill="none" stroke-linecap="round"/>
      <path d="M 150 190 Q 200 165 256 168 Q 312 165 362 190" 
            stroke="rgba(255,255,255,0.18)" stroke-width="2.5" fill="none" stroke-linecap="round"/>
      <!-- 볼륨 하이라이트 -->
      <ellipse cx="175" cy="155" rx="17" ry="12" fill="rgba(255,255,255,0.22)"/>
      <ellipse cx="337" cy="155" rx="17" ry="12" fill="rgba(255,255,255,0.22)"/>
      <!-- 텍스처 -->
      <path d="M 145 175 Q 165 165 185 175 M 367 175 Q 347 165 327 175" 
            stroke="rgba(0,0,0,0.08)" stroke-width="2" stroke-linecap="round"/>
    `,
    long_straight: `
      <defs>
        <linearGradient id="hairGradient_long_straight" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" style="stop-color:var(--hair-color);stop-opacity:1" />
          <stop offset="70%" style="stop-color:var(--hair-color);stop-opacity:0.9" />
          <stop offset="100%" style="stop-color:var(--hair-color);stop-opacity:0.78" />
        </linearGradient>
      </defs>
      <!-- 메인 롱 헤어 -->
      <path d="M 256 100 Q 105 105 92 270 L 92 325 Q 98 300 115 275 Q 125 220 256 150 Q 387 220 397 275 Q 414 300 420 325 L 420 270 Q 407 105 256 100 Z" 
            fill="url(#hairGradient_long_straight)" filter="url(#hairShadow)"/>
      <!-- 가르마 -->
      <line x1="256" y1="105" x2="256" y2="160" 
            stroke="rgba(0,0,0,0.15)" stroke-width="1.5"/>
      <path d="M 246 110 Q 256 115 266 110" 
            fill="rgba(0,0,0,0.08)"/>
      <!-- 앞머리 레이어 -->
      <path d="M 200 145 Q 228 130 256 135 Q 284 130 312 145 Q 295 158 256 160 Q 217 158 200 145 Z" 
            fill="url(#hairGradient_long_straight)" opacity="0.85"/>
      <!-- 하이라이트 -->
      <path d="M 120 200 Q 180 155 256 162 Q 332 155 392 200" 
            stroke="rgba(255,255,255,0.3)" stroke-width="4" fill="none" stroke-linecap="round"/>
      <path d="M 135 235 Q 190 195 256 200 Q 322 195 377 235" 
            stroke="rgba(255,255,255,0.2)" stroke-width="3" fill="none" stroke-linecap="round"/>
      <!-- 옆머리 흐름 -->
      <path d="M 108 250 Q 128 235 152 245" 
            stroke="rgba(0,0,0,0.15)" stroke-width="2.5" fill="none" stroke-linecap="round"/>
      <path d="M 404 250 Q 384 235 360 245" 
            stroke="rgba(0,0,0,0.15)" stroke-width="2.5" fill="none" stroke-linecap="round"/>
      <!-- 볼륨 하이라이트 -->
      <ellipse cx="150" cy="195" rx="20" ry="14" fill="rgba(255,255,255,0.22)"/>
      <ellipse cx="362" cy="195" rx="20" ry="14" fill="rgba(255,255,255,0.22)"/>
    `,
    bun_high: `
      <defs>
        <radialGradient id="bunHighGradient" cx="42%" cy="32%">
          <stop offset="0%" style="stop-color:var(--hair-color);stop-opacity:1" />
          <stop offset="100%" style="stop-color:var(--hair-color);stop-opacity:0.75" />
        </radialGradient>
      </defs>
      <!-- 베이스 헤어 -->
      <path d="M 256 130 Q 160 135 118 205 L 118 175 Q 122 120 256 108 Q 390 120 394 175 L 394 205 Q 352 135 256 130 Z" 
            fill="url(#hairGradient_short_modern)" filter="url(#hairShadow)"/>
      <!-- 묶은 부분 -->
      <ellipse cx="256" cy="105" rx="48" ry="32" fill="var(--hair-color)" opacity="0.92" filter="url(#hairShadow)"/>
      <path d="M 220 100 Q 256 95 292 100" 
            stroke="rgba(0,0,0,0.2)" stroke-width="2" fill="none"/>
      <!-- 상투 -->
      <circle cx="256" cy="68" r="52" fill="url(#bunHighGradient)" filter="url(#hairShadow)"/>
      <circle cx="256" cy="68" r="52" fill="none" stroke="rgba(0,0,0,0.15)" stroke-width="1"/>
      <!-- 상투 하이라이트 -->
      <ellipse cx="232" cy="58" rx="18" ry="14" fill="rgba(255,255,255,0.3)"/>
      <ellipse cx="268" cy="72" rx="14" ry="10" fill="rgba(0,0,0,0.12)"/>
      <!-- 상투 디테일 -->
      <path d="M 222 72 Q 256 82 290 72" 
            stroke="rgba(0,0,0,0.2)" stroke-width="3" fill="none" stroke-linecap="round"/>
      <path d="M 228 80 Q 256 88 284 80" 
            stroke="rgba(255,255,255,0.18)" stroke-width="2" fill="none" stroke-linecap="round"/>
      <!-- 잔머리 -->
      <path d="M 195 125 L 190 135 M 210 118 L 208 128" 
            stroke="var(--hair-color)" stroke-width="2" stroke-linecap="round" opacity="0.7"/>
      <path d="M 317 125 L 322 135 M 302 118 L 304 128" 
            stroke="var(--hair-color)" stroke-width="2" stroke-linecap="round" opacity="0.7"/>
    `,
    bob_modern: `
      <defs>
        <linearGradient id="bobModernGradient" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" style="stop-color:var(--hair-color);stop-opacity:1" />
          <stop offset="100%" style="stop-color:var(--hair-color);stop-opacity:0.87" />
        </linearGradient>
      </defs>
      <!-- 베이스 밥 -->
      <path d="M 256 112 Q 162 118 120 198 Q 118 278 168 292 Q 210 305 256 282 Q 302 305 344 292 Q 394 278 394 198 Q 350 118 256 112 Z" 
            fill="url(#bobModernGradient)" filter="url(#hairShadow)"/>
      <!-- 앞머리 -->
      <path d="M 190 140 Q 223 125 256 130 Q 289 125 322 140 Q 305 152 256 158 Q 207 152 190 140 Z" 
            fill="url(#bobModernGradient)" opacity="0.95"/>
      <!-- 옆머리 볼륨 -->
      <ellipse cx="178" cy="225" rx="24" ry="42" fill="rgba(0,0,0,0.11)" opacity="0.9"/>
      <ellipse cx="334" cy="225" rx="24" ry="42" fill="rgba(0,0,0,0.11)" opacity="0.9"/>
      <!-- 하이라이트 -->
      <path d="M 145 192 Q 192 142 256 148 Q 320 142 367 192" 
            stroke="rgba(255,255,255,0.32)" stroke-width="4" fill="none" stroke-linecap="round"/>
      <!-- 옆머리 하이라이트 -->
      <path d="M 168 250 Q 188 265 208 268" 
            stroke="rgba(255,255,255,0.2)" stroke-width="2.5" fill="none" stroke-linecap="round"/>
      <path d="M 344 250 Q 324 265 304 268" 
            stroke="rgba(255,255,255,0.2)" stroke-width="2.5" fill="none" stroke-linecap="round"/>
      <!-- 텍스처 -->
      <path d="M 155 215 Q 170 205 185 215 M 357 215 Q 342 205 327 215" 
            stroke="rgba(0,0,0,0.1)" stroke-width="2" stroke-linecap="round"/>
      <!-- 볼륨 하이라이트 -->
      <ellipse cx="200" cy="165" rx="16" ry="12" fill="rgba(255,255,255,0.22)"/>
      <ellipse cx="312" cy="165" rx="16" ry="12" fill="rgba(255,255,255,0.22)"/>
    `,
    wavy_long: `
      <defs>
        <linearGradient id="wavyLongGradient" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" style="stop-color:var(--hair-color);stop-opacity:1" />
          <stop offset="80%" style="stop-color:var(--hair-color);stop-opacity:0.9" />
          <stop offset="100%" style="stop-color:var(--hair-color);stop-opacity:0.78" />
        </linearGradient>
      </defs>
      <!-- 웨이브 메인 -->
      <path d="M 256 108 C 130 138, 88 272, 132 405 Q 182 295 256 218 Q 330 295 380 405 C 424 272, 382 138, 256 108 Z" 
            fill="url(#wavyLongGradient)" filter="url(#hairShadow)"/>
      <!-- 웨이브 레이어 1 -->
      <path d="M 138 198 Q 195 132 256 142 Q 317 132 374 198" 
            stroke="rgba(255,255,255,0.35)" stroke-width="4.5" fill="none" stroke-linecap="round"/>
      <!-- 웨이브 레이어 2 -->
      <path d="M 155 242 Q 208 195 256 205 Q 304 195 357 242" 
            stroke="rgba(255,255,255,0.25)" stroke-width="3.5" fill="none" stroke-linecap="round"/>
      <!-- 웨이브 레이어 3 -->
      <path d="M 172 285 Q 217 252 256 260 Q 295 252 340 285" 
            stroke="rgba(255,255,255,0.15)" stroke-width="2.5" fill="none" stroke-linecap="round"/>
      <!-- 그림자 웨이브 -->
      <path d="M 190 330 Q 228 305 256 310 Q 284 305 322 330" 
            stroke="rgba(0,0,0,0.12)" stroke-width="3" fill="none" stroke-linecap="round"/>
      <!-- 볼륨 하이라이트 -->
      <ellipse cx="165" cy="230" rx="17" ry="13" fill="rgba(255,255,255,0.25)"/>
      <ellipse cx="347" cy="230" rx="17" ry="13" fill="rgba(255,255,255,0.25)"/>
      <!-- 앞머리 -->
      <path d="M 210 135 Q 233 120 256 125 Q 279 120 302 135" 
            fill="url(#wavyLongGradient)" opacity="0.88"/>
    `,
    curly_natural: `
      <defs>
        <linearGradient id="curlyNaturalGradient" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" style="stop-color:var(--hair-color);stop-opacity:1" />
          <stop offset="100%" style="stop-color:var(--hair-color);stop-opacity:0.84" />
        </linearGradient>
        <radialGradient id="curlHighlight" cx="38%" cy="35%">
          <stop offset="0%" style="stop-color:var(--hair-color);stop-opacity:0.85" />
          <stop offset="100%" style="stop-color:var(--hair-color);stop-opacity:0.55" />
        </radialGradient>
      </defs>
      <!-- 곱슬머리 베이스 -->
      <path d="M 256 105 Q 120 112 98 225 Q 93 300 138 392 Q 195 285 256 228 Q 317 285 374 392 Q 419 300 417 225 Q 392 112 256 105 Z" 
            fill="url(#curlyNaturalGradient)" filter="url(#hairShadow)"/>
      <!-- 큰 컬 -->
      <circle cx="152" cy="175" r="26" fill="url(#curlHighlight)"/>
      <circle cx="360" cy="175" r="26" fill="url(#curlHighlight)"/>
      <circle cx="182" cy="148" r="22" fill="url(#curlHighlight)"/>
      <circle cx="330" cy="148" r="22" fill="url(#curlHighlight)"/>
      <!-- 중간 컬 -->
      <circle cx="212" cy="128" r="19" fill="url(#curlHighlight)"/>
      <circle cx="300" cy="128" r="19" fill="url(#curlHighlight)"/>
      <circle cx="256" cy="118" r="17" fill="url(#curlHighlight)"/>
      <!-- 작은 컬 -->
      <circle cx="235" cy="120" r="14" fill="url(#curlHighlight)"/>
      <circle cx="277" cy="120" r="14" fill="url(#curlHighlight)"/>
      <!-- 컬 하이라이트 -->
      <ellipse cx="145" cy="220" rx="16" ry="22" fill="rgba(255,255,255,0.22)"/>
      <ellipse cx="367" cy="220" rx="16" ry="22" fill="rgba(255,255,255,0.22)"/>
      <!-- 컬 디테일 -->
      <path d="M 160 200 Q 178 192 188 185" 
            stroke="rgba(255,255,255,0.25)" stroke-width="2.5" fill="none" stroke-linecap="round"/>
      <path d="M 352 200 Q 334 192 324 185" 
            stroke="rgba(255,255,255,0.25)" stroke-width="2.5" fill="none" stroke-linecap="round"/>
      <!-- 텍스처 -->
      <path d="M 170 240 Q 185 230 195 240 M 342 240 Q 327 230 317 240" 
            stroke="rgba(0,0,0,0.1)" stroke-width="2" stroke-linecap="round"/>
    `,
    ponytail_high: `
      <defs>
        <linearGradient id="ponytailHighGradient" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" style="stop-color:var(--hair-color);stop-opacity:1" />
          <stop offset="100%" style="stop-color:var(--hair-color);stop-opacity:0.88" />
        </linearGradient>
      </defs>
      <!-- 베이스 -->
      <path d="M 256 132 Q 162 136 120 205 L 120 170 Q 124 118 256 105 Q 388 118 392 170 L 392 205 Q 350 136 256 132 Z" 
            fill="url(#hairGradient_short_modern)" filter="url(#hairShadow)"/>
      <!-- 묶은 부분 타원 -->
      <ellipse cx="256" cy="105" rx="46" ry="30" fill="var(--hair-color)" opacity="0.95"/>
      <!-- 머리끈 -->
      <rect x="240" y="95" width="32" height="12" rx="6" fill="rgba(0,0,0,0.25)"/>
      <rect x="242" y="96" width="28" height="10" rx="5" fill="#F4A7A9"/>
      <ellipse cx="256" cy="101" rx="4" ry="3" fill="rgba(255,255,255,0.4)"/>
      <!-- 포니테일 -->
      <path d="M 256 90 Q 248 68 250 45 Q 251 30 252 20" 
            stroke="var(--hair-color)" stroke-width="24" fill="none" stroke-linecap="round" opacity="0.95" filter="url(#hairShadow)"/>
      <!-- 포니테일 끝 -->
      <ellipse cx="252" cy="18" rx="15" ry="20" fill="url(#ponytailHighGradient)"/>
      <!-- 포니테일 하이라이트 -->
      <path d="M 246 50 Q 249 35 251 22" 
            stroke="rgba(255,255,255,0.3)" stroke-width="3" fill="none" stroke-linecap="round"/>
      <ellipse cx="248" cy="60" rx="5" ry="8" fill="rgba(255,255,255,0.2)"/>
      <!-- 잔머리 -->
      <path d="M 200 128 L 195 138 M 215 122 L 212 132 M 312 128 L 317 138 M 297 122 L 300 132" 
            stroke="var(--hair-color)" stroke-width="2" stroke-linecap="round" opacity="0.75"/>
    `,
    pixie_cut: `
      <defs>
        <linearGradient id="pixieGradient" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" style="stop-color:var(--hair-color);stop-opacity:1" />
          <stop offset="100%" style="stop-color:var(--hair-color);stop-opacity:0.9" />
        </linearGradient>
      </defs>
      <!-- 짧은 픽시컷 베이스 -->
      <path d="M 256 125 Q 155 128 115 200 Q 113 175 116 155 Q 122 115 256 105 Q 390 115 396 155 Q 399 175 399 200 Q 357 128 256 125 Z" 
            fill="url(#pixieGradient)" filter="url(#hairShadow)"/>
      <!-- 옆머리 레이어 -->
      <path d="M 135 175 Q 145 165 158 170 L 152 190 Z" 
            fill="url(#pixieGradient)" opacity="0.85"/>
      <path d="M 377 175 Q 367 165 354 170 L 360 190 Z" 
            fill="url(#pixieGradient)" opacity="0.85"/>
      <!-- 앞머리 스파이크 -->
      <path d="M 230 115 Q 243 105 256 108 Q 269 105 282 115" 
            fill="url(#pixieGradient)" opacity="0.95"/>
      <path d="M 256 105 L 254 95 M 245 108 L 242 98 M 267 108 L 270 98" 
            stroke="var(--hair-color)" stroke-width="3.5" stroke-linecap="round" opacity="0.9"/>
      <!-- 하이라이트 -->
      <path d="M 170 145 Q 213 120 256 125 Q 299 120 342 145" 
            stroke="rgba(255,255,255,0.4)" stroke-width="3.5" fill="none" stroke-linecap="round"/>
      <ellipse cx="195" cy="140" rx="14" ry="10" fill="rgba(255,255,255,0.28)"/>
      <ellipse cx="317" cy="140" rx="14" ry="10" fill="rgba(255,255,255,0.28)"/>
      <!-- 텍스처 -->
      <path d="M 145 160 Q 160 150 175 160 M 367 160 Q 352 150 337 160" 
            stroke="rgba(0,0,0,0.12)" stroke-width="2" stroke-linecap="round"/>
    `,
    undercut_male: `
      <defs>
        <linearGradient id="undercutGradient" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" style="stop-color:var(--hair-color);stop-opacity:1" />
          <stop offset="100%" style="stop-color:var(--hair-color);stop-opacity:0.88" />
        </linearGradient>
      </defs>
      <!-- 짧은 옆머리 (페이드) -->
      <path d="M 120 180 Q 125 190 130 200" 
            stroke="var(--hair-color)" stroke-width="8" fill="none" opacity="0.4" stroke-linecap="round"/>
      <path d="M 392 180 Q 387 190 382 200" 
            stroke="var(--hair-color)" stroke-width="8" fill="none" opacity="0.4" stroke-linecap="round"/>
      <!-- 윗머리 볼륨 -->
      <path d="M 256 105 Q 155 110 125 175 Q 123 150 128 130 Q 138 105 256 95 Q 374 105 384 130 Q 389 150 389 175 Q 357 110 256 105 Z" 
            fill="url(#undercutGradient)" filter="url(#hairShadow)"/>
      <!-- 스타일링된 윗머리 -->
      <path d="M 210 105 Q 233 85 256 90 Q 279 85 302 105 Q 285 115 256 120 Q 227 115 210 105 Z" 
            fill="url(#undercutGradient)" opacity="0.95"/>
      <!-- 뒤로 넘긴 스타일 -->
      <path d="M 230 100 Q 243 90 256 95 Q 269 90 282 100" 
            stroke="rgba(0,0,0,0.15)" stroke-width="2" fill="none"/>
      <!-- 하이라이트 -->
      <path d="M 175 125 Q 215 100 256 105 Q 297 100 337 125" 
            stroke="rgba(255,255,255,0.4)" stroke-width="4" fill="none" stroke-linecap="round"/>
      <ellipse cx="220" cy="110" rx="15" ry="10" fill="rgba(255,255,255,0.3)"/>
      <ellipse cx="292" cy="110" rx="15" ry="10" fill="rgba(255,255,255,0.3)"/>
      <!-- 텍스처 -->
      <path d="M 235 105 L 238 95 M 256 103 L 256 92 M 277 105 L 274 95" 
            stroke="var(--hair-color)" stroke-width="2.5" stroke-linecap="round" opacity="0.85"/>
    `,
    crew_cut: `
      <defs>
        <linearGradient id="crewcutGradient" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" style="stop-color:var(--hair-color);stop-opacity:1" />
          <stop offset="100%" style="stop-color:var(--hair-color);stop-opacity:0.92" />
        </linearGradient>
      </defs>
      <!-- 매우 짧은 크루컷 베이스 -->
      <path d="M 256 125 Q 160 128 120 195 Q 118 170 122 150 Q 130 115 256 108 Q 382 115 390 150 Q 394 170 394 195 Q 352 128 256 125 Z" 
            fill="url(#crewcutGradient)" filter="url(#hairShadow)"/>
      <!-- 짧은 옆머리 -->
      <path d="M 125 170 Q 130 180 138 190 M 387 170 Q 382 180 374 190" 
            stroke="var(--hair-color)" stroke-width="6" fill="none" opacity="0.5" stroke-linecap="round"/>
      <!-- 짧은 앞머리 -->
      <path d="M 220 118 Q 238 112 256 115 Q 274 112 292 118" 
            fill="url(#crewcutGradient)" opacity="0.85"/>
      <!-- 텍스처 디테일 -->
      <path d="M 200 125 L 202 120 M 220 120 L 222 115 M 240 115 L 242 110 M 256 113 L 256 108" 
            stroke="var(--hair-color)" stroke-width="2" stroke-linecap="round" opacity="0.7"/>
      <path d="M 272 115 L 270 110 M 292 120 L 290 115 M 312 125 L 310 120" 
            stroke="var(--hair-color)" stroke-width="2" stroke-linecap="round" opacity="0.7"/>
      <!-- 하이라이트 -->
      <path d="M 185 135 Q 220 118 256 122 Q 292 118 327 135" 
            stroke="rgba(255,255,255,0.35)" stroke-width="3" fill="none" stroke-linecap="round"/>
      <ellipse cx="210" cy="128" rx="12" ry="8" fill="rgba(255,255,255,0.25)"/>
      <ellipse cx="302" cy="128" rx="12" ry="8" fill="rgba(255,255,255,0.25)"/>
    `,
    pompadour: `
      <defs>
        <linearGradient id="pompadourGradient" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" style="stop-color:var(--hair-color);stop-opacity:1" />
          <stop offset="100%" style="stop-color:var(--hair-color);stop-opacity:0.85" />
        </linearGradient>
      </defs>
      <!-- 짧은 옆머리 -->
      <path d="M 122 175 Q 128 185 135 195 M 390 175 Q 384 185 377 195" 
            stroke="var(--hair-color)" stroke-width="7" fill="none" opacity="0.45" stroke-linecap="round"/>
      <!-- 베이스 -->
      <path d="M 256 110 Q 160 115 128 185 Q 125 160 130 140 Q 140 110 256 100 Q 372 110 382 140 Q 387 160 386 185 Q 352 115 256 110 Z" 
            fill="url(#pompadourGradient)" filter="url(#hairShadow)"/>
      <!-- 높은 포마드 볼륨 -->
      <path d="M 220 95 Q 238 65 256 70 Q 274 65 292 95 Q 280 105 256 110 Q 232 105 220 95 Z" 
            fill="url(#pompadourGradient)" opacity="0.95" filter="url(#hairShadow)"/>
      <path d="M 235 85 Q 246 75 256 78 Q 266 75 277 85" 
            fill="url(#pompadourGradient)" opacity="0.9"/>
      <!-- 뒤로 넘긴 스타일 -->
      <path d="M 230 95 Q 243 85 256 88 Q 269 85 282 95" 
            stroke="rgba(0,0,0,0.2)" stroke-width="2.5" fill="none"/>
      <!-- 윤기 하이라이트 -->
      <path d="M 240 80 Q 248 75 256 78 Q 264 75 272 80" 
            stroke="rgba(255,255,255,0.5)" stroke-width="4" fill="none" stroke-linecap="round"/>
      <ellipse cx="245" cy="88" rx="14" ry="10" fill="rgba(255,255,255,0.4)"/>
      <ellipse cx="267" cy="88" rx="14" ry="10" fill="rgba(255,255,255,0.4)"/>
      <!-- 볼륨 디테일 -->
      <path d="M 225 100 Q 240 90 256 95 Q 272 90 287 100" 
            stroke="rgba(255,255,255,0.3)" stroke-width="3" fill="none" stroke-linecap="round"/>
      <!-- 텍스처 -->
      <path d="M 235 95 L 240 85 M 256 93 L 256 82 M 277 95 L 272 85" 
            stroke="rgba(0,0,0,0.15)" stroke-width="2" stroke-linecap="round"/>
    `,
    slicked_back: `
      <defs>
        <linearGradient id="slickedGradient" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" style="stop-color:var(--hair-color);stop-opacity:1" />
          <stop offset="100%" style="stop-color:var(--hair-color);stop-opacity:0.88" />
        </linearGradient>
      </defs>
      <!-- 베이스 -->
      <path d="M 256 108 Q 158 112 125 185 Q 122 160 127 140 Q 137 108 256 98 Q 375 108 385 140 Q 390 160 389 185 Q 354 112 256 108 Z" 
            fill="url(#slickedGradient)" filter="url(#hairShadow)"/>
      <!-- 가운데 가르마 -->
      <line x1="256" y1="100" x2="256" y2="140" 
            stroke="rgba(0,0,0,0.2)" stroke-width="2"/>
      <path d="M 246 105 Q 256 108 266 105" 
            fill="rgba(0,0,0,0.1)"/>
      <!-- 뒤로 넘긴 헤어 -->
      <path d="M 210 110 Q 233 105 256 108 Q 279 105 302 110" 
            stroke="rgba(0,0,0,0.15)" stroke-width="3" fill="none"/>
      <path d="M 220 125 Q 238 118 256 120 Q 274 118 292 125" 
            stroke="rgba(0,0,0,0.12)" stroke-width="2.5" fill="none"/>
      <!-- 윤기 하이라이트 -->
      <path d="M 190 130 Q 223 110 256 115 Q 289 110 322 130" 
            stroke="rgba(255,255,255,0.45)" stroke-width="5" fill="none" stroke-linecap="round"/>
      <ellipse cx="220" cy="118" rx="18" ry="12" fill="rgba(255,255,255,0.35)"/>
      <ellipse cx="292" cy="118" rx="18" ry="12" fill="rgba(255,255,255,0.35)"/>
      <!-- 추가 윤기 -->
      <path d="M 210 135 Q 233 125 256 128 Q 279 125 302 135" 
            stroke="rgba(255,255,255,0.28)" stroke-width="3.5" fill="none" stroke-linecap="round"/>
      <!-- 옆머리 -->
      <path d="M 130 170 Q 138 180 145 190 M 382 170 Q 374 180 367 190" 
            stroke="rgba(0,0,0,0.1)" stroke-width="2" fill="none" stroke-linecap="round"/>
    `,
    buzz_cut: `
      <defs>
        <radialGradient id="buzzGradient" cx="50%" cy="35%">
          <stop offset="0%" style="stop-color:var(--hair-color);stop-opacity:0.95" />
          <stop offset="100%" style="stop-color:var(--hair-color);stop-opacity:0.75" />
        </radialGradient>
      </defs>
      <!-- 매우 짧은 버즈컷 -->
      <path d="M 256 128 Q 165 130 125 195 Q 123 172 127 152 Q 135 120 256 112 Q 377 120 385 152 Q 389 172 389 195 Q 347 130 256 128 Z" 
            fill="url(#buzzGradient)" filter="url(#hairShadow)"/>
      <!-- 텍스처 (매우 짧은 머리) -->
      <ellipse cx="200" cy="135" rx="10" ry="7" fill="rgba(0,0,0,0.08)"/>
      <ellipse cx="230" cy="128" rx="10" ry="7" fill="rgba(0,0,0,0.08)"/>
      <ellipse cx="256" cy="125" rx="10" ry="7" fill="rgba(0,0,0,0.08)"/>
      <ellipse cx="282" cy="128" rx="10" ry="7" fill="rgba(0,0,0,0.08)"/>
      <ellipse cx="312" cy="135" rx="10" ry="7" fill="rgba(0,0,0,0.08)"/>
      <!-- 하이라이트 -->
      <path d="M 195 140 Q 225 125 256 128 Q 287 125 317 140" 
            stroke="rgba(255,255,255,0.3)" stroke-width="2.5" fill="none" stroke-linecap="round"/>
      <ellipse cx="220" cy="132" rx="8" ry="6" fill="rgba(255,255,255,0.2)"/>
      <ellipse cx="292" cy="132" rx="8" ry="6" fill="rgba(255,255,255,0.2)"/>
      <!-- 옆머리 페이드 -->
      <ellipse cx="140" cy="175" rx="8" ry="12" fill="var(--hair-color)" opacity="0.35"/>
      <ellipse cx="372" cy="175" rx="8" ry="12" fill="var(--hair-color)" opacity="0.35"/>
    `,
    quiff: `
      <defs>
        <linearGradient id="quiffGradient" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" style="stop-color:var(--hair-color);stop-opacity:1" />
          <stop offset="100%" style="stop-color:var(--hair-color);stop-opacity:0.86" />
        </linearGradient>
      </defs>
      <!-- 짧은 옆머리 -->
      <path d="M 124 172 Q 130 182 138 192 M 388 172 Q 382 182 374 192" 
            stroke="var(--hair-color)" stroke-width="7" fill="none" opacity="0.48" stroke-linecap="round"/>
      <!-- 베이스 -->
      <path d="M 256 112 Q 162 116 130 183 Q 127 158 132 138 Q 142 112 256 102 Q 370 112 380 138 Q 385 158 385 183 Q 350 116 256 112 Z" 
            fill="url(#quiffGradient)" filter="url(#hairShadow)"/>
      <!-- 앞으로 튀어나온 퀴프 -->
      <path d="M 225 105 Q 240 80 256 85 Q 272 80 287 105 Q 275 112 256 118 Q 237 112 225 105 Z" 
            fill="url(#quiffGradient)" opacity="0.96" filter="url(#hairShadow)"/>
      <path d="M 240 95 Q 248 85 256 88 Q 264 85 272 95" 
            fill="url(#quiffGradient)" opacity="0.92"/>
      <!-- 스타일링 디테일 -->
      <path d="M 235 100 Q 245 90 256 93 Q 267 90 277 100" 
            stroke="rgba(0,0,0,0.18)" stroke-width="2.5" fill="none"/>
      <!-- 하이라이트 -->
      <path d="M 242 92 Q 249 86 256 88 Q 263 86 270 92" 
            stroke="rgba(255,255,255,0.48)" stroke-width="3.5" fill="none" stroke-linecap="round"/>
      <ellipse cx="246" cy="95" rx="12" ry="9" fill="rgba(255,255,255,0.38)"/>
      <ellipse cx="266" cy="95" rx="12" ry="9" fill="rgba(255,255,255,0.38)"/>
      <!-- 볼륨 -->
      <path d="M 230 108 Q 243 98 256 102 Q 269 98 282 108" 
            stroke="rgba(255,255,255,0.3)" stroke-width="3" fill="none" stroke-linecap="round"/>
      <!-- 텍스처 -->
      <path d="M 238 102 L 242 92 M 256 100 L 256 88 M 274 102 L 270 92" 
            stroke="rgba(0,0,0,0.15)" stroke-width="2" stroke-linecap="round"/>
    `,
    fringe_male: `
      <defs>
        <linearGradient id="fringeGradient" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" style="stop-color:var(--hair-color);stop-opacity:1" />
          <stop offset="100%" style="stop-color:var(--hair-color);stop-opacity:0.87" />
        </linearGradient>
      </defs>
      <!-- 베이스 -->
      <path d="M 256 108 Q 155 112 118 188 Q 115 162 120 142 Q 130 110 256 100 Q 382 110 392 142 Q 397 162 396 188 Q 357 112 256 108 Z" 
            fill="url(#fringeGradient)" filter="url(#hairShadow)"/>
      <!-- 두꺼운 앞머리 -->
      <path d="M 195 130 Q 225 115 256 120 Q 287 115 317 130 Q 300 145 256 150 Q 212 145 195 130 Z" 
            fill="url(#fringeGradient)" opacity="0.95"/>
      <path d="M 210 135 Q 233 122 256 126 Q 279 122 302 135 Q 288 145 256 148 Q 224 145 210 135 Z" 
            fill="url(#fringeGradient)" opacity="0.92"/>
      <!-- 하이라이트 -->
      <path d="M 170 145 Q 213 122 256 128 Q 299 122 342 145" 
            stroke="rgba(255,255,255,0.35)" stroke-width="4" fill="none" stroke-linecap="round"/>
      <path d="M 200 138 Q 228 125 256 130 Q 284 125 312 138" 
            stroke="rgba(255,255,255,0.25)" stroke-width="3" fill="none" stroke-linecap="round"/>
      <!-- 볼륨 하이라이트 -->
      <ellipse cx="215" cy="132" rx="16" ry="11" fill="rgba(255,255,255,0.28)"/>
      <ellipse cx="297" cy="132" rx="16" ry="11" fill="rgba(255,255,255,0.28)"/>
      <!-- 텍스처 -->
      <path d="M 220 135 L 225 125 M 240 128 L 243 120 M 256 126 L 256 118 M 272 128 L 269 120 M 292 135 L 287 125" 
            stroke="var(--hair-color)" stroke-width="2" stroke-linecap="round" opacity="0.75"/>
      <!-- 옆머리 -->
      <path d="M 125 175 Q 133 185 142 195 M 387 175 Q 379 185 370 195" 
            stroke="rgba(0,0,0,0.1)" stroke-width="2" fill="none" stroke-linecap="round"/>
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
