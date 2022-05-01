const { dialog, BrowserWindow } = require('electron');
const path = require('path');

module.exports = {
    name: 'add',
    alias: ['a', 'create', 'new'],
    typehint: 'url...',
    usage: 'add shortcut to a website',
    description: 'Creates a new shortcut to the specified web address.',
    async execute(ShortcutClient, args) {
        // let window = new BrowserWindow({
        //     frame: null,
        //     transparent: true,
        //     show: false,
        // });
        // window.loadFile(path.join(__dirname, '/url.html'));
        // window.once('ready-to-show', () => window.show());
        // window.once('blur', () => window.destroy());


        // const response = await dialog.showOpenDialogSync(ShortcutClient.window, {type: "question"});
        // return true;
    }
}