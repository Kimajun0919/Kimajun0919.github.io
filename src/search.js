import { searchDocuments } from './api.js';

const searchForm = document.getElementById('search-form');
const searchInput = document.getElementById('search-input');
const searchResults = document.getElementById('search-results');

function renderResults(data) {
  if (!searchResults) {
    return;
  }

  if (!data || !Array.isArray(data.results) || data.results.length === 0) {
    searchResults.innerHTML = '<p>검색 결과가 없습니다.</p>';
    return;
  }

  const items = data.results
    .map(
      (item) => `
        <article class="result-item">
          <h3>${item.title ?? '무제'}</h3>
          <p>${item.snippet ?? '요약이 없습니다.'}</p>
        </article>
      `,
    )
    .join('');

  searchResults.innerHTML = items;
}

if (searchForm) {
  searchForm.addEventListener('submit', async (event) => {
    event.preventDefault();

    const query = searchInput?.value?.trim();
    if (!query) {
      renderResults({ results: [] });
      return;
    }

    searchResults.innerHTML = '<p>검색 중...</p>';

    try {
      const response = await searchDocuments({ query });
      renderResults(response);
    } catch (error) {
      console.error('Search failed', error);
      if (searchResults) {
        searchResults.innerHTML =
          '<p>검색에 실패했습니다. 잠시 후 다시 시도해 주세요.</p>';
      }
    }
  });
}

