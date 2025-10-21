// ===== Dicebear API 기반 아바타 에셋 =====
// Dicebear CDN이 로드되면 window.dicebear에서 사용 가능

// Dicebear 스타일 옵션
const DICEBEAR_STYLES = {
  lorelei: 'lorelei',
  adventurer: 'adventurer',
  avataaars: 'avataaars',
  bigEars: 'bigEars',
  bigSmile: 'bigSmile',
  bottts: 'bottts',
  croodles: 'croodles',
  funEmoji: 'funEmoji',
  icons: 'icons',
  identicon: 'identicon',
  initials: 'initials',
  micah: 'micah',
  miniavs: 'miniavs',
  openPeeps: 'openPeeps',
  personas: 'personas',
  pixelArt: 'pixelArt',
  shapes: 'shapes',
  thumbs: 'thumbs'
};

// 한국어 레이블 매핑
const STYLE_LABELS = {
  lorelei: '로렐라이 (여성)',
  adventurer: '모험가',
  avataaars: '아바타스',
  bigEars: '큰 귀',
  bigSmile: '큰 미소',
  bottts: '로봇',
  croodles: '크룻들',
  funEmoji: '펀 이모지',
  icons: '아이콘',
  identicon: '아이덴티콘',
  initials: '이니셜',
  micah: '미카 (남성)',
  miniavs: '미니 아바타',
  openPeeps: '오픈 핍스',
  personas: '퍼소나',
  pixelArt: '픽셀 아트',
  shapes: '도형',
  thumbs: '엄지'
};

// 각 스타일별 옵션 (lorelei 스타일 예시)
const LORELEI_OPTIONS = {
  eyes: ['variant01', 'variant02', 'variant03', 'variant04', 'variant05', 'variant06', 'variant07', 'variant08', 'variant09', 'variant10', 'variant11', 'variant12', 'variant13', 'variant14', 'variant15', 'variant16', 'variant17', 'variant18', 'variant19', 'variant20', 'variant21', 'variant22', 'variant23', 'variant24'],
  eyebrows: ['variant01', 'variant02', 'variant03', 'variant04', 'variant05', 'variant06', 'variant07', 'variant08', 'variant09', 'variant10', 'variant11', 'variant12', 'variant13'],
  mouth: ['happy01', 'happy02', 'happy03', 'happy04', 'happy05', 'happy06', 'happy07', 'happy08', 'happy09', 'happy10', 'happy11', 'happy12', 'happy13', 'happy14', 'happy15', 'happy16', 'happy17', 'happy18', 'sad01', 'sad02', 'sad03', 'sad04', 'sad05', 'sad06', 'sad07', 'sad08', 'sad09'],
  nose: ['variant01', 'variant02', 'variant03', 'variant04', 'variant05', 'variant06'],
  glasses: ['variant01', 'variant02', 'variant03', 'variant04', 'variant05'],
  earrings: ['variant01', 'variant02', 'variant03'],
  freckles: ['variant01'],
  hairAccessories: ['flowers']
};

// Dicebear API를 사용한 아바타 생성 함수
function createDicebearAvatar(options = {}) {
  if (!window.dicebear) {
    console.error('Dicebear library not loaded');
    return '';
  }

  const style = options.style || 'lorelei';
  const seed = options.seed || Date.now().toString();
  
  try {
    // Dicebear collection에서 스타일 가져오기
    const styleModule = window.dicebear.collection[style];
    if (!styleModule) {
      console.error(`Style '${style}' not found`);
      return '';
    }

    // 아바타 생성
    const avatar = window.dicebear.core.createAvatar(styleModule, {
      seed: seed,
      ...options.dicebearOptions
    });

    return avatar.toString();
  } catch (error) {
    console.error('Error creating Dicebear avatar:', error);
    return '';
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
window.DICEBEAR_STYLES = DICEBEAR_STYLES;
window.STYLE_LABELS = STYLE_LABELS;
window.LORELEI_OPTIONS = LORELEI_OPTIONS;
window.AVATAR_COLORS = AVATAR_COLORS;
window.createDicebearAvatar = createDicebearAvatar;
