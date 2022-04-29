const { BrowserWindow, ipcMain } = require('electron');
const fs = require('fs');
const path = require("path");
const Store = require("electron-store");


class SmashingShortcuts {
    store = null;
    window = null;
    commands = {};

    constructor() {
        this.store = new Store();
        this.loadCommands();
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

    loadCommands() {
        const files = fs.readdirSync(path.join(__dirname, './commands')).filter(file => file.endsWith('.js'));
        console.log(files);
    }

    parseCommand(event, message) {
        if (!message.data) return;
        const args = message.data.split(' ');
        const command = args.shift();

        if (!command) return;
        //check for shortcuts before commands
        this.handleCommand(command, args);
    }

    handleCommand(command, args) {
        console.log(command);
        console.log(args);
    }
}

module.exports = {SmashingShortcuts: SmashingShortcuts}