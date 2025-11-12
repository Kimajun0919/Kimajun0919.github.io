// 검색 영역에서 사용할 DOM 요소를 미리 찾아 둡니다.
const searchInput = document.getElementById('searchInput');
const searchButton = document.getElementById('searchBtn');
const resultContainer = document.getElementById('result');

// 사용자 입력 혹은 API 응답 안에 HTML 태그가 있어도 안전하게 출력하기 위한 유틸입니다.
function escapeHtml(value = '') {
  return String(value)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

function formatPageRange(item = {}) {
  const explicitPage = typeof item.page === 'string' ? item.page.trim() : '';
  if (explicitPage) {
    return explicitPage;
  }

  const pageFrom = item.page_from ?? item.pageFrom ?? null;
  const pageTo = item.page_to ?? item.pageTo ?? null;

  if (pageFrom !== null && pageTo !== null) {
    return pageFrom === pageTo ? String(pageFrom) : `${pageFrom}-${pageTo}`;
  }

  if (pageFrom !== null || pageTo !== null) {
    return String(pageFrom ?? pageTo);
  }

  return '';
}

function renderResults(data) {
  if (!resultContainer) return;

  const results = Array.isArray(data?.results) ? data.results : [];
  if (results.length === 0) {
    resultContainer.innerHTML = '<p>검색 결과가 없습니다.</p>';
    return;
  }

  const cards = results
    .map((item) => {
      const sentence =
        item.sentence ??
        item.text ??
        item.content ??
        '결과 문장이 제공되지 않았습니다.';
      const page = formatPageRange(item);
      const doi = item.doi ?? item.reference ?? item.link ?? '';

      const pageMarkup = page ? `<p class="result-page">페이지: ${escapeHtml(page)}</p>` : '';
      const doiMarkup = doi
        ? `<p class="result-doi">DOI: <a href="${escapeHtml(
            typeof doi === 'string' && doi.startsWith('http') ? doi : `https://doi.org/${doi}`,
          )}" target="_blank" rel="noopener noreferrer">${escapeHtml(doi)}</a></p>`
        : '';

      return `
        <article class="result-card">
          <p class="result-sentence">${escapeHtml(sentence)}</p>
          ${pageMarkup}
          ${doiMarkup}
        </article>
      `;
    })
    .join('');

  resultContainer.innerHTML = cards;
}

async function performSearch() {
  if (!searchInput || !resultContainer) return;

  const query = searchInput.value.trim();
  if (!query) {
    resultContainer.innerHTML = '<p>검색어를 입력해 주세요.</p>';
    console.log('Search aborted: empty query.');
    return;
  }

  try {
    if (searchButton) searchButton.disabled = true;
    resultContainer.innerHTML = '<p>검색 중...</p>';
    console.log('Search request started:', { query });

    const response = await window.fetchSupabase('/search', 'POST', { query });
    console.log('Search response received:', response);
    renderResults(response);
  } catch (error) {
    console.error('Search request failed', error);
    resultContainer.innerHTML = `<p>검색에 실패했습니다: ${
      error.message ?? '알 수 없는 오류'
    }</p>`;
  } finally {
    if (searchButton) searchButton.disabled = false;
  }
}

if (searchButton) {
  // 버튼 클릭 시 검색을 수행합니다.
  searchButton.addEventListener('click', performSearch);
}

if (searchInput) {
  // 엔터 키로도 검색이 되도록 키보드 이벤트를 연결합니다.
  searchInput.addEventListener('keydown', (event) => {
    if (event.key === 'Enter') {
      event.preventDefault();
      performSearch();
    }
  });
}

