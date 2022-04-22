const { BrowserWindow, ipcMain } = require('electron');
const path = require("path");


class SmashingShortcuts {
    window = null;

    constructor() {
        ipcMain.on('input-close', () => this.destroyInput());
    }

    destroyInput() {
        if (!this.window) return;
        this.window.close();
        this.window = null;
    }

    showInput() {
        this.destroyInput();
        this.window = new BrowserWindow({
            frame: null,
            transparent: true,
            backgroundColor: 'transparent',
            show: false,
            webPreferences: {
                preload: path.join(__dirname, './input/preload.js'),
                nodeIntegration: false,
                enableRemoteModule: false,
                contextIsolation: true,
            }
        });
        this.window.loadFile(path.join(__dirname, '/input/input.html'));

        this.window.once('ready-to-show', () => {
            this.window.show()
        });
    }
}

module.exports = {SmashingShortcuts: SmashingShortcuts}