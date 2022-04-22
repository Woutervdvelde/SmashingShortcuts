const { ipcRenderer } = require('electron');

process.once('loaded', () => {
  window.addEventListener('message', event => {
    const message = event.data;
    if (!message.type) return;
    ipcRenderer.send(message.type, message);
  });
});