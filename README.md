# 크리스마스 기도 트리

크리스마스 기도제목을 남기고 트리에 카드로 달린 모습을 볼 수 있는 웹 애플리케이션입니다.

## 프로젝트 구조

```
/
├── index.html          # 메인 페이지
│
├── pages/              # 페이지 파일들
│   ├── write.html      # 기도제목 작성 페이지
│   ├── view.html       # 기도제목 보기 페이지
│   ├── tree.html       # 트리 뷰 페이지
│   ├── admin.html      # 관리자 페이지
│   └── display.html    # 전시 모드 페이지
│
├── css/
│   └── styles.css      # 메인 스타일시트
│
├── js/
│   ├── firebase.js     # Firebase 연동 및 데이터베이스 함수
│   └── utils.js        # 공통 유틸리티 함수
│
└── assets/             # 이미지 및 기타 리소스
    └── tree.svg        # 트리 SVG 파일 (참고용)
```

## 주요 기능

- **기도제목 작성**: 사용자가 기도제목과 작성자를 입력하여 저장
- **기도제목 조회**: 내가 작성한 기도제목과 랜덤 기도제목 보기
- **트리 뷰**: 모든 기도제목을 트리 주변에 카드로 표시
- **전시 모드**: 전체화면으로 트리와 기도제목을 표시
- **관리자 기능**: 기도제목 수정, 삭제, 전체 관리

## 기술 스택

- **Frontend**: HTML5, CSS3, Vanilla JavaScript (ES6 Modules)
- **Backend**: Firebase Realtime Database
- **배포**: GitHub Pages

## 파일 설명

### HTML 파일

- `index.html`: 메인 페이지, 트리 이미지와 주요 링크 제공 (루트)
- `pages/write.html`: 기도제목 작성 폼
- `pages/view.html`: 내 기도제목과 랜덤 기도제목 표시
- `pages/tree.html`: 트리에 모든 기도제목을 카드로 배치하여 표시
- `pages/admin.html`: 관리자 전용 페이지, 기도제목 관리 기능
- `pages/display.html`: 전시 모드, 전체화면 트리 뷰

### JavaScript 모듈

#### `js/firebase.js`
Firebase 데이터베이스 연동 및 기도제목 CRUD 함수:
- `createPrayer()`: 기도제목 생성
- `listPrayers()`: 기도제목 목록 조회
- `findMyLatest()`: 내가 작성한 최신 기도제목 조회
- `pickRandom()`: 랜덤 기도제목 조회
- `deletePrayer()`: 기도제목 삭제
- `updatePrayer()`: 기도제목 수정
- `deleteMultiplePrayers()`: 여러 기도제목 삭제
- `deleteAllPrayers()`: 전체 기도제목 삭제

#### `js/utils.js`
공통 유틸리티 함수:
- `initOnlineStatusMonitor()`: 인터넷 연결 상태 모니터링
- `escapeHtml()`: HTML 이스케이프 처리
- `debounce()`: 디바운스 함수

### CSS

#### `css/styles.css`
모든 스타일을 포함하는 통합 스타일시트:
- 기본 리셋 및 전역 스타일
- 애니메이션 및 키프레임
- 레이아웃 및 컨테이너
- 컴포넌트 (버튼, 카드, 폼 등)
- 트리 및 노트 스타일
- 반응형 미디어 쿼리
- 접근성 및 특수 기능

## 설정 방법

1. Firebase 프로젝트 생성 및 Realtime Database 활성화
2. `js/firebase.js`의 `firebaseConfig`에 본인의 Firebase 설정 정보 입력
3. Firebase Realtime Database 규칙 설정 (필요시)

## 배포

GitHub Pages를 사용하여 배포할 수 있습니다:
1. 레포지토리 설정에서 Pages 활성화
2. 루트 디렉토리를 소스로 선택
3. `index.html`이 루트에 있어야 함

## 브라우저 지원

- Chrome (권장)
- Firefox
- Safari
- Edge

ES6 Modules를 사용하므로 최신 브라우저가 필요합니다.

## 개발 가이드

### 코드 구조 개선사항

이 프로젝트는 다음과 같이 리팩토링되었습니다:

1. **폴더 구조화**: JavaScript와 CSS 파일을 각각의 폴더로 분리
2. **공통 코드 추출**: 반복되는 유틸리티 함수를 `utils.js`로 모듈화
3. **모듈화**: ES6 Modules를 활용한 코드 분리
4. **유지보수성 향상**: 주석 및 구조화를 통한 가독성 개선

### 새로운 기능 추가 시

1. 새로운 페이지를 추가하려면 HTML 파일을 루트에 추가
2. 페이지별 JavaScript 로직은 필요시 별도 모듈로 분리 가능
3. 공통 기능은 `js/utils.js`에 추가
4. Firebase 관련 함수는 `js/firebase.js`에 추가
5. 스타일은 `css/styles.css`에 추가 (컴포넌트별로 주석으로 구분)

## 라이선스

이 프로젝트는 개인 사용 목적으로 개발되었습니다.

