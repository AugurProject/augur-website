// Inlined right after the announcement bar so a dismissed bar never paints.
// Without JavaScript the bar stays and its close button stays hidden.
(() => {
  const bar = document.currentScript?.previousElementSibling;
  if (!bar) return;
  try {
    if (localStorage.getItem('augur:announcement-dismissed') === bar.dataset.announcement) {
      document.documentElement.dataset.announcement = 'dismissed';
      bar.remove();
      return;
    }
  } catch {}
  bar.querySelector('[data-announcement-dismiss]')?.removeAttribute('hidden');
})();
