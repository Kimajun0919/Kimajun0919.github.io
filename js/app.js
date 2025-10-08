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

// 간단한 이미지 저장 함수 (대체 방법)
window.saveAsImageSimple = function() {
  const employeeName = document.getElementById('resultName').textContent;
  const employeeTeam = document.getElementById('resultTeam').textContent;
  const employeeVerse = document.getElementById('resultId').innerHTML;
  const photoSrc = document.getElementById('resultPhoto').src;
  
  // 새 창 열기
  const newWindow = window.open('', '_blank', 'width=720,height=1100');
  
  newWindow.document.write(`
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="UTF-8">
      <title>하늘의 걸음 - ${employeeName}</title>
      <style>
        body {
          margin: 0;
          padding: 50px;
          background: #f8f9fa;
          font-family: 'Noto Serif KR', serif;
          display: flex;
          justify-content: center;
          align-items: center;
          min-height: 100vh;
        }
        .card {
          width: 600px;
          height: 900px;
          background: white;
          border-radius: 40px;
          padding: 60px;
          box-shadow: 0 30px 80px rgba(0,0,0,0.15);
          border: 3px solid #0c443b;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          align-items: center;
          text-align: center;
        }
        .photo {
          width: 250px;
          height: 250px;
          border-radius: 50%;
          object-fit: cover;
          border: 5px solid #fff;
          box-shadow: 0 10px 30px rgba(0,0,0,0.2);
        }
        .name {
          font-size: 42px;
          color: #0c443b;
          font-weight: 400;
          letter-spacing: 4px;
          margin: 20px 0;
        }
        .team {
          font-size: 28px;
          color: #666;
          font-weight: 300;
          letter-spacing: 2px;
          margin: 20px 0;
        }
        .verse {
          font-size: 14px;
          color: #666;
          line-height: 1.4;
          margin-top: 20px;
          text-align: center;
        }
        .verse-reference {
          font-size: 11px;
          color: #999;
          margin-top: 8px;
          display: block;
        }
        .title {
          font-size: 24px;
          color: #0c443b;
          margin-bottom: 20px;
          font-weight: 300;
        }
      </style>
    </head>
    <body>
      <div class="card">
        <div class="title">The Steps of Haneul</div>
        <img src="${photoSrc}" alt="프로필" class="photo">
        <div class="name">${employeeName}</div>
        <div class="team">${employeeTeam}</div>
        <div class="verse">${employeeVerse}</div>
      </div>
    </body>
    </html>
  `);
  
  newWindow.document.close();
  
  // 인쇄 대화상자 열기 (사용자가 이미지로 저장할 수 있음)
  setTimeout(() => {
    newWindow.print();
  }, 1000);
};

window.saveAsImage = async function() {
  // 먼저 간단한 방법 시도
  try {
    window.saveAsImageSimple();
    alert('새 창이 열렸습니다. 브라우저의 인쇄 기능을 사용하여 이미지로 저장하세요.');
    return;
  } catch (error) {
    console.log('간단한 방법 실패, html2canvas 시도...');
  }
  
  // html2canvas 방법 시도
  const container = document.getElementById('resultContainer');
  const resultCard = document.getElementById('resultCard');
  
  alert('이미지 저장을 시작합니다...');
  
  try {
    const html2canvas = await import('https://cdn.jsdelivr.net/npm/html2canvas@1.4.1/+esm');
    
    // 저장 모드로 전환
    container.classList.add('saving-mode');
    await new Promise(resolve => setTimeout(resolve, 500));
    
    const canvas = await html2canvas.default(resultCard, {
      scale: 2,
      backgroundColor: '#ffffff',
      useCORS: true,
      allowTaint: true
    });

    container.classList.remove('saving-mode');

    // 다운로드
    const link = document.createElement('a');
    link.download = `하늘의걸음_${document.getElementById('resultName').textContent}_${Date.now()}.png`;
    link.href = canvas.toDataURL();
    link.click();
    
    alert('이미지가 저장되었습니다!');

  } catch (error) {
    console.error('이미지 저장 오류:', error);
    alert('이미지 저장에 실패했습니다. 브라우저를 새로고침 후 다시 시도해주세요.');
  }
};
