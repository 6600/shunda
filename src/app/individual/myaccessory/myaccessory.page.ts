import { Component, OnInit } from '@angular/core';
import {BaseListPage} from "../../common/base-list.page";
import {MyLoading} from "../../../providers/my-loading.service";
import {WebApi} from "../../../providers/web-api.service";
import {NavController} from "@ionic/angular";
import {ActivatedRoute,Router} from "@angular/router";

@Component({
  selector: 'app-myaccessory',
  templateUrl: './myaccessory.page.html',
  styleUrls: ['./myaccessory.page.scss'],
})
export class MyaccessoryPage  extends BaseListPage implements OnInit {

  constructor(
      public myLoading:MyLoading,
      public webApi:WebApi,
      public nav:NavController
  ) {
    super(myLoading);
  }

  toBack(){
    this.nav.pop()
  }
  ngOnInit() {
  }

  ionViewDidEnter(){
    this.pullNewList();
  }


  protected pullListImpl(): Promise<any> {
    return this.webApi.getAccessoriesGallery(this.pageNo);
  }



}
