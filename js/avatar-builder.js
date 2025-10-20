// ===== 아바타 빌더 =====
// SVG 기반 아바타 파트들의 정의

const AVATAR_ASSETS = {
  faceShape: {
    oval: `<ellipse cx="256" cy="280" rx="140" ry="160" fill="var(--skin-color)"/>`,
    round: `<circle cx="256" cy="280" r="150" fill="var(--skin-color)"/>`,
    square: `<rect x="116" y="130" width="280" height="300" rx="40" fill="var(--skin-color)"/>`,
    heart: `<path d="M 256 130 Q 180 130 140 200 Q 140 280 256 400 Q 372 280 372 200 Q 332 130 256 130 Z" fill="var(--skin-color)"/>`,
    long: `<ellipse cx="256" cy="280" rx="120" ry="180" fill="var(--skin-color)"/>`
  },
  
  ears: {
    normal: `<ellipse cx="120" cy="280" rx="25" ry="35" fill="var(--skin-color)"/>
            <ellipse cx="392" cy="280" rx="25" ry="35" fill="var(--skin-color)"/>`,
    small: `<ellipse cx="120" cy="280" rx="18" ry="28" fill="var(--skin-color)"/>
           <ellipse cx="392" cy="280" rx="18" ry="28" fill="var(--skin-color)"/>`,
    large: `<ellipse cx="120" cy="280" rx="30" ry="42" fill="var(--skin-color)"/>
           <ellipse cx="392" cy="280" rx="30" ry="42" fill="var(--skin-color)"/>`,
    elf: `<path d="M 120 250 Q 100 260 110 290 Q 115 280 120 280 Z" fill="var(--skin-color)"/>
         <path d="M 392 250 Q 412 260 402 290 Q 397 280 392 280 Z" fill="var(--skin-color)"/>`
  },

  hair: {
    short_01: `<path d="M 256 140 Q 160 140 120 200 L 120 160 Q 120 100 256 100 Q 392 100 392 160 L 392 200 Q 352 140 256 140 Z" fill="var(--hair-color)"/>`,
    short_02: `<path d="M 256 120 Q 140 120 110 180 Q 110 140 256 110 Q 402 140 402 180 Q 372 120 256 120 Z" fill="var(--hair-color)"/>`,
    medium_01: `<path d="M 256 100 Q 120 100 100 200 L 100 220 Q 110 200 120 200 Q 120 140 256 130 Q 392 140 392 200 Q 402 200 412 220 L 412 200 Q 392 100 256 100 Z" fill="var(--hair-color)"/>`,
    long_01: `<path d="M 256 100 Q 100 100 90 250 L 90 300 Q 95 280 110 260 Q 120 200 256 140 Q 392 200 402 260 Q 417 280 422 300 L 422 250 Q 412 100 256 100 Z" fill="var(--hair-color)"/>`,
    bun: `<path d="M 256 140 Q 160 140 120 200 L 120 160 Q 120 100 256 100 Q 392 100 392 160 L 392 200 Q 352 140 256 140 Z" fill="var(--hair-color)"/>
         <circle cx="256" cy="80" r="40" fill="var(--hair-color)"/>`
  },

  hairBack: {
    short_01: ``,
    short_02: ``,
    medium_01: `<path d="M 110 240 Q 100 300 120 350 M 402 240 Q 412 300 392 350" stroke="var(--hair-color)" stroke-width="20" fill="none"/>`,
    long_01: `<path d="M 100 280 Q 90 350 100 420 M 412 280 Q 422 350 412 420" stroke="var(--hair-color)" stroke-width="25" fill="none"/>`,
    bun: ``
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
          <path d="M 282 260 Q 302 270 322 260" stroke="var(--eyes-color)" stroke-width="4" fill="none"/>`
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
          <path d="M 272 230 Q 302 228 332 230" stroke="var(--eyebrows-color)" stroke-width="3" fill="none" stroke-linecap="round"/>`
  },

  nose: {
    small: `<ellipse cx="256" cy="300" rx="8" ry="12" fill="rgba(0,0,0,0.1)"/>`,
    normal: `<path d="M 256 280 L 250 305 L 256 308 L 262 305 Z" fill="rgba(0,0,0,0.15)"/>`,
    large: `<path d="M 256 270 Q 245 290 248 310 L 264 310 Q 267 290 256 270 Z" fill="rgba(0,0,0,0.15)"/>`,
    button: `<circle cx="256" cy="300" r="10" fill="rgba(0,0,0,0.1)"/>`,
    pointed: `<path d="M 256 280 L 252 305 L 256 310 L 260 305 Z" fill="rgba(0,0,0,0.15)"/>`
  },

  mouth: {
    smile: `<path d="M 220 330 Q 256 350 292 330" stroke="var(--mouth-color)" stroke-width="4" fill="none" stroke-linecap="round"/>`,
    laugh: `<path d="M 220 330 Q 256 360 292 330" stroke="var(--mouth-color)" stroke-width="5" fill="none" stroke-linecap="round"/>
           <path d="M 230 335 Q 256 350 282 335" fill="var(--mouth-color)" opacity="0.3"/>`,
    neutral: `<line x1="230" y1="340" x2="282" y2="340" stroke="var(--mouth-color)" stroke-width="4" stroke-linecap="round"/>`,
    sad: `<path d="M 220 345 Q 256 330 292 345" stroke="var(--mouth-color)" stroke-width="4" fill="none" stroke-linecap="round"/>`,
    open: `<ellipse cx="256" cy="340" rx="30" ry="20" fill="var(--mouth-color)"/>
          <ellipse cx="256" cy="335" rx="25" ry="15" fill="rgba(0,0,0,0.3)"/>`
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
          <rect x="180" y="380" width="152" height="132" fill="var(--top-color)"/>`
  }
};

// 색상 팔레트
const AVATAR_COLORS = {
  skin: ['#FFDFC4', '#F0D5BE', '#EECEB3', '#E1B899', '#C68642', '#8D5524'],
  hair: ['#2C1B18', '#4E3B31', '#724133', '#A55728', '#B89778', '#F2D6B3', '#F59797', '#6A39D7'],
  eyes: ['#2C1B18', '#3D2817', '#5C4033', '#8B4513', '#1E90FF', '#228B22', '#9370DB'],
  eyebrows: ['#2C1B18', '#4E3B31', '#724133', '#A55728', '#B89778'],
  mouth: ['#D4686B', '#E87C7C', '#C25B5D', '#F4A7B9', '#DC6B9E'],
  top: ['#FF6B6B', '#4ECDC4', '#45B7D1', '#FFA07A', '#98D8C8', '#F7DC6F', '#BB8FCE', '#85C1E2']
};

// 상태 관리
let builderState = {
  faceShape: { id: 'oval' },
  skinTone: { id: 'tone1', color: AVATAR_COLORS.skin[0] },
  hair: { id: 'short_01', color: AVATAR_COLORS.hair[0] },
  eyes: { id: 'normal', color: AVATAR_COLORS.eyes[0] },
  eyebrows: { id: 'normal', color: AVATAR_COLORS.eyebrows[0] },
  nose: { id: 'normal' },
  mouth: { id: 'smile', color: AVATAR_COLORS.mouth[0] },
  ears: { id: 'normal' },
  top: { id: 'tshirt', color: AVATAR_COLORS.top[0] }
};

let builderHistory = [];
let builderHistoryIndex = -1;
const MAX_BUILDER_HISTORY = 10;

// 초기화
function initAvatarBuilder() {
  loadBuilderFromLocalStorage();
  setupBuilderUI();
  renderBuilderAvatar(builderState);
  saveBuilderToHistory();
}

// UI 설정
function setupBuilderUI() {
  // 얼굴형
  createBuilderOptions('faceShapeOptions', Object.keys(AVATAR_ASSETS.faceShape), 'faceShape', (id) => {
    applyBuilderOption('faceShape', { id });
  });

  // 피부색
  createBuilderColorOptions('skinToneOptions', AVATAR_COLORS.skin, (color, index) => {
    applyBuilderOption('skinTone', { id: `tone${index + 1}`, color });
  });

  // 머리
  createBuilderOptions('hairOptions', Object.keys(AVATAR_ASSETS.hair), 'hair', (id) => {
    applyBuilderOption('hair', { ...builderState.hair, id });
  });
  createBuilderColorOptions('hairColorOptions', AVATAR_COLORS.hair, (color) => {
    applyBuilderColor('hair', color);
  });

  // 눈
  createBuilderOptions('eyesOptions', Object.keys(AVATAR_ASSETS.eyes), 'eyes', (id) => {
    applyBuilderOption('eyes', { ...builderState.eyes, id });
  });
  createBuilderColorOptions('eyesColorOptions', AVATAR_COLORS.eyes, (color) => {
    applyBuilderColor('eyes', color);
  });

  // 눈썹
  createBuilderOptions('eyebrowsOptions', Object.keys(AVATAR_ASSETS.eyebrows), 'eyebrows', (id) => {
    applyBuilderOption('eyebrows', { ...builderState.eyebrows, id });
  });
  createBuilderColorOptions('eyebrowsColorOptions', AVATAR_COLORS.eyebrows, (color) => {
    applyBuilderColor('eyebrows', color);
  });

  // 코
  createBuilderOptions('noseOptions', Object.keys(AVATAR_ASSETS.nose), 'nose', (id) => {
    applyBuilderOption('nose', { id });
  });

  // 입
  createBuilderOptions('mouthOptions', Object.keys(AVATAR_ASSETS.mouth), 'mouth', (id) => {
    applyBuilderOption('mouth', { ...builderState.mouth, id });
  });
  createBuilderColorOptions('mouthColorOptions', AVATAR_COLORS.mouth, (color) => {
    applyBuilderColor('mouth', color);
  });

  // 귀
  createBuilderOptions('earsOptions', Object.keys(AVATAR_ASSETS.ears), 'ears', (id) => {
    applyBuilderOption('ears', { id });
  });

  // 상의
  createBuilderOptions('topOptions', Object.keys(AVATAR_ASSETS.top), 'top', (id) => {
    applyBuilderOption('top', { ...builderState.top, id });
  });
  createBuilderColorOptions('topColorOptions', AVATAR_COLORS.top, (color) => {
    applyBuilderColor('top', color);
  });
}

function createBuilderOptions(containerId, options, part, callback) {
  const container = document.getElementById(containerId);
  if (!container) return;
  
  container.innerHTML = '';
  
  options.forEach(option => {
    const btn = document.createElement('button');
    btn.className = 'option-btn';
    btn.textContent = option.replace(/_/g, ' ');
    btn.setAttribute('aria-pressed', builderState[part].id === option);
    btn.setAttribute('aria-label', `${part} ${option}`);
    btn.onclick = () => {
      container.querySelectorAll('.option-btn').forEach(b => b.setAttribute('aria-pressed', 'false'));
      btn.setAttribute('aria-pressed', 'true');
      callback(option);
    };
    container.appendChild(btn);
  });
}

function createBuilderColorOptions(containerId, colors, callback) {
  const container = document.getElementById(containerId);
  if (!container) return;
  
  container.innerHTML = '';
  
  colors.forEach((color, index) => {
    const btn = document.createElement('button');
    btn.className = 'color-btn';
    btn.style.background = color;
    btn.setAttribute('aria-pressed', 'false');
    btn.setAttribute('aria-label', `색상 ${index + 1}`);
    btn.onclick = () => {
      container.querySelectorAll('.color-btn').forEach(b => b.setAttribute('aria-pressed', 'false'));
      btn.setAttribute('aria-pressed', 'true');
      callback(color, index);
    };
    container.appendChild(btn);
  });
}

// 상태 변경
function applyBuilderOption(part, option) {
  builderState[part] = option;
  renderBuilderAvatar(builderState);
  saveBuilderToHistory();
  saveBuilderToLocalStorage();
}

function applyBuilderColor(part, color) {
  builderState[part].color = color;
  renderBuilderAvatar(builderState);
  saveBuilderToHistory();
  saveBuilderToLocalStorage();
}

// 렌더링
function renderBuilderAvatar(state) {
  const svg = document.getElementById('avatarPreview');
  if (!svg) return;
  
  // CSS 변수 설정
  svg.style.setProperty('--skin-color', state.skinTone.color);
  svg.style.setProperty('--hair-color', state.hair.color || AVATAR_COLORS.hair[0]);
  svg.style.setProperty('--eyes-color', state.eyes.color || AVATAR_COLORS.eyes[0]);
  svg.style.setProperty('--eyebrows-color', state.eyebrows.color || AVATAR_COLORS.eyebrows[0]);
  svg.style.setProperty('--mouth-color', state.mouth.color || AVATAR_COLORS.mouth[0]);
  svg.style.setProperty('--top-color', state.top.color || AVATAR_COLORS.top[0]);

  // 각 파트 렌더링
  renderBuilderPart('faceShape', AVATAR_ASSETS.faceShape[state.faceShape.id]);
  renderBuilderPart('ears', AVATAR_ASSETS.ears[state.ears.id]);
  renderBuilderPart('hairBack', AVATAR_ASSETS.hairBack[state.hair.id] || '');
  renderBuilderPart('hair', AVATAR_ASSETS.hair[state.hair.id]);
  renderBuilderPart('eyes', AVATAR_ASSETS.eyes[state.eyes.id]);
  renderBuilderPart('eyebrows', AVATAR_ASSETS.eyebrows[state.eyebrows.id]);
  renderBuilderPart('nose', AVATAR_ASSETS.nose[state.nose.id]);
  renderBuilderPart('mouth', AVATAR_ASSETS.mouth[state.mouth.id]);
  renderBuilderPart('top', AVATAR_ASSETS.top[state.top.id]);
}

// 전역 함수로 노출
window.renderBuilderAvatar = renderBuilderAvatar;
window.builderState = builderState;

function renderBuilderPart(partName, svgContent) {
  const group = document.querySelector(`[data-part="${partName}"]`);
  if (group) {
    group.innerHTML = svgContent || '';
  }
}

// 히스토리 관리
function saveBuilderToHistory() {
  builderHistory = builderHistory.slice(0, builderHistoryIndex + 1);
  builderHistory.push(JSON.parse(JSON.stringify(builderState)));
  
  if (builderHistory.length > MAX_BUILDER_HISTORY) {
    builderHistory.shift();
  } else {
    builderHistoryIndex++;
  }
}

function undoAvatar() {
  if (builderHistoryIndex > 0) {
    builderHistoryIndex--;
    builderState = JSON.parse(JSON.stringify(builderHistory[builderHistoryIndex]));
    renderBuilderAvatar(builderState);
    setupBuilderUI();
    saveBuilderToLocalStorage();
  }
}

function redoAvatar() {
  if (builderHistoryIndex < builderHistory.length - 1) {
    builderHistoryIndex++;
    builderState = JSON.parse(JSON.stringify(builderHistory[builderHistoryIndex]));
    renderBuilderAvatar(builderState);
    setupBuilderUI();
    saveBuilderToLocalStorage();
  }
}

// 전역 함수로 노출
window.undoAvatar = undoAvatar;
window.redoAvatar = redoAvatar;

// 로컬 스토리지
function saveBuilderToLocalStorage() {
  localStorage.setItem('builderAvatarState', JSON.stringify(builderState));
}

function loadBuilderFromLocalStorage() {
  const saved = localStorage.getItem('builderAvatarState');
  if (saved) {
    try {
      builderState = JSON.parse(saved);
    } catch (e) {
      console.error('Failed to load saved state:', e);
    }
  }
}

// 무작위 생성
function randomizeAll() {
  const faceShapes = Object.keys(AVATAR_ASSETS.faceShape);
  const hairStyles = Object.keys(AVATAR_ASSETS.hair);
  const eyeStyles = Object.keys(AVATAR_ASSETS.eyes);
  const eyebrowStyles = Object.keys(AVATAR_ASSETS.eyebrows);
  const noseStyles = Object.keys(AVATAR_ASSETS.nose);
  const mouthStyles = Object.keys(AVATAR_ASSETS.mouth);
  const earStyles = Object.keys(AVATAR_ASSETS.ears);
  const topStyles = Object.keys(AVATAR_ASSETS.top);

  builderState = {
    faceShape: { id: faceShapes[Math.floor(Math.random() * faceShapes.length)] },
    skinTone: { id: `tone${Math.floor(Math.random() * AVATAR_COLORS.skin.length) + 1}`, color: AVATAR_COLORS.skin[Math.floor(Math.random() * AVATAR_COLORS.skin.length)] },
    hair: { id: hairStyles[Math.floor(Math.random() * hairStyles.length)], color: AVATAR_COLORS.hair[Math.floor(Math.random() * AVATAR_COLORS.hair.length)] },
    eyes: { id: eyeStyles[Math.floor(Math.random() * eyeStyles.length)], color: AVATAR_COLORS.eyes[Math.floor(Math.random() * AVATAR_COLORS.eyes.length)] },
    eyebrows: { id: eyebrowStyles[Math.floor(Math.random() * eyebrowStyles.length)], color: AVATAR_COLORS.eyebrows[Math.floor(Math.random() * AVATAR_COLORS.eyebrows.length)] },
    nose: { id: noseStyles[Math.floor(Math.random() * noseStyles.length)] },
    mouth: { id: mouthStyles[Math.floor(Math.random() * mouthStyles.length)], color: AVATAR_COLORS.mouth[Math.floor(Math.random() * AVATAR_COLORS.mouth.length)] },
    ears: { id: earStyles[Math.floor(Math.random() * earStyles.length)] },
    top: { id: topStyles[Math.floor(Math.random() * topStyles.length)], color: AVATAR_COLORS.top[Math.floor(Math.random() * AVATAR_COLORS.top.length)] }
  };

  renderBuilderAvatar(builderState);
  setupBuilderUI();
  saveBuilderToHistory();
  saveBuilderToLocalStorage();
}

// 전역 함수로 노출
window.randomizeAll = randomizeAll;

function randomizePart(part) {
  const styles = Object.keys(AVATAR_ASSETS[part]);
  const randomId = styles[Math.floor(Math.random() * styles.length)];
  const colorKey = part === 'hair' ? 'hair' : part;
  const randomColor = AVATAR_COLORS[colorKey] ? AVATAR_COLORS[colorKey][Math.floor(Math.random() * AVATAR_COLORS[colorKey].length)] : null;

  if (randomColor) {
    builderState[part] = { id: randomId, color: randomColor };
  } else {
    builderState[part] = { id: randomId };
  }

  renderBuilderAvatar(builderState);
  setupBuilderUI();
  saveBuilderToHistory();
  saveBuilderToLocalStorage();
}

// 전역 함수로 노출
window.randomizePart = randomizePart;

// 초기화
function resetAvatar() {
  if (confirm('아바타를 초기화하시겠습니까?')) {
    builderState = {
      faceShape: { id: 'oval' },
      skinTone: { id: 'tone1', color: AVATAR_COLORS.skin[0] },
      hair: { id: 'short_01', color: AVATAR_COLORS.hair[0] },
      eyes: { id: 'normal', color: AVATAR_COLORS.eyes[0] },
      eyebrows: { id: 'normal', color: AVATAR_COLORS.eyebrows[0] },
      nose: { id: 'normal' },
      mouth: { id: 'smile', color: AVATAR_COLORS.mouth[0] },
      ears: { id: 'normal' },
      top: { id: 'tshirt', color: AVATAR_COLORS.top[0] }
    };
    renderBuilderAvatar(builderState);
    setupBuilderUI();
    saveBuilderToHistory();
    saveBuilderToLocalStorage();
  }
}

// 전역 함수로 노출
window.resetAvatar = resetAvatar;

// 내보내기
function exportSVG() {
  const svg = document.getElementById('avatarPreview');
  if (!svg) return;
  
  const svgData = new XMLSerializer().serializeToString(svg);
  const blob = new Blob([svgData], { type: 'image/svg+xml' });
  const url = URL.createObjectURL(blob);
  
  const a = document.createElement('a');
  a.href = url;
  a.download = 'avatar.svg';
  a.click();
  
  URL.revokeObjectURL(url);
}

function exportPNG() {
  const svg = document.getElementById('avatarPreview');
  if (!svg) return;
  
  const svgData = new XMLSerializer().serializeToString(svg);
  const canvas = document.createElement('canvas');
  const ctx = canvas.getContext('2d');
  const img = new Image();

  canvas.width = 512;
  canvas.height = 512;

  img.onload = function() {
    const transparentBg = document.getElementById('transparentBg');
    const transparent = transparentBg ? transparentBg.checked : true;
    
    if (!transparent) {
      ctx.fillStyle = 'white';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
    }
    
    ctx.drawImage(img, 0, 0);
    
    canvas.toBlob(function(blob) {
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'avatar.png';
      a.click();
      URL.revokeObjectURL(url);
    });
  };

  img.src = 'data:image/svg+xml;base64,' + btoa(unescape(encodeURIComponent(svgData)));
}

// 전역 함수로 노출
window.exportSVG = exportSVG;
window.exportPNG = exportPNG;

// 프리셋 관리
function savePreset() {
  const presets = JSON.parse(localStorage.getItem('builderAvatarPresets') || '[]');
  const name = prompt('프리셋 이름을 입력하세요:');
  
  if (name) {
    presets.push({ name, state: builderState });
    localStorage.setItem('builderAvatarPresets', JSON.stringify(presets));
    alert('프리셋이 저장되었습니다!');
  }
}

function loadPreset() {
  const presets = JSON.parse(localStorage.getItem('builderAvatarPresets') || '[]');
  
  if (presets.length === 0) {
    alert('저장된 프리셋이 없습니다.');
    return;
  }

  const names = presets.map((p, i) => `${i + 1}. ${p.name}`).join('\n');
  const index = prompt(`불러올 프리셋 번호를 입력하세요:\n${names}`);
  
  if (index && presets[parseInt(index) - 1]) {
    builderState = presets[parseInt(index) - 1].state;
    renderBuilderAvatar(builderState);
    setupBuilderUI();
    saveBuilderToHistory();
    saveBuilderToLocalStorage();
  }
}

function copyJSON() {
  const json = JSON.stringify(builderState, null, 2);
  navigator.clipboard.writeText(json).then(() => {
    alert('JSON이 클립보드에 복사되었습니다!');
  });
}

function toggleJSONViewer() {
  const viewer = document.getElementById('jsonViewer');
  if (!viewer) return;
  
  viewer.classList.toggle('show');
  
  if (viewer.classList.contains('show')) {
    viewer.textContent = JSON.stringify(builderState, null, 2);
  }
}

// 전역 함수로 노출
window.savePreset = savePreset;
window.loadPreset = loadPreset;
window.copyJSON = copyJSON;
window.toggleJSONViewer = toggleJSONViewer;

// 키보드 접근성
document.addEventListener('keydown', (e) => {
  const activePage = document.querySelector('.page.active');
  if (!activePage || activePage.id !== 'avatarPage') return;
  
  if (e.ctrlKey || e.metaKey) {
    if (e.key === 'z') {
      e.preventDefault();
      if (e.shiftKey) {
        redoAvatar();
      } else {
        undoAvatar();
      }
    }
  }
});

// 페이지 활성화 시 초기화
window.addEventListener('DOMContentLoaded', () => {
  // 아바타 페이지가 활성화될 때만 초기화
  const observer = new MutationObserver((mutations) => {
    mutations.forEach((mutation) => {
      if (mutation.type === 'attributes' && mutation.attributeName === 'class') {
        const target = mutation.target;
        if (target.id === 'avatarPage' && target.classList.contains('active')) {
          initAvatarBuilder();
        }
      }
    });
  });

  const avatarPage = document.getElementById('avatarPage');
  if (avatarPage) {
    observer.observe(avatarPage, { attributes: true });
    
    // 이미 활성화되어 있으면 즉시 초기화
    if (avatarPage.classList.contains('active')) {
      initAvatarBuilder();
    }
  }
});

