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
        document.getElementById('resultId').textContent = 'ID: ' + key.substring(0, 8).toUpperCase();
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
  container.classList.add('saving-mode');

  const html2canvas = await import('https://cdn.jsdelivr.net/npm/html2canvas@1.4.1/+esm');
  
  const canvas = await html2canvas.default(container, {
    width: 1080,
    height: 1920,
    scale: 2,
    backgroundColor: null,
    logging: false
  });

  container.classList.remove('saving-mode');

  canvas.toBlob(function(blob) {
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `사원증_${document.getElementById('resultName').textContent}_${Date.now()}.png`;
    a.click();
    URL.revokeObjectURL(url);
  });
};
