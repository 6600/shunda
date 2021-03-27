import { Component, OnInit } from '@angular/core';
import {Router,ActivatedRoute} from "@angular/router";
import {WebApi} from "../../../providers/web-api.service";
import {NavController} from "@ionic/angular";

@Component({
  selector: 'app-quweixiu',
  templateUrl: './quweixiu.page.html',
  styleUrls: ['./quweixiu.page.scss'],
})
export class QuweixiuPage implements OnInit {


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
  public type=-1;
  constructor(public router:Router,
              public route:ActivatedRoute,
              public webApi:WebApi,
              public nav:NavController) {
    const queryParams=this.route.snapshot.queryParams
    this.type=queryParams.type
    this.devID = 'HHX20200408100917564'

  }

  ngOnInit() {
  }

  ionViewDidEnter() {
    this.pullInfo()
  }

  pullInfo() {
    this.webApi.getEquipmentInfoById(this.devID).then((data) => {
      let result = data.data
      this.deliveryTime = result.deliveryTime
      this.id = result.id
      this.batchNumber = result.batchNumber
      this.devName = result.equipmentName
      this.guaranteePeriod = result.guaranteePeriod
      this.manufacturer = result.manufacturer
      this.equipmentStatus=result.equipmentStatus
      this.equipmentArae=result.equipmentArae
    })
  }
  public toWeiXiuZhong(){
    this.router.navigate(['weixiuzhong'])
  }
  toBack(){
    this.nav.pop()
  }
}
