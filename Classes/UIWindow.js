const path = require('path');
const {BrowserWindow} = require('electron');

class UserInterfaceWindow extends BrowserWindow{
    constructor(){
        super({
            height: 300,
            width: 500,
            frame: false,
            minWidth: 500,
            minHeight: 300,
            maxHeight:300,
            maxWidth:500,
        })
        this.loadURL(path.join('file://', __dirname , '../data/index.html'))
    }
}

module.exports = UserInterfaceWindow;