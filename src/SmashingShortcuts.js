const { BrowserWindow, ipcMain } = require('electron');
const path = require("path");


class SmashingShortcuts {
    window = null;

    constructor() {
        ipcMain.on('input-close', () => this.destroyInput());
    }

    destroyInput() {
        if (!this.window) return;
        this.window.destroy();
        this.window = null;
    }

    showInput() {
        this.destroyInput();
        this.window = new BrowserWindow({
            frame: null,
            transparent: true,
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
        this.window.on("blur", () => this.destroyInput())
    }
}

module.exports = {SmashingShortcuts: SmashingShortcuts}