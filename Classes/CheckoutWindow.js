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
        this.region = region;
        this.webContents.session.clearStorageData([], () => {
            this.webContents.session.cookies.set({url: 'http://www.'+region_data[this.region].base, name: cookie.split('=')[0], value: cookie.split('=')[1]}, (error) => {
                if(error){
                    console.log(error);
                }
                this.loadURL(`https://www.${region_data[this.region].base}/on/demandware.store/Sites-adidas-${region_data[this.region].countrycode}-Site/${region_data[this.region].lang}/${type==="paypal"?"CODelivery-RedirectToPaypal":"COShipping-Show"}`)
            })
        })
    }
}

module.exports = CheckoutWindow;