// 문서 목록 렌더링에 필요한 DOM 요소 캐시
const libraryList = document.getElementById('libraryList');
const libraryStatus = document.getElementById('libraryStatus');
const refreshLibraryBtn = document.getElementById('refreshLibraryBtn');

// API에서 넘어온 날짜 문자열을 사람이 읽기 쉬운 형태로 변환합니다.
function formatDate(value) {
  if (!value) return '알 수 없음';
  try {
    const date = new Date(value);
    if (Number.isNaN(date.getTime())) {
      return value;
    }
    return date.toLocaleString('ko-KR', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
    });
  } catch (_error) {
    return value;
  }
}

function renderLibrary(documents = []) {
  if (!libraryList) return;
  if (!Array.isArray(documents) || documents.length === 0) {
    libraryList.innerHTML = '<li>등록된 문서가 없습니다.</li>';
    return;
  }

  const items = documents
    .map((doc) => {
      const title = doc.title ?? '제목 없음';
      const chunkCount = typeof doc.chunk_count === 'number' ? doc.chunk_count : 0;
      const createdAt = formatDate(doc.created_at);
      const meta = [
        doc.authors ? `저자: ${doc.authors}` : null,
        doc.year ? `연도: ${doc.year}` : null,
        doc.language ? `언어: ${doc.language}` : null,
        chunkCount ? `청크 ${chunkCount}개` : '청크 없음',
      ]
        .filter(Boolean)
        .join(' · ');

      const doiMarkup = doc.doi
        ? `<a href="${doc.doi.startsWith('http') ? doc.doi : `https://doi.org/${doc.doi}`}" target="_blank" rel="noopener noreferrer">DOI</a>`
        : '';

      return `
        <li class="document-item">
          <div class="document-title">${title}</div>
          <div class="document-meta">${meta}</div>
          <div class="document-footer">
            <span class="document-date">업로드: ${createdAt}</span>
            ${doiMarkup}
          </div>
        </li>
      `;
    })
    .join('');

  libraryList.innerHTML = items;
}

async function loadDocuments() {
  if (!libraryStatus) return;

  try {
    libraryStatus.textContent = '목록을 불러오는 중...';
    const response = await window.fetchSupabase('/list');
    const documents = Array.isArray(response?.documents) ? response.documents : [];
    renderLibrary(documents);
    libraryStatus.textContent = `총 ${documents.length}건의 문서`;
  } catch (error) {
    console.error('문서 목록을 불러오지 못했습니다.', error);
    libraryStatus.textContent = `목록을 불러오는 데 실패했습니다: ${error.message ?? '알 수 없는 오류'}`;
    if (libraryList) {
      libraryList.innerHTML = '<li>목록을 불러오는 중 오류가 발생했습니다.</li>';
    }
  }
}

if (refreshLibraryBtn) {
  // 사용자가 버튼을 눌러 직접 문서를 새로고침할 수 있습니다.
  refreshLibraryBtn.addEventListener('click', loadDocuments);
}

if (typeof window !== 'undefined') {
  // 업로드 코드에서 문서 목록을 다시 읽도록 전역 함수로 노출합니다.
  window.refreshDocumentList = loadDocuments;
}

// 페이지 로딩 시 자동으로 최초 문서 목록을 불러옵니다.
loadDocuments();

