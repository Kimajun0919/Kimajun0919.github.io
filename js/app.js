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

// Avataaars 데이터
let avataaarsData = {
  avatarStyle: 'Circle',
  skinColor: 'Pale',
  eyeType: 'Happy',
  eyebrowType: 'Default',
  mouthType: 'Smile',
  topType: 'ShortHairShortFlat',
  hairColor: 'Auburn',
  facialHairType: 'Blank',
  facialHairColor: 'Auburn',
  clotheType: 'BlazerShirt',
  clotheColor: 'Black',
  accessoriesType: 'Blank'
};

// Avataaars React 컴포넌트
let avataaarsComponent = null;

// 페이지 전환 함수 (HTML에서 호출)
window.showPage = function(pageId) {
  document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
  document.getElementById(pageId).classList.add('active');
  
  if (pageId === 'avatarPage') {
    // 아바타 생성 페이지 초기화
    updateAvatar();
    // React 컴포넌트도 렌더링
    setTimeout(() => {
      renderAvataaarsReact();
    }, 100);
  }
};

// Avataaars 렌더링 함수
function renderAvataaars() {
  const preview = document.getElementById('avatarPreview');
  if (!preview) return;
  
  // Avataaars SVG 생성
  const svg = generateAvataaarsSVG();
  preview.innerHTML = svg;
}

// Avataaars React 컴포넌트 렌더링
function renderAvataaarsReact() {
  const container = document.getElementById('avataaarsContainer');
  if (!container || !window.React || !window.ReactDOM) {
    console.log('React 또는 ReactDOM이 로드되지 않았습니다.');
    return;
  }
  
  if (!window.Avataaars) {
    console.log('Avataaars 라이브러리가 로드되지 않았습니다.');
    return;
  }
  
  // 기존 컴포넌트 제거
  if (avataaarsComponent) {
    ReactDOM.unmountComponentAtNode(container);
  }
  
  try {
    // 새로운 Avataaars 컴포넌트 생성
    const Avatar = window.Avataaars.Avatar;
    const AvatarStyle = window.Avataaars.AvatarStyle;
    
    // avatarStyle 문자열을 AvatarStyle 상수로 변환
    const avatarStyleValue = avataaarsData.avatarStyle === 'Circle' ? AvatarStyle.Circle : AvatarStyle.Transparent;
    
    avataaarsComponent = ReactDOM.render(
      React.createElement(Avatar, {
        style: {
          width: '100%',
          height: '100%'
        },
        avatarStyle: avatarStyleValue,
        ...avataaarsData
      }),
      container
    );
  } catch (error) {
    console.error('Avataaars 렌더링 오류:', error);
    // SVG 폴백 사용
    renderAvataaars();
  }
}

// Avataaars SVG 생성 함수 (실제 Avataaars 스타일)
function generateAvataaarsSVG() {
  const { skinColor, eyeType, eyebrowType, mouthType, topType, hairColor, facialHairType, facialHairColor, clotheType, clotheColor, accessoriesType } = avataaarsData;
  
  // 피부색 매핑
  const skinColors = {
    'Pale': '#fdbcb4',
    'Light': '#f4c2a1',
    'Brown': '#d08b5b',
    'DarkBrown': '#ae5d29',
    'Black': '#8d4a3c'
  };
  
  // 머리색 매핑
  const hairColors = {
    'Auburn': '#a55728',
    'Black': '#2c1b18',
    'Blonde': '#f4e4c1',
    'BlondeGolden': '#d6b370',
    'Brown': '#724133',
    'BrownDark': '#4a312c',
    'PastelPink': '#f8bdd9',
    'Platinum': '#ecdcbf',
    'Red': '#c93305',
    'SilverGray': '#e8e1e1'
  };
  
  // 의상색 매핑
  const clotheColors = {
    'Black': '#262e33',
    'Blue01': '#65c9ff',
    'Blue02': '#5199e4',
    'Blue03': '#25557c',
    'Gray01': '#e6e6e6',
    'Gray02': '#929598',
    'Heather': '#3c4f5c',
    'PastelBlue': '#b1e2ff',
    'PastelGreen': '#a7ffc4',
    'PastelOrange': '#ffdeb3',
    'PastelRed': '#ffafb9',
    'PastelYellow': '#ffffb1',
    'Pink': '#ff488e',
    'Red': '#ff5c5c',
    'White': '#ffffff'
  };

  return `
    <svg width="200" height="200" viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg">
      <!-- 배경 -->
      <circle cx="100" cy="100" r="100" fill="#f0f0f0"/>
      
      <!-- 피부 (얼굴) -->
      <circle cx="100" cy="100" r="80" fill="${skinColors[skinColor] || '#fdbcb4'}"/>
      
      <!-- 머리 -->
      ${getHairSVG(topType, hairColors[hairColor] || '#a55728')}
      
      <!-- 눈썹 -->
      ${getEyebrowSVG(eyebrowType)}
      
      <!-- 눈 -->
      ${getEyeSVG(eyeType)}
      
      <!-- 입 -->
      ${getMouthSVG(mouthType)}
      
      <!-- 수염 -->
      ${getFacialHairSVG(facialHairType, hairColors[facialHairColor] || '#a55728')}
      
      <!-- 의상 -->
      ${getClotheSVG(clotheType, clotheColors[clotheColor] || '#262e33')}
      
      <!-- 액세서리 -->
      ${getAccessoriesSVG(accessoriesType)}
    </svg>
  `;
}

// 머리 SVG 생성
function getHairSVG(topType, hairColor) {
  if (topType === 'NoHair') return '';
  
  const hairStyles = {
    'ShortHairShortFlat': `<path d="M100 20 C 60 20, 30 50, 30 90 C 30 110, 40 130, 60 140 C 80 150, 120 150, 140 140 C 160 130, 170 110, 170 90 C 170 50, 140 20, 100 20 Z" fill="${hairColor}"/>`,
    'ShortHairShortWaved': `<path d="M100 20 C 60 20, 30 50, 30 90 C 30 110, 40 130, 60 140 C 80 150, 120 150, 140 140 C 160 130, 170 110, 170 90 C 170 50, 140 20, 100 20 Z" fill="${hairColor}"/>`,
    'LongHairBigHair': `<path d="M100 20 C 60 20, 30 50, 30 90 C 30 110, 40 130, 60 140 C 80 150, 120 150, 140 140 C 160 130, 170 110, 170 90 C 170 50, 140 20, 100 20 Z" fill="${hairColor}"/>`,
    'LongHairBob': `<path d="M100 20 C 60 20, 30 50, 30 90 C 30 110, 40 130, 60 140 C 80 150, 120 150, 140 140 C 160 130, 170 110, 170 90 C 170 50, 140 20, 100 20 Z" fill="${hairColor}"/>`,
    'LongHairBun': `<path d="M100 20 C 60 20, 30 50, 30 90 C 30 110, 40 130, 60 140 C 80 150, 120 150, 140 140 C 160 130, 170 110, 170 90 C 170 50, 140 20, 100 20 Z" fill="${hairColor}"/>`,
    'LongHairCurly': `<path d="M100 20 C 60 20, 30 50, 30 90 C 30 110, 40 130, 60 140 C 80 150, 120 150, 140 140 C 160 130, 170 110, 170 90 C 170 50, 140 20, 100 20 Z" fill="${hairColor}"/>`,
    'LongHairStraight': `<path d="M100 20 C 60 20, 30 50, 30 90 C 30 110, 40 130, 60 140 C 80 150, 120 150, 140 140 C 160 130, 170 110, 170 90 C 170 50, 140 20, 100 20 Z" fill="${hairColor}"/>`
  };
  
  return hairStyles[topType] || hairStyles['ShortHairShortFlat'];
}

// 눈썹 SVG 생성
function getEyebrowSVG(eyebrowType) {
  const eyebrowStyles = {
    'Default': `
      <path d="M 60 65 Q 80 55 100 65" stroke="#000" stroke-width="3" fill="none"/>
      <path d="M 100 65 Q 120 55 140 65" stroke="#000" stroke-width="3" fill="none"/>
    `,
    'Angry': `
      <path d="M 60 65 Q 80 45 100 65" stroke="#000" stroke-width="3" fill="none"/>
      <path d="M 100 65 Q 120 45 140 65" stroke="#000" stroke-width="3" fill="none"/>
    `,
    'RaisedExcited': `
      <path d="M 60 65 Q 80 35 100 65" stroke="#000" stroke-width="3" fill="none"/>
      <path d="M 100 65 Q 120 35 140 65" stroke="#000" stroke-width="3" fill="none"/>
    `,
    'SadConcerned': `
      <path d="M 60 65 Q 80 75 100 65" stroke="#000" stroke-width="3" fill="none"/>
      <path d="M 100 65 Q 120 75 140 65" stroke="#000" stroke-width="3" fill="none"/>
    `
  };
  
  return eyebrowStyles[eyebrowType] || eyebrowStyles['Default'];
}

// 눈 SVG 생성
function getEyeSVG(eyeType) {
  const eyeStyles = {
    'Happy': `
      <path d="M 70 80 Q 80 70 90 80" stroke="#000" stroke-width="2" fill="none"/>
      <path d="M 110 80 Q 120 70 130 80" stroke="#000" stroke-width="2" fill="none"/>
    `,
    'Default': `
      <circle cx="80" cy="80" r="8" fill="#000"/>
      <circle cx="120" cy="80" r="8" fill="#000"/>
    `,
    'Wink': `
      <circle cx="80" cy="80" r="8" fill="#000"/>
      <path d="M 110 80 Q 120 70 130 80" stroke="#000" stroke-width="2" fill="none"/>
    `,
    'Squint': `
      <path d="M 70 80 Q 80 75 90 80" stroke="#000" stroke-width="3" fill="none"/>
      <path d="M 110 80 Q 120 75 130 80" stroke="#000" stroke-width="3" fill="none"/>
    `,
    'Surprised': `
      <circle cx="80" cy="80" r="10" fill="#000"/>
      <circle cx="120" cy="80" r="10" fill="#000"/>
    `,
    'Close': `
      <path d="M 70 80 Q 80 80 90 80" stroke="#000" stroke-width="2" fill="none"/>
      <path d="M 110 80 Q 120 80 130 80" stroke="#000" stroke-width="2" fill="none"/>
    `
  };
  
  return eyeStyles[eyeType] || eyeStyles['Default'];
}

// 입 SVG 생성
function getMouthSVG(mouthType) {
  const mouthStyles = {
    'Smile': `
      <path d="M 90 120 Q 100 130 110 120" stroke="#000" stroke-width="2" fill="none"/>
    `,
    'Default': `
      <path d="M 90 120 Q 100 125 110 120" stroke="#000" stroke-width="2" fill="none"/>
    `,
    'Sad': `
      <path d="M 90 120 Q 100 110 110 120" stroke="#000" stroke-width="2" fill="none"/>
    `,
    'Serious': `
      <path d="M 90 120 Q 100 120 110 120" stroke="#000" stroke-width="2" fill="none"/>
    `,
    'Tongue': `
      <path d="M 90 120 Q 100 130 110 120" stroke="#000" stroke-width="2" fill="none"/>
      <path d="M 95 120 Q 100 135 105 120" stroke="#000" stroke-width="1" fill="none"/>
    `,
    'Eating': `
      <path d="M 90 120 Q 100 130 110 120" stroke="#000" stroke-width="2" fill="none"/>
      <circle cx="100" cy="125" r="3" fill="#000"/>
    `
  };
  
  return mouthStyles[mouthType] || mouthStyles['Smile'];
}

// 수염 SVG 생성
function getFacialHairSVG(facialHairType, hairColor) {
  if (facialHairType === 'Blank') return '';
  
  const facialHairStyles = {
    'BeardMedium': `
      <path d="M 80 140 Q 100 160 120 140" stroke="${hairColor}" stroke-width="8" fill="none"/>
    `,
    'BeardLight': `
      <path d="M 85 140 Q 100 155 115 140" stroke="${hairColor}" stroke-width="6" fill="none"/>
    `,
    'MoustacheFancy': `
      <path d="M 85 120 Q 100 125 115 120" stroke="${hairColor}" stroke-width="3" fill="none"/>
    `,
    'MoustacheMagnum': `
      <path d="M 80 120 Q 100 125 120 120" stroke="${hairColor}" stroke-width="4" fill="none"/>
    `
  };
  
  return facialHairStyles[facialHairType] || '';
}

// 의상 SVG 생성
function getClotheSVG(clotheType, clotheColor) {
  const clotheStyles = {
    'BlazerShirt': `
      <rect x="50" y="160" width="100" height="40" fill="${clotheColor}"/>
      <rect x="60" y="170" width="80" height="20" fill="#ffffff"/>
    `,
    'Hoodie': `
      <rect x="50" y="160" width="100" height="40" fill="${clotheColor}"/>
      <path d="M 50 160 Q 50 140 70 140 Q 100 130 130 140 Q 150 140 150 160" stroke="${clotheColor}" stroke-width="20" fill="none"/>
    `,
    'GraphicShirt': `
      <rect x="50" y="160" width="100" height="40" fill="${clotheColor}"/>
      <circle cx="100" cy="180" r="10" fill="#ffffff"/>
    `,
    'ShirtCrewNeck': `
      <rect x="50" y="160" width="100" height="40" fill="${clotheColor}"/>
    `,
    'ShirtVNeck': `
      <rect x="50" y="160" width="100" height="40" fill="${clotheColor}"/>
      <path d="M 90 160 L 100 170 L 110 160" stroke="#ffffff" stroke-width="2" fill="none"/>
    `
  };
  
  return clotheStyles[clotheType] || clotheStyles['BlazerShirt'];
}

// 액세서리 SVG 생성
function getAccessoriesSVG(accessoriesType) {
  if (accessoriesType === 'Blank') return '';
  
  const accessoriesStyles = {
    'Kurt': `
      <circle cx="80" cy="80" r="15" stroke="#000" stroke-width="2" fill="none"/>
      <circle cx="120" cy="80" r="15" stroke="#000" stroke-width="2" fill="none"/>
      <path d="M 95 80 L 105 80" stroke="#000" stroke-width="1"/>
    `,
    'Prescription01': `
      <circle cx="80" cy="80" r="12" stroke="#000" stroke-width="2" fill="none"/>
      <circle cx="120" cy="80" r="12" stroke="#000" stroke-width="2" fill="none"/>
      <path d="M 92 80 L 108 80" stroke="#000" stroke-width="1"/>
    `,
    'Sunglasses': `
      <rect x="65" y="75" width="30" height="15" rx="7" fill="#000"/>
      <rect x="105" y="75" width="30" height="15" rx="7" fill="#000"/>
      <path d="M 95 82 L 105 82" stroke="#000" stroke-width="2"/>
    `,
    'Wayfarers': `
      <rect x="65" y="75" width="30" height="15" rx="7" fill="#000"/>
      <rect x="105" y="75" width="30" height="15" rx="7" fill="#000"/>
      <path d="M 95 82 L 105 82" stroke="#000" stroke-width="2"/>
    `
  };
  
  return accessoriesStyles[accessoriesType] || '';
}

// 옵션 선택 함수
window.selectOption = function(property, value) {
  avataaarsData[property] = value;
  
  // 선택된 옵션 표시
  document.querySelectorAll(`[data-property="${property}"]`).forEach(item => {
    item.classList.remove('selected');
  });
  
  const selectedItem = document.querySelector(`[data-property="${property}"][data-value="${value}"]`);
  if (selectedItem) {
    selectedItem.classList.add('selected');
  }
  
  // 아바타 다시 렌더링
  renderAvataaars();
};


// 랜덤 아바타 생성 함수 (HTML에서 호출)
window.randomizeAvatar = function() {
  // 랜덤 값 생성
  const avatarStyles = ['Circle', 'Transparent'];
  const skinColors = ['Pale', 'Light', 'Brown', 'DarkBrown', 'Black'];
  const eyeTypes = ['Happy', 'Default', 'Wink', 'Squint', 'Side', 'Dizzy', 'Surprised', 'Close', 'Cry', 'EyeRoll', 'Hearts', 'Kiss'];
  const eyebrowTypes = ['Default', 'Angry', 'AngryNatural', 'DefaultNatural', 'FlatNatural', 'RaisedExcited', 'RaisedExcitedNatural', 'SadConcerned', 'SadConcernedNatural', 'UnibrowNatural', 'UpDown', 'UpDownNatural'];
  const mouthTypes = ['Smile', 'Default', 'Eating', 'Grimace', 'Sad', 'ScreamOpen', 'Serious', 'Tongue', 'Twinkle', 'Vomit'];
  const topTypes = ['ShortHairShortFlat', 'ShortHairShortWaved', 'ShortHairDreads01', 'ShortHairDreads02', 'ShortHairFrizzle', 'ShortHairShaggyMullet', 'ShortHairShortCurly', 'ShortHairShortRound', 'LongHairBigHair', 'LongHairBob', 'LongHairBun', 'LongHairCurly', 'LongHairCurvy', 'LongHairDreads', 'LongHairFrida', 'LongHairFro', 'LongHairFroBand', 'LongHairNotTooLong', 'LongHairShavedSides', 'LongHairMiaWallace', 'LongHairStraight', 'LongHairStraight2', 'LongHairStraightStrand', 'NoHair'];
  const hairColors = ['Auburn', 'Black', 'Blonde', 'BlondeGolden', 'Brown', 'BrownDark', 'PastelPink', 'Platinum', 'Red', 'SilverGray'];
  const facialHairTypes = ['Blank', 'BeardMedium', 'BeardLight', 'BeardMagestic', 'MoustacheFancy', 'MoustacheMagnum'];
  const clotheTypes = ['BlazerShirt', 'BlazerSweater', 'CollarSweater', 'GraphicShirt', 'Hoodie', 'Overall', 'ShirtCrewNeck', 'ShirtScoopNeck', 'ShirtVNeck'];
  const clotheColors = ['Black', 'Blue01', 'Blue02', 'Blue03', 'Gray01', 'Gray02', 'Heather', 'PastelBlue', 'PastelGreen', 'PastelOrange', 'PastelRed', 'PastelYellow', 'Pink', 'Red', 'White'];
  const accessoriesTypes = ['Blank', 'Kurt', 'Prescription01', 'Prescription02', 'Round', 'Sunglasses', 'Wayfarers'];

  // 랜덤 값으로 업데이트
  avataaarsData = {
    avatarStyle: avatarStyles[Math.floor(Math.random() * avatarStyles.length)],
    skinColor: skinColors[Math.floor(Math.random() * skinColors.length)],
    eyeType: eyeTypes[Math.floor(Math.random() * eyeTypes.length)],
    eyebrowType: eyebrowTypes[Math.floor(Math.random() * eyebrowTypes.length)],
    mouthType: mouthTypes[Math.floor(Math.random() * mouthTypes.length)],
    topType: topTypes[Math.floor(Math.random() * topTypes.length)],
    hairColor: hairColors[Math.floor(Math.random() * hairColors.length)],
    facialHairType: facialHairTypes[Math.floor(Math.random() * facialHairTypes.length)],
    facialHairColor: hairColors[Math.floor(Math.random() * hairColors.length)],
    clotheType: clotheTypes[Math.floor(Math.random() * clotheTypes.length)],
    clotheColor: clotheColors[Math.floor(Math.random() * clotheColors.length)],
    accessoriesType: accessoriesTypes[Math.floor(Math.random() * accessoriesTypes.length)]
  };

  // React 컴포넌트 다시 렌더링
  renderAvataaarsReact();
  
  // 선택 상태 업데이트
  setDefaultSelections();
};

// SVG 다운로드 함수 (HTML에서 호출)
window.downloadAvatarSVG = function() {
  const container = document.getElementById('avataaarsContainer');
  if (!container) return;
  
  const svgElement = container.querySelector('svg');
  if (!svgElement) return;
  
  const svgData = new XMLSerializer().serializeToString(svgElement);
  const svgBlob = new Blob([svgData], { type: 'image/svg+xml;charset=utf-8' });
  const svgUrl = URL.createObjectURL(svgBlob);
  
  const downloadLink = document.createElement('a');
  downloadLink.href = svgUrl;
  downloadLink.download = 'avatar.svg';
  document.body.appendChild(downloadLink);
  downloadLink.click();
  document.body.removeChild(downloadLink);
  URL.revokeObjectURL(svgUrl);
};

// 탭 전환 함수 (HTML에서 호출)
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

// 아바타 저장 함수 (HTML에서 호출)
window.saveAvatar = async function() {
  const name = document.getElementById('avatarName').value.trim();
  const team = document.getElementById('avatarTeam').value.trim();
  const status = document.getElementById('avatarStatus');

  if (!name || !team) {
    status.textContent = "❌ 이름과 팀명을 입력해주세요!";
    status.style.color = "#e74c3c";
    return;
  }

  status.textContent = "💾 아바타 저장 중...";
  status.style.color = "#3498db";

  try {
    // 고유 ID 생성
    const employeeId = String(Date.now()).slice(-6);

    // React 컴포넌트에서 SVG 가져오기
    const container = document.getElementById('avataaarsContainer');
    let avatarSVG = '';
    if (container) {
      const svgElement = container.querySelector('svg');
      if (svgElement) {
        avatarSVG = new XMLSerializer().serializeToString(svgElement);
      }
    }

    // Firebase에 저장
    const newRef = await push(ref(db, "employees"), {
      name,
      team,
      avatarData: JSON.stringify(avataaarsData),
      avatarSVG: avatarSVG,
      employeeId: employeeId,
      createdAt: new Date().toISOString()
    });

    status.innerHTML = `✅ 아바타 저장 완료!`;
    status.style.color = "#27ae60";
      
    // 결과 페이지로 이동
    setTimeout(() => {
      showEmployeeResult({
        name: name,
        team: team,
        avatarData: avataaarsData,
        avatarSVG: avatarSVG,
        employeeId: employeeId
      });
    }, 1500);
  } catch (error) {
    status.textContent = "❌ 저장 실패: " + error.message;
    status.style.color = "#e74c3c";
  }
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
  } else if (employee.avatarData) {
    try {
      const avatarData = typeof employee.avatarData === 'string' ? 
        JSON.parse(employee.avatarData) : employee.avatarData;
      
      // 임시로 avataaarsData를 설정하고 렌더링
      const originalData = { ...avataaarsData };
      Object.assign(avataaarsData, avatarData);
      avatarHTML = generateAvataaarsSVG();
      Object.assign(avataaarsData, originalData);
    } catch (e) {
      avatarHTML = '<div class="no-avatar">아바타 없음</div>';
    }
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
      <button onclick="downloadAvatar('${employee.name}')" class="btn-primary">아바타 다운로드</button>
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

// 아바타 다운로드 함수 (HTML에서 호출)
window.downloadAvatar = function(name) {
  // React 컴포넌트에서 SVG 가져오기
  const container = document.getElementById('avataaarsContainer');
  let svg = '';
  
  if (container) {
    const svgElement = container.querySelector('svg');
    if (svgElement) {
      svg = new XMLSerializer().serializeToString(svgElement);
    }
  }
  
  if (!svg) {
    svg = generateAvataaarsSVG();
  }
  
  const canvas = document.createElement('canvas');
  const ctx = canvas.getContext('2d');
  const img = new Image();
  
  canvas.width = 200;
  canvas.height = 200;
  
  img.onload = function() {
    ctx.drawImage(img, 0, 0);
    canvas.toBlob(function(blob) {
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `${name}_avatar.png`;
      a.click();
      URL.revokeObjectURL(url);
    });
  };
  
  img.src = 'data:image/svg+xml;base64,' + btoa(svg);
};

// 아바타 옵션 선택 함수 (HTML에서 호출)
window.selectAvatarOption = function(option, value) {
  // avataaarsData 업데이트
  avataaarsData[option] = value;
  
  // 선택된 옵션 표시 업데이트
  document.querySelectorAll(`[data-option="${option}"]`).forEach(item => {
    item.classList.remove('selected');
  });
  
  const selectedItem = document.querySelector(`[data-option="${option}"][data-value="${value}"]`);
  if (selectedItem) {
    selectedItem.classList.add('selected');
  }
  
  // React 컴포넌트 다시 렌더링
  renderAvataaarsReact();
};

// 아바타 업데이트 함수 (새로운 아바타 생성 페이지용)
window.updateAvatar = function() {
  // 모든 select 요소에서 값 가져와서 avataaarsData 업데이트
  const selects = document.querySelectorAll('#avatarPage select');
  selects.forEach(select => {
    const property = select.id;
    const value = select.value;
    if (avataaarsData.hasOwnProperty(property)) {
      avataaarsData[property] = value;
    }
  });
  
  // 아바타 컨테이너에 렌더링
  const container = document.getElementById('avatarContainer');
  if (container) {
    container.innerHTML = generateAvataaarsSVG();
  }
  
  // React 컴포넌트도 업데이트
  renderAvataaarsReact();
};

// 아바타 다운로드 함수 (새로운 아바타 생성 페이지용)
window.downloadAvatar = function(format) {
  const container = document.getElementById('avatarContainer');
  let svg = '';
  
  if (container) {
    const svgElement = container.querySelector('svg');
    if (svgElement) {
      svg = new XMLSerializer().serializeToString(svgElement);
    }
  }
  
  if (!svg) {
    svg = generateAvataaarsSVG();
  }
  
  if (format === 'svg') {
    // SVG 다운로드
    const svgBlob = new Blob([svg], { type: 'image/svg+xml;charset=utf-8' });
    const svgUrl = URL.createObjectURL(svgBlob);
    
    const downloadLink = document.createElement('a');
    downloadLink.href = svgUrl;
    downloadLink.download = 'avatar.svg';
    document.body.appendChild(downloadLink);
    downloadLink.click();
    document.body.removeChild(downloadLink);
    URL.revokeObjectURL(svgUrl);
  } else {
    // PNG 다운로드
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    const img = new Image();
    
    canvas.width = 400;
    canvas.height = 400;
    
    img.onload = function() {
      ctx.drawImage(img, 0, 0, 400, 400);
      canvas.toBlob(function(blob) {
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'avatar.png';
        a.click();
        URL.revokeObjectURL(url);
      });
    };
    
    img.src = 'data:image/svg+xml;base64,' + btoa(svg);
  }
};


// 기본 선택 상태 설정
function setDefaultSelections() {
  // 각 옵션의 기본값에 selected 클래스 추가
  Object.keys(avataaarsData).forEach(option => {
    const value = avataaarsData[option];
    const selectedItem = document.querySelector(`[data-option="${option}"][data-value="${value}"]`);
    if (selectedItem) {
      selectedItem.classList.add('selected');
    }
  });
}

// 라이브러리 로딩 확인 함수
function waitForLibraries() {
  return new Promise((resolve) => {
    const checkLibraries = () => {
      if (window.React && window.ReactDOM && window.Avataaars) {
        console.log('모든 라이브러리가 로드되었습니다.');
        resolve();
      } else {
        console.log('라이브러리 로딩 대기 중...');
        setTimeout(checkLibraries, 100);
      }
    };
    checkLibraries();
  });
}

// 페이지 로드 시 초기화
document.addEventListener('DOMContentLoaded', async function() {
  // 기본 페이지 표시
  showPage('mainPage');
  
  // 라이브러리 로딩 대기
  await waitForLibraries();
  
  // Avataaars React 컴포넌트 렌더링
  renderAvataaarsReact();
  setDefaultSelections();
});