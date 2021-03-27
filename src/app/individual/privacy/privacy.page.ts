import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {WebApi} from "../../../providers/web-api.service";
import {UserInfo} from "../../../providers/user-info.service";
import {Alert} from "../../../providers/alert.service";
import {NavController} from "@ionic/angular";

@Component({
    selector: 'app-privacy',
    templateUrl: './privacy.page.html',
    styleUrls: ['./privacy.page.scss'],
})
export class PrivacyPage implements OnInit {

    constructor(public router: Router,
                public webApi: WebApi,
                public userInfo: UserInfo,
                public myalert: Alert,
                public nav: NavController) {
    }

    public normal_num = 0;
    public exp_num = 0;
    public sum_num = 0;
    public photo = '';
    public uinfo;
    public devid3 = '';
    public rc = 0

    ngOnInit() {
        //0 经销商  1维修人员  2使用人员 3 厂商

        let type: any = this.userInfo.type;
        // type=0
        if (type == '3') {
            this.items2.push(
                {
                    icon: '../../assets/wodeshebei.png',
                    label: '我的设备商',
                    value: 1
                },
            )
        }

        if (type == '1') {
            this.items2.push(
                {
                    icon: '../../assets/icon_jvli.png',
                    label: '维修列表',
                    value: 5,
                },
            )
        }

        this.items2.push(
            {
                icon: '../../assets/xiaoxi.png',
                label: '消息通知',
                value: 2,
            }
        )

        if (type == '0' || type == '3') {
            this.items2.push(
                {
                    icon: '../../assets/icon_shebeiku.png',
                    label: '订单信息',
                    value: 3,
                },
            )
        }

        if (type == '1') {
            this.items2.push(
                {
                    icon: '../../assets/icon_xinzeng.png',
                    label: '新增设备',
                    value: 4,
                },
            )
        }


        if (type == '0' || type == '1' || type == '2') {
            this.items2.push(
                {
                    icon: '../../assets/contact.png',
                    label: '联系厂家',
                    value: 6,
                },
            )
        }


    }

    ionViewDidEnter() {
        // this.devid3='123456830'
      if(this.rc==1){//weixiu
        this.nav.navigateForward('devstatus', {
          queryParams: {
            type: 1,
            equipmentId: this.devid3,
          }
        })
      }else if(this.rc==2){//zijian
        this.nav.navigateForward('devstatus', {
          queryParams: {
            type: 2,
            equipmentId: this.devid3,
          }
        })
      }else if(this.rc==3){
        this.nav.navigateForward('langan-add', {
          queryParams: {
            type: 3,
            devID: this.devid3,
          }
        })
      }
      this.devid3=''
      this.rc=0

        this.photo = this.userInfo.avatar
        // this.uinfo=this.userInfo
        this.webApi.getEquipmentNumById().then((data) => {
            console.log('data1:' + JSON.stringify(data));
            let exNum = data.data.exNum;
            let normalNum = data.data.normalNum;
            let sum = exNum + normalNum;
            this.exp_num = exNum
            this.normal_num = normalNum
            this.sum_num = sum
            this.items1[1].label = '正常' + normalNum + '座';
            this.items1[2].label = '异常' + exNum + '座';
        })
    }

    public items1 = [
        {
            icon: '../../assets/shebei1.png',
            label: '我的设备',
            type: '2',
        },
        {
            icon: '../../assets/yichang1231.png',
            label: '正常0座',
            type: '0',
        },
        {
            icon: '../../assets/icon_yichangshebei.png',
            label: '异常0座',
            type: '1',
        },
        {
            icon: '../../assets/icon_huancun.png',
            label: '清除缓存',
            type: '4',
        },
    ];
    public items2 = []

    public toMyInfo() {
        this.router.navigate(['myinfo'])
    }

    public toQuWeiXiu() {
        this.router.navigate(['quweixiu'])
    }

    public toMyF() {
        this.router.navigate(['myfactory'])
    }

    public toMessage() {
        this.router.navigate(['message'])
    }

    public toAccessory() {
        this.router.navigate(['myaccessory'])
    }

    public toMaintainList() {
        this.router.navigate(['maintainlist'], {
            queryParams: {}
        })
    }

    public toFactoryInfo() {
        this.router.navigate(['factoryinfo'], {
            queryParams: {}
        })
    }

    public click1(item) {
        let value = item.value;
        if (value == 1) {
            this.toMyF();
        } else if (value == 2) {
            this.toMessage();
        } else if (value == 3) {
            this.toAccessory();
        } else if (value == 4) {
            this.addDevice()
        } else if (value == 5) {
            this.toMaintainList();
        } else if (value == 6) {
            // alert('联系厂家')
            this.toFactoryInfo()
        }
    }

    public click2(item) {
        let type = item.type;
        if (type == '2' || type == '1' || type == '0') {
            this.router.navigate(['mydevices'], {
                queryParams: {
                    type: type, expNum: this.exp_num,
                    normalNum: this.normal_num, sumNum: this.sum_num
                }
            })
        } else if (type == '4') {
            this.clearcache()
        }
    }

    public clearcache() {
        let body = {}
        body['hint'] = '提示'
        body['msg'] = '您确定要清除缓存吗？'
        body['bts'] = [{
            text: '返回',
            handler: () => {

            }
        },
            {
                text: '确定',
                handler: () => {
                    // this.userInfo.logout()
                    // this.nav.navigateForward('login')
                }
            }]
        this.myalert.show(body)
    }


    public addDevice() {
        this.devid3 = ''
        this.rc = 0
        // this.nav.navigateForward('langan-add',{queryParams:{
        //         devID:'ceshi1',
        //     }})
        this.nav.navigateForward('scanner', {
            queryParams: {
                type: 3,
                info:'add',
                callback: (text, type) => {
                    console.log('12313')
                    let ss = text.split(';')
                    this.devid3 = ss[0]
                    this.rc = type
                    // this.nav.back()
                    // this.nav.back()
                    // this.nav.navigateForward('langan-add',{queryParams:{
                    //         type:1,
                    //         devID:ss[0],
                    //     }})
                }
            }
        })
    }

    toBack(){
        this.nav.pop()
    }
}
