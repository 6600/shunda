import {Component, OnInit} from '@angular/core';
import {WebApi} from "../../providers/web-api.service";
import {ActivatedRoute} from "@angular/router";
import {GaodDe} from "../../providers/gaode.service";
import { AppAvailability } from '@ionic-native/app-availability/ngx';
import {Platform} from "@ionic/angular";
import {Alert} from "../../providers/alert.service";
import {NavController} from "@ionic/angular";

declare var startApp;
//检查是否安装了应用程序
@Component({
    selector: 'app-langan-info',
    templateUrl: './langan-info.page.html',
    styleUrls: ['./langan-info.page.scss'],
})

export class LanganInfoPage implements OnInit {

    constructor(public webApi: WebApi,
                public route: ActivatedRoute,
                public gaode: GaodDe,
                public appAvailability: AppAvailability,public platform: Platform,
                public alert:Alert,
                public nav:NavController) {
        const queryParams = this.route.snapshot.queryParams;
        this.id = queryParams.id;
    }

    public gaodeapp;
    public id;
    public equipmentStatus;
    public label1;
    public items1 = [
        {
            label: '被撞次数',
            value: 0,
        },
        {
            label: '维修次数',
            value: 0,
        },
        // {
        //   label:'距离您',
        //   value:100,
        // },
    ]

    public items2 = [
        {
            label: '栏杆名称：',
            value: '',
        },
        {
            label: '出厂日期：',
            value: '',
        },
        {
            label: '安全日期：',
            value: '',
        },
        {
            label: '唯一编码：',
            value: '',
        },
    ]

    public items3 = [
        // {
        //     label: 'D123',
        //     value: '',
        // },
        // {
        //     label: 'D123',
        //     value: '',
        // },
    ]

    ngOnInit() {
    }

// {"code":1,"msg":"操作成功","data":
    // {"maintainNum":"1","impactDtli":[{"id":"4","updateDate":"2020-04-04 00:06:18"}],"impactNum":"1","equipmentDtl":{"id":"00ba09de314948d39e995635d0f13dc5","address":"119.924571,31.766385","addressName":"荆川公园","equipmentName":"柱子-t-100-2020032518-16","equipmentId":"20200318141955475","equipmentStatus":"0","equipmentCode":"100001","deliveryTime":"2020-03-01 00:00:00","guaranteePeriod":"2020-03-20 00:00:00"}}}
    ionViewDidEnter() {
        this.pullinfo();
        // let position = this.gaode.geolocation.getCurrentPosition();
        // console.log('position:' + JSON.stringify(position))
    }
    toBack(){
        this.nav.pop()
    }

    pullinfo() {
        this.webApi.getEquipmentInfoByKeyId(this.id).then((data) => {
            let maintainNum = data.data.maintainNum;
            let impactNum = data.data.impactNum;
            let equipmentDtl = data.data.equipmentDtl;
            let equipmentName = equipmentDtl.equipmentName;
            let deliveryTime = equipmentDtl.deliveryTime;
            let guaranteePeriod = equipmentDtl.guaranteePeriod;
            let equipmentId = equipmentDtl.equipmentId;
            let address = equipmentDtl.address;
            let equipmentStatus = equipmentDtl.equipmentStatus;
            let impactDtli = data.data.impactDtli;
            this.items1[0].value = impactNum;
            this.items1[1].value = maintainNum;
            this.items2[0].value = equipmentName;
            this.items2[1].value = deliveryTime;
            this.items2[2].value = guaranteePeriod;
            this.items2[3].value = equipmentId;
            this.items3 = []
            for (let i = 0; i < impactDtli.length; i++) {
                let item = impactDtli[i]
                let label = item.id;
                let value = item.updateDate;
                let tup = {
                    label: label,
                    value: value,
                }
                this.items3.push(tup)
            }
          let position=address.split(',')
          this.update(position);
        })
    }

    public toNav() {
        // alert('调用导航')
        this.checkmap()
    }

    public update(position) {
        this.gaode.geocoder.getAddress(position, (status, result) => {
            if (status === 'complete' && result.info === 'OK') {
                // result为对应的地理位置详细信息
                console.log('result:' + JSON.stringify(result))
                let regeocode = result.regeocode;
                console.log('regeocode:' + JSON.stringify(regeocode))
                let addressComponent = regeocode.addressComponent
                console.log('addressComponent:' + JSON.stringify(addressComponent))
                let formattedAddress = regeocode.formattedAddress
                console.log('formattedAddress:' + JSON.stringify(formattedAddress))
                let country = addressComponent.country;
                let province = addressComponent.province;
                let city = addressComponent.city;
                let district = addressComponent.district;
                let township = addressComponent.township;
                let street = addressComponent.street;
                let streetNumber = addressComponent.streetNumber;
                // this.label1=city+district+township
                this.label1 = city + ' ' + street + streetNumber
            }
        })
    }


    checkmap(){
//检测高德地图是否存在
        if (this.platform.is('ios')) {
            this.gaodeapp = 'iosamap://';
        } else if (this.platform.is('android')) {
            this.gaodeapp = 'com.autonavi.minimap';
        }
        this.appAvailability.check(this.gaodeapp)
            .then(
                (yes: boolean) => {//有安装app
                    this.gogaodemap()
                },
                (no: boolean) => {//没有安装app
                    // alert(this.gaodeapp + ' is NOT available')

                    this.alert.presentAlertHint('请安装高德地图')
                }
            );
    }

    //跳转高德地图
    gogaodemap(){
//高德地图参数配置
        var sApp = startApp.set({  //跳转对应APP 
            "action":"ACTION_VIEW",
            "category":"CATEGORY_DEFAULT",
            "type":"text/css",
            "package":"com.autonavi.minimap",
            "uri":"amapuri://route/plan/?sid=BGVIS1&slat=39.92848272&slon=116.39560823&sname=A&did=BGVIS2&dlat=39.98848272&dlon=116.47560823&dname=B&dev=0&t=0",   //我是选择路径规划然后导航的，当然你也可以直接用导航路径或者其他路径  
            "flags":["FLAG_ACTIVITY_CLEAR_TOP","FLAG_ACTIVITY_CLEAR_TASK"],
            "intentstart":"startActivity",
        }, { /* extras */
            "EXTRA_STREAM":"extraValue1",
            "extraKey2":"extraValue2"
        });
        sApp.start(function() { //跳转成功  
            // alert("OK");
        }, function(error) { //失败 
            this.alert.presentAlertHint(error);
        });

    }


}
