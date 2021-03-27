import { Component, OnInit } from '@angular/core';
import {BaseListPage} from "../../common/base-list.page";
import {MyLoading} from "../../../providers/my-loading.service";
import {WebApi} from "../../../providers/web-api.service";
import {ActivatedRoute,Router} from "@angular/router";
import {NavController} from "@ionic/angular";

@Component({
    selector: 'app-myfactory',
    templateUrl: './myfactory.page.html',
    styleUrls: ['./myfactory.page.scss'],
})
export class MyfactoryPage extends BaseListPage implements OnInit {

    constructor(protected myLoading: MyLoading,
                public webapi:WebApi,
                public nav:NavController) {
        super(myLoading);
    }

    public items1 = [
        {
            value: '0',
            label: '经销商',
            account: 0,
        },
        // {
        //     value: '2',
        //     label: '交管部门',
        //     account: 0,
        // },
    ]
    public items1_sel:string = '0';
    toBack(){
        this.nav.pop()
    }

    public change() {
        this.pullNewList();
    }

    // public pull() {
    //     console.log('items1_sel' + this.items1_sel)
    //     this.webApi.getDealer(this.items1_sel).then((data) => {
    //         this.list = data.data;
    //     });
    // }

    ngOnInit() {
    }

    ionViewDidEnter(){
        this.pullNewList();
    }


    protected pullListImpl(): Promise<any> {
        return  this.webapi.getDealer(this.items1_sel,this.pageNo);
    }

}
