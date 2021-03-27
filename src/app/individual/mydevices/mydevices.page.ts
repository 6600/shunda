import { Component, OnInit } from '@angular/core';
import {Router,ActivatedRoute} from "@angular/router";
import {WebApi} from "../../../providers/web-api.service";
import {NavController} from "@ionic/angular";
import {MyLoading} from "../../../providers/my-loading.service";
import {Alert} from "../../../providers/alert.service";

@Component({
  selector: 'app-mydevices',
  templateUrl: './mydevices.page.html',
  styleUrls: ['./mydevices.page.scss'],
})
export class MydevicesPage implements OnInit {

  constructor(public router:Router,
              public route:ActivatedRoute,
              public webApi:WebApi,
              public nav:NavController,
              public myLoading:MyLoading,
              public alert:Alert) {
    const queryParams = this.route.snapshot.queryParams;
    console.log(queryParams);
    this.items1_sel=queryParams.type;
    this.normal_num=queryParams.normalNum;
    this.exp_num=queryParams.expNum;
    this.sum_num=queryParams.sumNum;
    this.items1[0].account=this.sum_num;
    this.items1[1].account=this.normal_num;
    this.items1[2].account=this.exp_num;
  }

  normal_num=0;
  exp_num=0;
  sum_num=0;
  serach_input='';

  items1=[
    {
      value:'2',
      label:'全部',
      account:0,
    },
    {
      value:'0',
      label:'正常',
      account:0,
    },
    {
      value:'1',
      label:'异常',
      account:0,
    },
  ]
  items1_sel='';
  list=[];
  ngOnInit() {
    this.search()
  }
  toBack(){
    this.nav.pop()
  }

  public toStatus(item){
    this.nav.navigateForward('devstatus',{queryParams:{equipmentId:item.equipment_id,show1:false}})
  }

  search(){
    console.log('items1_sel:' + this.items1_sel)
    this.myLoading.show('搜索中')
    this.webApi.getAddressEquipmentByName(this.items1_sel,this.serach_input).then((data)=>{
      this.myLoading.hide()
      this.list=data.data.list;
      if(this.list==null||this.list==undefined||this.list.length<1){
        this.alert.presentAlertHint('没有搜索到对应设备')
      }
    },(error)=>{
      this.myLoading.hide()
    })
  }
}
