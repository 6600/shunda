import { Injectable } from '@angular/core';
import {Storage} from "@ionic/storage";

/**
 * 用户信息集合
 */
@Injectable()
export class UserInfo {


    constructor(private storage:Storage){

    }
    public token: string;

    public phone: string;
    public id:string;
    public loginName:string;
    public name: string;
    public avatar: string;
    public type: any;
    public workaddrs:any;
    public officeName:string;
    public ver='0.0.1';
    public normal_num=0;
    public exp_num=0;

    // 验证码过期时间
    public codeExpireTime = 0;
    // "memberInfoMap":{"phone":"15295053287","loginName":"admin","name":"小哥哥","photoId":"","isType":"0"}
    // public login(data) {
    //     if (data.accessToken != null) this.token = data.token;
    //     console.log('this.name1:'+JSON.stringify(data))
    //     this.phone = data.memberInfoMap.userName;
    //     this.name = data.memberInfoMap.loginName;
    //     this.type = data.memberInfoMap.isType;
    //     // console.log('1:'+JSON.stringify(data.memberInfoMapphotoId.photoId))
    //     if (data.memberInfoMap.photoId != null && data.memberInfoMap.photoId!="") this.avatar = data.memberInfoMap.photoId;
    //     else this.avatar = 'assets/pic_avatar.png';
    // }

    public login(data){
        this.phone=data.phone
        this.id=data.id
        this.loginName=data.loginName
        this.name=data.name
        this.avatar=data.avatar
        this.type=data.type
        this.ver=data.ver
        // this.type='1'
        // this.myJpush.setAlias(this.loginName)
    }

    public logout() {
        this.phone=null
        this.id=null
        this.loginName=null
        this.name=null
        this.avatar=null
        this.type=null
        this.ver=null
        this.storage.remove('token')
        this.storage.remove('userinfo')
        // this.myJpush.setAlias('')
    }

}
