import { initializeApp } from "https://www.gstatic.com/firebasejs/12.3.0/firebase-app.js";
import { getDatabase, ref, push, get, child } from "https://www.gstatic.com/firebasejs/12.3.0/firebase-database.js";

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

const scriptURL = "https://script.google.com/macros/s/AKfycbw6ONYzMtPA5n709KSYL83Ck24R560gj3nuEORIxtea9MW2GdCNdpCVJO-6z4tHtItl/exec";

window.showPage = function(pageId) {
  document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
  document.getElementById(pageId).classList.add('active');
  
  if (pageId === 'registerPage') {
    document.getElementById('status').textContent = '';
    document.getElementById('name').value = '';
    document.getElementById('team').value = '';
    document.getElementById('photo').value = '';
    document.getElementById('preview').style.display = 'none';
    document.getElementById('fileLabel').textContent = '📷 사진을 선택하세요';
  }
  
  if (pageId === 'searchPage') {
    document.getElementById('searchStatus').textContent = '';
    document.getElementById('searchName').value = '';
    document.getElementById('searchTeam').value = '';
  }
};

window.previewImage = function(input) {
  if (input.files && input.files[0]) {
    const reader = new FileReader();
    reader.onload = function(e) {
      const preview = document.getElementById('preview');
      preview.src = e.target.result;
      preview.style.display = 'block';
      document.getElementById('fileLabel').textContent = '✅ ' + input.files[0].name;
    };
    reader.readAsDataURL(input.files[0]);
  }
};

window.registerEmployee = async function() {
  const name = document.getElementById("name").value.trim();
  const team = document.getElementById("team").value.trim();
  const file = document.getElementById("photo").files[0];
  const status = document.getElementById("status");

  if (!name || !team || !file) {
    status.textContent = "❌ 모든 항목을 입력해주세요!";
    status.style.color = "#e74c3c";
    return;
  }

  status.textContent = "📤 업로드 중...";
  status.style.color = "#3498db";

  const reader = new FileReader();
  reader.onloadend = async () => {
    const base64 = reader.result.split(",")[1];
    const res = await fetch(scriptURL, {
      method: "POST",
      body: new URLSearchParams({
        file: base64,
        filename: file.name,
        mimeType: file.type
      })
    });

    const imageURL = await res.text();
    if (imageURL.startsWith("ERROR")) {
      status.textContent = "❌ 업로드 실패: " + imageURL;
      status.style.color = "#e74c3c";
      return;
    }

    const newRef = await push(ref(db, "employees"), {
      name,
      team,
      photoURL: imageURL,
      createdAt: new Date().toISOString()
    });

    status.innerHTML = `✅ 등록 완료!`;
    status.style.color = "#27ae60";
    
    setTimeout(() => {
      showPage('mainPage');
    }, 1500);
  };
  reader.readAsDataURL(file);
};

window.searchEmployee = async function() {
  const name = document.getElementById("searchName").value.trim();
  const team = document.getElementById("searchTeam").value.trim();
  const searchStatus = document.getElementById("searchStatus");

  if (!name || !team) {
    searchStatus.textContent = "❌ 이름과 팀을 모두 입력하세요.";
    searchStatus.style.color = "#e74c3c";
    return;
  }

  searchStatus.textContent = "🔍 조회 중...";
  searchStatus.style.color = "#3498db";

  const snapshot = await get(child(ref(db), "employees"));
  if (snapshot.exists()) {
    const employees = snapshot.val();
    let found = false;

    for (const key in employees) {
      const emp = employees[key];
          if (emp.name === name && emp.team === team) {
            document.getElementById('resultPhoto').src = emp.photoURL;
            document.getElementById('resultName').textContent = emp.name;
            document.getElementById('resultTeam').textContent = emp.team;
            
            // 랜덤한 성경 말씀 선택
            const randomVerse = verses[Math.floor(Math.random() * verses.length)];
            document.getElementById('resultId').innerHTML = 
              `<div style="font-size: 12px; color: #666; line-height: 1.4; margin-top: 20px;">${randomVerse.content}<br><span style="font-size: 10px; color: #999; margin-top: 5px; display: block;">${randomVerse.reference}</span></div>`;
            
            showPage('resultPage');
            found = true;
            break;
          }
    }

    if (!found) {
      searchStatus.textContent = "❌ 해당 정보를 찾을 수 없습니다.";
      searchStatus.style.color = "#e74c3c";
    }
  } else {
    searchStatus.textContent = "등록된 팀원이 없습니다.";
    searchStatus.style.color = "#999";
  }
};


window.saveAsImage = async function() {
  const container = document.getElementById('resultContainer');
  const resultCard = document.getElementById('resultCard');
  const buttonContainer = document.querySelector('.button-container');
  
  // 로딩 메시지 표시
  const statusDiv = document.createElement('div');
  statusDiv.style.cssText = `
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    background: rgba(0,0,0,0.8);
    color: white;
    padding: 20px 40px;
    border-radius: 10px;
    z-index: 10000;
    font-family: 'Noto Serif KR', serif;
  `;
  statusDiv.textContent = '이미지 저장 중...';
  document.body.appendChild(statusDiv);
  
  try {
    const html2canvas = await import('https://cdn.jsdelivr.net/npm/html2canvas@1.4.1/+esm');
    
    // 저장 모드로 전환
    container.classList.add('saving-mode');
    buttonContainer.style.display = 'none';
    
    // 스타일 적용 대기
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    statusDiv.textContent = '이미지 생성 중...';
    
    // 간단하고 안정적인 방법으로 캔버스 생성
    const canvas = await html2canvas.default(resultCard, {
      scale: 2,
      backgroundColor: '#ffffff',
      useCORS: true,
      allowTaint: true,
      logging: true, // 디버깅을 위해 로깅 활성화
      imageTimeout: 30000,
      removeContainer: false,
      foreignObjectRendering: false,
      onclone: function(clonedDoc) {
        // 클론된 문서에서 스타일 확인
        console.log('Cloned document ready');
      }
    });

    console.log('Canvas created:', canvas.width, 'x', canvas.height);
    
    // 캔버스가 비어있는지 확인
    if (canvas.width === 0 || canvas.height === 0) {
      throw new Error('Canvas is empty');
    }

    statusDiv.textContent = '파일 다운로드 중...';

    // 저장 모드 해제
    container.classList.remove('saving-mode');
    buttonContainer.style.display = '';

    // 이미지 저장 - 모든 기기에서 다운로드
    const filename = `하늘의걸음_${document.getElementById('resultName').textContent}_${Date.now()}.png`;
    
    const link = document.createElement('a');
    link.href = canvas.toDataURL('image/png', 0.95);
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    // 로딩 메시지 제거
    document.body.removeChild(statusDiv);

    // 성공 메시지
    const successDiv = document.createElement('div');
    successDiv.style.cssText = `
      position: fixed;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      background: #27ae60;
      color: white;
      padding: 20px 40px;
      border-radius: 10px;
      z-index: 10000;
      font-family: 'Noto Serif KR', serif;
    `;
    successDiv.textContent = '✅ 이미지가 저장되었습니다!';
    document.body.appendChild(successDiv);

    setTimeout(() => {
      document.body.removeChild(successDiv);
    }, 2500);

  } catch (error) {
    console.error('이미지 저장 오류:', error);
    
    // 저장 모드 해제
    container.classList.remove('saving-mode');
    buttonContainer.style.display = '';
    
    // 로딩 메시지 제거
    if (document.body.contains(statusDiv)) {
      document.body.removeChild(statusDiv);
    }
    
    // 오류 메시지
    const errorDiv = document.createElement('div');
    errorDiv.style.cssText = `
      position: fixed;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      background: #e74c3c;
      color: white;
      padding: 20px 40px;
      border-radius: 10px;
      z-index: 10000;
      font-family: 'Noto Serif KR', serif;
    `;
    errorDiv.textContent = '❌ 이미지 저장에 실패했습니다. 브라우저를 새로고침 후 다시 시도해주세요.';
    document.body.appendChild(errorDiv);
    
    setTimeout(() => {
      document.body.removeChild(errorDiv);
    }, 3000);
  }
};
