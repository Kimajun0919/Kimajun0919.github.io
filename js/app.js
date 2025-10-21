import { initializeApp } from "https://www.gstatic.com/firebasejs/12.3.0/firebase-app.js";
import { getDatabase, ref, push, get, child, remove } from "https://www.gstatic.com/firebasejs/12.3.0/firebase-database.js";

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

    // 랜덤 말씀 선택(저장 시 고정)
    let verseContent = '';
    let verseReference = '';
    if (Array.isArray(window.verses) && window.verses.length > 0) {
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
    hairAccessories: '',
    backgroundColor: []
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
        backgroundColor: avatarData.backgroundColor || [],
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

// 기본 아바타 SVG 생성 (폴백용)
function createBasicAvatarSVG(avatarData) {
  const bgColor = avatarData.backgroundColor && avatarData.backgroundColor[0] ? avatarData.backgroundColor[0] : '#f0f0f0';
  
  return `
    <svg width="512" height="512" viewBox="0 0 512 512" fill="none" xmlns="http://www.w3.org/2000/svg">
      <!-- 배경 -->
      <rect width="512" height="512" fill="${bgColor}"/>
      
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

// 직원 검색 함수 (HTML에서 호출)
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
        status.textContent = `✅ ${filteredEmployees.length}명의 직원을 찾았습니다!`;
        status.style.color = "#27ae60";
      } else {
        status.textContent = "❌ 해당 조건에 맞는 직원이 없습니다.";
        status.style.color = "#e74c3c";
      }
    } else {
      status.textContent = "❌ 저장된 직원이 없습니다.";
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
        <p>${verseHTML}</p>
        <p>등록일: ${new Date(employee.createdAt).toLocaleDateString()}</p>
      </div>
      <div class="employee-actions">
        <button onclick="showEmployeeResult(${JSON.stringify(employee).replace(/"/g, '&quot;')})" class="btn-primary">상세보기</button>
        <button onclick="deleteEmployee('${employee.id}')" class="btn-danger">삭제</button>
      </div>
    `;
    resultsContainer.appendChild(employeeCard);
  });

  showPage('resultPage');
}

// 직원 상세 결과 표시 (HTML에서 호출)
window.showEmployeeResult = function(employee) {
  // 결과 페이지의 요소들에 데이터 설정
  const resultPhoto = document.getElementById('resultPhoto');
  const resultName = document.getElementById('resultName');
  const resultTeam = document.getElementById('resultTeam');
  const resultId = document.getElementById('resultId');
  
  if (resultPhoto && resultName && resultTeam && resultId) {
    // 아바타 표시: avatarData로 생성
    let avatarHTML = '';
    if (employee.avatarData) {
      try {
        const avatarData = typeof employee.avatarData === 'string' ? JSON.parse(employee.avatarData) : employee.avatarData;
        avatarHTML = generateAvatarSVG(avatarData);
      } catch (e) {
        console.error('아바타 데이터 파싱 오류:', e);
        avatarHTML = '<div class="no-avatar">아바타 없음</div>';
      }
    } else {
      avatarHTML = '<div class="no-avatar">아바타 없음</div>';
    }
    
    resultPhoto.innerHTML = avatarHTML;
    resultName.textContent = employee.name;
    resultTeam.textContent = employee.team;

    // 저장된 말씀이 있으면 사용, 아니면 랜덤
    if (employee.verseContent && employee.verseReference) {
      resultId.innerHTML = `${employee.verseContent}<br><span class="verse-reference" style="display:block;margin-top:6px;opacity:0.75;">${employee.verseReference}</span>`;
    } else {
      try {
        if (Array.isArray(window.verses) && window.verses.length > 0) {
          const v = window.verses[Math.floor(Math.random() * window.verses.length)];
          resultId.innerHTML = `${v.content}<br><span class="verse-reference" style="display:block;margin-top:6px;opacity:0.75;">${v.reference}</span>`;
        } else {
          resultId.textContent = `ID: ${employee.employeeId}`;
        }
      } catch (e) {
        resultId.textContent = `ID: ${employee.employeeId}`;
      }
    }
    
    // 현재 직원 정보를 전역 변수에 저장 (다운로드용)
    window.currentEmployee = employee;
  }

  showPage('resultPage');
};

// 직원 삭제 함수 (HTML에서 호출)
window.deleteEmployee = async function(employeeId) {
  if (!confirm('정말로 이 직원을 삭제하시겠습니까?')) {
    return;
  }

  try {
    await remove(ref(db, `employees/${employeeId}`));
    alert('직원이 삭제되었습니다.');
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

// 이미지로 저장 함수 (결과 페이지용)
window.saveAsImage = async function() {
  // 전체 배경(assets/back.jpg) 포함, 2160x3840 고정으로 저장
  const baseName = document.getElementById('resultName')?.textContent || 'avatar';
  const originalCard = document.getElementById('resultCard');
  if (!originalCard) return;

  // html2canvas 로드
  const html2canvas = await import('https://cdn.jsdelivr.net/npm/html2canvas@1.4.1/+esm');

  // 오프스크린 래퍼 생성 (9:16, 2160x3840)
  const wrapper = document.createElement('div');
  wrapper.style.cssText = "position:fixed;left:-99999px;top:0;width:2160px;height:3840px;background:url('assets/back.jpg') center/cover no-repeat;display:flex;align-items:center;justify-content:center;padding:0;margin:0;box-sizing:border-box;transform:none";

  // 카드 복제 및 고해상도 스타일 보정
  const clone = originalCard.cloneNode(true);
  // 카드 크기/비율 고정 (2160x3840 안 기준): 1840 x 3200
  clone.style.cssText = "background:#f8f8f8;border-radius:64px;padding:0;width:1840px;height:3200px;max-width:none;box-shadow:0 24px 96px rgba(0,0,0,0.12);overflow:hidden;display:flex;flex-direction:column;box-sizing:border-box;transform:none;position:relative";
  // 원본 카드의 max-width 제약 제거
  try { clone.classList && clone.classList.remove('result-card'); } catch (e) {}

  // 주요 요소 타이포/여백 확대
  const nameEl = clone.querySelector('.employee-name');
  if (nameEl) {
    nameEl.style.fontSize = '104px';
    nameEl.style.padding = '160px 96px 16px 96px';
    nameEl.style.margin = '-120px 0 0 0';
    nameEl.style.borderRadius = '72px 72px 0 0';
    nameEl.style.background = '#fff';
    nameEl.style.textAlign = 'left';
  }
  const teamEl = clone.querySelector('.employee-team');
  if (teamEl) {
    teamEl.style.fontSize = '48px';
    teamEl.style.padding = '0 96px 28px 96px';
    teamEl.style.background = '#fff';
    teamEl.style.textAlign = 'left';
  }
  const verseEl = clone.querySelector('.employee-id');
  if (verseEl) {
    verseEl.style.fontSize = '36px';
    verseEl.style.lineHeight = '1.8';
    verseEl.style.padding = '0 96px 96px 96px';
    verseEl.style.background = '#fff';
    verseEl.style.borderRadius = '0 0 36px 36px';
    verseEl.style.textAlign = 'left';
    verseEl.style.flex = '1 1 auto';
    verseEl.style.overflow = 'hidden';
  }
  const photo = clone.querySelector('.employee-photo');
  if (photo) {
    photo.style.width = '1750px';
    photo.style.height = '1400px';
    photo.style.margin = '36px';
    photo.style.borderRadius = '40px 40px 0 0';
    photo.style.boxShadow = '0 16px 48px rgba(0,0,0,0.12)';
    photo.style.flex = '0 0 auto';

    // 아바타 이미지를 base64로 변환 (CORS 문제 해결)
    const avatarImg = photo.querySelector('img');
    if (avatarImg && avatarImg.src.startsWith('http')) {
      try {
        const svgResponse = await fetch(avatarImg.src);
        const svgText = await svgResponse.text();
        const svgBase64 = 'data:image/svg+xml;base64,' + btoa(unescape(encodeURIComponent(svgText)));
        avatarImg.src = svgBase64;
        console.log('아바타 이미지를 base64로 변환 완료');
      } catch (error) {
        console.error('아바타 이미지 base64 변환 실패:', error);
      }
    }

    // 내부 SVG가 고정 크기를 갖지 않도록 강제
    const innerSvg = photo.querySelector('svg');
    if (innerSvg) {
      innerSvg.setAttribute('width', '100%');
      innerSvg.setAttribute('height', '100%');
      innerSvg.style.width = '100%';
      innerSvg.style.height = '100%';
    }
  }

  wrapper.appendChild(clone);
  document.body.appendChild(wrapper);

  // 폰트/이미지 로드 대기
  if (document.fonts && document.fonts.ready) await document.fonts.ready;
  const innerImg = clone.querySelector('img');
  if (innerImg && !(innerImg.complete && (innerImg.naturalWidth || 1) > 0)) {
    await new Promise(r => { innerImg.addEventListener('load', r, { once:true }); innerImg.addEventListener('error', r, { once:true }); });
  }

  // 캡처
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

  // 다운로드
  const a = document.createElement('a');
  a.href = canvas.toDataURL('image/png', 0.95);
  a.download = `${baseName}_2160x3840.png`;
  a.click();

  // 정리
  wrapper.remove();
};

// 카드 이미지 데이터URL 생성 유틸 (DB 저장용)
async function generateCardImageDataURL(name, team, verseContent, verseReference, avatarData) {
  // 캡처를 위해 임시 DOM 구성: resultCard 구조와 동일
  const html2canvas = await import('https://cdn.jsdelivr.net/npm/html2canvas@1.4.1/+esm');

  const wrapper = document.createElement('div');
  wrapper.style.cssText = "position:fixed;left:-99999px;top:0;width:2160px;height:3840px;background:url('assets/back.jpg') center/cover no-repeat;display:flex;align-items:center;justify-content:center;padding:0;margin:0;box-sizing:border-box;";

  const card = document.createElement('div');
  card.style.cssText = "background:#f8f8f8;border-radius:64px;padding:0;width:1840px;height:3200px;box-shadow:0 24px 96px rgba(0,0,0,0.12);overflow:hidden;display:flex;flex-direction:column;box-sizing:border-box;";

  const photo = document.createElement('div');
  photo.className = 'employee-photo';
  photo.style.cssText = "width:1750px;height:1400px;margin:36px;border-radius:40px 40px 0 0;box-shadow:0 16px 48px rgba(0,0,0,0.12);overflow:hidden;background:#fff;";

  // SVG를 base64로 인코딩해서 CORS 문제 우회
  const svgResponse = await fetch(apiUrl);
  const svgText = await svgResponse.text();
  const svgBase64 = 'data:image/svg+xml;base64,' + btoa(unescape(encodeURIComponent(svgText)));

  const avatarImg = document.createElement('img');
  avatarImg.src = svgBase64;
  avatarImg.style.cssText = "width:100%;height:100%;object-fit:contain;";
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
  wrapper.remove();
  return dataURL;
}

// 페이지 로드 시 초기화
document.addEventListener('DOMContentLoaded', function() {
  // 기본 페이지 표시
  showPage('mainPage');
});