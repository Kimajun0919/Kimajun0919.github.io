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


// 오프스크린 고정 레이아웃 생성 (저장용)
function buildExportContainer(name, team, photoSrc, verseHTML) {
  const root = document.createElement('div');
  root.style.cssText = 'position:fixed;left:-99999px;top:0;width:1080px;height:1920px;background:url(\\'assets/back.jpg\\') center/cover no-repeat;display:flex;flex-direction:column;align-items:center;justify-content:flex-start;padding:220px 90px 180px;box-sizing:border-box;';
  const title = document.createElement('div');
  title.textContent = 'The Steps of Haneul';
  title.style.cssText = "font-family:'flirt-script-regular',sans-serif;font-size:64px;color:rgba(12,68,59,1);text-shadow:0 2px 20px rgba(255,255,255,0.9),0 0 40px rgba(255,255,255,0.6);margin-bottom:65px;letter-spacing:3px;";
  const card = document.createElement('div');
  card.style.cssText = 'width:780px;min-height:1200px;padding:90px 70px;border-radius:50px;background:rgba(255,255,255,0.96);backdrop-filter:blur(30px);box-shadow:0 30px 90px rgba(0,0,0,0.25),0 10px 30px rgba(12,68,59,0.1);border:4px solid rgba(12,68,59,0.12);display:flex;flex-direction:column;align-items:center;justify-content:flex-start;box-sizing:border-box;';
  const img = document.createElement('img');
  img.src = photoSrc;
  img.alt = '사원 사진';
  img.style.cssText = 'width:380px;height:380px;border-radius:50%;object-fit:cover;margin-top:10px;margin-bottom:55px;border:7px solid #fff;box-shadow:0 18px 60px rgba(0,0,0,0.22),0 0 0 1px rgba(12,68,59,0.08);';
  const nameEl = document.createElement('div');
  nameEl.textContent = name;
  nameEl.style.cssText = "font-size:68px;color:#0c443b;font-weight:500;letter-spacing:4px;margin-bottom:28px;font-family:'Noto Serif KR',serif;text-align:center;";
  const teamEl = document.createElement('div');
  teamEl.textContent = team;
  teamEl.style.cssText = "font-size:40px;color:#777;font-weight:300;letter-spacing:4px;margin-bottom:65px;font-family:'Noto Serif KR',serif;text-align:center;";
  const verseEl = document.createElement('div');
  verseEl.innerHTML = verseHTML;
  verseEl.style.cssText = 'font-size:22px;line-height:2;color:#666;max-width:620px;width:100%;text-align:center;padding-top:60px;border-top:2px solid rgba(12,68,59,0.12);';

  card.appendChild(img);
  card.appendChild(nameEl);
  card.appendChild(teamEl);
  card.appendChild(verseEl);
  root.appendChild(title);
  root.appendChild(card);
  return root;
}

window.saveAsImage = async function() {
  const name = document.getElementById('resultName').textContent;
  const team = document.getElementById('resultTeam').textContent;
  const photoSrc = document.getElementById('resultPhoto').src;
  const verseHTML = document.getElementById('resultId').innerHTML;

  const exportEl = buildExportContainer(name, team, photoSrc, verseHTML);
  document.body.appendChild(exportEl);

  try {
    const html2canvas = await import('https://cdn.jsdelivr.net/npm/html2canvas@1.4.1/+esm');

    const wait = (ms) => new Promise(r => setTimeout(r, ms));
    const img = exportEl.querySelector('img');
    if (img && !(img.complete && img.naturalWidth > 0)) {
      await new Promise(resolve => { img.addEventListener('load', resolve, { once:true }); img.addEventListener('error', resolve, { once:true }); });
    }
    if (document.fonts && document.fonts.ready) await document.fonts.ready;
    await wait(200);

    const canvas = await html2canvas.default(exportEl, {
      width: 1080,
      height: 1920,
      scale: 1,
      windowWidth: 1080,
      windowHeight: 1920,
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
    exportEl.remove();
  }
};
