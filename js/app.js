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

    // Firebase에 저장
    const newRef = await push(ref(db, "employees"), {
      name,
      team,
      avatarData: JSON.stringify(currentAvatarState),
      employeeId: employeeId,
      createdAt: new Date().toISOString()
    });

    status.innerHTML = `✅ 아바타 저장 완료!`;
    status.style.color = "#27ae60";
      
    // 결과 페이지로 이동
    setTimeout(() => {
      showEmployeeResult({
        name: name,
        team: team,
        avatarData: currentAvatarState,
        employeeId: employeeId
      });
    }, 1500);
  } catch (error) {
    status.textContent = "❌ 저장 실패: " + error.message;
    status.style.color = "#e74c3c";
  }
};

// 현재 아바타 상태 가져오기
function getCurrentAvatarState() {
  if (typeof builderState !== 'undefined') {
    return builderState;
  }
  // 기본 상태 반환
  return {
    faceShape: { id: 'oval' },
    skinTone: { id: 'tone1', color: '#FFDFC4' },
    hair: { id: 'short_01', color: '#2C1B18' },
    eyes: { id: 'normal', color: '#2C1B18' },
    eyebrows: { id: 'normal', color: '#2C1B18' },
    nose: { id: 'normal' },
    mouth: { id: 'smile', color: '#D4686B' },
    ears: { id: 'normal' },
    top: { id: 'tshirt', color: '#FF6B6B' }
  };
}

// 아바타 SVG 생성 함수 (새로운 아바타 빌더 시스템 사용)
function generateAvatarSVG(avatarData) {
  if (!avatarData) {
    avatarData = getCurrentAvatarState();
  }
  
  // 아바타 빌더의 렌더링 함수 사용
  if (typeof window.renderBuilderAvatar === 'function') {
    // 임시로 builderState 설정
    const originalState = typeof window.builderState !== 'undefined' ? window.builderState : null;
    window.builderState = avatarData;
    
    // 아바타 렌더링
    window.renderBuilderAvatar(avatarData);
    
    // SVG 생성
    const svg = document.getElementById('avatarPreview');
    if (svg) {
      const svgData = new XMLSerializer().serializeToString(svg);
      
      // 원래 상태 복원
      if (originalState) {
        window.builderState = originalState;
        window.renderBuilderAvatar(originalState);
      }
      
      return svgData;
    }
    
    // 원래 상태 복원
    if (originalState) {
      window.builderState = originalState;
    }
  }
  
  // 폴백: 기본 SVG 생성
  return createBasicAvatarSVG(avatarData);
}

// 기본 아바타 SVG 생성 (폴백용)
function createBasicAvatarSVG(avatarData) {
  const skinColor = avatarData.skinTone?.color || '#FFDFC4';
  const hairColor = avatarData.hair?.color || '#2C1B18';
  const eyeColor = avatarData.eyes?.color || '#2C1B18';
  const mouthColor = avatarData.mouth?.color || '#D4686B';
  const topColor = avatarData.top?.color || '#FF6B6B';
  
  return `
    <svg width="200" height="200" viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg">
      <!-- 배경 -->
      <circle cx="100" cy="100" r="100" fill="#f0f0f0"/>
      
      <!-- 피부 (얼굴) -->
      <circle cx="100" cy="100" r="80" fill="${skinColor}"/>
      
      <!-- 머리 -->
      <circle cx="100" cy="60" r="60" fill="${hairColor}"/>
      
      <!-- 눈 -->
      <circle cx="80" cy="90" r="8" fill="${eyeColor}"/>
      <circle cx="120" cy="90" r="8" fill="${eyeColor}"/>
      
      <!-- 입 -->
      <path d="M 90 130 Q 100 140 110 130" stroke="${mouthColor}" stroke-width="3" fill="none"/>
      
      <!-- 상의 -->
      <rect x="60" y="160" width="80" height="40" fill="${topColor}"/>
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
    
    // 아바타 HTML 생성
    let avatarHTML = '';
    if (employee.avatarData) {
      try {
        const avatarData = typeof employee.avatarData === 'string' ? 
          JSON.parse(employee.avatarData) : employee.avatarData;
        avatarHTML = generateAvatarSVG(avatarData);
      } catch (e) {
        avatarHTML = '<div class="no-avatar">아바타 없음</div>';
      }
    } else {
      avatarHTML = '<div class="no-avatar">아바타 없음</div>';
    }
    
    employeeCard.innerHTML = `
      <div class="employee-avatar">
        ${avatarHTML}
      </div>
      <div class="employee-info">
        <h3>${employee.name}</h3>
        <p>팀: ${employee.team}</p>
        <p>ID: ${employee.employeeId}</p>
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
    // 아바타 표시
    let avatarHTML = '';
    if (employee.avatarData) {
      try {
        const avatarData = typeof employee.avatarData === 'string' ? 
          JSON.parse(employee.avatarData) : employee.avatarData;
        
        // 새로운 아바타 빌더 시스템으로 렌더링
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
    resultId.textContent = `ID: ${employee.employeeId}`;
    
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
  const name = document.getElementById('resultName').textContent;
  const employeeId = document.getElementById('resultId').textContent.replace('ID: ', '');
  
  // 현재 직원의 아바타 데이터 가져오기
  let avatarData = null;
  if (window.currentEmployee && window.currentEmployee.avatarData) {
    try {
      avatarData = typeof window.currentEmployee.avatarData === 'string' ? 
        JSON.parse(window.currentEmployee.avatarData) : window.currentEmployee.avatarData;
    } catch (e) {
      console.error('아바타 데이터 파싱 오류:', e);
    }
  }
  
  if (!avatarData) {
    alert('아바타 데이터를 찾을 수 없습니다.');
    return;
  }
  
  const svg = generateAvatarSVG(avatarData);
  
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

// 페이지 로드 시 초기화
document.addEventListener('DOMContentLoaded', function() {
  // 기본 페이지 표시
  showPage('mainPage');
});