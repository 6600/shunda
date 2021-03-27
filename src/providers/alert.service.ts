import {AlertController} from "@ionic/angular";
import {inject, Injectable} from "@angular/core";
import {MyLoading} from "./my-loading.service";

@Injectable()
export class Alert {

    constructor(private alertController:AlertController){
    }

    public show(body){
        let alert=this.presentAlertConfirm(body)
        return alert
    }

    async presentAlertConfirm(body) {
        let hint=body['hint']
        let msg=body['msg']
        let bts=body['bts']
        const alert = await this.alertController.create({
            cssClass: 'my-custom-class',
            mode:'ios',
            header: hint,
            message: msg,
            buttons: bts
        });

        await alert.present();
        return alert
    }

    async presentAlertHint(msg) {
        // let hint=body['hint']
        // let bts=body['bts']
        const alert = await this.alertController.create({
            cssClass: 'my-custom-class',
            mode:'ios',
            header: '提示',
            message: msg,
            buttons: [{
                    text: '确定',
                    // role: 'cancel',
                    // cssClass: 'secondary',
                    handler: (blah) => {
                        // console.log('Confirm Cancel: blah');
                    }
            }]
        });

        await alert.present();
    }

}