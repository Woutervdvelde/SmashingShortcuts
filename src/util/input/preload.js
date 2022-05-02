const { ipcRenderer, contextBridge } = require('electron');
const Store = new (require('electron-store'))();


process.once('loaded', () => {
  window.onmessage = (event) => {
    const message = event.data;
    if (!message.type) return;
    ipcRenderer.send(message.type, message);
  }

  contextBridge.exposeInMainWorld("shortcuts", Store.get('shortcuts'));
  contextBridge.exposeInMainWorld("commands", Store.get('commands'));
});