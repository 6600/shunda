import { Component, OnInit } from '@angular/core';
import {BaseListPage} from "../../common/base-list.page";
import {MyLoading} from "../../../providers/my-loading.service";
import {WebApi} from "../../../providers/web-api.service";
import {ActivatedRoute, Router} from "@angular/router";
import {NavController} from "@ionic/angular";

@Component({
  selector: 'app-maintainrecord',
  templateUrl: './maintainrecord.page.html',
  styleUrls: ['./maintainrecord.page.scss'],
})
export class MaintainrecordPage implements OnInit {

  constructor(protected myLoading: MyLoading,
              public webapi:WebApi,
              public router: Router,
              public route:ActivatedRoute,
              public nav:NavController) {
    const queryParams = this.route.snapshot.queryParams;
    this.maintainLogId = queryParams.maintainLogId
    this.worker1=queryParams.worker
    this.equipname=queryParams.equipname
  }

  maintainLogId;
  worker1;
  date1;
  date2;
  reason1;
  accessory1;
  equipname;


  ngOnInit() {
    this.webapi.getMaintainLogById(this.maintainLogId).then((data)=>{
      let da=data.data;
      this.worker1=da.maintainUserName;
      this.date1=da.maintainStartTime;
      this.date2=da.maintainStartTime;
      this.reason1=da.faultReason;
      this.accessory1=da.equipmentName;
    })
  }
  toBack(){
    this.nav.pop()
  }
}
