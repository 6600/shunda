import { Component, OnInit } from '@angular/core';
import {BaseListPage} from "../../common/base-list.page";
import {MyLoading} from "../../../providers/my-loading.service";
import {WebApi} from "../../../providers/web-api.service";
import {ActivatedRoute, Router} from "@angular/router";
import {NavController} from "@ionic/angular";

@Component({
  selector: 'app-maintainlist1',
  templateUrl: './maintainlist1.page.html',
  styleUrls: ['./maintainlist1.page.scss'],
})
export class Maintainlist1Page extends BaseListPage implements OnInit {

  constructor(protected myLoading: MyLoading,
              public webapi:WebApi,
              public router: Router,
              public route:ActivatedRoute,
              public nav:NavController) {
    super(myLoading);
    const queryParams = this.route.snapshot.queryParams;
    this.equipmentID = queryParams.equipmentID
    this.equipname=queryParams.equipname
  }

  equipmentID='';
  equipname;
  items=[
    {
      worker:'a',
      date1:'123',
      reason1:'123'
    },
    {
      worker:'a',
      date1:'123',
      reason1:'123'
    },

  ]
  ngOnInit() {
  }

  ionViewDidEnter(){
    this.pullNewList();
  }

  // public read(item){
  //   let id=item.id
  //   item.status='1'
  //   this.webapi.updateMessage(id,item.status)
  // }

  protected pullListImpl(): Promise<any> {
    return this.webapi.getMaintainLogListById(this.equipmentID,this.pageNo);
  }

  public toMaintainRecord(item){
    this.router.navigate(['maintainrecord'],{queryParams:{maintainLogId:item.id,worker:item.maintainUserName,equipname:this.equipname}})
  }
  toBack(){
    this.nav.pop()
  }
}
