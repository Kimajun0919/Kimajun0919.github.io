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
  
  
  if (pageId === 'avatarPage') {
    document.getElementById('avatarStatus').textContent = '';
    document.getElementById('avatarName').value = '';
    document.getElementById('avatarTeam').value = '';
    resetAvatarPreview();
    
    // 기본 선택 상태 설정
    avataaarsData = {
      avatarStyle: 'Circle',
      topType: 'LongHairStraight',
      accessoriesType: 'Blank',
      hairColor: 'BrownDark',
      facialHairType: 'Blank',
      facialHairColor: 'Brown',
      clotheType: 'BlazerShirt',
      clotheColor: 'PastelBlue',
      eyeType: 'Happy',
      eyebrowType: 'Default',
      mouthType: 'Smile',
      skinColor: 'Light',
      skinTone: 'Light'
    };
    
    // 기본 선택 버튼 활성화
    document.querySelectorAll('.color-option').forEach(btn => {
      btn.classList.remove('selected');
    });
    
    // 기본 아바타 렌더링
    renderAvataaars();
  }
  
};

// 사원 조회 함수
window.searchEmployee = async function() {
  const name = document.getElementById("searchName").value.trim();
  const team = document.getElementById("searchTeam").value.trim();
  const status = document.getElementById("searchStatus");
  
  if (!name && !team) {
    status.textContent = "이름 또는 팀을 입력해주세요.";
    status.style.color = "#e74c3c";
    return;
  }
  
  status.textContent = "조회 중...";
  status.style.color = "#3498db";
  
  try {
    const snapshot = await get(child(ref(db), "employees"));
    if (snapshot.exists()) {
      const employees = snapshot.val();
      let foundEmployee = null;
      
      // 이름과 팀으로 검색
      for (const key in employees) {
        const employee = employees[key];
        const nameMatch = !name || employee.name === name;
        const teamMatch = !team || employee.team === team;
        
        if (nameMatch && teamMatch) {
          foundEmployee = { ...employee, key };
          break;
        }
      }
      
      if (foundEmployee) {
        showEmployeeResult(foundEmployee);
      } else {
        status.textContent = "해당하는 사원을 찾을 수 없습니다.";
        status.style.color = "#e74c3c";
      }
    } else {
      status.textContent = "등록된 사원이 없습니다.";
      status.style.color = "#e74c3c";
    }
  } catch (error) {
    console.error('조회 오류:', error);
    status.textContent = `조회 중 오류가 발생했습니다: ${error.message}`;
    status.style.color = "#e74c3c";
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


// Avataaars 데이터 구조
let avataaarsData = {
  avatarStyle: 'Circle',
  topType: 'LongHairStraight',
  accessoriesType: 'Blank',
  hairColor: 'BrownDark',
  facialHairType: 'Blank',
  facialHairColor: 'Brown',
  clotheType: 'BlazerShirt',
  clotheColor: 'PastelBlue',
  eyeType: 'Happy',
  eyebrowType: 'Default',
  mouthType: 'Smile',
  skinColor: 'Light',
  skinTone: 'Light'
};

// Avataaars 관련 함수들
function resetAvatarPreview() {
  const preview = document.getElementById('avatarPreview');
  preview.innerHTML = '<div class="avatar-placeholder">Your Avatar</div>';
}

function renderAvataaars() {
  const preview = document.getElementById('avatarPreview');
  
  // Avataaars 컴포넌트 생성
  const avatarElement = document.createElement('div');
  avatarElement.id = 'avataaars-container';
  
  // Avataaars SVG 생성
  const svg = generateAvataaarsSVG(avataaarsData);
  avatarElement.innerHTML = svg;
  
  preview.innerHTML = '';
  preview.appendChild(avatarElement);
  
  // 애니메이션 효과
  avatarElement.style.opacity = '0';
  avatarElement.style.transform = 'scale(0.8)';
  
  setTimeout(() => {
    avatarElement.style.transition = 'all 0.3s ease';
    avatarElement.style.opacity = '1';
    avatarElement.style.transform = 'scale(1)';
  }, 50);
}

function generateAvataaarsSVG(data) {
  // Avataaars SVG 생성 로직
  // 실제로는 Avataaars 라이브러리의 함수를 사용해야 합니다
  return `
    <svg viewBox="0 0 264 280" width="264" height="280" xmlns="http://www.w3.org/2000/svg">
      <g id="Avataaars">
        <!-- 여기에 Avataaars SVG 내용이 들어갑니다 -->
        <circle cx="132" cy="140" r="120" fill="#fdbcb4"/>
        <text x="132" y="150" text-anchor="middle" font-size="16" fill="#333">Avataaars</text>
      </g>
    </svg>
  `;
}

function selectAvataaarsOption(property, value) {
  avataaarsData[property] = value;
  
  // 선택된 옵션 표시
  document.querySelectorAll(`[data-property="${property}"]`).forEach(item => {
    item.classList.remove('selected');
  });
  
  const clickedElement = event.target.closest('[data-property]');
  if (clickedElement) {
    clickedElement.classList.add('selected');
  }
  
  // 아바타 렌더링
  renderAvataaars();
}

function selectOption(type, value) {
  characterData[type] = value;
  
  // 선택된 버튼 표시 (onclick 속성으로 찾기)
  document.querySelectorAll('.option-item').forEach(item => {
    item.classList.remove('selected');
  });
  
  // 클릭된 버튼을 찾아서 selected 클래스 추가
  const clickedButton = event.target.closest('.option-item');
  if (clickedButton) {
    clickedButton.classList.add('selected');
  }
  
  // 캐릭터 렌더링
  renderCharacter();
}

function selectColor(type, colorIndex) {
  characterData[type + 'Color'] = colorIndex;
  
  // 선택된 색상 버튼 표시
  document.querySelectorAll('.color-option').forEach(item => {
    item.classList.remove('selected');
  });
  
  // 클릭된 버튼을 찾아서 selected 클래스 추가
  const clickedButton = event.target.closest('.color-option');
  if (clickedButton) {
    clickedButton.classList.add('selected');
  }
  
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
  
  // 부드러운 애니메이션을 위한 페이드 인 효과
  container.style.opacity = '0';
  container.style.transform = 'scale(0.8)';
  
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
  
  // 애니메이션 효과
  setTimeout(() => {
    container.style.transition = 'all 0.3s ease';
    container.style.opacity = '1';
    container.style.transform = 'scale(1)';
  }, 50);
}

// 각 부위별 스타일 함수들
function getFaceStyle(faceType, skinColor = 1) {
  const skinColors = {
    1: '#fdbcb4',
    2: '#f4c2a1', 
    3: '#e8a87c',
    4: '#d2691e',
    5: '#c68642',
    6: '#8d4a3c'
  };
  
  const skinColorValue = skinColors[skinColor] || skinColors[1];
  
  const styles = {
    'round': `
      width: 160px;
      height: 180px;
      background: radial-gradient(ellipse at 30% 20%, ${skinColorValue} 0%, ${skinColorValue}dd 70%, ${skinColorValue}aa 100%);
      border-radius: 50% 50% 50% 50%;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      box-shadow: 
        inset 0 15px 30px rgba(255,255,255,0.3),
        inset 0 -10px 20px rgba(0,0,0,0.1),
        0 5px 15px rgba(0,0,0,0.1);
      border: 3px solid rgba(255,255,255,0.4);
    `,
    'oval': `
      width: 140px;
      height: 200px;
      background: radial-gradient(ellipse at 30% 20%, ${skinColorValue} 0%, ${skinColorValue}dd 70%, ${skinColorValue}aa 100%);
      border-radius: 50% 50% 45% 45%;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      box-shadow: 
        inset 0 15px 30px rgba(255,255,255,0.3),
        inset 0 -10px 20px rgba(0,0,0,0.1),
        0 5px 15px rgba(0,0,0,0.1);
      border: 3px solid rgba(255,255,255,0.4);
    `,
    'square': `
      width: 170px;
      height: 180px;
      background: radial-gradient(ellipse at 30% 20%, ${skinColorValue} 0%, ${skinColorValue}dd 70%, ${skinColorValue}aa 100%);
      border-radius: 30% 30% 40% 40%;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      box-shadow: 
        inset 0 15px 30px rgba(255,255,255,0.3),
        inset 0 -10px 20px rgba(0,0,0,0.1),
        0 5px 15px rgba(0,0,0,0.1);
      border: 3px solid rgba(255,255,255,0.4);
    `
  };
  return styles[faceType] || styles['round'];
}

function getEyesStyle(eyeType) {
  const styles = {
    'normal': `
      width: 28px;
      height: 28px;
      background: radial-gradient(circle at 30% 30%, #ffffff 0%, #ffffff 40%, #4a90e2 45%, #2c3e50 70%);
      border-radius: 50%;
      top: 42%;
      left: 28%;
      box-shadow: 48px 0 0 radial-gradient(circle at 30% 30%, #ffffff 0%, #ffffff 40%, #4a90e2 45%, #2c3e50 70%);
      border: 2px solid rgba(255,255,255,0.6);
      position: relative;
    `,
    'big': `
      width: 34px;
      height: 34px;
      background: radial-gradient(circle at 30% 30%, #ffffff 0%, #ffffff 40%, #4a90e2 45%, #2c3e50 70%);
      border-radius: 50%;
      top: 42%;
      left: 24%;
      box-shadow: 54px 0 0 radial-gradient(circle at 30% 30%, #ffffff 0%, #ffffff 40%, #4a90e2 45%, #2c3e50 70%);
      border: 2px solid rgba(255,255,255,0.6);
      position: relative;
    `,
    'small': `
      width: 22px;
      height: 22px;
      background: radial-gradient(circle at 30% 30%, #ffffff 0%, #ffffff 40%, #4a90e2 45%, #2c3e50 70%);
      border-radius: 50%;
      top: 42%;
      left: 32%;
      box-shadow: 42px 0 0 radial-gradient(circle at 30% 30%, #ffffff 0%, #ffffff 40%, #4a90e2 45%, #2c3e50 70%);
      border: 2px solid rgba(255,255,255,0.6);
      position: relative;
    `,
    'closed': `
      width: 36px;
      height: 8px;
      background: linear-gradient(to bottom, #8b4513 0%, #654321 100%);
      border-radius: 50px;
      top: 42%;
      left: 24%;
      box-shadow: 48px 0 0 linear-gradient(to bottom, #8b4513 0%, #654321 100%);
      position: relative;
    `
  };
  return styles[eyeType] || styles['normal'];
}

function getNoseStyle(noseType) {
  const styles = {
    'normal': `
      width: 12px;
      height: 20px;
      background: linear-gradient(135deg, #f4a6a6 0%, #e8a87c 100%);
      border-radius: 50% 50% 50% 50% / 60% 60% 40% 40%;
      top: 55%;
      left: 50%;
      transform: translate(-50%, -50%);
      box-shadow: inset 0 2px 4px rgba(0,0,0,0.1);
    `,
    'small': `
      width: 8px;
      height: 14px;
      background: linear-gradient(135deg, #f4a6a6 0%, #e8a87c 100%);
      border-radius: 50% 50% 50% 50% / 60% 60% 40% 40%;
      top: 55%;
      left: 50%;
      transform: translate(-50%, -50%);
      box-shadow: inset 0 2px 4px rgba(0,0,0,0.1);
    `,
    'big': `
      width: 16px;
      height: 24px;
      background: linear-gradient(135deg, #f4a6a6 0%, #e8a87c 100%);
      border-radius: 50% 50% 50% 50% / 60% 60% 40% 40%;
      top: 55%;
      left: 50%;
      transform: translate(-50%, -50%);
      box-shadow: inset 0 2px 4px rgba(0,0,0,0.1);
    `
  };
  return styles[noseType] || styles['normal'];
}

function getMouthStyle(mouthType) {
  const styles = {
    'smile': `
      width: 32px;
      height: 16px;
      border: 2px solid #d2691e;
      border-top: none;
      border-radius: 0 0 32px 32px;
      top: 70%;
      left: 50%;
      transform: translate(-50%, -50%);
      background: linear-gradient(to bottom, #ff6b6b 0%, #ff8e8e 100%);
    `,
    'normal': `
      width: 24px;
      height: 4px;
      background: linear-gradient(to bottom, #d2691e 0%, #8b4513 100%);
      border-radius: 2px;
      top: 70%;
      left: 50%;
      transform: translate(-50%, -50%);
    `,
    'surprised': `
      width: 18px;
      height: 18px;
      background: radial-gradient(circle, #ff6b6b 30%, #ff8e8e 70%);
      border-radius: 50%;
      top: 70%;
      left: 50%;
      transform: translate(-50%, -50%);
      border: 1px solid #d2691e;
    `,
    'frown': `
      width: 28px;
      height: 14px;
      border: 2px solid #d2691e;
      border-bottom: none;
      border-radius: 28px 28px 0 0;
      top: 70%;
      left: 50%;
      transform: translate(-50%, -50%);
      background: linear-gradient(to top, #ff6b6b 0%, #ff8e8e 100%);
    `,
    'serious': `
      width: 26px;
      height: 6px;
      background: linear-gradient(to bottom, #d2691e 0%, #8b4513 100%);
      border-radius: 3px;
      top: 70%;
      left: 50%;
      transform: translate(-50%, -50%);
    `
  };
  return styles[mouthType] || styles['smile'];
}

function getHairStyle(hairType, hairColor = 1) {
  const hairColors = {
    1: '#8b4513', // Brown
    2: '#654321', // Dark Brown
    3: '#a0522d', // Sienna
    4: '#000000', // Black
    5: '#ffffff', // White
    6: '#ffd700', // Gold
    7: '#ff69b4', // Hot Pink
    8: '#4169e1'  // Royal Blue
  };
  
  const hairColorValue = hairColors[hairColor] || hairColors[1];
  const hairColorDark = hairColorValue + 'cc';
  
  const styles = {
    'short': `
      width: 150px;
      height: 90px;
      background: radial-gradient(ellipse at center, ${hairColorValue} 0%, ${hairColorDark} 100%);
      border-radius: 50% 50% 45% 45%;
      top: 30%;
      left: 50%;
      transform: translate(-50%, -50%);
      box-shadow: inset 0 10px 20px rgba(0,0,0,0.2);
    `,
    'long': `
      width: 130px;
      height: 110px;
      background: radial-gradient(ellipse at center, ${hairColorValue} 0%, ${hairColorDark} 100%);
      border-radius: 50% 50% 40% 40%;
      top: 30%;
      left: 50%;
      transform: translate(-50%, -50%);
      box-shadow: 
        0 60px 0 radial-gradient(ellipse at center, ${hairColorValue} 0%, ${hairColorDark} 100%),
        0 120px 0 radial-gradient(ellipse at center, ${hairColorValue} 0%, ${hairColorDark} 100%),
        inset 0 10px 20px rgba(0,0,0,0.2);
    `,
    'curly': `
      width: 140px;
      height: 100px;
      background: radial-gradient(ellipse at center, ${hairColorValue} 0%, ${hairColorDark} 100%);
      border-radius: 50%;
      top: 30%;
      left: 50%;
      transform: translate(-50%, -50%);
      box-shadow: 
        -25px 25px 0 radial-gradient(ellipse at center, ${hairColorValue} 0%, ${hairColorDark} 100%),
        25px 25px 0 radial-gradient(ellipse at center, ${hairColorValue} 0%, ${hairColorDark} 100%),
        -35px 45px 0 radial-gradient(ellipse at center, ${hairColorValue} 0%, ${hairColorDark} 100%),
        35px 45px 0 radial-gradient(ellipse at center, ${hairColorValue} 0%, ${hairColorDark} 100%),
        inset 0 10px 20px rgba(0,0,0,0.2);
    `,
    'bald': `
      width: 140px;
      height: 160px;
      background: transparent;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
    `,
    'bob': `
      width: 135px;
      height: 85px;
      background: radial-gradient(ellipse at center, ${hairColorValue} 0%, ${hairColorDark} 100%);
      border-radius: 50% 50% 40% 40%;
      top: 32%;
      left: 50%;
      transform: translate(-50%, -50%);
      box-shadow: 
        0 45px 0 radial-gradient(ellipse at center, ${hairColorValue} 0%, ${hairColorDark} 100%),
        inset 0 10px 20px rgba(0,0,0,0.2);
    `,
    'pixie': `
      width: 125px;
      height: 75px;
      background: radial-gradient(ellipse at center, ${hairColorValue} 0%, ${hairColorDark} 100%);
      border-radius: 50% 50% 45% 45%;
      top: 33%;
      left: 50%;
      transform: translate(-50%, -50%);
      box-shadow: inset 0 10px 20px rgba(0,0,0,0.2);
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

// 눈썹 스타일 함수
function getEyebrowsStyle(eyebrowType) {
  const styles = {
    'normal': `
      width: 40px;
      height: 4px;
      background: #8b4513;
      border-radius: 2px;
      top: 35%;
      left: 50%;
      transform: translate(-50%, -50%);
    `,
    'thick': `
      width: 45px;
      height: 6px;
      background: #654321;
      border-radius: 3px;
      top: 35%;
      left: 50%;
      transform: translate(-50%, -50%);
    `,
    'thin': `
      width: 35px;
      height: 2px;
      background: #a0522d;
      border-radius: 1px;
      top: 35%;
      left: 50%;
      transform: translate(-50%, -50%);
    `
  };
  
  return styles[eyebrowType] || styles['normal'];
}

// 안경 스타일 함수
function getGlassesStyle(glassesType) {
  const styles = {
    'none': `
      width: 0px;
      height: 0px;
      background: transparent;
    `,
    'round': `
      width: 60px;
      height: 30px;
      border: 3px solid #333;
      border-radius: 50%;
      top: 45%;
      left: 50%;
      transform: translate(-50%, -50%);
      background: rgba(255, 255, 255, 0.1);
    `,
    'square': `
      width: 60px;
      height: 30px;
      border: 3px solid #333;
      border-radius: 5px;
      top: 45%;
      left: 50%;
      transform: translate(-50%, -50%);
      background: rgba(255, 255, 255, 0.1);
    `,
    'sunglasses': `
      width: 60px;
      height: 30px;
      background: #1a1a1a;
      border-radius: 15px;
      top: 45%;
      left: 50%;
      transform: translate(-50%, -50%);
      border: 2px solid #333;
    `
  };
  
  return styles[glassesType] || styles['none'];
}

// 수염 스타일 함수
function getBeardStyle(beardType) {
  const styles = {
    'none': `
      width: 0px;
      height: 0px;
      background: transparent;
    `,
    'mustache': `
      width: 30px;
      height: 8px;
      background: #8b4513;
      border-radius: 15px;
      top: 65%;
      left: 50%;
      transform: translate(-50%, -50%);
    `,
    'full': `
      width: 50px;
      height: 25px;
      background: #8b4513;
      border-radius: 25px;
      top: 75%;
      left: 50%;
      transform: translate(-50%, -50%);
    `,
    'goatee': `
      width: 20px;
      height: 20px;
      background: #8b4513;
      border-radius: 50%;
      top: 70%;
      left: 50%;
      transform: translate(-50%, -50%);
    `
  };
  
  return styles[beardType] || styles['none'];
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

    // Firebase에 Avataaars 데이터를 텍스트로 저장
    const newRef = await push(ref(db, "employees"), {
      name: name,
      team: team,
      photoURL: `avataaars:${JSON.stringify(avataaarsData)}`, // Avataaars 데이터를 JSON 문자열로 저장
      employeeId: employeeId,
      createdAt: new Date().toISOString(),
      avataaarsData: avataaarsData // Avataaars 데이터도 별도로 저장
    });

    avatarStatus.innerHTML = `✅ 아바타 생성 완료!`;
    avatarStatus.style.color = "#27ae60";
    
    // 결과 페이지로 이동
    setTimeout(() => {
      showEmployeeResult({
        name: name,
        team: team,
        photoURL: `avataaars:${JSON.stringify(avataaarsData)}`,
        employeeId: employeeId,
        avataaarsData: avataaarsData
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




