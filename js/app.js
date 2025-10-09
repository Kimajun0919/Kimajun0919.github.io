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

// 이미지 압축 함수 (속도 향상을 위해)
function compressImage(file, maxWidth = 800, quality = 0.8) {
  return new Promise((resolve) => {
    const reader = new FileReader();
    reader.onload = function(e) {
      const img = new Image();
      img.onload = function() {
        const canvas = document.createElement('canvas');
        let width = img.width;
        let height = img.height;
        
        // 이미지 크기 조정 (비율 유지)
        if (width > maxWidth) {
          height = (height * maxWidth) / width;
          width = maxWidth;
        }
        
        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext('2d');
        ctx.drawImage(img, 0, 0, width, height);
        
        // 압축된 이미지를 Base64로 변환
        canvas.toBlob((blob) => {
          resolve(blob);
        }, 'image/jpeg', quality);
      };
      img.src = e.target.result;
    };
    reader.readAsDataURL(file);
  });
}

window.previewImage = function(input) {
  if (input.files && input.files[0]) {
    const reader = new FileReader();
    reader.onload = function(e) {
      const preview = document.getElementById('preview');
      preview.src = e.target.result;
      preview.style.display = 'block';
      const fileSize = (input.files[0].size / 1024).toFixed(0);
      document.getElementById('fileLabel').textContent = `✅ ${input.files[0].name} (${fileSize}KB)`;
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

  status.textContent = "🔄 이미지 압축 중...";
  status.style.color = "#3498db";

  try {
    // 이미지 압축 (속도 향상)
    const compressedBlob = await compressImage(file, 800, 0.85);
    
    status.textContent = "📤 업로드 중...";
    
    const reader = new FileReader();
    reader.onloadend = async () => {
      const base64 = reader.result.split(",")[1];
      const res = await fetch(scriptURL, {
        method: "POST",
        body: new URLSearchParams({
          file: base64,
          filename: file.name.replace(/\.[^/.]+$/, ".jpg"),
          mimeType: "image/jpeg"
        })
      });

      const imageURL = await res.text();
      if (imageURL.startsWith("ERROR")) {
        status.textContent = "❌ 업로드 실패: " + imageURL;
        status.style.color = "#e74c3c";
        return;
      }

      status.textContent = "💾 데이터 저장 중...";

      // 고유 ID 생성 (6자리 숫자)
      const employeeId = String(Date.now()).slice(-6);

      const newRef = await push(ref(db, "employees"), {
        name,
        team,
        photoURL: imageURL,
        employeeId: employeeId,
        createdAt: new Date().toISOString()
      });

      status.innerHTML = `✅ 등록 완료!`;
      status.style.color = "#27ae60";
      
      setTimeout(() => {
        showPage('mainPage');
      }, 1500);
    };
    reader.readAsDataURL(compressedBlob);
  } catch (error) {
    status.textContent = "❌ 오류 발생: " + error.message;
    status.style.color = "#e74c3c";
  }
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
              `${randomVerse.content}<br><span style="display:block;margin-top:8px;opacity:0.7;">${randomVerse.reference}</span>`;
            
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
  const name = document.getElementById('resultName').textContent;
  
  // result-card만 복제 (타이틀과 버튼 제외)
  const card = document.getElementById('resultCard');
  const clone = card.cloneNode(true);
  
  // 저장용 컨테이너 생성 (사원증 비율 3:4)
  const wrapper = document.createElement('div');
  wrapper.style.cssText = `position:fixed;left:-99999px;top:0;width:1080px;height:1440px;background:url('assets/back.jpg') center/cover;display:flex;align-items:center;justify-content:center;`;
  
  // 복제된 카드 스타일 조정 (사원증 비율에 맞춤)
  clone.style.cssText = `
    background: #f8f8f8;
    border-radius: 48px;
    padding: 0;
    width: 920px;
    box-shadow: 0 16px 64px rgba(0,0,0,0.12);
    overflow: visible;
  `;
  
  // 사진 크기 조정 (완전 고정 크기)
  const photo = clone.querySelector('.employee-photo');
  if (photo) {
    photo.style.width = '872px';
    photo.style.height = '700px';
    photo.style.margin = '24px';
    photo.style.borderRadius = '32px 32px 0 0';
    photo.style.objectFit = 'cover';
    photo.style.clipPath = 'polygon(0 0,100% 0,100% 85%,90% 88%,80% 90%,70% 91%,60% 90%,50% 88%,40% 90%,30% 91%,20% 90%,10% 88%,0 85%)';
    photo.style.boxShadow = '0 8px 32px rgba(0,0,0,0.1)';
  }
  
  // 이름 스타일 조정 (고정 크기)
  const nameEl = clone.querySelector('.employee-name');
  if (nameEl) {
    nameEl.style.fontSize = '64px';
    nameEl.style.margin = '-105px 0 0 0';
    nameEl.style.padding = '120px 68px 12px 68px';
    nameEl.style.borderRadius = '56px 56px 0 0';
    nameEl.style.background = '#fff';
    nameEl.style.position = 'relative';
    nameEl.style.color = '#1d1d1f';
    nameEl.style.fontWeight = '600';
    nameEl.style.letterSpacing = '-1px';
    nameEl.style.textAlign = 'left';
  }
  
  // 팀명 스타일 조정 (고정 크기)
  const teamEl = clone.querySelector('.employee-team');
  if (teamEl) {
    teamEl.style.fontSize = '32px';
    teamEl.style.padding = '0 68px 20px 68px';
    teamEl.style.background = '#fff';
    teamEl.style.position = 'relative';
    teamEl.style.color = '#86868b';
    teamEl.style.fontWeight = '500';
    teamEl.style.letterSpacing = '0';
    teamEl.style.textAlign = 'left';
    teamEl.style.margin = '0';
  }
  
  // 말씀 스타일 조정 (고정 크기)
  const idEl = clone.querySelector('.employee-id');
  if (idEl) {
    idEl.style.fontSize = '24px';
    idEl.style.padding = '0 68px 48px 68px';
    idEl.style.borderRadius = '0 0 24px 24px';
    idEl.style.background = '#fff';
    idEl.style.position = 'relative';
    idEl.style.color = '#a1a1a6';
    idEl.style.lineHeight = '1.7';
    idEl.style.margin = '0';
    idEl.style.fontWeight = '400';
    idEl.style.letterSpacing = '0.2px';
    idEl.style.textAlign = 'left';
  }
  
  wrapper.appendChild(clone);
  document.body.appendChild(wrapper);

  try {
    const html2canvas = await import('https://cdn.jsdelivr.net/npm/html2canvas@1.4.1/+esm');

    const wait = (ms) => new Promise(r => setTimeout(r, ms));
    const img = clone.querySelector('img');
    if (img && !(img.complete && img.naturalWidth > 0)) {
      await new Promise(resolve => { 
        img.addEventListener('load', resolve, { once:true }); 
        img.addEventListener('error', resolve, { once:true }); 
      });
    }
    if (document.fonts && document.fonts.ready) await document.fonts.ready;
    await wait(300);

    const canvas = await html2canvas.default(wrapper, {
      width: 1080,
      height: 1440,
      scale: 1,
      windowWidth: 1080,
      windowHeight: 1440,
      scrollX: 0,
      scrollY: 0,
      backgroundColor: null,
      useCORS: true,
      allowTaint: true,
      logging: false,
      imageTimeout: 30000,
      removeContainer: false,
      foreignObjectRendering: false
    });

    if (canvas.width === 0 || canvas.height === 0) throw new Error('Canvas is empty');

    const filename = `하늘의걸음_${name}_${Date.now()}.png`;
    const link = document.createElement('a');
    link.href = canvas.toDataURL('image/png', 0.95);
    link.download = filename;
    link.click();
  } catch (error) {
    console.error('이미지 저장 오류:', error);
  } finally {
    wrapper.remove();
  }
};
