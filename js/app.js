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
  const buttonContainer = document.querySelector('.button-container');
  
  try {
    const html2canvas = await import('https://cdn.jsdelivr.net/npm/html2canvas@1.4.1/+esm');
    
    // 저장 모드로 전환
    container.classList.add('saving-mode');
    buttonContainer.style.display = 'none';
    
    // 스타일 적용 대기 (배경 이미지 로딩 포함)
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    // 전체 컨테이너를 캔버스로 생성 (배경 이미지 포함)
    const canvas = await html2canvas.default(container, {
      width: 1080,
      height: 1920,
      scale: 1,
      backgroundColor: null,
      useCORS: true,
      allowTaint: true,
      logging: true,
      imageTimeout: 30000,
      removeContainer: false,
      foreignObjectRendering: false,
      onclone: function(clonedDoc) {
        // 복제된 문서에서 스타일 강제 적용
        const clonedContainer = clonedDoc.getElementById('resultContainer');
        const clonedCard = clonedDoc.getElementById('resultCard');
        const clonedTitle = clonedDoc.querySelector('.card-title');
        const clonedPhoto = clonedDoc.getElementById('resultPhoto');
        const clonedName = clonedDoc.getElementById('resultName');
        const clonedTeam = clonedDoc.getElementById('resultTeam');
        const clonedVerse = clonedDoc.getElementById('resultId');
        
        if (clonedContainer) {
          clonedContainer.style.cssText = `
            width: 1080px !important;
            height: 1920px !important;
            padding: 220px 90px 180px !important;
            display: flex !important;
            flex-direction: column !important;
            align-items: center !important;
            justify-content: flex-start !important;
            background-image: url('./assets/back.jpg') !important;
            background-position: center center !important;
            background-size: cover !important;
            background-repeat: no-repeat !important;
          `;
        }
        
        if (clonedCard) {
          clonedCard.style.cssText = `
            width: 780px !important;
            height: auto !important;
            padding: 90px 70px !important;
            display: flex !important;
            flex-direction: column !important;
            justify-content: flex-start !important;
            align-items: center !important;
            background: rgba(255, 255, 255, 0.96) !important;
            backdrop-filter: blur(30px) !important;
            border-radius: 50px !important;
            box-shadow: 0 30px 90px rgba(0,0,0,0.25), 0 10px 30px rgba(12, 68, 59, 0.1) !important;
            margin: 0 !important;
            border: 4px solid rgba(12, 68, 59, 0.12) !important;
            text-align: center !important;
          `;
        }
        
        if (clonedTitle) {
          clonedTitle.style.cssText = `
            display: block !important;
            font-family: "flirt-script-regular", sans-serif !important;
            font-size: 64px !important;
            color: rgba(12, 68, 59, 1) !important;
            text-align: center !important;
            margin-bottom: 65px !important;
            text-shadow: 0 2px 20px rgba(255,255,255,0.9), 0 0 40px rgba(255,255,255,0.6) !important;
            letter-spacing: 3px !important;
          `;
        }
        
        if (clonedPhoto) {
          clonedPhoto.style.cssText = `
            width: 380px !important;
            height: 380px !important;
            margin-top: 10px !important;
            margin-bottom: 55px !important;
            border-radius: 50% !important;
            object-fit: cover !important;
            border: 7px solid #fff !important;
            box-shadow: 0 18px 60px rgba(0,0,0,0.22), 0 0 0 1px rgba(12, 68, 59, 0.08) !important;
          `;
        }
        
        if (clonedName) {
          clonedName.style.cssText = `
            font-size: 68px !important;
            margin-bottom: 28px !important;
            letter-spacing: 4px !important;
            color: #0c443b !important;
            font-weight: 500 !important;
            text-shadow: 0 1px 3px rgba(0,0,0,0.08) !important;
          `;
        }
        
        if (clonedTeam) {
          clonedTeam.style.cssText = `
            font-size: 40px !important;
            margin-bottom: 65px !important;
            letter-spacing: 4px !important;
            color: #777 !important;
            font-weight: 300 !important;
          `;
        }
        
        if (clonedVerse) {
          clonedVerse.style.cssText = `
            font-size: 22px !important;
            margin-top: 0px !important;
            padding-top: 60px !important;
            border-top: 2px solid rgba(12, 68, 59, 0.12) !important;
            line-height: 2 !important;
            color: #666 !important;
            max-width: 620px !important;
            text-align: center !important;
            width: 100% !important;
          `;
          
          // 성경 구절 참조 스타일
          const verseRef = clonedVerse.querySelector('span');
          if (verseRef) {
            verseRef.style.cssText = `
              font-size: 18px !important;
              margin-top: 22px !important;
              color: #999 !important;
              letter-spacing: 1px !important;
              display: block !important;
            `;
          }
        }
      }
    });

    // 캔버스가 비어있는지 확인
    if (canvas.width === 0 || canvas.height === 0) {
      throw new Error('Canvas is empty');
    }

    // 저장 모드 해제
    container.classList.remove('saving-mode');
    buttonContainer.style.display = '';

    // 이미지 저장 - 모든 기기에서 다운로드
    const filename = `하늘의걸음_${document.getElementById('resultName').textContent}_${Date.now()}.png`;
    
    const link = document.createElement('a');
    link.href = canvas.toDataURL('image/png', 0.95);
    link.download = filename;
    link.click();

  } catch (error) {
    console.error('이미지 저장 오류:', error);
    
    // 저장 모드 해제
    container.classList.remove('saving-mode');
    buttonContainer.style.display = '';
  }
};
