const { ipcRenderer, contextBridge } = require('electron');
const Store = new (require('electron-store'))();


process.once('loaded', () => {
  window.onmessage = (event) => {
    const message = event.data;
    ipcRenderer.send('input-dialog-response', message);
  }

  contextBridge.exposeInMainWorld("inputDialogMessage", Store.get('input-dialog-message'));
  contextBridge.exposeInMainWorld("inputDialogErrorMessage", Store.get('input-dialog-error_message'));
  contextBridge.exposeInMainWorld("inputDialogInputs", Store.get('input-dialog-inputs'));
});