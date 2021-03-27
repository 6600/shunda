import {Component, OnInit} from '@angular/core';
import {BaseListPage} from "../../common/base-list.page";
import {MyLoading} from "../../../providers/my-loading.service";
import {WebApi} from "../../../providers/web-api.service";
import {ActivatedRoute, Router} from "@angular/router";
import {NavController} from "@ionic/angular";

@Component({
    selector: 'app-maintainlist',
    templateUrl: './maintainlist.page.html',
    styleUrls: ['./maintainlist.page.scss'],
})
export class MaintainlistPage extends BaseListPage implements OnInit {

    constructor(
        protected myLoading: MyLoading,
        public webApi: WebApi, public router: Router,
        public route: ActivatedRoute,
        public nav:NavController
    ) {
        super(myLoading);
    }


    ngOnInit() {
    }

    ionViewDidEnter() {
        this.pullNewList();
    }

    toDevStatus(item) {
        this.router.navigate(['devstatus'], {
            queryParams: {
                equipmentId: item.equipmentCode,
            }
        })
    }


    protected pullListImpl(): Promise<any> {
        return this.webApi.getAbnormalEquipmentListByLoginId(this.pageNo);
    }
    toBack(){
        this.nav.pop()
    }
}
