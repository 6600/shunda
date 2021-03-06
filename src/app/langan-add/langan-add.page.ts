import {Component, OnInit} from '@angular/core';
import {WebApi} from "../../providers/web-api.service";
import * as moment from 'moment'
import {GaodDe} from "../../providers/gaode.service";
import {ActivatedRoute,Router} from "@angular/router";
import {NavController} from "@ionic/angular";
import {AlertController} from "@ionic/angular";
import {UserInfo} from "../../providers/user-info.service";
import {Alert} from "../../providers/alert.service";

@Component({
    selector: 'app-langan-add',
    templateUrl: './langan-add.page.html',
    styleUrls: ['./langan-add.page.scss'],
})
export class LanganAddPage implements OnInit {

    constructor(public nav:NavController,
                public router: Router,
                public route:ActivatedRoute,
                public webApi: WebApi,
                public gaode: GaodDe,
                public alertController: AlertController,
                public userinfo:UserInfo,
                public alert:Alert) {
        const queryParams = this.route.snapshot.queryParams;
        this.devID = queryParams.devID
        this.chipID = '1'//queryParams.chipID
        this.chipType = queryParams.chipType
        this.workdate = moment().format('YYYY/MM/DD')
        // this.options1={
        //   buttons: [{
        //     text: 'Save',
        //     handler: () => console.log('Clicked Save!')
        //   }, {
        //     text: 'Log',
        //     handler: () => {
        //       console.log('Clicked Log. Do not Dismiss.');
        //       return false;
        //     }
        //   }]
        // }


        // this.devID = '861050046109941'


    }

    public chipType = ''
    public chipID = ''
    public devID = ''
    public devName = ''
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

    ngOnInit() {

    }

    ionViewDidEnter() {
        this.pullInfo()
        this.toLocate()
    }
    toBack(){
        this.nav.pop()
    }
    pullInfo() {
        this.webApi.getEquipmentInfoById(this.devID).then((data) => {
            let result = data.data
            this.deliveryTime = result.deliveryTime
            this.id = result.id
            this.batchNumber = result.batchNumber
            this.devName = result.equipmentName
            this.guaranteePeriod = result.guaranteePeriod
            this.workdate=this.guaranteePeriod
            this.manufacturer = result.manufacturer
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
            let label1 = province+'-'+city+'-' + district +'-'+ township
            console.log('label1:' + label1)
            this.location = label1
            // this.webApi.activateEquipment(this.devID,lng)
        })
    }
    todel () {
        alert(this.devID)
    }
    toNext() {
        console.log('time:' + this.workdate)
        this.workdate = moment(this.workdate).format('YYYY-MM-DD')
        console.log('time:' + this.workdate)
        if(this.devID==null||this.devID.length==0){
            this.alert.presentAlertHint('??????ID????????????')
        }else if(this.chipID==null||this.chipID.length==0){
            this.alert.presentAlertHint('??????ID????????????')
        }else if(this.workdate==null||this.workdate.length==0){
            this.alert.presentAlertHint('????????????????????????')
        }else if(this.location==null||this.location.length==0){
            this.alert.presentAlertHint('????????????????????????')
        }

        this.webApi.registerEquipment(this.devID).then((data)=>{
            let code=data.code
            if(code=='1'){
                this.webApi.activateEquipment(this.devID,this.lng+','+this.lat,this.chipID,
                    this.chipType,this.workdate,this.location,this.guaranteePeriod).then((data)=>{
                    let code=data.code
                    console.log('code:'+code)
                    if(code=='1'){
                        // alert('????????????????????????????????????????????????????????????')
                        // this.nav.navigateRoot('home');
                        this.alert.presentAlertHint('????????????')
                        this.router.navigate(['home'])

                    }else{
                        // alert('??????????????????????????????????????????????????????????????????????????????')
                        // this.presentAlertConfirm1()
                        this.alert.presentAlertHint('????????????')
                    }

                })
            }else{
                this.alert.presentAlertHint('????????????')
            }

        })


        // return

    }

    async presentAlertConfirm() {
        const alert = await this.alertController.create({
            cssClass: 'my-custom-class',
            header: '??????',
            message: '????????????????????????????????????????????????????????????',
            buttons: [
                {
                    text: '??????',
                    role: 'cancel',
                    cssClass: 'secondary',
                    handler: (blah) => {
                        console.log('Confirm Cancel: blah');
                    }
                }, {
                    text: '????????????',
                    handler: () => {
                        console.log('Confirm Okay');
                        // this.nav.navigateRoot('home');
                    }
                }
            ]
        });

        await alert.present();
    }

    async presentAlertConfirm1() {
        const alert = await this.alertController.create({
            cssClass: 'my-custom-class',
            header: '??????',
            message: '??????????????????????????????????????????????????????????????????????????????',
            buttons: [
                {
                    text: '??????',
                    role: 'cancel',
                    cssClass: 'secondary',
                    handler: (blah) => {
                        console.log('Confirm Cancel: blah');
                    }
                }, {
                    text: '????????????',
                    handler: () => {
                        console.log('Confirm Okay');
                        // this.nav.navigateRoot('home');
                    }
                }
            ]
        });

        await alert.present();
    }

    async presentAlertConfirm2() {
        const alert = await this.alertController.create({
            cssClass: 'my-custom-class',
            header: '??????',
            message: '???????????????',
            buttons: [
                 {
                    text: '??????',
                    handler: () => {
                        console.log('Confirm Okay');
                        // this.nav.navigateRoot('home');
                    }
                }
            ]
        });

        await alert.present();
    }
}
