const { BrowserWindow, ipcMain } = require('electron');
const path = require('path');

module.exports = {
    /**
     * Object which will be converted into a HTML input
     * @typedef DialogInput
     * @type {Object}
     * @property {String} name
     * @property {String} type
     * @property {String} value
     */

    /**
     * Options to controll input dialog shown to user
     * @typedef InputDialogOptions
     * @type {Object}
     * @property {String} message  Message to display above above inputs
     * @property {String} error_message    Error message to display between message and inputs
     * @property {Array.<DialogInput>} inputs  Inputs for collecting data from user
     */

    /**
     * Shows input dialog to user which allows the user to submit more data
     * @param {InputDialogOptions} options 
     * @returns {Promise} 
     */
    showInputFormSync(options) {
        return new Promise((resolve, reject) => {
            const options_ = Object.assign({
                message: "",
                error_message: "",
                inputs: [],
            },
                options || {}
            );

            ipcMain.on("input-dialog-response",);

            let window = new BrowserWindow({
                frame: null,
                transparent: true,
                show: false,
                webPreferences: {
                    preload: path.join(__dirname, 'preload.js')
                }
            });
            window.loadFile(path.join(__dirname, '/dialog.html'));

            window.once("blur", () => destroyInput())
            window.once('ready-to-show', () => {
                this.window.show()
            });

            const respond = (data) => {
                resolve();
            }
        })
    }
}