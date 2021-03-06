import {Component, OnInit} from '@angular/core';
import {AlertController} from "@ionic/angular";
import {WebApi} from "../../../providers/web-api.service";
import {UserInfo} from "../../../providers/user-info.service";
import {ImagePicker} from '@ionic-native/image-picker/ngx';
import {Camera, CameraOptions} from '@ionic-native/camera/ngx';
import {Alert} from "../../../providers/alert.service";
import {NavController} from "@ionic/angular";
import {MyJpush} from "../../../providers/my-jpush.service";
import {MyLoading} from "../../../providers/my-loading.service";

@Component({
    selector: 'app-myinfo',
    templateUrl: './myinfo.page.html',
    styleUrls: ['./myinfo.page.scss'],
})
export class MyinfoPage implements OnInit {

    constructor(public alertController: AlertController,
                public webapi: WebApi,
                public userInfo: UserInfo,
                public imagePicker: ImagePicker,
                public camera: Camera,
                public myalert: Alert,
                public nav: NavController,
                public myJpush: MyJpush,
                public myLoading: MyLoading) {
    }

    public name;
    public photo;
    public phone;
    public ver;
    public status;
    public open = false;
    public alert1 = null;

    ngOnInit() {
        this.getUserInfo();
    }

    open1(){
        setTimeout(()=>{
            this.alert1=null
        },1500)
    }

    public getUserInfo() {
        this.webapi.getUserInfo().then((data) => {
            console.log('stattus:' + JSON.stringify(data));
            this.updateName();
        });
    }

    public updateName() {
        this.name = this.userInfo.name;
        this.photo = this.userInfo.avatar;
        this.phone = this.userInfo.phone;
        this.ver = this.userInfo.ver;
        console.log('this.name:' + this.name)
        console.log('this.photo:' + this.photo)
        console.log('this.phone:' + this.phone)
        console.log('this.ver:' + this.ver)
        // this.status=this.userInfo.sta
    }

    async presentAlertCheckbox() {
        if (this.alert1 != null) {
            return
        }
        this.alert1 = await this.alertController.create({
            header: '??????',
            mode: 'ios',
            inputs: [
                {
                    name: 'name1',
                    type: 'text',
                    placeholder: '???????????????',
                    value: this.name,
                },
            ],

            buttons: [
                {
                    text: '??????',
                    role: 'cancel',
                    cssClass: 'secondary',
                    handler: () => {
                        console.log('Confirm Cancel');
                        this.open1()
                    }
                }, {
                    text: '??????',
                    handler: (res) => {
                        this.open1()
                        console.log('Confirm Ok:' + JSON.stringify(res));
                        let body = {};
                        let name1 = res['name1'];
                        body['name'] = name1;
                        if (name1 == '' || name1 == undefined || name1.length < 1) {
                            this.myalert.presentAlertHint('???????????????')
                        } else {
                            this.webapi.updateUserInfoById(body).then((data) => {
                                this.getUserInfo()
                            });
                        }


                    }
                }
            ]
        });


        await this.alert1.present();
        console.log('123123')
    }

    async presentAlertCheckbox1() {
        if (this.alert1 != null) {
            return
        }
        this.alert1 = await this.alertController.create({
            header: '?????????',
            mode: 'ios',
            inputs: [
                {
                    name: 'name1',
                    type: 'text',
                    placeholder: '??????????????????',
                    value: this.phone,
                },
            ],
            buttons: [
                {
                    text: '??????',
                    role: 'cancel',
                    cssClass: 'secondary',
                    handler: () => {
                        this.open1()
                        console.log('Confirm Cancel');
                    }
                }, {
                    text: '??????',
                    handler: (res) => {
                        this.open1()
                        console.log('Confirm Ok:' + JSON.stringify(res));
                        let body = {};
                        let name1 = res['name1'];
                        body['phone'] = name1;
                        if (name1 == '' || name1 == undefined || name1.length < 1) {
                            this.myalert.presentAlertHint('?????????????????????')
                        } else {
                            this.webapi.updateUserInfoById(body).then((data) => {
                                this.getUserInfo()
                            });
                        }

                    }
                }
            ]
        });
        await this.alert1.present();
        console.log('this.username:' + this.userInfo.name)
    }

    onChange(e) {
        console.log('change')
        const input = e.target;
        const files = e.target.files;
        console.log('file:' + files[0])
        const file = files[0]
        let mfiles = []
        mfiles.push(files[0])
        this.webapi.File(mfiles).then((data) => {
            let fileResult = data.data
            let body = {}
            body['photoId'] = JSON.stringify(fileResult.id)
            this.webapi.updateUserInfoById(body).then((data) => {
                this.getUserInfo()
            })
        })
    }

    toLogout() {
        if (this.alert1 != null) {
            return
        }
        let body = {}
        body['hint'] = '??????'
        body['msg'] = '???????????????????????????'
        body['bts'] = [{
            text: '??????',
            role: 'cancel',
            handler: () => {
                this.open1()
                console.log('Confirm Cancel');
            }
        },
            {
                text: '??????',
                handler: () => {
                    console.log('Confirm Cancel');
                    this.open1()
                    this.userInfo.logout()
                    this.myJpush.setAlias('')
                    this.myLoading.show('?????????')
                    setTimeout(() => {
                        this.nav.navigateRoot('login')
                    }, 1500)

                }
            }]
        this.alert1=this.myalert.show(body)
    }

    toBack() {
        this.nav.pop()
    }
}
