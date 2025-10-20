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
  
  if (pageId === 'testPage') {
    // 테스트 페이지 초기화
    document.getElementById('testStatus').textContent = '';
    document.getElementById('progressContainer').style.display = 'none';
    document.getElementById('successCount').textContent = '0';
    document.getElementById('failureCount').textContent = '0';
    document.getElementById('elapsedTime').textContent = '0초';
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

// 동시 업로드 테스트 기능
let testData = [];
let testResults = {
  success: 0,
  failure: 0,
  startTime: null
};

// back.jpg를 Base64로 변환하는 함수
async function getBackImageAsBase64() {
  try {
    const response = await fetch('assets/back.jpg');
    const blob = await response.blob();
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64 = reader.result.split(',')[1];
        resolve(base64);
      };
      reader.onerror = reject;
      reader.readAsDataURL(blob);
    });
  } catch (error) {
    console.error('이미지 로드 오류:', error);
    return null;
  }
}

// 샘플 데이터 생성 함수
function generateSampleData(count) {
  const teams = ['개발팀', '디자인팀', '마케팅팀', '영업팀', '기획팀', '인사팀', '재무팀', '운영팀'];
  const names = ['김하늘', '이별', '박소영', '최민수', '정수진', '강태현', '윤서연', '임동현', '한지민', '송재호'];
  
  const sampleData = [];
  for (let i = 0; i < count; i++) {
    const randomName = names[Math.floor(Math.random() * names.length)];
    const randomTeam = teams[Math.floor(Math.random() * teams.length)];
    const randomNumber = Math.floor(Math.random() * 1000);
    
    sampleData.push({
      name: `${randomName}_${randomNumber}`,
      team: randomTeam,
      isTestData: true
    });
  }
  return sampleData;
}

// 단일 업로드 함수
async function uploadSingleEmployee(employeeData, index) {
  try {
    // back.jpg를 Base64로 변환
    const base64Image = await getBackImageAsBase64();
    if (!base64Image) {
      throw new Error('이미지 로드 실패');
    }

    // Google Drive에 업로드
    const res = await fetch(scriptURL, {
      method: "POST",
      body: new URLSearchParams({
        file: base64Image,
        filename: `test_${employeeData.name}_${Date.now()}.jpg`,
        mimeType: "image/jpeg"
      })
    });

    const imageURL = await res.text();
    if (imageURL.startsWith("ERROR")) {
      throw new Error(`업로드 실패: ${imageURL}`);
    }

    // Firebase에 데이터 저장
    const employeeId = String(Date.now() + index).slice(-6);
    const newRef = await push(ref(db, "employees"), {
      name: employeeData.name,
      team: employeeData.team,
      photoURL: imageURL,
      employeeId: employeeId,
      createdAt: new Date().toISOString(),
      isTestData: true
    });

    return {
      success: true,
      key: newRef.key,
      employeeId: employeeId
    };
  } catch (error) {
    return {
      success: false,
      error: error.message
    };
  }
}

// 진행 상황 업데이트
function updateProgress(current, total, status) {
  const progressFill = document.getElementById('progressFill');
  const progressText = document.getElementById('progressText');
  const progressStatus = document.getElementById('progressStatus');
  
  const percentage = (current / total) * 100;
  progressFill.style.width = `${percentage}%`;
  progressText.textContent = `${current} / ${total}`;
  progressStatus.textContent = status;
}

// 결과 업데이트
function updateResults() {
  document.getElementById('successCount').textContent = testResults.success;
  document.getElementById('failureCount').textContent = testResults.failure;
  
  if (testResults.startTime) {
    const elapsed = Math.round((Date.now() - testResults.startTime) / 1000);
    document.getElementById('elapsedTime').textContent = `${elapsed}초`;
  }
}

// 대량 업로드 시작
window.startBulkUpload = async function() {
  const testStatus = document.getElementById('testStatus');
  const progressContainer = document.getElementById('progressContainer');
  
  // 초기화
  testResults = {
    success: 0,
    failure: 0,
    startTime: Date.now()
  };
  
  testStatus.textContent = "🔄 테스트 데이터 생성 중...";
  testStatus.style.color = "#3498db";
  
  // 샘플 데이터 생성
  testData = generateSampleData(150);
  
  // UI 초기화
  progressContainer.style.display = 'block';
  updateProgress(0, 150, '업로드 준비 중...');
  updateResults();
  
  testStatus.textContent = "📤 150개 파일을 동시에 업로드 중...";
  
  // 동시 업로드 (배치 처리)
  const batchSize = 10; // 동시에 처리할 수 있는 개수
  const batches = [];
  
  for (let i = 0; i < testData.length; i += batchSize) {
    batches.push(testData.slice(i, i + batchSize));
  }
  
  let completedCount = 0;
  
  for (let batchIndex = 0; batchIndex < batches.length; batchIndex++) {
    const batch = batches[batchIndex];
    
    // 배치 내에서 동시 처리
    const promises = batch.map((employee, index) => 
      uploadSingleEmployee(employee, completedCount + index)
    );
    
    const results = await Promise.all(promises);
    
    // 결과 처리
    results.forEach((result) => {
      if (result.success) {
        testResults.success++;
      } else {
        testResults.failure++;
        console.error('업로드 실패:', result.error);
      }
    });
    
    completedCount += batch.length;
    updateProgress(completedCount, 150, `배치 ${batchIndex + 1}/${batches.length} 완료`);
    updateResults();
    
    // 배치 간 짧은 대기 (서버 부하 방지)
    if (batchIndex < batches.length - 1) {
      await new Promise(resolve => setTimeout(resolve, 500));
    }
  }
  
  // 완료
  updateProgress(150, 150, '완료');
  
  if (testResults.failure === 0) {
    testStatus.innerHTML = `✅ 모든 업로드가 성공했습니다! (${testResults.success}개)`;
    testStatus.style.color = "#27ae60";
  } else {
    testStatus.innerHTML = `⚠️ 업로드 완료: 성공 ${testResults.success}개, 실패 ${testResults.failure}개`;
    testStatus.style.color = "#f39c12";
  }
};

// 테스트 데이터 삭제
window.deleteTestData = async function() {
  const testStatus = document.getElementById('testStatus');
  
  testStatus.textContent = "🗑️ 테스트 데이터 삭제 중...";
  testStatus.style.color = "#3498db";
  
  try {
    const snapshot = await get(child(ref(db), "employees"));
    if (snapshot.exists()) {
      const employees = snapshot.val();
      const testDataKeys = [];
      
      // 테스트 데이터 키 수집
      for (const key in employees) {
        if (employees[key].isTestData) {
          testDataKeys.push(key);
        }
      }
      
      if (testDataKeys.length === 0) {
        testStatus.textContent = "📭 삭제할 테스트 데이터가 없습니다.";
        testStatus.style.color = "#999";
        return;
      }
      
      // 배치 삭제
      const batchSize = 20;
      let deletedCount = 0;
      
      for (let i = 0; i < testDataKeys.length; i += batchSize) {
        const batch = testDataKeys.slice(i, i + batchSize);
        
        const deletePromises = batch.map(key => 
          remove(ref(db, `employees/${key}`))
        );
        
        await Promise.all(deletePromises);
        deletedCount += batch.length;
        
        testStatus.textContent = `🗑️ 삭제 중... ${deletedCount}/${testDataKeys.length}`;
        
        // 배치 간 대기
        if (i + batchSize < testDataKeys.length) {
          await new Promise(resolve => setTimeout(resolve, 200));
        }
      }
      
      testStatus.innerHTML = `✅ 테스트 데이터 삭제 완료! (${deletedCount}개 삭제)`;
      testStatus.style.color = "#27ae60";
    } else {
      testStatus.textContent = "📭 삭제할 데이터가 없습니다.";
      testStatus.style.color = "#999";
    }
  } catch (error) {
    testStatus.textContent = `❌ 삭제 실패: ${error.message}`;
    testStatus.style.color = "#e74c3c";
  }
};