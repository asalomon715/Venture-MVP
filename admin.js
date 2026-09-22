document.getElementById('exportBtn').onclick = () => {
  try {
    const events = JSON.parse(localStorage.getItem('platePalEvents') || '[]');
    const url = URL.createObjectURL(new Blob([JSON.stringify({exportedAt:new Date().toISOString(), events}, null, 2)], {type:'application/json'}));
    const link = document.createElement('a'); link.href = url; link.download = 'plate-pal-test-data.json'; link.click();
    setTimeout(() => URL.revokeObjectURL(url), 1000);
  } catch { document.getElementById('adminStatus').textContent = 'Could not read this browser’s activity.'; }
};
