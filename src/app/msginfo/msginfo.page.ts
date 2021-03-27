import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {NavController} from "@ionic/angular";

@Component({
  selector: 'app-msginfo',
  templateUrl: './msginfo.page.html',
  styleUrls: ['./msginfo.page.scss'],
})
export class MsginfoPage implements OnInit {
  public title=''
  public msg=''
  public date=''
  constructor( public route:ActivatedRoute,
               public nav:NavController) {
    const queryParams = this.route.snapshot.queryParams;
    this.title = queryParams.title
    this.msg=queryParams.msg
    this.date=queryParams.date
  }

  ngOnInit() {
  }
  toBack(){
    this.nav.pop()
  }
}
