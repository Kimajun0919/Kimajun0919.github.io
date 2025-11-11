import { uploadDocument } from './api.js';

const uploadForm = document.getElementById('upload-form');
const pdfInput = document.getElementById('pdf-input');
const uploadStatus = document.getElementById('upload-status');

function setStatus(message) {
  if (uploadStatus) {
    uploadStatus.textContent = message;
  }
}

if (uploadForm) {
  uploadForm.addEventListener('submit', async (event) => {
    event.preventDefault();

    const file = pdfInput?.files?.[0];
    if (!file) {
      setStatus('PDF 파일을 선택해 주세요.');
      return;
    }

    setStatus('업로드 중입니다...');

    try {
      const result = await uploadDocument(file);
      const message = typeof result === 'string' ? result : result?.message;
      setStatus(message ?? '업로드가 완료되었습니다.');
      uploadForm.reset();
    } catch (error) {
      console.error('Upload failed', error);
      setStatus('업로드에 실패했습니다. 잠시 후 다시 시도해 주세요.');
    }
  });
}

