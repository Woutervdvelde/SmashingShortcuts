const { app, BrowserWindow, globalShortcut } = require('electron')
//Use for communication: https://www.electronjs.org/docs/latest/api/ipc-main

const shortcutTriggered = (e) => {
    console.log("triggered")
}

app.whenReady().then(() => {
    // globalShortcut.register('Alt+CommandOrControl+I', shortcutTriggered);
    globalShortcut.register('Shift+`', shortcutTriggered);
    app.on('window-all-closed', (e) => {/**preventing application from closing*/ });
})