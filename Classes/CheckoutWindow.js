const {BrowserWindow, session} = require('electron');
const region_data = require('../data/region_data');

class CheckoutWindow extends BrowserWindow{
    constructor(region, cookie, type, id){
        super({
            height: 700,
            width: 1100,
            minWidth: 1100,
            minHeight:700,
            webPreferences:{
                session: session.fromPartition(id.toString())
            }
        })
        this.filter = [];
        this.region = region;
        this.webContents.session.clearStorageData([], () => {
            if(cookie.includes('document.cookie')) cookie = cookie.split('"')[1];
            this.webContents.session.cookies.set({url: 'http://www.'+region_data[this.region].base, name: cookie.split('=')[0], value: cookie.split('=')[1]}, (error) => {
                if(error) throw new Error(error);
                this.loadURL(`https://www.${region_data[this.region].base}/on/demandware.store/Sites-adidas-${region_data[this.region].countrycode}-Site/${region_data[this.region].lang}/${type==="paypal"?"CODelivery-RedirectToPaypal":"COShipping-Show"}`)
            })
        });
        this.webContents.session.webRequest.onBeforeSendHeaders(this.filter, (details,callback) => {
            details.requestHeaders['User-Agent'] = "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_12_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/64.0.3282.186 Safari/537.36";
            callback({cancel: false, requestHeaders: details.requestHeaders});
        });
    }
}

module.exports = CheckoutWindow;