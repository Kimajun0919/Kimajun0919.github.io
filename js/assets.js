// ===== Dicebear HTTP API 기반 아바타 에셋 =====
// lorelei 스타일로 고정

// 헤어스타일 레이블
const HAIR_LABELS = {
  'variant01': '짧은머리1',
  'variant02': '짧은머리2',
  'variant03': '짧은머리3',
  'variant04': '짧은머리4',
  'variant05': '단발1',
  'variant06': '단발2',
  'variant07': '단발3',
  'variant08': '단발4',
  'variant09': '보브컷1',
  'variant10': '보브컷2',
  'variant11': '보브컷3',
  'variant12': '보브컷4',
  'variant13': '중단발1',
  'variant14': '중단발2',
  'variant15': '중단발3',
  'variant16': '중단발4',
  'variant17': '긴머리1',
  'variant18': '긴머리2',
  'variant19': '긴머리3',
  'variant20': '긴머리4',
  'variant21': '웨이브1',
  'variant22': '웨이브2',
  'variant23': '웨이브3',
  'variant24': '웨이브4',
  'variant25': '곱슬머리1',
  'variant26': '곱슬머리2',
  'variant27': '곱슬머리3',
  'variant28': '곱슬머리4',
  'variant29': '포니테일1',
  'variant30': '포니테일2',
  'variant31': '포니테일3',
  'variant32': '포니테일4',
  'variant33': '번1',
  'variant34': '번2',
  'variant35': '번3',
  'variant36': '번4',
  'variant37': '땋은머리1',
  'variant38': '땋은머리2',
  'variant39': '땋은머리3',
  'variant40': '땋은머리4',
  'variant41': '앞머리1',
  'variant42': '앞머리2',
  'variant43': '앞머리3',
  'variant44': '앞머리4',
  'variant45': '옆머리1',
  'variant46': '옆머리2',
  'variant47': '특이1',
  'variant48': '특이2'
};

// lorelei 스타일 옵션
const LORELEI_OPTIONS = {
  hair: ['variant01', 'variant02', 'variant03', 'variant04', 'variant05', 'variant06', 'variant07', 'variant08', 'variant09', 'variant10', 'variant11', 'variant12', 'variant13', 'variant14', 'variant15', 'variant16', 'variant17', 'variant18', 'variant19', 'variant20', 'variant21', 'variant22', 'variant23', 'variant24', 'variant25', 'variant26', 'variant27', 'variant28', 'variant29', 'variant30', 'variant31', 'variant32', 'variant33', 'variant34', 'variant35', 'variant36', 'variant37', 'variant38', 'variant39', 'variant40', 'variant41', 'variant42', 'variant43', 'variant44', 'variant45', 'variant46', 'variant47', 'variant48'],
  eyes: ['variant01', 'variant02', 'variant03', 'variant04', 'variant05', 'variant06', 'variant07', 'variant08', 'variant09', 'variant10', 'variant11', 'variant12', 'variant13', 'variant14', 'variant15', 'variant16', 'variant17', 'variant18', 'variant19', 'variant20', 'variant21', 'variant22', 'variant23', 'variant24'],
  eyebrows: ['variant01', 'variant02', 'variant03', 'variant04', 'variant05', 'variant06', 'variant07', 'variant08', 'variant09', 'variant10', 'variant11', 'variant12', 'variant13'],
  mouth: ['happy01', 'happy02', 'happy03', 'happy04', 'happy05', 'happy06', 'happy07', 'happy08', 'happy09', 'happy10', 'happy11', 'happy12', 'happy13', 'happy14', 'happy15', 'happy16', 'happy17', 'happy18', 'sad01', 'sad02', 'sad03', 'sad04', 'sad05', 'sad06', 'sad07', 'sad08', 'sad09'],
  nose: ['variant01', 'variant02', 'variant03', 'variant04', 'variant05', 'variant06'],
  glasses: ['variant01', 'variant02', 'variant03', 'variant04', 'variant05'],
  earrings: ['variant01', 'variant02', 'variant03'],
  freckles: ['variant01'],
  hairAccessories: ['flowers']
};

// Dicebear HTTP API를 사용한 아바타 생성 함수 (더 간단하고 안정적)
function createDicebearAvatar(options = {}) {
  const style = options.style || 'lorelei';
  const seed = options.seed || Date.now().toString();
  const dicebearOptions = options.dicebearOptions || {};
  
  try {
    // API URL 생성
    let apiUrl = `https://api.dicebear.com/9.x/${style}/svg?seed=${encodeURIComponent(seed)}`;
    
    // scale 옵션 추가 (기본값: 100)
    const scale = dicebearOptions.scale || 100;
    apiUrl += `&scale=${scale}`;
    
    // 옵션 추가
    if (dicebearOptions.backgroundColor && dicebearOptions.backgroundColor.length > 0) {
      // backgroundColor에서 # 제거 (Dicebear API는 hex 코드만 받음)
      const bgColors = dicebearOptions.backgroundColor.map(color => color.replace('#', ''));
      apiUrl += `&backgroundColor=${bgColors.join(',')}`;
    }
    if (dicebearOptions.hair && dicebearOptions.hair.length > 0) {
      apiUrl += `&hair=${encodeURIComponent(dicebearOptions.hair.join(','))}`;
    }
    if (dicebearOptions.eyes && dicebearOptions.eyes.length > 0) {
      apiUrl += `&eyes=${encodeURIComponent(dicebearOptions.eyes.join(','))}`;
    }
    if (dicebearOptions.eyebrows && dicebearOptions.eyebrows.length > 0) {
      apiUrl += `&eyebrows=${encodeURIComponent(dicebearOptions.eyebrows.join(','))}`;
    }
    if (dicebearOptions.mouth && dicebearOptions.mouth.length > 0) {
      apiUrl += `&mouth=${encodeURIComponent(dicebearOptions.mouth.join(','))}`;
    }
    if (dicebearOptions.nose && dicebearOptions.nose.length > 0) {
      apiUrl += `&nose=${encodeURIComponent(dicebearOptions.nose.join(','))}`;
    }
    if (dicebearOptions.glasses && dicebearOptions.glasses.length > 0) {
      apiUrl += `&glasses=${encodeURIComponent(dicebearOptions.glasses.join(','))}`;
    }
    if (dicebearOptions.earrings && dicebearOptions.earrings.length > 0) {
      apiUrl += `&earrings=${encodeURIComponent(dicebearOptions.earrings.join(','))}`;
    }
    if (dicebearOptions.freckles && dicebearOptions.freckles.length > 0) {
      apiUrl += `&freckles=${encodeURIComponent(dicebearOptions.freckles.join(','))}`;
    }
    if (dicebearOptions.hairAccessories && dicebearOptions.hairAccessories.length > 0) {
      apiUrl += `&hairAccessories=${encodeURIComponent(dicebearOptions.hairAccessories.join(','))}`;
    }
    
    // SVG를 img 태그로 반환 (object-fit: contain으로 비율 유지)
    const imgHtml = `<img src="${apiUrl}" alt="Avatar" style="width: 100%; height: 100%; display: block; object-fit: contain;" crossorigin="anonymous" />`;
    return imgHtml;
  } catch (error) {
    console.error('Error creating Dicebear avatar:', error);
    return '<div style="padding: 20px; text-align: center; color: red;">아바타 생성 오류</div>';
  }
}

// 색상 팔레트 (기존 유지)
const AVATAR_COLORS = {
  skin: ['#FFE0D4', '#FCCAAE', '#F7B896', '#E8A87C', '#D49574', '#C68563', '#A56F52', '#8D5524', '#6B4423'],
  hair: ['#090806', '#2C1B18', '#4E3329', '#6F4C3E', '#8B5A3C', '#A0634F', '#B89778', '#D4B896', '#E8D4BA', '#F5E8D6'],
  eyes: ['#1C1C1C', '#3E2723', '#5D4037', '#6D4C41', '#795548', '#1976D2', '#2196F3', '#4FC3F7', '#4CAF50', '#8BC34A', '#9C27B0', '#AB47BC', '#78909C', '#90A4AE'],
  eyebrows: ['#090806', '#2C1B18', '#4E3329', '#6F4C3E', '#8B5A3C', '#A0634F'],
  mouth: ['#C45B5D', '#D36769', '#E07B7D', '#E88B8D', '#F4A7A9', '#F5B9BB', '#8B5A5C', '#A5696B'],
  nose: ['#D4A791', '#C89A7F', '#BC8D6D', '#B0805B', '#A47349'],
  top: ['#EF5350', '#EC407A', '#AB47BC', '#7E57C2', '#5C6BC0', '#42A5F5', '#29B6F6', '#26C6DA', '#26A69A', '#66BB6A', '#9CCC65', '#D4E157', '#FFEE58', '#FFCA28', '#FFA726', '#FF7043', '#8D6E63', '#BDBDBD', '#78909C'],
  glasses: ['#000000', '#333333', '#666666', '#8B4513', '#D2691E', '#CD853F', '#DEB887', '#1976D2', '#E91E63', '#9C27B0'],
  earrings: ['#FFD700', '#C0C0C0', '#FF1744', '#2979FF', '#00E676', '#FF6D00', '#651FFF'],
  freckles: ['#D4A791', '#C89A7F', '#BC8D6D', '#B0805B'],
  hairAccessories: ['#FF1744', '#F50057', '#D500F9', '#651FFF', '#3D5AFE', '#2979FF', '#00B0FF', '#00E5FF', '#1DE9B6', '#00E676', '#76FF03', '#C6FF00', '#FFEA00', '#FFC400', '#FF9100', '#FF3D00']
};

// 전역 변수로 노출
window.HAIR_LABELS = HAIR_LABELS;
window.LORELEI_OPTIONS = LORELEI_OPTIONS;
window.AVATAR_COLORS = AVATAR_COLORS;
window.createDicebearAvatar = createDicebearAvatar;
