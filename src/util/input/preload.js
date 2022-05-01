const { ipcRenderer, contextBridge } = require('electron');
const Store = require('electron-store');


process.once('loaded', () => {
  window.onmessage = (event) => {
    const message = event.data;
    if (!message.type) return;
    ipcRenderer.send(message.type, message);
  }

  contextBridge.exposeInMainWorld("shortcuts", new Store().get('shortcuts'));
  contextBridge.exposeInMainWorld("commands", new Store().get('commands'));
});