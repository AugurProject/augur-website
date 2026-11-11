// Copy buttons appear only with JavaScript; the hex values stay selectable text.
const status = document.querySelector<HTMLElement>('[data-copy-status]');
for (const button of document.querySelectorAll<HTMLButtonElement>('[data-copy]')) {
 const label = button.querySelector<HTMLElement>('.copy-label')!;
 let reset = 0;
 button.hidden = false;
 button.addEventListener('click', async () => {
  const hex = button.dataset.copy!;
  try {
   await navigator.clipboard.writeText(hex);
   button.dataset.copied = '';
   label.textContent = 'Copied';
   if (status) status.textContent = `Copied ${hex}`;
   clearTimeout(reset);
   reset = window.setTimeout(() => { delete button.dataset.copied; label.textContent = 'Copy'; }, 1800);
  } catch {
   // Clipboard access can be denied; select the value so it is one keystroke away.
   const value = button.parentElement?.querySelector('.hex');
   if (value) { const range = document.createRange(); range.selectNodeContents(value); getSelection()?.removeAllRanges(); getSelection()?.addRange(range); }
   if (status) status.textContent = `${hex} is selected, ready to copy.`;
  }
 });
}

// Marks this file as a module, so its names stay out of the global scope.
export {};
