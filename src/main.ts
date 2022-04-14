import { app, BrowserWindow, globalShortcut } from 'electron';
//Use for communication: https://www.electronjs.org/docs/latest/api/ipc-main

const shortcutTriggered = (e: void) => {
    console.log("~trgger");
}

app.whenReady().then(() => {
    globalShortcut.register('Shift+`', shortcutTriggered);
    app.on('window-all-closed', (e: void) => {/**preventing application from closing*/ });
})