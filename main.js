const { app, ipcMain } = require('electron');
const CheckoutWindow = require('./Classes/CheckoutWindow');
const UserInterfaceWindow = require('./Classes/UIWindow');
let UIWindow;
let checkoutWindowMap = {};
let checkoutWindowKey = 0;

app.on('ready', () => {
    UIWindow = new UserInterfaceWindow();
})

ipcMain.on('open_new',(e, task) => {
    checkoutWindowMap[checkoutWindowKey] = new CheckoutWindow(task.region, task.cookie, task.type, checkoutWindowKey++);
})

ipcMain.on('close', () => {
    for(let key of Object.keys(checkoutWindowMap)){
        try{
            checkoutWindowMap[key].close();
        }catch(e){};
    }
    UIWindow.close();
})
ipcMain.on('close_all', () => {
    for(let key of Object.keys(checkoutWindowMap)){
        if(checkoutWindowMap[key]){
            try{
                checkoutWindowMap[key].close();
                checkoutWindowMap[key] = false;
            }catch(e){
                checkoutWindowMap[key] = false;
            };
        }
    }
})