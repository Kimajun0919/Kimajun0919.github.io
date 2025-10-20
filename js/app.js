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
  
  if (pageId === 'avatarPage') {
    document.getElementById('avatarStatus').textContent = '';
    document.getElementById('avatarName').value = '';
    document.getElementById('avatarTeam').value = '';
    resetCharacterPreview();
    
    // 기본 선택 상태 설정
    characterData = {
      face: 'round',
      eyes: 'normal',
      nose: 'normal',
      mouth: 'smile',
      hair: 'short',
      shirt: 't-shirt'
    };
    
    // 기본 선택 버튼 활성화
    document.querySelectorAll('.option-btn').forEach(btn => {
      btn.classList.remove('selected');
    });
    document.querySelector('[data-type="face"][data-value="round"]').classList.add('selected');
    document.querySelector('[data-type="eyes"][data-value="normal"]').classList.add('selected');
    document.querySelector('[data-type="nose"][data-value="normal"]').classList.add('selected');
    document.querySelector('[data-type="mouth"][data-value="smile"]').classList.add('selected');
    document.querySelector('[data-type="hair"][data-value="short"]').classList.add('selected');
    document.querySelector('[data-type="shirt"][data-value="t-shirt"]').classList.add('selected');
    
    // 기본 캐릭터 렌더링
    renderCharacter();
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
      
      // 결과 페이지로 이동
      setTimeout(() => {
        showEmployeeResult({
          name: name,
          team: team,
          photoURL: imageURL,
          employeeId: employeeId
        });
      }, 1500);
    };
    reader.readAsDataURL(compressedBlob);
  } catch (error) {
    status.textContent = "❌ 오류 발생: " + error.message;
    status.style.color = "#e74c3c";
  }
};

// 캐릭터를 표시하는 함수
function displayCharacter(photoElement, characterData) {
  if (!characterData) return;
  
  photoElement.style.display = 'none';
  
  // 캐릭터 컨테이너 생성
  const characterContainer = document.createElement('div');
  characterContainer.className = 'employee-character';
  characterContainer.style.cssText = `
    width: 100%;
    height: 320px;
    background: #f8f9fa;
    border-radius: 16px 16px 0 0;
    margin: 16px 16px 0 16px;
    box-shadow: 0 4px 16px rgba(0,0,0,0.1);
    clip-path: polygon(
      0 0,
      100% 0,
      100% 85%,
      90% 88%,
      80% 90%,
      70% 91%,
      60% 90%,
      50% 88%,
      40% 90%,
      30% 91%,
      20% 90%,
      10% 88%,
      0 85%
    );
    position: relative;
    overflow: hidden;
    display: flex;
    align-items: center;
    justify-content: center;
  `;
  
  // 캐릭터 렌더링
  renderCharacterInContainer(characterContainer, characterData);
  
  // 기존 이미지 다음에 캐릭터 삽입
  photoElement.parentNode.insertBefore(characterContainer, photoElement.nextSibling);
}

// 컨테이너 내에서 캐릭터 렌더링
function renderCharacterInContainer(container, charData) {
  container.innerHTML = '<div class="character-rendered"></div>';
  const charContainer = container.querySelector('.character-rendered');
  
  // 얼굴 렌더링
  const face = document.createElement('div');
  face.className = 'character-face';
  face.style.cssText = getFaceStyle(charData.face);
  charContainer.appendChild(face);
  
  // 머리 렌더링
  const hair = document.createElement('div');
  hair.className = 'character-hair';
  hair.style.cssText = getHairStyle(charData.hair);
  charContainer.appendChild(hair);
  
  // 눈 렌더링
  const eyes = document.createElement('div');
  eyes.className = 'character-eyes';
  eyes.style.cssText = getEyesStyle(charData.eyes);
  charContainer.appendChild(eyes);
  
  // 코 렌더링
  const nose = document.createElement('div');
  nose.className = 'character-nose';
  nose.style.cssText = getNoseStyle(charData.nose);
  charContainer.appendChild(nose);
  
  // 입 렌더링
  const mouth = document.createElement('div');
  mouth.className = 'character-mouth';
  mouth.style.cssText = getMouthStyle(charData.mouth);
  charContainer.appendChild(mouth);
  
  // 윗옷 렌더링
  const shirt = document.createElement('div');
  shirt.className = 'character-shirt';
  shirt.style.cssText = getShirtStyle(charData.shirt);
  charContainer.appendChild(shirt);
}

// 직원 결과 표시 함수
function showEmployeeResult(employee) {
  document.getElementById('resultName').textContent = employee.name;
  document.getElementById('resultTeam').textContent = employee.team;
            
            // 랜덤한 성경 말씀 선택
            const randomVerse = verses[Math.floor(Math.random() * verses.length)];
            document.getElementById('resultId').innerHTML = 
              `${randomVerse.content}<br><span style="display:block;margin-top:8px;opacity:0.7;">${randomVerse.reference}</span>`;
            
  // 캐릭터 또는 이미지 표시
  const photoElement = document.getElementById('resultPhoto');
  
  if (employee.photoURL && employee.photoURL.startsWith('character:')) {
    // 캐릭터 정보 파싱
    try {
      const characterJson = employee.photoURL.replace('character:', '');
      const characterData = JSON.parse(characterJson);
      displayCharacter(photoElement, characterData);
    } catch (error) {
      console.error('캐릭터 데이터 파싱 오류:', error);
      photoElement.src = employee.photoURL;
      photoElement.style.display = 'block';
    }
  } else if (employee.characterData) {
    displayCharacter(photoElement, employee.characterData);
  } else if (employee.photoURL && employee.photoURL.startsWith('avatar:')) {
    // 기존 아바타 정보 파싱 (하위 호환성)
    const avatarParts = employee.photoURL.split(':');
    const avatarData = {
      text: avatarParts[1],
      style: avatarParts[2]
    };
    displayAvatar(photoElement, avatarData);
  } else {
    photoElement.src = employee.photoURL;
    photoElement.style.display = 'block';
  }
            
            showPage('resultPage');
}


// 캐릭터 데이터 구조 (아이폰 메모지 스타일)
let characterData = {
  face: 'round',
  eyes: 'normal',
  eyebrows: 'normal',
  nose: 'normal',
  mouth: 'smile',
  hair: 'short',
  skinColor: 1,
  hairColor: 1,
  glasses: 'none',
  beard: 'none'
};

// 캐릭터 관련 함수들
function resetCharacterPreview() {
  const preview = document.getElementById('characterPreview');
  preview.innerHTML = '<div class="character-placeholder">캐릭터 미리보기</div>';
}

function selectOption(type, value) {
  characterData[type] = value;
  
  // 선택된 버튼 표시
  document.querySelectorAll(`[data-type="${type}"]`).forEach(btn => {
    btn.classList.remove('selected');
  });
  document.querySelector(`[data-type="${type}"][data-value="${value}"]`).classList.add('selected');
  
  // 캐릭터 렌더링
  renderCharacter();
}

function selectColor(type, colorIndex) {
  characterData[type + 'Color'] = colorIndex;
  
  // 선택된 색상 버튼 표시
  document.querySelectorAll(`[data-color="${colorIndex}"]`).forEach(btn => {
    btn.classList.remove('selected');
  });
  document.querySelector(`[data-color="${colorIndex}"]`).classList.add('selected');
  
  // 캐릭터 렌더링
  renderCharacter();
}

// 탭 전환 함수
function showTab(tabName) {
  // 모든 탭 버튼 비활성화
  document.querySelectorAll('.tab-btn').forEach(btn => {
    btn.classList.remove('active');
  });
  
  // 모든 탭 콘텐츠 숨기기
  document.querySelectorAll('.tab-content').forEach(content => {
    content.classList.remove('active');
  });
  
  // 선택된 탭 활성화
  document.querySelector(`[onclick="showTab('${tabName}')"]`).classList.add('active');
  document.getElementById(`${tabName}-tab`).classList.add('active');
}

function renderCharacter() {
  const preview = document.getElementById('characterPreview');
  preview.innerHTML = '<div class="character-rendered"></div>';
  
  const container = preview.querySelector('.character-rendered');
  
  // 얼굴 렌더링 (피부색 적용)
  const face = document.createElement('div');
  face.className = 'character-face';
  face.style.cssText = getFaceStyle(characterData.face, characterData.skinColor);
  container.appendChild(face);
  
  // 머리 렌더링 (머리색 적용)
  const hair = document.createElement('div');
  hair.className = 'character-hair';
  hair.style.cssText = getHairStyle(characterData.hair, characterData.hairColor);
  container.appendChild(hair);
  
  // 눈썹 렌더링
  const eyebrows = document.createElement('div');
  eyebrows.className = 'character-eyebrows';
  eyebrows.style.cssText = getEyebrowsStyle(characterData.eyebrows);
  container.appendChild(eyebrows);
  
  // 눈 렌더링
  const eyes = document.createElement('div');
  eyes.className = 'character-eyes';
  eyes.style.cssText = getEyesStyle(characterData.eyes);
  container.appendChild(eyes);
  
  // 코 렌더링
  const nose = document.createElement('div');
  nose.className = 'character-nose';
  nose.style.cssText = getNoseStyle(characterData.nose);
  container.appendChild(nose);
  
  // 입 렌더링
  const mouth = document.createElement('div');
  mouth.className = 'character-mouth';
  mouth.style.cssText = getMouthStyle(characterData.mouth);
  container.appendChild(mouth);
  
  // 안경 렌더링
  if (characterData.glasses !== 'none') {
    const glasses = document.createElement('div');
    glasses.className = 'character-glasses';
    glasses.style.cssText = getGlassesStyle(characterData.glasses);
    container.appendChild(glasses);
  }
  
  // 수염 렌더링
  if (characterData.beard !== 'none') {
    const beard = document.createElement('div');
    beard.className = 'character-beard';
    beard.style.cssText = getBeardStyle(characterData.beard);
    container.appendChild(beard);
  }
}

// 각 부위별 스타일 함수들
function getFaceStyle(faceType, skinColor = 1) {
  const skinColors = {
    1: '#fdbcb4',
    2: '#f4c2a1', 
    3: '#e8a87c',
    4: '#d2691e'
  };
  
  const skinColorValue = skinColors[skinColor] || skinColors[1];
  
  const styles = {
    'round': `
      width: 120px;
      height: 120px;
      background: ${skinColorValue};
      border-radius: 50%;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      border: 3px solid ${skinColorValue};
    `,
    'oval': `
      width: 100px;
      height: 140px;
      background: ${skinColorValue};
      border-radius: 50%;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      border: 3px solid ${skinColorValue};
    `,
    'square': `
      width: 120px;
      height: 120px;
      background: ${skinColorValue};
      border-radius: 20%;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      border: 3px solid ${skinColorValue};
    `
  };
  return styles[faceType] || styles['round'];
}

function getEyesStyle(eyeType) {
  const styles = {
    'normal': `
      width: 20px;
      height: 20px;
      background: #333;
      border-radius: 50%;
      top: 40%;
      left: 30%;
      box-shadow: 35px 0 0 #333;
    `,
    'big': `
      width: 25px;
      height: 25px;
      background: #333;
      border-radius: 50%;
      top: 40%;
      left: 30%;
      box-shadow: 35px 0 0 #333;
    `,
    'small': `
      width: 15px;
      height: 15px;
      background: #333;
      border-radius: 50%;
      top: 40%;
      left: 35%;
      box-shadow: 25px 0 0 #333;
    `,
    'closed': `
      width: 30px;
      height: 8px;
      background: #333;
      border-radius: 10px;
      top: 40%;
      left: 25%;
      box-shadow: 35px 0 0 #333;
    `
  };
  return styles[eyeType] || styles['normal'];
}

function getNoseStyle(noseType) {
  const styles = {
    'normal': `
      width: 8px;
      height: 12px;
      background: #f4a6a6;
      border-radius: 50%;
      top: 55%;
      left: 50%;
      transform: translate(-50%, -50%);
    `,
    'small': `
      width: 6px;
      height: 8px;
      background: #f4a6a6;
      border-radius: 50%;
      top: 55%;
      left: 50%;
      transform: translate(-50%, -50%);
    `,
    'big': `
      width: 12px;
      height: 16px;
      background: #f4a6a6;
      border-radius: 50%;
      top: 55%;
      left: 50%;
      transform: translate(-50%, -50%);
    `
  };
  return styles[noseType] || styles['normal'];
}

function getMouthStyle(mouthType) {
  const styles = {
    'smile': `
      width: 30px;
      height: 15px;
      border: 3px solid #333;
      border-top: none;
      border-radius: 0 0 30px 30px;
      top: 70%;
      left: 50%;
      transform: translate(-50%, -50%);
      background: transparent;
    `,
    'normal': `
      width: 20px;
      height: 3px;
      background: #333;
      border-radius: 2px;
      top: 70%;
      left: 50%;
      transform: translate(-50%, -50%);
    `,
    'surprised': `
      width: 15px;
      height: 15px;
      background: #333;
      border-radius: 50%;
      top: 70%;
      left: 50%;
      transform: translate(-50%, -50%);
    `
  };
  return styles[mouthType] || styles['smile'];
}

function getHairStyle(hairType) {
  const styles = {
    'short': `
      width: 140px;
      height: 80px;
      background: #8b4513;
      border-radius: 50% 50% 50% 50% / 60% 60% 40% 40%;
      top: 35%;
      left: 50%;
      transform: translate(-50%, -50%);
    `,
    'long': `
      width: 120px;
      height: 100px;
      background: #654321;
      border-radius: 50% 50% 50% 50% / 60% 60% 40% 40%;
      top: 35%;
      left: 50%;
      transform: translate(-50%, -50%);
      box-shadow: 0 50px 0 #654321, 0 100px 0 #654321;
    `,
    'curly': `
      width: 130px;
      height: 90px;
      background: #a0522d;
      border-radius: 50%;
      top: 35%;
      left: 50%;
      transform: translate(-50%, -50%);
      box-shadow: 
        -20px 20px 0 #a0522d,
        20px 20px 0 #a0522d,
        -30px 40px 0 #a0522d,
        30px 40px 0 #a0522d;
    `,
    'bald': `
      width: 120px;
      height: 120px;
      background: transparent;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
    `
  };
  return styles[hairType] || styles['short'];
}

function getShirtStyle(shirtType) {
  const styles = {
    't-shirt': `
      width: 100px;
      height: 80px;
      background: #ff6b6b;
      border-radius: 10px;
      top: 85%;
      left: 50%;
      transform: translate(-50%, -50%);
    `,
    'shirt': `
      width: 90px;
      height: 85px;
      background: #4ecdc4;
      border-radius: 5px;
      top: 85%;
      left: 50%;
      transform: translate(-50%, -50%);
    `,
    'hoodie': `
      width: 110px;
      height: 90px;
      background: #95a5a6;
      border-radius: 15px;
      top: 85%;
      left: 50%;
      transform: translate(-50%, -50%);
    `,
    'dress': `
      width: 80px;
      height: 100px;
      background: #f39c12;
      border-radius: 10px 10px 20px 20px;
      top: 85%;
      left: 50%;
      transform: translate(-50%, -50%);
    `
  };
  return styles[shirtType] || styles['t-shirt'];
}

function generateAvatarFromName(name) {
  if (!name) return null;
  
  // 이름에서 첫 글자 추출
  const firstChar = name.charAt(0).toUpperCase();
  
  // 이름의 해시값을 기반으로 색상과 스타일 결정
  let hash = 0;
  for (let i = 0; i < name.length; i++) {
    hash = name.charCodeAt(i) + ((hash << 5) - hash);
  }
  
  const colorIndex = Math.abs(hash) % 8 + 1;
  const avatarStyle = `avatar-${colorIndex}`;
  
  return {
    text: firstChar,
    style: avatarStyle
  };
}

function updateAvatarPreview(name) {
  const preview = document.getElementById('avatarPreview');
  
  if (!name) {
    resetAvatarPreview();
    return;
  }
  
  const avatar = generateAvatarFromName(name);
  if (avatar) {
    preview.className = `avatar-preview ${avatar.style}`;
    preview.innerHTML = `<div class="avatar-generated">${avatar.text}</div>`;
  }
}

// 아바타 생성 함수
window.generateAvatar = async function() {
  const name = document.getElementById("avatarName").value.trim();
  const team = document.getElementById("avatarTeam").value.trim();
  const avatarStatus = document.getElementById("avatarStatus");

  if (!name || !team) {
    avatarStatus.textContent = "❌ 이름과 팀을 모두 입력하세요.";
    avatarStatus.style.color = "#e74c3c";
    return;
  }

  avatarStatus.textContent = "🎨 캐릭터 생성 중...";
  avatarStatus.style.color = "#3498db";

  try {
    const employeeId = String(Date.now()).slice(-6);

    // Firebase에 캐릭터 데이터를 텍스트로 저장
    const newRef = await push(ref(db, "employees"), {
      name: name,
      team: team,
      photoURL: `character:${JSON.stringify(characterData)}`, // 캐릭터 데이터를 JSON 문자열로 저장
      employeeId: employeeId,
      createdAt: new Date().toISOString(),
      characterData: characterData // 캐릭터 데이터도 별도로 저장
    });

    avatarStatus.innerHTML = `✅ 캐릭터 생성 완료!`;
    avatarStatus.style.color = "#27ae60";
    
    // 결과 페이지로 이동
    setTimeout(() => {
      showEmployeeResult({
        name: name,
        team: team,
        photoURL: `character:${JSON.stringify(characterData)}`,
        employeeId: employeeId,
        characterData: characterData
      });
    }, 1500);

  } catch (error) {
    avatarStatus.textContent = "❌ 오류 발생: " + error.message;
    avatarStatus.style.color = "#e74c3c";
  }
};

// 이름 입력 시 아바타 미리보기 업데이트
document.addEventListener('DOMContentLoaded', function() {
  const nameInput = document.getElementById('avatarName');
  if (nameInput) {
    nameInput.addEventListener('input', function() {
      updateAvatarPreview(this.value);
    });
  }
});

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




