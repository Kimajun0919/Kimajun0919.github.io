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

  // searchPage에 그대로 유지 (resultPage로 이동하지 않음)
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

// 이미지로 저장 함수 (결과 페이지용) - 완전히 새로 작성
window.saveAsImage = async function() {
  console.log('=== 이미지 저장 시작 ===');
  
  // 1. 현재 직원 정보 가져오기
  if (!window.currentEmployee) {
    alert('저장할 직원 정보가 없습니다.');
    return;
  }
  
  const employee = window.currentEmployee;
  console.log('직원 정보:', employee);
  
  // 2. 아바타 데이터 파싱
  let avatarData = employee.avatarData;
  if (typeof avatarData === 'string') {
    try {
      avatarData = JSON.parse(avatarData);
    } catch (e) {
      console.error('아바타 데이터 파싱 실패:', e);
      alert('아바타 데이터를 읽을 수 없습니다.');
      return;
    }
  }
  console.log('아바타 데이터:', avatarData);
  
  // 3. html2canvas 로드
  const html2canvas = await import('https://cdn.jsdelivr.net/npm/html2canvas@1.4.1/+esm');
  
  // 4. 오프스크린 래퍼 생성 (배경 포함)
  const wrapper = document.createElement('div');
  wrapper.style.cssText = `
    position: fixed;
    left: -99999px;
    top: 0;
    width: 2160px;
    height: 3840px;
    background: url('assets/images/back.jpg') center/cover no-repeat;
    display: flex;
    align-items: center;
    justify-content: center;
  `;
  
  // 5. 카드 생성
  const card = document.createElement('div');
  card.style.cssText = `
    background: #f8f8f8;
    border-radius: 64px;
    width: 1840px;
    height: 3200px;
    box-shadow: 0 24px 96px rgba(0,0,0,0.12);
    display: flex;
    flex-direction: column;
    overflow: hidden;
  `;
  
  // 6. 아바타 영역 생성
  const photoArea = document.createElement('div');
  photoArea.style.cssText = `
    width: 1750px;
    height: 1400px;
    margin: 36px 36px 0 36px;
    border-radius: 40px 40px 0 0;
    box-shadow: 0 16px 48px rgba(0,0,0,0.12);
    background: #fff;
    display: flex;
    align-items: center;
    justify-content: center;
    overflow: hidden;
  `;
  
  // 7. 아바타 이미지 생성 및 삽입
  const avatarImgHtml = window.createDicebearAvatar(avatarData);
  console.log('아바타 HTML 생성:', avatarImgHtml.substring(0, 200));
  
  // img 태그 HTML에서 src 추출
  const tempDiv = document.createElement('div');
  tempDiv.innerHTML = avatarImgHtml;
  const tempImg = tempDiv.querySelector('img');
  
  // 새로운 img 요소 생성 (html2canvas 호환성 향상)
  const avatarImg = document.createElement('img');
  avatarImg.src = tempImg.src;
  avatarImg.crossOrigin = 'anonymous';
  avatarImg.style.cssText = `
    width: 100%;
    height: 100%;
    object-fit: contain;
  `;
  
  // 이미지 로드 완료를 Promise로 대기
  await new Promise((resolve, reject) => {
    avatarImg.onload = () => {
      console.log('아바타 이미지 로드 완료');
      resolve();
    };
    avatarImg.onerror = (error) => {
      console.error('아바타 이미지 로드 실패:', error);
      resolve(); // 에러여도 계속 진행
    };
  });
  
  photoArea.appendChild(avatarImg);
  
  // 8. 이름 영역
  const nameArea = document.createElement('div');
  nameArea.style.cssText = `
    font-size: 104px;
    font-weight: 700;
    padding: 160px 96px 16px 96px;
    margin: -120px 0 0 0;
    background: #fff;
    text-align: left;
  `;
  nameArea.textContent = employee.name;
  
  // 9. 팀 영역
  const teamArea = document.createElement('div');
  teamArea.style.cssText = `
    font-size: 48px;
    padding: 0 96px 28px 96px;
    background: #fff;
    text-align: left;
    color: #666;
  `;
  teamArea.textContent = employee.team;
  
  // 10. 말씀 영역
  const verseArea = document.createElement('div');
  verseArea.style.cssText = `
    font-size: 36px;
    line-height: 1.8;
    padding: 0 96px 96px 96px;
    background: #fff;
    border-radius: 0 0 36px 36px;
    text-align: left;
    flex: 1;
    overflow: hidden;
  `;
  verseArea.innerHTML = employee.verseContent 
    ? `${employee.verseContent}<br><span style="display:block;margin-top:6px;opacity:0.75;">${employee.verseReference || ''}</span>` 
    : '';
  
  // 11. 카드 조립
  card.appendChild(photoArea);
  card.appendChild(nameArea);
  card.appendChild(teamArea);
  card.appendChild(verseArea);
  wrapper.appendChild(card);
  document.body.appendChild(wrapper);
  
  console.log('DOM 구조 생성 완료');
  
  // 12. 폰트 로드 대기
  if (document.fonts && document.fonts.ready) {
    await document.fonts.ready;
  }
  
  // 13. 추가 렌더링 대기 (SVG 렌더링 보장)
  await new Promise(resolve => setTimeout(resolve, 300));
  
  console.log('렌더링 대기 완료');
  
  // 14. html2canvas로 캡처
  try {
    const canvas = await html2canvas.default(wrapper, {
      width: 2160,
      height: 3840,
      windowWidth: 2160,
      windowHeight: 3840,
      backgroundColor: null,
      useCORS: true,
      allowTaint: true,
      logging: true,
      scale: 1
    });
    
    console.log('캡처 완료:', canvas.width, 'x', canvas.height);
    
    // 15. 다운로드
    const dataURL = canvas.toDataURL('image/png', 0.95);
    const link = document.createElement('a');
    link.download = `${employee.name}_카드.png`;
    link.href = dataURL;
    link.click();
    
    console.log('다운로드 완료');
    alert('이미지가 저장되었습니다!');
    
  } catch (error) {
    console.error('캡처 오류:', error);
    alert('이미지 저장 중 오류가 발생했습니다: ' + error.message);
  }
  
  // 16. 정리
  wrapper.remove();
  console.log('=== 이미지 저장 완료 ===');
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

  // 아바타 이미지 생성 (html2canvas 호환성 향상)
  const avatarImgHtml = generateAvatarSVG(avatarData);
  const tempDiv = document.createElement('div');
  tempDiv.innerHTML = avatarImgHtml;
  const tempImg = tempDiv.querySelector('img');
  
  const avatarImg = document.createElement('img');
  avatarImg.src = tempImg.src;
  avatarImg.crossOrigin = 'anonymous';
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