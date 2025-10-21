// ===== Dicebear API 기반 아바타 빌더 =====

// 상태 관리
let builderState = {
  style: 'lorelei',
  seed: '',
  eyes: 'variant01',
  eyebrows: 'variant01',
  mouth: 'happy01',
  nose: 'variant01',
  glasses: null,
  earrings: null,
  freckles: null,
  hairAccessories: null,
  backgroundColor: []
};

let builderHistory = [];
let builderHistoryIndex = -1;
const MAX_BUILDER_HISTORY = 10;

// 초기화
function initAvatarBuilder() {
  // 랜덤 seed 생성
  builderState.seed = generateRandomSeed();
  
  loadBuilderFromLocalStorage();
  setupBuilderUI();
  renderBuilderAvatar(builderState);
  saveBuilderToHistory();
}

// 랜덤 seed 생성
function generateRandomSeed() {
  return Math.random().toString(36).substring(2, 15);
}

// UI 설정
function setupBuilderUI() {
  // 스타일 선택
  createStyleOptions();
  
  // 옵션 설정 (lorelei 기준)
  createDicebearOptions();
  
  // 색상 옵션
  createColorOptions();
}

// 스타일 옵션 생성
function createStyleOptions() {
  const container = document.getElementById('faceShapeOptions');
  if (!container) return;
  
  container.innerHTML = '<h4>아바타 스타일</h4>';
  
  Object.keys(DICEBEAR_STYLES).forEach(styleKey => {
    const btn = document.createElement('button');
    btn.className = 'option-btn';
    btn.textContent = STYLE_LABELS[styleKey] || styleKey;
    btn.onclick = () => {
      builderState.style = styleKey;
      renderBuilderAvatar(builderState);
      updateActiveButton(container, btn);
      saveBuilderToHistory();
      saveBuilderToLocalStorage();
      
      // 스타일 변경 시 옵션 재생성
      createDicebearOptions();
    };
    
    if (builderState.style === styleKey) {
      btn.classList.add('active');
    }
    
    container.appendChild(btn);
  });
}

// Dicebear 옵션 생성
function createDicebearOptions() {
  // 눈 옵션
  const eyesContainer = document.getElementById('eyesOptions');
  if (eyesContainer && LORELEI_OPTIONS.eyes) {
    eyesContainer.innerHTML = '';
    LORELEI_OPTIONS.eyes.forEach((variant, index) => {
      const btn = document.createElement('button');
      btn.className = 'option-btn';
      btn.textContent = `눈 ${index + 1}`;
      btn.onclick = () => {
        builderState.eyes = variant;
        renderBuilderAvatar(builderState);
        updateActiveButton(eyesContainer, btn);
        saveBuilderToHistory();
        saveBuilderToLocalStorage();
      };
      if (builderState.eyes === variant) {
        btn.classList.add('active');
      }
      eyesContainer.appendChild(btn);
    });
  }

  // 눈썹 옵션
  const eyebrowsContainer = document.getElementById('eyebrowsOptions');
  if (eyebrowsContainer && LORELEI_OPTIONS.eyebrows) {
    eyebrowsContainer.innerHTML = '';
    LORELEI_OPTIONS.eyebrows.forEach((variant, index) => {
      const btn = document.createElement('button');
      btn.className = 'option-btn';
      btn.textContent = `눈썹 ${index + 1}`;
      btn.onclick = () => {
        builderState.eyebrows = variant;
        renderBuilderAvatar(builderState);
        updateActiveButton(eyebrowsContainer, btn);
        saveBuilderToHistory();
        saveBuilderToLocalStorage();
      };
      if (builderState.eyebrows === variant) {
        btn.classList.add('active');
      }
      eyebrowsContainer.appendChild(btn);
    });
  }

  // 입 옵션
  const mouthContainer = document.getElementById('mouthOptions');
  if (mouthContainer && LORELEI_OPTIONS.mouth) {
    mouthContainer.innerHTML = '';
    LORELEI_OPTIONS.mouth.forEach((variant, index) => {
      const btn = document.createElement('button');
      btn.className = 'option-btn';
      btn.textContent = variant.startsWith('happy') ? `웃음 ${variant.slice(5)}` : `슬픔 ${variant.slice(3)}`;
      btn.onclick = () => {
        builderState.mouth = variant;
        renderBuilderAvatar(builderState);
        updateActiveButton(mouthContainer, btn);
        saveBuilderToHistory();
        saveBuilderToLocalStorage();
      };
      if (builderState.mouth === variant) {
        btn.classList.add('active');
      }
      mouthContainer.appendChild(btn);
    });
  }

  // 코 옵션
  const noseContainer = document.getElementById('noseOptions');
  if (noseContainer && LORELEI_OPTIONS.nose) {
    noseContainer.innerHTML = '';
    LORELEI_OPTIONS.nose.forEach((variant, index) => {
      const btn = document.createElement('button');
      btn.className = 'option-btn';
      btn.textContent = `코 ${index + 1}`;
      btn.onclick = () => {
        builderState.nose = variant;
        renderBuilderAvatar(builderState);
        updateActiveButton(noseContainer, btn);
        saveBuilderToHistory();
        saveBuilderToLocalStorage();
      };
      if (builderState.nose === variant) {
        btn.classList.add('active');
      }
      noseContainer.appendChild(btn);
    });
  }
}

// 색상 옵션 생성
function createColorOptions() {
  // 피부색 (배경색으로 사용)
  const skinContainer = document.getElementById('skinToneOptions');
  if (skinContainer) {
    skinContainer.innerHTML = '';
    AVATAR_COLORS.skin.forEach(color => {
    const btn = document.createElement('button');
    btn.className = 'color-btn';
      btn.style.backgroundColor = color;
    btn.onclick = () => {
        builderState.backgroundColor = [color];
        renderBuilderAvatar(builderState);
        updateActiveButton(skinContainer, btn);
        saveBuilderToHistory();
        saveBuilderToLocalStorage();
      };
      skinContainer.appendChild(btn);
    });
  }
}

// 활성 버튼 업데이트
function updateActiveButton(container, activeBtn) {
  container.querySelectorAll('.option-btn, .color-btn').forEach(btn => {
    btn.classList.remove('active');
  });
  activeBtn.classList.add('active');
}

// 렌더링
function renderBuilderAvatar(state) {
  const preview = document.getElementById('avatarPreview');
  if (!preview) return;

  // Dicebear 옵션 구성
  const dicebearOptions = {
    seed: state.seed,
    backgroundColor: state.backgroundColor || [],
    scale: 100
  };

  // lorelei 스타일 특정 옵션
  if (state.style === 'lorelei') {
    if (state.eyes) dicebearOptions.eyes = [state.eyes];
    if (state.eyebrows) dicebearOptions.eyebrows = [state.eyebrows];
    if (state.mouth) dicebearOptions.mouth = [state.mouth];
    if (state.nose) dicebearOptions.nose = [state.nose];
    if (state.glasses) dicebearOptions.glasses = [state.glasses];
    if (state.earrings) dicebearOptions.earrings = [state.earrings];
    if (state.freckles) dicebearOptions.freckles = [state.freckles];
    if (state.hairAccessories) dicebearOptions.hairAccessories = [state.hairAccessories];
  }

  // 아바타 생성
  const svg = createDicebearAvatar({
    style: state.style,
    seed: state.seed,
    dicebearOptions: dicebearOptions
  });

  // SVG 렌더링
  preview.innerHTML = svg;
}

// 옵션 적용
function applyBuilderOption(part, value) {
  builderState[part] = value;
  renderBuilderAvatar(builderState);
  saveBuilderToHistory();
  saveBuilderToLocalStorage();
}

// 랜덤화
function randomizePart(part) {
  if (part === 'all') {
    builderState.seed = generateRandomSeed();
    builderState.eyes = LORELEI_OPTIONS.eyes[Math.floor(Math.random() * LORELEI_OPTIONS.eyes.length)];
    builderState.eyebrows = LORELEI_OPTIONS.eyebrows[Math.floor(Math.random() * LORELEI_OPTIONS.eyebrows.length)];
    builderState.mouth = LORELEI_OPTIONS.mouth[Math.floor(Math.random() * LORELEI_OPTIONS.mouth.length)];
    builderState.nose = LORELEI_OPTIONS.nose[Math.floor(Math.random() * LORELEI_OPTIONS.nose.length)];
  } else if (part === 'hair') {
    builderState.seed = generateRandomSeed();
  }
  
  renderBuilderAvatar(builderState);
  saveBuilderToHistory();
  saveBuilderToLocalStorage();
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
    saveBuilderToLocalStorage();
  }
}

function redoAvatar() {
  if (builderHistoryIndex < builderHistory.length - 1) {
    builderHistoryIndex++;
    builderState = JSON.parse(JSON.stringify(builderHistory[builderHistoryIndex]));
    renderBuilderAvatar(builderState);
    saveBuilderToLocalStorage();
  }
}

// 로컬 스토리지
function saveBuilderToLocalStorage() {
  try {
    localStorage.setItem('avatarBuilderState', JSON.stringify(builderState));
  } catch (e) {
    console.error('Failed to save to localStorage:', e);
  }
}

function loadBuilderFromLocalStorage() {
  try {
    const saved = localStorage.getItem('avatarBuilderState');
  if (saved) {
      const parsed = JSON.parse(saved);
      builderState = { ...builderState, ...parsed };
    }
  } catch (e) {
    console.error('Failed to load from localStorage:', e);
  }
}

// 내보내기 및 저장
function exportAvatarAsSVG() {
  const preview = document.getElementById('avatarPreview');
  if (!preview) return;
  
  const svgData = preview.innerHTML;
  const blob = new Blob([svgData], { type: 'image/svg+xml' });
  const url = URL.createObjectURL(blob);
  
  const a = document.createElement('a');
  a.href = url;
  a.download = `avatar-${builderState.seed}.svg`;
  a.click();
  
  URL.revokeObjectURL(url);
}

function exportAvatarAsPNG() {
  const preview = document.getElementById('avatarPreview');
  if (!preview) return;
  
  const canvas = document.createElement('canvas');
  canvas.width = 512;
  canvas.height = 512;
  const ctx = canvas.getContext('2d');
  
  const svgData = preview.innerHTML;
  const img = new Image();
  const blob = new Blob([svgData], { type: 'image/svg+xml' });
  const url = URL.createObjectURL(blob);
  
  img.onload = () => {
    ctx.drawImage(img, 0, 0);
    canvas.toBlob((blob) => {
      const pngUrl = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = pngUrl;
      a.download = `avatar-${builderState.seed}.png`;
      a.click();
      URL.revokeObjectURL(pngUrl);
      URL.revokeObjectURL(url);
    });
  };

  img.src = url;
}

// 아바타 저장 (기존 기능 유지)
function saveAvatar() {
  const name = document.getElementById('avatarName')?.value.trim();
  const team = document.getElementById('avatarTeam')?.value.trim();
  const status = document.getElementById('avatarStatus');
  
  if (!name || !team) {
    if (status) {
      status.textContent = '이름과 팀명을 모두 입력해주세요.';
      status.className = 'status-message error';
    }
    return;
  }

  // 아바타 데이터 저장
  const avatarData = {
    name: name,
    team: team,
    avatarState: builderState,
    svgData: document.getElementById('avatarPreview')?.innerHTML || '',
    createdAt: new Date().toISOString()
  };

  // localStorage에 저장 (실제 환경에서는 서버로 전송)
  try {
    const saved = JSON.parse(localStorage.getItem('savedAvatars') || '[]');
    saved.push(avatarData);
    localStorage.setItem('savedAvatars', JSON.stringify(saved));
    
    if (status) {
      status.textContent = '아바타가 성공적으로 저장되었습니다!';
      status.className = 'status-message success';
    }
    
    // 입력 필드 초기화
    if (document.getElementById('avatarName')) document.getElementById('avatarName').value = '';
    if (document.getElementById('avatarTeam')) document.getElementById('avatarTeam').value = '';
    
    // 새 아바타 생성
    setTimeout(() => {
      randomizePart('all');
    }, 1000);
  } catch (e) {
    if (status) {
      status.textContent = '저장 중 오류가 발생했습니다.';
      status.className = 'status-message error';
    }
    console.error('Save error:', e);
  }
}

// 전역 함수로 노출
window.initAvatarBuilder = initAvatarBuilder;
window.renderBuilderAvatar = renderBuilderAvatar;
window.builderState = builderState;
window.randomizePart = randomizePart;
window.saveAvatar = saveAvatar;
window.exportAvatarAsSVG = exportAvatarAsSVG;
window.exportAvatarAsPNG = exportAvatarAsPNG;
window.undoAvatar = undoAvatar;
window.redoAvatar = redoAvatar;

// DOMContentLoaded 이벤트에서 초기화 (Dicebear HTTP API 사용으로 대기 불필요)
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => {
    if (document.getElementById('avatarPreview')) {
      initAvatarBuilder();
    }
  });
} else {
  if (document.getElementById('avatarPreview')) {
    initAvatarBuilder();
  }
}
