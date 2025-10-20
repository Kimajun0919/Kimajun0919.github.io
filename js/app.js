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

// Avataaars 데이터
let avataaarsData = {
  skinColor: 'Pale',
  eyeType: 'Happy',
  eyebrowType: 'Default',
  mouthType: 'Smile',
  topType: 'ShortHairShortFlat',
  hairColor: 'Auburn',
  facialHairType: 'Blank',
  facialHairColor: 'Auburn',
  clotheType: 'BlazerShirt',
  clotheColor: 'Black',
  accessoriesType: 'Blank'
};

// 페이지 전환 함수
window.showPage = function(pageId) {
  document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
  document.getElementById(pageId).classList.add('active');
  
  if (pageId === 'avatarPage') {
    document.getElementById('avatarStatus').textContent = '';
    document.getElementById('avatarName').value = '';
    document.getElementById('avatarTeam').value = '';
    renderAvataaars();
  }
};

// Avataaars 렌더링 함수
function renderAvataaars() {
  const preview = document.getElementById('avatarPreview');
  if (!preview) return;
  
  // Avataaars SVG 생성
  const svg = generateAvataaarsSVG();
  preview.innerHTML = svg;
}

// Avataaars SVG 생성 함수
function generateAvataaarsSVG() {
  return `
    <svg
      width="200"
      height="200"
      viewBox="0 0 200 200"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <!-- 피부 -->
      <circle cx="100" cy="100" r="80" fill="#fdbcb4"/>
      
      <!-- 머리 -->
      <path d="M100 20 C 60 20, 30 50, 30 90 C 30 110, 40 130, 60 140 C 80 150, 120 150, 140 140 C 160 130, 170 110, 170 90 C 170 50, 140 20, 100 20 Z" fill="#a55728"/>
      
      <!-- 눈 -->
      <circle cx="80" cy="80" r="8" fill="#000"/>
      <circle cx="120" cy="80" r="8" fill="#000"/>
      
      <!-- 눈썹 -->
      <path d="M 60 65 Q 80 55 100 65" stroke="#000" stroke-width="3" fill="none"/>
      <path d="M 100 65 Q 120 55 140 65" stroke="#000" stroke-width="3" fill="none"/>
      
      <!-- 입 -->
      <path d="M 90 120 Q 100 130 110 120" stroke="#000" stroke-width="2" fill="none"/>
      
      <!-- 의상 -->
      <rect x="50" y="160" width="100" height="40" fill="#262e33"/>
    </svg>
  `;
}

// Avataaars 옵션 선택 함수
window.selectAvataaarsOption = function(property, value) {
  avataaarsData[property] = value;
  
  // 선택된 옵션 표시
  document.querySelectorAll(`[data-property="${property}"]`).forEach(item => {
    item.classList.remove('selected');
  });
  
  const selectedItem = document.querySelector(`[data-property="${property}"][data-value="${value}"]`);
  if (selectedItem) {
    selectedItem.classList.add('selected');
  }
  
  // 아바타 다시 렌더링
  renderAvataaars();
};

// 탭 전환 함수
window.showTab = function(tabName) {
  // 모든 탭 버튼에서 active 클래스 제거
  document.querySelectorAll('.tab-btn').forEach(btn => {
    btn.classList.remove('active');
  });
  
  // 모든 탭 콘텐츠 숨기기
  document.querySelectorAll('.tab-content').forEach(content => {
    content.style.display = 'none';
  });
  
  // 해당 탭 버튼에 active 클래스 추가
  const targetButton = document.querySelector(`[onclick*="showTab('${tabName}')"]`);
  if (targetButton) {
    targetButton.classList.add('active');
  }
  
  // 해당 탭 콘텐츠 표시
  const targetContent = document.getElementById(tabName + 'Tab');
  if (targetContent) {
    targetContent.style.display = 'block';
  }
};

// 아바타 저장 함수
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
    // 고유 ID 생성
      const employeeId = String(Date.now()).slice(-6);

    // Firebase에 저장
      const newRef = await push(ref(db, "employees"), {
        name,
        team,
      avatarData: JSON.stringify(avataaarsData),
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
        avatarData: avataaarsData,
        employeeId: employeeId
      });
      }, 1500);
  } catch (error) {
    status.textContent = "❌ 저장 실패: " + error.message;
    status.style.color = "#e74c3c";
  }
};

// 직원 검색 함수
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
    let searchQuery;
    if (name && team) {
      // 이름과 팀명으로 검색
      searchQuery = query(ref(db, "employees"), orderByChild("name"), equalTo(name));
    } else if (name) {
      // 이름으로만 검색
      searchQuery = query(ref(db, "employees"), orderByChild("name"), equalTo(name));
    } else {
      // 팀명으로만 검색
      searchQuery = query(ref(db, "employees"), orderByChild("team"), equalTo(team));
    }

    const snapshot = await get(searchQuery);
    
    if (snapshot.exists()) {
      const data = snapshot.val();
      const employees = Object.keys(data).map(key => ({
        id: key,
        ...data[key]
      }));

      // 팀명으로 필터링 (이름으로 검색한 경우)
      const filteredEmployees = team ? 
        employees.filter(emp => emp.team === team) : 
        employees;

      if (filteredEmployees.length > 0) {
        displaySearchResults(filteredEmployees);
        status.textContent = `✅ ${filteredEmployees.length}명의 직원을 찾았습니다!`;
        status.style.color = "#27ae60";
      } else {
        status.textContent = "❌ 해당 조건에 맞는 직원이 없습니다.";
        status.style.color = "#e74c3c";
    }
  } else {
      status.textContent = "❌ 해당 조건에 맞는 직원이 없습니다.";
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
    employeeCard.innerHTML = `
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

// 직원 상세 결과 표시
window.showEmployeeResult = function(employee) {
  const resultContainer = document.getElementById('resultContainer');
  
  let avatarHTML = '';
  if (employee.avatarData) {
    try {
      const avatarData = typeof employee.avatarData === 'string' ? 
        JSON.parse(employee.avatarData) : employee.avatarData;
      avatarHTML = generateAvataaarsSVG();
    } catch (e) {
      avatarHTML = '<div class="no-avatar">아바타 없음</div>';
    }
  } else {
    avatarHTML = '<div class="no-avatar">아바타 없음</div>';
  }

  resultContainer.innerHTML = `
    <div class="result-header">
      <h2>직원 정보</h2>
      <button onclick="showPage('mainPage')" class="btn-secondary">메인으로</button>
    </div>
    <div class="result-content">
      <div class="employee-photo">
        ${avatarHTML}
      </div>
      <div class="employee-details">
        <h3>${employee.name}</h3>
        <p><strong>팀:</strong> ${employee.team}</p>
        <p><strong>직원 ID:</strong> ${employee.employeeId}</p>
        <p><strong>등록일:</strong> ${new Date(employee.createdAt).toLocaleDateString()}</p>
      </div>
    </div>
    <div class="result-actions">
      <button onclick="downloadAvatar('${employee.name}')" class="btn-primary">아바타 다운로드</button>
      <button onclick="showPage('searchPage')" class="btn-secondary">다시 검색</button>
    </div>
  `;

  showPage('resultPage');
};

// 직원 삭제 함수
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

// 아바타 다운로드 함수
window.downloadAvatar = function(name) {
  const svg = generateAvataaarsSVG();
  const canvas = document.createElement('canvas');
  const ctx = canvas.getContext('2d');
  const img = new Image();
  
  canvas.width = 200;
  canvas.height = 200;
  
  img.onload = function() {
    ctx.drawImage(img, 0, 0);
    canvas.toBlob(function(blob) {
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `${name}_avatar.png`;
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