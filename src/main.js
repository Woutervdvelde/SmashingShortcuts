const { app, BrowserWindow, globalShortcut } = require('electron');
const { SmashingShortcuts } = require("./SmashingShortcuts");
const path = require("path");

const ShortcutClient = new SmashingShortcuts();

const shortcutTriggered = (e) => {
    ShortcutClient.showInput();
}

app.whenReady().then(() => {
    // globalShortcut.register('Alt+CommandOrControl+I', shortcutTriggered);
    globalShortcut.register('CommandOrControl+I', shortcutTriggered);
    app.on('window-all-closed', (e) => {ShortcutClient.destroyInput()});
})