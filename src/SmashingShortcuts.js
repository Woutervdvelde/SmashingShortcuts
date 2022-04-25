const { BrowserWindow, ipcMain } = require('electron');
const path = require("path");
const Store = require("electron-store");


class SmashingShortcuts {
    store = null;
    window = null;

    constructor() {
        this.store = new Store();
        ipcMain.on('input-close', () => this.destroyInput());
        ipcMain.on('command', (e, m) => this.parseCommand(e, m))
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

        this.window.once("blur", () => this.destroyInput())
        this.window.once('ready-to-show', () => {
            this.window.show()
        });
    }

    destroyInput() {
        if (!this.window) return;
        this.window.destroy();
        this.window = null;
    }

    parseCommand(event, message) {
        console.log(message);
    }
}

module.exports = {SmashingShortcuts: SmashingShortcuts}