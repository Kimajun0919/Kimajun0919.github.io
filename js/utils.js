/**
 * 공통 유틸리티 함수들
 */

/**
 * 인터넷 연결 상태 모니터링 및 표시
 */
export function initOnlineStatusMonitor() {
  function updateOnlineStatus() {
    const indicator = document.getElementById('offline-indicator');
    if (!navigator.onLine) {
      if (!indicator) {
        const div = document.createElement('div');
        div.id = 'offline-indicator';
        div.className = 'offline-indicator show';
        div.textContent = '⚠️ 인터넷 연결이 끊어졌습니다';
        document.body.appendChild(div);
      }
    } else {
      if (indicator) {
        indicator.classList.remove('show');
        setTimeout(() => indicator.remove(), 300);
      }
    }
  }

  window.addEventListener('online', updateOnlineStatus);
  window.addEventListener('offline', updateOnlineStatus);
  updateOnlineStatus();
}

/**
 * HTML 이스케이프 처리
 */
export function escapeHtml(text) {
  const div = document.createElement('div');
  div.textContent = text;
  return div.innerHTML;
}

/**
 * 디바운스 함수
 */
export function debounce(func, wait) {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}

