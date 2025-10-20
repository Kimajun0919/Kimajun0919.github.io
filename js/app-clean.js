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
};

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

// 직원 상세 결과 표시 (HTML에서 호출)
window.showEmployeeResult = function(employee) {
  const resultContainer = document.getElementById('resultContainer');
  
  let avatarHTML = '';
  if (employee.avatarSVG) {
    // 저장된 SVG 사용
    avatarHTML = employee.avatarSVG;
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
      <button onclick="showPage('searchPage')" class="btn-secondary">다시 검색</button>
    </div>
  `;

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

// 페이지 로드 시 초기화
document.addEventListener('DOMContentLoaded', async function() {
  // 기본 페이지 표시
  showPage('mainPage');
});

