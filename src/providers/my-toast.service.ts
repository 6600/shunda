import { Injectable } from '@angular/core';
import { ToastController } from '@ionic/angular';

/**
 * Toast封装
 */
@Injectable()
export class MyToast {

    public constructor(
        private toastCtrl: ToastController
    ) { }

    /**
     * 显示Toast
     * @param msg 消息
     */
    // public show(msg: string) {
    //     const toast=this.toastCtrl.create({
    //         message: msg,
    //         duration: 3000,
    //         position: 'bottom'
    //     });
    //     toast.present();
    // }
    async show(msg:string) {
        const toast = await this.toastCtrl.create({
            message: msg,
            duration: 3000,
            position: 'bottom',
            mode:'ios',
        });
        toast.present();
    }
}