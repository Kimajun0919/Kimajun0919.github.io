// 업로드 섹션에서 사용하는 DOM 요소들을 한 번만 찾아 재사용합니다.
const pdfInput = document.getElementById('pdfUpload');
const uploadButton = document.getElementById('uploadBtn');
const uploadStatus = document.getElementById('uploadStatus');

// 화면에 표시되는 업로드 상태 메시지를 갱신합니다.
function setUploadMessage(message) {
  if (uploadStatus) {
    uploadStatus.textContent = message;
  }
}

// 선택한 PDF 파일들을 Supabase Edge Function(`/ingest`)에 전송합니다.
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
    if (uploadButton) uploadButton.disabled = true;
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
    if (uploadButton) uploadButton.disabled = false;
  }
}

if (uploadButton) {
  // 업로드 버튼 클릭 시 실제 업로드 로직이 실행됩니다.
  uploadButton.addEventListener('click', uploadPdfs);
}

