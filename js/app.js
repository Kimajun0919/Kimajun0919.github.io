import { initializeApp } from "https://www.gstatic.com/firebasejs/12.3.0/firebase-app.js";
import { getDatabase, ref, push, get, child, remove, set, runTransaction } from "https://www.gstatic.com/firebasejs/12.3.0/firebase-database.js";

const firebaseConfig = {
  apiKey: "AIzaSyCXaqnaoQYWZGywi_PPRohGaAJj_dBVDK0",
  authDomain: "haneulcard.firebaseapp.com",
  databaseURL: "https://haneulcard-default-rtdb.firebaseio.com",
  projectId: "haneulcard",
  storageBucket: "haneulcard.appspot.com",
  messagingSenderId: "814685525921",
  appId: "1:814685525921:web:eacd7b62ca15e983875de0"
};

const app = initializeApp(firebaseConfig);
const db = getDatabase(app);

// Firebase 기반 중복 최소화 시스템
// Firebase에서 사용된 말씀 인덱스 가져오기
async function getUsedVersesFromFirebase() {
  try {
    const snapshot = await get(ref(db, "usedVerses"));
    if (snapshot.exists()) {
      const data = snapshot.val();
      return Array.isArray(data) ? data : [];
    }
    return [];
  } catch (e) {
    console.error('Failed to load used verses from Firebase:', e);
    return [];
  }
}

// Firebase에 사용된 말씀 인덱스 저장
async function saveUsedVersesToFirebase(usedIndexes) {
  try {
    await set(ref(db, "usedVerses"), usedIndexes);
  } catch (e) {
    console.error('Failed to save used verses to Firebase:', e);
  }
}

// 중복을 최소화하며 말씀 선택 (Firebase 기반)
async function getUniqueVerse() {
  if (!window.verses || window.verses.length === 0) {
    return null;
  }

  try {
    // Transaction을 사용하여 동시성 문제 해결
    const verseRef = ref(db, "usedVerses");
    const result = await runTransaction(verseRef, (currentData) => {
      let usedIndexes = Array.isArray(currentData) ? currentData : [];
      
      // 모든 말씀을 다 사용했으면 초기화
      if (usedIndexes.length >= window.verses.length) {
        console.log('모든 말씀을 사용했습니다. 초기화합니다.');
        usedIndexes = [];
      }
      
      // 사용되지 않은 인덱스 찾기
      const availableIndexes = [];
      for (let i = 0; i < window.verses.length; i++) {
        if (!usedIndexes.includes(i)) {
          availableIndexes.push(i);
        }
      }
      
      // 사용 가능한 인덱스 중 랜덤 선택
      const randomIndex = availableIndexes[Math.floor(Math.random() * availableIndexes.length)];
      
      // 사용된 인덱스에 추가
      usedIndexes.push(randomIndex);
      
      // 선택된 인덱스를 임시 저장 (transaction 외부에서 사용)
      window._selectedVerseIndex = randomIndex;
      
      return usedIndexes;
    });

    if (result.committed && typeof window._selectedVerseIndex !== 'undefined') {
      const selectedIndex = window._selectedVerseIndex;
      const selectedVerse = window.verses[selectedIndex];
      const usedCount = result.snapshot.val().length;
      
      console.log(`말씀 선택 (${usedCount}/${window.verses.length}):`, selectedVerse.reference);
      
      // 임시 변수 정리
      delete window._selectedVerseIndex;
      
      return selectedVerse;
    }
    
    // Transaction 실패 시 폴백
    throw new Error('Transaction failed');
    
  } catch (e) {
    console.error('Failed to get unique verse from Firebase:', e);
    // 폴백: 랜덤 선택
    const randomVerse = window.verses[Math.floor(Math.random() * window.verses.length)];
    console.log('폴백으로 랜덤 말씀 선택:', randomVerse.reference);
    return randomVerse;
  }
}

// 사용 통계 확인 (개발자 도구에서 확인용)
async function getVerseStats() {
  const usedIndexes = await getUsedVersesFromFirebase();
  return {
    total: window.verses.length,
    used: usedIndexes.length,
    remaining: window.verses.length - usedIndexes.length,
    percentage: ((usedIndexes.length / window.verses.length) * 100).toFixed(1) + '%'
  };
}

// 사용 기록 초기화 (필요시 - 관리자 전용)
async function resetUsedVerses() {
  try {
    await set(ref(db, "usedVerses"), []);
    console.log('사용된 말씀 기록을 초기화했습니다.');
  } catch (e) {
    console.error('Failed to reset used verses:', e);
  }
}

// 전역으로 노출
window.getUniqueVerse = getUniqueVerse;
window.getVerseStats = getVerseStats;
window.resetUsedVerses = resetUsedVerses;

// 페이지 전환 함수 (HTML에서 호출)
window.showPage = function(pageId) {
  document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
  document.getElementById(pageId).classList.add('active');
  
  // 아바타 페이지가 활성화될 때 아바타 빌더 초기화
  if (pageId === 'avatarPage') {
    setTimeout(() => {
      if (typeof initAvatarBuilder === 'function') {
        initAvatarBuilder();
      }
    }, 100);
  }
};

// 아바타 저장 함수 (새로운 아바타 빌더 시스템 사용)
window.saveAvatar = async function() {
  const name = document.getElementById('avatarName').value.trim();
  const team = document.getElementById('avatarTeam').value.trim();
  const status = document.getElementById('avatarStatus');

  if (!name || !team) {
    status.textContent = "❌ 이름과 팀명을 입력해주세요!";
    status.style.color = "#e74c3c";
    return;
  }

  status.textContent = "💾 아바타 저장 중...";
  status.style.color = "#3498db";

  try {
    // 현재 아바타 상태 가져오기
    const currentAvatarState = getCurrentAvatarState();
    
    // 고유 ID 생성
    const employeeId = String(Date.now()).slice(-6);

    // 중복을 최소화하며 말씀 선택 (저장 시 고정)
    let verseContent = '';
    let verseReference = '';
    if (typeof window.getUniqueVerse === 'function') {
      const v = await window.getUniqueVerse();
      if (v) {
        verseContent = v.content;
        verseReference = v.reference;
      }
    } else if (Array.isArray(window.verses) && window.verses.length > 0) {
      // 폴백: getUniqueVerse가 없으면 랜덤 선택
      const v = window.verses[Math.floor(Math.random() * window.verses.length)];
      verseContent = v.content;
      verseReference = v.reference;
    }

    // Firebase에 저장 (이미지 자체는 저장하지 않음)
    await push(ref(db, "employees"), {
      name,
      team,
      avatarData: JSON.stringify(currentAvatarState),
      verseContent,
      verseReference,
      employeeId: employeeId,
      createdAt: new Date().toISOString()
    });

    status.innerHTML = `✅ 아바타 저장 완료!`;
    status.style.color = "#27ae60";
    
    // 입력 필드 초기화
    document.getElementById('avatarName').value = '';
    document.getElementById('avatarTeam').value = '';
      
    // 결과 페이지로 이동
    setTimeout(() => {
      showEmployeeResult({
        name: name,
        team: team,
        avatarData: currentAvatarState,
        verseContent,
        verseReference,
        employeeId: employeeId
      });
      
      // 새 아바타 생성 (randomizePart가 정의되어 있을 때만)
      if (typeof window.randomizePart === 'function') {
        window.randomizePart('all');
      }
    }, 1500);
  } catch (error) {
    status.textContent = "❌ 저장 실패: " + error.message;
    status.style.color = "#e74c3c";
  }
};

// 현재 아바타 상태 가져오기
function getCurrentAvatarState() {
  if (typeof window.builderState !== 'undefined') {
    return window.builderState;
  }
  // 기본 상태 반환 (lorelei 스타일 고정)
  return {
    style: 'lorelei',
    seed: Date.now().toString(),
    hair: 'variant01',
    eyes: 'variant01',
    eyebrows: 'variant01',
    mouth: 'happy01',
    nose: 'variant01',
    glasses: '',
    earrings: '',
    freckles: '',
    hairAccessories: ''
  };
}

// 아바타 SVG 생성 함수 (Dicebear API 사용)
function generateAvatarSVG(avatarData) {
  if (!avatarData) {
    avatarData = getCurrentAvatarState();
  }
  
  // Dicebear API로 아바타 생성
  if (typeof window.createDicebearAvatar === 'function') {
    try {
      const style = avatarData.style || 'lorelei';
      const seed = avatarData.seed || Date.now().toString();
      
      // Dicebear 옵션 구성
      const dicebearOptions = {
        seed: seed,
        scale: 100
      };

      // lorelei 스타일 옵션 (빈 문자열은 제외)
      if (avatarData.hair) dicebearOptions.hair = [avatarData.hair];
      if (avatarData.eyes) dicebearOptions.eyes = [avatarData.eyes];
      if (avatarData.eyebrows) dicebearOptions.eyebrows = [avatarData.eyebrows];
      if (avatarData.mouth) dicebearOptions.mouth = [avatarData.mouth];
      if (avatarData.nose) dicebearOptions.nose = [avatarData.nose];
      if (avatarData.glasses && avatarData.glasses !== '') dicebearOptions.glasses = [avatarData.glasses];
      if (avatarData.earrings && avatarData.earrings !== '') dicebearOptions.earrings = [avatarData.earrings];
      if (avatarData.freckles && avatarData.freckles !== '') dicebearOptions.freckles = [avatarData.freckles];
      if (avatarData.hairAccessories && avatarData.hairAccessories !== '') dicebearOptions.hairAccessories = [avatarData.hairAccessories];

      const svg = window.createDicebearAvatar({
        style: style,
        seed: seed,
        dicebearOptions: dicebearOptions
      });

      if (svg) return svg;
    } catch (error) {
      console.error('Error generating Dicebear avatar:', error);
    }
  }
  
  // 폴백: 기본 SVG 생성
  return createBasicAvatarSVG(avatarData);
}

// 아바타 PNG 생성 함수 (이미지 저장용)
function generateAvatarPNG(avatarData) {
  if (!avatarData) {
    avatarData = getCurrentAvatarState();
  }
  
  // Dicebear API로 PNG 아바타 생성
  if (typeof window.createDicebearAvatarPNG === 'function') {
    try {
      const style = avatarData.style || 'lorelei';
      const seed = avatarData.seed || Date.now().toString();
      
      // Dicebear 옵션 구성
      const dicebearOptions = {
        seed: seed,
        scale: 100
      };

      // lorelei 스타일 옵션 (빈 문자열은 제외)
      if (avatarData.hair) dicebearOptions.hair = [avatarData.hair];
      if (avatarData.eyes) dicebearOptions.eyes = [avatarData.eyes];
      if (avatarData.eyebrows) dicebearOptions.eyebrows = [avatarData.eyebrows];
      if (avatarData.mouth) dicebearOptions.mouth = [avatarData.mouth];
      if (avatarData.nose) dicebearOptions.nose = [avatarData.nose];
      if (avatarData.glasses && avatarData.glasses !== '') dicebearOptions.glasses = [avatarData.glasses];
      if (avatarData.earrings && avatarData.earrings !== '') dicebearOptions.earrings = [avatarData.earrings];
      if (avatarData.freckles && avatarData.freckles !== '') dicebearOptions.freckles = [avatarData.freckles];
      if (avatarData.hairAccessories && avatarData.hairAccessories !== '') dicebearOptions.hairAccessories = [avatarData.hairAccessories];

      const png = window.createDicebearAvatarPNG({
        style: style,
        seed: seed,
        dicebearOptions: dicebearOptions
      });

      if (png) return png;
    } catch (error) {
      console.error('Error generating Dicebear avatar PNG:', error);
    }
  }
  
  // 폴백: SVG 생성
  return generateAvatarSVG(avatarData);
}

// 기본 아바타 SVG 생성 (폴백용)
function createBasicAvatarSVG(avatarData) {
  return `
    <svg width="512" height="512" viewBox="0 0 512 512" fill="none" xmlns="http://www.w3.org/2000/svg">
      <!-- 배경 -->
      <rect width="512" height="512" fill="transparent"/>
      
      <!-- 기본 얼굴 -->
      <circle cx="256" cy="256" r="180" fill="#FFE0D4"/>
      
      <!-- 머리 -->
      <circle cx="256" cy="180" r="150" fill="#2C1B18"/>
      
      <!-- 눈 -->
      <circle cx="216" cy="240" r="20" fill="#1C1C1C"/>
      <circle cx="296" cy="240" r="20" fill="#1C1C1C"/>
      
      <!-- 입 -->
      <path d="M 226 300 Q 256 320 286 300" stroke="#C45B5D" stroke-width="6" fill="none" stroke-linecap="round"/>
      
      <!-- 텍스트 (로딩 실패 표시) -->
      <text x="256" y="450" text-anchor="middle" font-size="24" fill="#666">Avatar Loading...</text>
    </svg>
  `;
}

// 검색 함수 (HTML에서 호출)
window.searchEmployee = async function() {
  const name = document.getElementById('searchName').value.trim();
  const team = document.getElementById('searchTeam').value.trim();
  const status = document.getElementById('searchStatus');

  if (!name && !team) {
    status.textContent = "❌ 이름 또는 팀명을 입력해주세요!";
    status.style.color = "#e74c3c";
    return;
  }

  status.textContent = "🔍 검색 중...";
  status.style.color = "#3498db";

  try {
    const snapshot = await get(ref(db, "employees"));
    
    if (snapshot.exists()) {
      const data = snapshot.val();
      const employees = Object.keys(data).map(key => ({
        id: key,
        ...data[key]
      }));

      // 필터링
      const filteredEmployees = employees.filter(emp => {
        if (name && team) {
          return emp.name === name && emp.team === team;
        } else if (name) {
          return emp.name === name;
        } else if (team) {
          return emp.team === team;
        }
        return false;
      });

      if (filteredEmployees.length > 0) {
        displaySearchResults(filteredEmployees);
        status.textContent = `✅ ${filteredEmployees.length}명을 찾았습니다!`;
        status.style.color = "#27ae60";
      } else {
        status.textContent = "❌ 해당 조건에 맞는 사람이 없습니다.";
        status.style.color = "#e74c3c";
      }
    } else {
      status.textContent = "❌ 저장된 데이터가 없습니다.";
      status.style.color = "#e74c3c";
    }
  } catch (error) {
    status.textContent = "❌ 검색 실패: " + error.message;
    status.style.color = "#e74c3c";
  }
};

// 검색 결과 표시
function displaySearchResults(employees) {
  const resultsContainer = document.getElementById('searchResults');
  resultsContainer.innerHTML = '';

  employees.forEach(employee => {
    const employeeCard = document.createElement('div');
    employeeCard.className = 'employee-card';
    
    // 썸네일 생성: avatarData로 SVG 생성
    let avatarHTML = '';
    if (employee.avatarData) {
      try {
        const avatarData = typeof employee.avatarData === 'string' ? JSON.parse(employee.avatarData) : employee.avatarData;
        avatarHTML = generateAvatarSVG(avatarData);
      } catch (e) {
        avatarHTML = '<div class="no-avatar">아바타 없음</div>';
      }
    } else {
      avatarHTML = '<div class="no-avatar">아바타 없음</div>';
    }
    
    // 말씀 텍스트 구성 (저장값 우선, 없으면 랜덤)
    let verseHTML = '';
    if (employee.verseContent && employee.verseReference) {
      verseHTML = `${employee.verseContent} <span style="display:block;opacity:.75;margin-top:4px;">${employee.verseReference}</span>`;
    } else if (Array.isArray(window.verses) && window.verses.length > 0) {
      const v = window.verses[Math.floor(Math.random() * window.verses.length)];
      verseHTML = `${v.content} <span style=\"display:block;opacity:.75;margin-top:4px;\">${v.reference}</span>`;
    }

    employeeCard.innerHTML = `
      <div class="employee-avatar">
        ${avatarHTML}
      </div>
      <div class="employee-info">
        <h3>${employee.name}</h3>
        <p>팀: ${employee.team}</p>
      </div>
      <div class="employee-actions">
        <button onclick="showEmployeeResult(${JSON.stringify(employee).replace(/"/g, '&quot;')})" class="btn-primary">상세보기</button>
        <button onclick="deleteEmployee('${employee.id}')" class="btn-danger">삭제</button>
      </div>
    `;
    resultsContainer.appendChild(employeeCard);
  });

  // searchPage에 그대로 유지 (resultPage로 이동하지 않음)
}

// 상세 결과 표시 (HTML에서 호출)
window.showEmployeeResult = function(employee) {
  // 현재 정보를 전역 변수에 저장 (다운로드용)
  window.currentEmployee = employee;
  
  // 카드 내용 생성
  const resultCard = document.getElementById('resultCard');
  
  // 아바타 SVG 생성 (화면 표시용)
  let avatarData;
  if (employee.avatarData) {
    try {
      avatarData = typeof employee.avatarData === 'string' ? JSON.parse(employee.avatarData) : employee.avatarData;
    } catch (e) {
      console.error('Failed to parse avatar data:', e);
    }
  }
  
  const avatarSVG = generateAvatarSVG(avatarData);
  
  // 말씀 구절 (저장된 값 또는 랜덤)
  let verseContent = employee.verseContent || '';
  let verseReference = employee.verseReference || '';
  
  if (!verseContent && Array.isArray(window.verses) && window.verses.length > 0) {
    const v = window.verses[Math.floor(Math.random() * window.verses.length)];
    verseContent = v.content;
    verseReference = v.reference;
  }
  
  // 카드 플립 구조로 HTML 구성
  resultCard.innerHTML = `
    <div class="card-flip-container" id="cardFlipContainer">
      <!-- 카드 뒷면 -->
      <div class="card-face card-back"></div>
      
      <!-- 카드 앞면 -->
      <div class="card-face card-front">
        <div class="line-card">
          <div class="line-logo">HANEUL</div>
          <div class="line-info">
            <h2>${employee.name || ''}</h2>
            <p class="line-team">${employee.team || ''}</p>
            <p class="line-bible-verse">
              ${verseContent}
              <span class="line-bible-reference">${verseReference}</span>
            </p>
          </div>
          <div class="line-character">
            ${avatarSVG}
          </div>
        </div>
      </div>
    </div>
  `;
  
  showPage('resultPage');
  
  // 페이지 전환 후 카드 뒤집기 애니메이션 실행
  setTimeout(() => {
    const cardContainer = document.getElementById('cardFlipContainer');
    if (cardContainer) {
      cardContainer.classList.add('flipped');
      
      // 클릭/터치로 카드 뒤집기 기능 추가
      let isFlipping = false;
      let touchHandled = false;
      
      const flipCard = function() {
        if (isFlipping) return;
        isFlipping = true;
        cardContainer.classList.toggle('flipped');
        
        // 애니메이션이 끝난 후 다시 클릭 가능하도록
        setTimeout(() => {
          isFlipping = false;
        }, 800);
      };
      
      // 모바일 - 터치 이벤트 (우선 처리)
      cardContainer.addEventListener('touchend', function(e) {
        e.preventDefault();
        touchHandled = true;
        flipCard();
        
        // 300ms 후 touch 플래그 리셋 (click 이벤트 발생 방지)
        setTimeout(() => {
          touchHandled = false;
        }, 300);
      }, { passive: false });
      
      // PC - 클릭 이벤트 (터치가 처리되지 않았을 때만)
      cardContainer.addEventListener('click', function(e) {
        if (touchHandled) {
          e.preventDefault();
          return;
        }
        flipCard();
      });
    }
  }, 100);
};

// 삭제 함수 (HTML에서 호출)
window.deleteEmployee = async function(employeeId) {
  if (!confirm('정말로 이 데이터를 삭제하시겠습니까?')) {
    return;
  }

  try {
    await remove(ref(db, `employees/${employeeId}`));
    alert('데이터가 삭제되었습니다.');
    showPage('searchPage');
  } catch (error) {
    alert('삭제 실패: ' + error.message);
  }
};

// 아바타 다운로드 함수 (HTML에서 호출)
window.downloadAvatar = function(name, employeeId) {
  // 현재 아바타 상태 가져오기
  const currentAvatarState = getCurrentAvatarState();
  const svg = generateAvatarSVG(currentAvatarState);
  
  const canvas = document.createElement('canvas');
  const ctx = canvas.getContext('2d');
  const img = new Image();
  
  canvas.width = 400;
  canvas.height = 400;
  
  img.onload = function() {
    ctx.drawImage(img, 0, 0, 400, 400);
    canvas.toBlob(function(blob) {
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `${name}_${employeeId || 'avatar'}.png`;
      a.click();
      URL.revokeObjectURL(url);
    });
  };
  
  img.src = 'data:image/svg+xml;base64,' + btoa(svg);
};

// 이미지로 저장 함수
window.saveAsImage = async function() {
  const resultContainer = document.querySelector('.result-container');
  const resultCard = document.getElementById('resultCard');
  
  if (!resultContainer || !resultCard) {
    alert('결과 화면을 찾을 수 없습니다.');
    return;
  }
  
  try {
    // 저장 모드 활성화 (배경 + 로고 포함)
    resultContainer.classList.add('saving-mode');
    
    // 아바타를 SVG에서 PNG로 임시 교체
    const characterDiv = resultCard.querySelector('.line-character');
    const originalHTML = characterDiv ? characterDiv.innerHTML : '';
    
    // 현재 아바타 데이터로 PNG 생성
    if (characterDiv && window.currentEmployee && window.currentEmployee.avatarData) {
      try {
        const avatarData = typeof window.currentEmployee.avatarData === 'string' 
          ? JSON.parse(window.currentEmployee.avatarData) 
          : window.currentEmployee.avatarData;
        const avatarPNG = generateAvatarPNG(avatarData);
        characterDiv.innerHTML = avatarPNG;
        
        // 이미지 로딩 대기
        await new Promise(resolve => setTimeout(resolve, 500));
      } catch (e) {
        console.error('Failed to convert to PNG:', e);
      }
    }
    
    // html2canvas 로드
    const html2canvas = await import('https://cdn.jsdelivr.net/npm/html2canvas@1.4.1/+esm');
    
    // 전체 컨테이너 캡처 (배경 + 로고 포함)
    const canvas = await html2canvas.default(resultContainer, {
      backgroundColor: null,
      useCORS: true,
      allowTaint: true,
      logging: false,
      scale: 2,
      width: 540,
      height: 960,
      windowWidth: 540,
      windowHeight: 960
    });
    
    // 아바타를 원래 SVG로 복원
    if (characterDiv && originalHTML) {
      characterDiv.innerHTML = originalHTML;
    }
    
    // 저장 모드 비활성화
    resultContainer.classList.remove('saving-mode');
    
    // 다운로드
    const dataURL = canvas.toDataURL('image/png', 1.0);
    const link = document.createElement('a');
    const employeeName = window.currentEmployee ? window.currentEmployee.name : 'HANEUL';
    link.download = `${employeeName}_카드.png`;
    link.href = dataURL;
    link.click();
    
    alert('이미지가 저장되었습니다!');
  } catch (error) {
    console.error('캡처 오류:', error);
    alert('이미지 저장 중 오류가 발생했습니다: ' + error.message);
    
    // 오류 시 저장 모드 비활성화
    resultContainer.classList.remove('saving-mode');
    
    // 아바타 복원
    const characterDiv = resultCard.querySelector('.line-character');
    if (characterDiv) {
      characterDiv.innerHTML = '';
    }
  }
};

// 카드 이미지 데이터URL 생성 유틸 (DB 저장용)
async function generateCardImageDataURL(name, team, verseContent, verseReference, avatarData) {
  // 캡처를 위해 임시 DOM 구성: resultCard 구조와 동일
  const html2canvas = await import('https://cdn.jsdelivr.net/npm/html2canvas@1.4.1/+esm');

  const wrapper = document.createElement('div');
  wrapper.style.cssText = "position:fixed;left:-99999px;top:0;width:2160px;height:3840px;background:url('assets/images/back.jpg') center/cover no-repeat;display:flex;align-items:center;justify-content:center;padding:0;margin:0;box-sizing:border-box;";

  const card = document.createElement('div');
  card.style.cssText = "background:#f8f8f8;border-radius:64px;padding:0;width:1840px;height:3200px;box-shadow:0 24px 96px rgba(0,0,0,0.12);overflow:hidden;display:flex;flex-direction:column;box-sizing:border-box;";

  const photo = document.createElement('div');
  photo.className = 'employee-photo';
  photo.style.cssText = "width:1750px;height:1400px;margin:36px;border-radius:40px 40px 0 0;box-shadow:0 16px 48px rgba(0,0,0,0.12);overflow:hidden;background:#fff;display:flex;align-items:center;justify-content:center;";

  // 아바타 이미지 생성 및 Data URL로 변환
  const avatarImgHtml = generateAvatarSVG(avatarData);
  const tempDiv = document.createElement('div');
  tempDiv.innerHTML = avatarImgHtml;
  const tempImg = tempDiv.querySelector('img');
  const avatarUrl = tempImg.src;
  
  // Dicebear API에서 SVG 다운로드
  const svgResponse = await fetch(avatarUrl);
  const svgText = await svgResponse.text();
  
  // SVG를 Data URL로 변환
  const svgBlob = new Blob([svgText], { type: 'image/svg+xml;charset=utf-8' });
  const reader = new FileReader();
  const svgDataUrl = await new Promise((resolve) => {
    reader.onloadend = () => resolve(reader.result);
    reader.readAsDataURL(svgBlob);
  });
  
  // Data URL을 사용한 img 요소 생성
  const avatarImg = document.createElement('img');
  avatarImg.src = svgDataUrl;
  avatarImg.style.cssText = "width:100%;height:100%;object-fit:contain;";
  
  // 이미지 로드 대기
  await new Promise((resolve) => {
    avatarImg.onload = resolve;
    avatarImg.onerror = resolve;
  });
  
  photo.appendChild(avatarImg);

  const nameEl = document.createElement('div');
  nameEl.className = 'employee-name';
  nameEl.textContent = name;
  nameEl.style.cssText = "font-size:104px;padding:160px 96px 16px 96px;margin:-120px 0 0 0;border-radius:72px 72px 0 0;background:#fff;text-align:left;";

  const teamEl = document.createElement('div');
  teamEl.className = 'employee-team';
  teamEl.textContent = team;
  teamEl.style.cssText = "font-size:48px;padding:0 96px 28px 96px;background:#fff;text-align:left;";

  const verseEl = document.createElement('div');
  verseEl.className = 'employee-id';
  verseEl.innerHTML = verseContent ? `${verseContent}<br><span class=\"verse-reference\" style=\"display:block;margin-top:6px;opacity:0.75;\">${verseReference || ''}</span>` : '';
  verseEl.style.cssText = "font-size:36px;line-height:1.8;padding:0 96px 96px 96px;background:#fff;border-radius:0 0 36px 36px;text-align:left;flex:1 1 auto;overflow:hidden;";

  card.appendChild(photo);
  card.appendChild(nameEl);
  card.appendChild(teamEl);
  card.appendChild(verseEl);
  wrapper.appendChild(card);
  document.body.appendChild(wrapper);

  if (document.fonts && document.fonts.ready) await document.fonts.ready;

  const canvas = await html2canvas.default(wrapper, {
    width: 2160,
    height: 3840,
    windowWidth: 2160,
    windowHeight: 3840,
    backgroundColor: null,
    useCORS: true,
    allowTaint: true,
    logging: false,
    removeContainer: false
  });

  const dataURL = canvas.toDataURL('image/png', 0.9);
  
  // 정리
  wrapper.remove();
  return dataURL;
}

// 페이지 로드 시 초기화
document.addEventListener('DOMContentLoaded', function() {
  // 기본 페이지 표시
  showPage('mainPage');
});