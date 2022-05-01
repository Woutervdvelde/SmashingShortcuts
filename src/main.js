const { app, globalShortcut } = require('electron');
const { ShortcutClient } = require("./util/SmashingShortcuts");

const SC = new ShortcutClient();

const shortcutTriggered = (e) => {
    SC.showInput();
}

app.whenReady().then(() => {
    // globalShortcut.register('Alt+CommandOrControl+I', shortcutTriggered);
    globalShortcut.register('CommandOrControl+I', shortcutTriggered);
    app.on('window-all-closed', (e) => {SC.destroyInput()});
})