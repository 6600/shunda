import {Component, OnInit} from '@angular/core';
import {WebApi} from "../../../providers/web-api.service";
import * as moment from 'moment'
import {GaodDe} from "../../../providers/gaode.service";
import {ActivatedRoute, Router} from "@angular/router";
import {NavController} from "@ionic/angular";
import {AlertController} from "@ionic/angular";
import {UserInfo} from "../../../providers/user-info.service";
import {Alert} from "../../../providers/alert.service";

@Component({
    selector: 'app-weixiuzhong',
    templateUrl: './weixiuzhong.page.html',
    styleUrls: ['./weixiuzhong.page.scss'],
})
export class WeixiuzhongPage implements OnInit {

    constructor(public nav: NavController,
                public router: Router,
                public route: ActivatedRoute,
                public webApi: WebApi,
                public gaode: GaodDe,
                public alertController: AlertController,
                public userInfo: UserInfo,
                public alert:Alert) {
        const queryParams = this.route.snapshot.queryParams;
        console.log(queryParams);
        this.devID = queryParams.equipmentID;
        this.devName = queryParams.equipname;
        console.log('userinfo:' + JSON.stringify(userInfo))
        this.workdate = moment(this.workdate).format('YYYY-MM-DD')
    }


    public chipType = ''
    public chipID = ''
    public devID = ''
    public devName = ''
    public newDevID=''
    public deliveryTime;
    public id;
    public batchNumber;
    public manufacturer;
    public equipmentStatus;
    public equipmentArae;
    public guaranteePeriod;
    public options1;
    public workdate;
    public location = '';
    public lng;
    public lat;
    reasons = [];
    sel_reason = '';
    checks = [{
        label: '是',
        id: '1'
    },
        {
            label: '否',
            id: '0'
        }]
    sel_check='0'
    note1=''

    ngOnInit() {
    }

    ionViewDidEnter() {
        this.pullInfo()
        this.toLocate()
    }

    pullInfo() {
        this.webApi.getEquipmentInfoById(this.devID).then((data) => {
            let result = data.data
            this.deliveryTime = result.deliveryTime
            this.id = result.id
            this.batchNumber = result.batchNumber
            this.devName = result.equipmentName
            this.guaranteePeriod = result.guaranteePeriod
            // this.workdate = this.guaranteePeriod
            this.manufacturer = result.manufacturer
            this.workdate=moment().format('YYYY-MM-DD HH:mm:ss')
        })
    }

    toLocate() {
        this.gaode.getPosition((result) => {
            this.lng = result.lng;
            this.lat = result.lat
            let country = result.country;
            let province = result.province;
            let city = result.city;
            let district = result.district;
            let township = result.township;
            let street = result.street;
            let streetNumber = result.streetNumber;
            let label1 = province + '-' + city + '-' + district + '-' + township
            console.log('label1:' + label1)
            this.location = label1
            // this.webApi.activateEquipment(this.devID,lng)
        })
    }

    public getPic() {
        let options = {
            maximumImagesCount: 9,
            outputType: 0,
            title: "相册",
            width: 800,
            height: 800,
            quality: 100,
        };
        //   ImagePicker.getPictures(options).then((results) => {
        //   for(let i =0; i < results.length; i++) {
        //     console.log('Image URI: '+ results[i]);
        //   }
        // }, (err) => {
        // });
    }


    togetAllDamageReason() {
        if (this.reasons.length < 1) {
            this.webApi.getAllDamageReason().then((data) => {
                this.reasons = data.data
            })
        }
    }

    toCommit(){

        if(this.sel_reason==''||this.sel_reason==null){
            this.alert.presentAlertHint('请选择维修原因')
        }else if(this.sel_check=='1'&&this.newDevID==''){
            this.alert.presentAlertHint('请扫码新设备')
        }else{
            this.commit()
        }


    }

    commit(){
        this.webApi.maintainEquipment(this.devID,this.sel_check,this.newDevID,this.sel_reason,this.note1,this.workdate).then((data)=>{
            let code=data.code
            let body={}
            let bts
            let msg
            body['hint']='提示'
            if(code=='1'){
                msg='设备正常！本次维修完成'
                bts=[{
                    text:'返回',
                    handler:()=>{

                    }
                },
                    {
                        text:'确定',
                        handler:()=>{
                            this.router.navigate(['home'])
                        }
                    }]
            }else{
                msg='设备异常！请重新开始维修'
                bts=[{
                    text:'返回',
                    handler:()=>{

                    }
                },
                    {
                        text:'确定',
                        handler:()=>{

                        }
                    }]
            }
            body['msg']=msg
            body['bts']=bts
            this.alert.show(body)
        })
    }

    toNewScan(){
        this.nav.navigateForward('scanner',{queryParams:{
                type:3,
                callback:(text)=>{
                    let ss=text.split(';')
                    // this.nav.back()
                    this.newDevID=ss[0]
                }
            }})
    }
    toBack(){
        this.nav.pop()
    }

}
