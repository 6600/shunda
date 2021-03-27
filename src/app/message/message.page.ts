import {Component, OnInit} from '@angular/core';
import {BaseListPage} from "../common/base-list.page";
import {MyLoading} from "../../providers/my-loading.service";
import {WebApi} from "../../providers/web-api.service";
import {ActivatedRoute, Router} from "@angular/router";
import {NavController} from "@ionic/angular";


@Component({
    selector: 'app-message',
    templateUrl: './message.page.html',
    styleUrls: ['./message.page.scss'],
})
export class MessagePage extends BaseListPage implements OnInit {

    constructor(protected myLoading: MyLoading,
                private webapi: WebApi,
                private nav: NavController) {
        super(myLoading);
    }

    ngOnInit() {
    }

    ionViewDidEnter() {
        if(this.init1==false){
            this.pullNewList();
            this.init1=true
        }

    }

    public read(item) {
        let id = item.id
        item.status = '1'
        this.webapi.updateMessage(id, item.status)
        this.click(item)
    }

    protected pullListImpl(): Promise<any> {
        return this.webapi.getMessage(this.pageNo);
    }

    private click(item) {
        this.nav.navigateForward('msginfo', {
            queryParams: {
                title: item.title,
                msg: item.content,
                date: item.updateDate
            }
        })
    }
    toBack(){
        this.nav.pop()
    }
}
