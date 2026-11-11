// Copy the address; the label turns to “Copied” for a moment and a polite status confirms it.
const status = document.querySelector<HTMLElement>('[data-copy-address-status]');
for (const button of document.querySelectorAll<HTMLButtonElement>('[data-copy-address]')) {
  let timer = 0;
  button.addEventListener('click', async () => {
    try {
      await navigator.clipboard.writeText(button.dataset.copyAddress!);
      button.dataset.copied = '';
      if (status) status.textContent = 'Contract address copied';
      clearTimeout(timer);
      timer = window.setTimeout(() => {
        delete button.dataset.copied;
        if (status) status.textContent = '';
      }, 2000);
    } catch {
      if (status) status.textContent = 'Could not copy. Select the address and copy it instead.';
    }
  });
}

// Marks this file as a module, so its names stay out of the global scope.
export {};
