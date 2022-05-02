const { BrowserWindow, ipcMain } = require('electron');
const fs = require('fs');
const path = require("path");
const Store = require("electron-store");


class ShortcutClient {
    store = null;
    window = null;
    shortcuts = {};
    commands = {};

    constructor() {
        this.store = new Store();
        this.loadShortcuts();
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

    loadShortcuts() {
        const shortcuts = {};
        this.store.set('shortcuts', shortcuts);
    }

    loadCommands() {
        const mainDir = path.join(__dirname, "../commands/");
        const directories = fs.readdirSync(mainDir, { withFileTypes: true })
            .filter(f => f.isDirectory())
            .map(f => f.name);
        const commands = {};

        directories.forEach(dir => {
            try {
                const command = require(path.join(mainDir, dir, "command.js"));
                const sub_files = fs.readdirSync(path.join(mainDir, dir, "/subcommands/"))
                    .filter(file => file.endsWith(".js"));
                const subcommands = sub_files.map(file => require(path.join(mainDir, dir, "/subcommands/", file)));
                command.subcommands = subcommands;
                commands[command.name] = command;
            } catch (e) {
                console.error(e);
            }
        });

        this.commands = commands;
        this.store.set('commands', commands);
    }

    parseCommand(event, message) {
        if (!message.data) return;
        const args = message.data.split(' ');
        const command = args.shift();

        if (!command) return;
        //check for shortcuts before commands
        this.handleCommand(command, args);
    }

    async handleCommand(command, args) {
        command = this.commands[command];
        if (!command) return;

        const response = await command.execute(this, args);
        if (response) this.destroyInput();
    }
}

module.exports = { ShortcutClient: ShortcutClient }