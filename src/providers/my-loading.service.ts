import { Injectable } from '@angular/core';
import { LoadingController } from '@ionic/angular';

/**
 * 加载框封装
 */
@Injectable()
export class MyLoading {

    private loading;

    public constructor(
        public loadingCtrl: LoadingController
    ) { }

    /**
     * 显示加载框
     * @param content 提示信息
     */
    async show(message?: string,duration?:number) {
        console.log('loading')
        if(!this.loading){
            console.log('loading1')
            this.loading = await this.loadingCtrl.create({
                message: message || '加载中...',
                duration: duration!=null&&duration!=undefined?duration:5000
            });
            this.loading.present();
        }
    }

    /**
     * 隐藏加载框
     */
    async hide() {
        console.log('hide')
        if(this.loading){
            console.log('hide1')
            this.loading.dismiss();
            this.loading = null;
        }
    }
}