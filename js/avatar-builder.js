// ===== 아바타 빌더 =====
// 에셋과 색상은 js/assets.js에서 전역으로 제공됩니다 (AVATAR_ASSETS, AVATAR_COLORS)

// 상태 관리
let builderState = {
  faceShape: { id: 'oval' },
  skinTone: { id: 'tone1', color: AVATAR_COLORS.skin[0] },
  hair: { id: 'variant01', color: AVATAR_COLORS.hair[0] },
  eyes: { id: 'variant01', color: AVATAR_COLORS.eyes[0] },
  eyebrows: { id: 'variant01', color: AVATAR_COLORS.eyebrows[0] },
  nose: { id: 'variant01', color: AVATAR_COLORS.nose?.[0] || '#D4A791' },
  mouth: { id: 'happy01', color: AVATAR_COLORS.mouth[0] },
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
  svg.style.setProperty('--line-color', state.eyebrows.color || '#2C1B18');
  svg.style.setProperty('--mouth-color', state.mouth.color || AVATAR_COLORS.mouth[0]);
  svg.style.setProperty('--top-color', state.top.color || AVATAR_COLORS.top[0]);
  svg.style.setProperty('--nose-color', state.nose.color || AVATAR_COLORS.nose?.[0] || '#D4A791');
  svg.style.setProperty('--glasses-color', state.glasses?.color || AVATAR_COLORS.glasses?.[0] || '#000000');
  svg.style.setProperty('--earrings-color', state.earrings?.color || AVATAR_COLORS.earrings?.[0] || '#FFD700');
  svg.style.setProperty('--freckles-color', state.freckles?.color || AVATAR_COLORS.freckles?.[0] || '#D4A791');
  svg.style.setProperty('--hairAccessories-color', state.hairAccessories?.color || AVATAR_COLORS.hairAccessories?.[0] || '#FF1744');

  // Dicebear 컴포넌트용 colors 객체 생성
  const colors = {
    skin: state.skinTone.color,
    hair: state.hair.color || AVATAR_COLORS.hair[0],
    eyes: state.eyes.color || AVATAR_COLORS.eyes[0],
    eyebrows: state.eyebrows.color || AVATAR_COLORS.eyebrows[0],
    mouth: state.mouth.color || AVATAR_COLORS.mouth[0],
    nose: state.nose?.color || AVATAR_COLORS.nose?.[0] || '#D4A791',
    glasses: state.glasses?.color || AVATAR_COLORS.glasses?.[0] || '#000000',
    earrings: state.earrings?.color || AVATAR_COLORS.earrings?.[0] || '#FFD700',
    freckles: state.freckles?.color || AVATAR_COLORS.freckles?.[0] || '#D4A791',
    hairAccessories: state.hairAccessories?.color || AVATAR_COLORS.hairAccessories?.[0] || '#FF1744'
  };

  // 각 파트 렌더링 (함수인 경우 호출, 문자열인 경우 그대로 사용)
  renderBuilderPart('faceShape', getAssetContent(AVATAR_ASSETS.faceShape, state.faceShape.id, {}, colors));
  renderBuilderPart('ears', getAssetContent(AVATAR_ASSETS.ears, state.ears.id, {}, colors));
  renderBuilderPart('hairBack', getAssetContent(AVATAR_ASSETS.hairBack, state.hair.id, {}, colors) || '');
  renderBuilderPart('hair', getAssetContent(AVATAR_ASSETS.hair, state.hair.id, {}, colors));
  renderBuilderPart('eyes', getAssetContent(AVATAR_ASSETS.eyes, state.eyes.id, {}, colors));
  renderBuilderPart('eyebrows', getAssetContent(AVATAR_ASSETS.eyebrows, state.eyebrows.id, {}, colors));
  renderBuilderPart('nose', getAssetContent(AVATAR_ASSETS.nose, state.nose.id, {}, colors));
  renderBuilderPart('mouth', getAssetContent(AVATAR_ASSETS.mouth, state.mouth.id, {}, colors));
  renderBuilderPart('top', getAssetContent(AVATAR_ASSETS.top, state.top.id, {}, colors));
}

// 에셋 컨텐츠 가져오기 (함수 또는 문자열 지원)
function getAssetContent(assetGroup, assetId, components, colors) {
  if (!assetGroup || !assetId) return '';
  
  const asset = assetGroup[assetId];
  if (!asset) return '';
  
  // 함수인 경우 호출, 문자열인 경우 그대로 반환
  if (typeof asset === 'function') {
    return asset(components, colors);
  }
  return asset;
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

