// ===== Dicebear API 기반 아바타 빌더 =====

// 상태 관리 (lorelei 스타일 고정)
let builderState = {
  style: 'lorelei', // 고정
  seed: 'default-avatar', // 고정된 seed로 항상 동일한 기본 이미지
  hair: 'variant01',
  eyes: 'variant01',
  eyebrows: 'variant01',
  mouth: 'happy01',
  nose: 'variant01',
  glasses: ''
};

let builderHistory = [];
let builderHistoryIndex = -1;
const MAX_BUILDER_HISTORY = 10;

// 초기화
function initAvatarBuilder() {
  // 로컬 스토리지에서 불러오기 (없으면 기본값 사용)
  loadBuilderFromLocalStorage();
  
  // 로컬 스토리지에 저장된 값이 없으면 기본 seed 유지
  if (!builderState.seed) {
    builderState.seed = 'default-avatar';
  }
  
  window.builderState = builderState; // 전역 상태 동기화
  setupBuilderUI();
  renderBuilderAvatar(builderState);
  saveBuilderToHistory();
}

// 랜덤 seed 생성
function generateRandomSeed() {
  return Math.random().toString(36).substring(2, 15);
}

// UI 설정 (lorelei 전용)
function setupBuilderUI() {
  // lorelei 옵션만 설정
  createLoreleiOptions();
  
  // 배경색 옵션
  createColorOptions();
}

// Lorelei 전용 옵션 생성
function createLoreleiOptions() {
  // 머리 옵션
  const hairContainer = document.getElementById('hairOptions');
  if (hairContainer && LORELEI_OPTIONS.hair && HAIR_LABELS) {
    hairContainer.innerHTML = '';
    LORELEI_OPTIONS.hair.forEach((variant) => {
      const btn = document.createElement('button');
      btn.className = 'option-btn option-btn-with-preview';
      btn.title = variant; // 호버시 variant ID 표시
      
      // 미리보기 이미지 추가
      const previewImg = document.createElement('img');
      const previewUrl = `https://api.dicebear.com/9.x/lorelei/svg?seed=${variant}&hair=${variant}&size=60`;
      previewImg.src = previewUrl;
      previewImg.style.width = '100%';
      previewImg.style.height = '40px';
      previewImg.style.objectFit = 'contain';
      previewImg.style.marginBottom = '4px';
      btn.appendChild(previewImg);
      
      // 텍스트 라벨 추가
      const label = document.createElement('span');
      label.textContent = HAIR_LABELS[variant] || variant;
      label.style.fontSize = '10px';
      label.style.display = 'block';
      btn.appendChild(label);
      
      btn.onclick = () => {
        builderState.hair = variant;
        renderBuilderAvatar(builderState);
        updateActiveButton(hairContainer, btn);
        saveBuilderToHistory();
        saveBuilderToLocalStorage();
      };
      if (builderState.hair === variant) {
        btn.classList.add('active');
      }
      hairContainer.appendChild(btn);
    });
  }

  // 눈 옵션
  const eyesContainer = document.getElementById('eyesOptions');
  if (eyesContainer && LORELEI_OPTIONS.eyes) {
    eyesContainer.innerHTML = '';
    LORELEI_OPTIONS.eyes.forEach((variant, index) => {
      const btn = document.createElement('button');
      btn.className = 'option-btn';
      btn.textContent = `${index + 1}`;
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
      btn.textContent = `${index + 1}`;
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
      btn.textContent = variant.startsWith('happy') ? `😊${variant.slice(5)}` : `😢${variant.slice(3)}`;
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
      btn.textContent = `${index + 1}`;
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

  // 안경 옵션
  const glassesContainer = document.getElementById('glassesOptions');
  if (glassesContainer && LORELEI_OPTIONS.glasses) {
    glassesContainer.innerHTML = '';
    
    // "없음" 버튼
    const noneBtn = document.createElement('button');
    noneBtn.className = 'option-btn';
    noneBtn.textContent = '없음';
    noneBtn.onclick = () => {
      builderState.glasses = '';
      renderBuilderAvatar(builderState);
      updateActiveButton(glassesContainer, noneBtn);
      saveBuilderToHistory();
      saveBuilderToLocalStorage();
    };
    if (!builderState.glasses) {
      noneBtn.classList.add('active');
    }
    glassesContainer.appendChild(noneBtn);
    
    // 안경 옵션들
    LORELEI_OPTIONS.glasses.forEach((variant, index) => {
      const btn = document.createElement('button');
      btn.className = 'option-btn';
      btn.textContent = `${index + 1}`;
      btn.onclick = () => {
        builderState.glasses = variant;
        renderBuilderAvatar(builderState);
        updateActiveButton(glassesContainer, btn);
        saveBuilderToHistory();
        saveBuilderToLocalStorage();
      };
      if (builderState.glasses === variant) {
        btn.classList.add('active');
      }
      glassesContainer.appendChild(btn);
    });
  }
}

// 색상 옵션 생성
function createColorOptions() {
  // 배경색 옵션 제거됨
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
  if (!preview) {
    console.error('avatarPreview 요소를 찾을 수 없습니다!');
    return;
  }

  // 전역 상태 동기화 (렌더링할 때마다)
  window.builderState = builderState;

  // Dicebear 옵션 구성
  const dicebearOptions = {
    seed: state.seed,
    scale: 100
  };

  // lorelei 스타일 옵션 (빈 문자열은 제외)
  if (state.hair) dicebearOptions.hair = [state.hair];
  if (state.eyes) dicebearOptions.eyes = [state.eyes];
  if (state.eyebrows) dicebearOptions.eyebrows = [state.eyebrows];
  if (state.mouth) dicebearOptions.mouth = [state.mouth];
  if (state.nose) dicebearOptions.nose = [state.nose];
  if (state.glasses && state.glasses !== '') dicebearOptions.glasses = [state.glasses];

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
  window.builderState = builderState; // 전역 상태 동기화
  renderBuilderAvatar(builderState);
  saveBuilderToHistory();
  saveBuilderToLocalStorage();
}

// 랜덤화
function randomizePart(part) {
  if (part === 'all') {
    builderState.seed = generateRandomSeed();
    builderState.hair = LORELEI_OPTIONS.hair[Math.floor(Math.random() * LORELEI_OPTIONS.hair.length)];
    builderState.eyes = LORELEI_OPTIONS.eyes[Math.floor(Math.random() * LORELEI_OPTIONS.eyes.length)];
    builderState.eyebrows = LORELEI_OPTIONS.eyebrows[Math.floor(Math.random() * LORELEI_OPTIONS.eyebrows.length)];
    builderState.mouth = LORELEI_OPTIONS.mouth[Math.floor(Math.random() * LORELEI_OPTIONS.mouth.length)];
    builderState.nose = LORELEI_OPTIONS.nose[Math.floor(Math.random() * LORELEI_OPTIONS.nose.length)];
    
    // 선택적 옵션들 (확률로 랜덤 추가)
    builderState.glasses = Math.random() > 0.7 ? LORELEI_OPTIONS.glasses[Math.floor(Math.random() * LORELEI_OPTIONS.glasses.length)] : '';
  } else if (part === 'hair') {
    builderState.seed = generateRandomSeed();
  }
  
  window.builderState = builderState; // 전역 상태 동기화
  renderBuilderAvatar(builderState);
  setupBuilderUI(); // UI 재생성해서 active 상태 업데이트
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
    window.builderState = builderState; // 전역 상태 동기화
    renderBuilderAvatar(builderState);
    setupBuilderUI(); // UI 재생성해서 active 상태 업데이트
    saveBuilderToLocalStorage();
  }
}

function redoAvatar() {
  if (builderHistoryIndex < builderHistory.length - 1) {
    builderHistoryIndex++;
    builderState = JSON.parse(JSON.stringify(builderHistory[builderHistoryIndex]));
    window.builderState = builderState; // 전역 상태 동기화
    renderBuilderAvatar(builderState);
    setupBuilderUI(); // UI 재생성해서 active 상태 업데이트
    saveBuilderToLocalStorage();
  }
}

// 로컬 스토리지
function saveBuilderToLocalStorage() {
  try {
    // 전역 상태 동기화 (저장하기 전)
    window.builderState = builderState;
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
      window.builderState = builderState; // 전역 상태 동기화
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

// 아바타 저장 함수는 app.js에서 정의됩니다 (Firebase 사용)
// 이 함수는 window 객체에 이미 정의되어 있으므로 여기서 재정의하지 않습니다.

// 전역 함수로 노출
window.initAvatarBuilder = initAvatarBuilder;
window.renderBuilderAvatar = renderBuilderAvatar;
window.builderState = builderState;
window.randomizePart = randomizePart;
// saveAvatar는 app.js에서 정의됨
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
