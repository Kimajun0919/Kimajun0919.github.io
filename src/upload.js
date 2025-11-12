const pdfInput = document.getElementById('pdfUpload');
const uploadButton = document.getElementById('uploadBtn');
const uploadStatus = document.getElementById('uploadStatus');

function setUploadMessage(message) {
  if (uploadStatus) {
    uploadStatus.textContent = message;
  }
}

async function uploadPdfs() {
  if (!pdfInput || !pdfInput.files || pdfInput.files.length === 0) {
    setUploadMessage('업로드할 PDF 파일을 선택해 주세요.');
    console.log('Upload aborted: no files selected.');
    return;
  }

  const formData = new FormData();
  Array.from(pdfInput.files).forEach((file) => {
    formData.append('files', file);
  });

  try {
    uploadButton.disabled = true;
    setUploadMessage('업로드 중입니다...');
    console.log('Upload started:', Array.from(pdfInput.files).map((file) => file.name));
    const response = await window.fetchSupabase('/ingest', 'POST', formData);
    const message =
      (response && typeof response === 'object' && response.message) || '업로드 완료';
    setUploadMessage(message);
    console.log('Upload success:', response);
    if (typeof window.refreshDocumentList === 'function') {
      window.refreshDocumentList();
    }
    pdfInput.value = '';
  } catch (error) {
    console.error('PDF upload failed', error);
    setUploadMessage(`업로드 실패: ${error.message ?? '알 수 없는 오류'}`);
  } finally {
    uploadButton.disabled = false;
  }
}

if (uploadButton) {
  uploadButton.addEventListener('click', uploadPdfs);
}

