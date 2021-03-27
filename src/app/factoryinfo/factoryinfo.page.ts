import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";
import {WebApi} from "../../providers/web-api.service";
import {UserInfo} from "../../providers/user-info.service";
import {Alert} from "../../providers/alert.service";
import {NavController} from "@ionic/angular";

@Component({
  selector: 'app-factoryinfo',
  templateUrl: './factoryinfo.page.html',
  styleUrls: ['./factoryinfo.page.scss'],
})
export class FactoryinfoPage implements OnInit {

  constructor(public router:Router,
              public webApi:WebApi,
              public userInfo:UserInfo,
              public myalert:Alert,
              public nav:NavController) { }


  public items=[]
  public tradeName;
  public teadeAddress;
  public tradeWechat;
  public tradeMobile;
  ngOnInit() {
    this.toInfo()
  }
  toBack(){
    this.nav.pop()
  }
  toInfo(){
    this.webApi.getTraderInfo().then((data)=>{
      let da=data.data
      this.tradeName=da.tradeName
      this.teadeAddress=da.teadeAddress
      this.tradeWechat=da.tradeWechat
      this.tradeMobile=da.tradeMobile
    })
  }
}
