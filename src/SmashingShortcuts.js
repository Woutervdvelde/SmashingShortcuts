const { BrowserWindow } = require('electron');
const path = require("path");


class SmashingShortcuts {
    window = null;

    constructor() {}

    showInput() {
        this.window = new BrowserWindow({
            frame: null,
            transparent: true
        });
        this.window.loadFile(path.join(__dirname, 'input.html'));
    }
}

module.exports = {SmashingShortcuts: SmashingShortcuts}