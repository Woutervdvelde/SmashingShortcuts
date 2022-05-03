const { dialog, BrowserWindow } = require('electron');
const InputDialog = require("../../util/dialog/InputDialog");
const path = require('path');

module.exports = {
    name: 'add',
    alias: ['a', 'create', 'new'],
    typehint: 'url...',
    usage: 'add shortcut to a website',
    description: 'Creates a new shortcut to the specified web address.',
    async execute(ShortcutClient, args) {
        const message = "Add shortcut details:";
        const inputs = [
            {
                name: "shortcut",
                type: "text",
                label: ""
            },
            {
                name: "url",
                type: "url",
                value: args[0] || null
            }
        ];

        // let window = new BrowserWindow({
        //     frame: null,
        //     transparent: true,
        //     show: false,
        // });
        // window.loadFile(path.join(__dirname, '/url.html'));
        // window.once('ready-to-show', () => window.show());
        // window.once('blur', () => window.destroy());


        const response = await InputDialog.showInputFormSync({message: message, inputs: inputs});
        console.log(response);
        // return true;
    }
}