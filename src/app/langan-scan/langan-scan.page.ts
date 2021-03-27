import {Component, OnInit} from '@angular/core';
import {WebApi} from "../../providers/web-api.service";
import {ActionSheetController} from "@ionic/angular";
import {NavController} from "@ionic/angular";
import {Alert} from "../../providers/alert.service";

@Component({
    selector: 'app-langan-scan',
    templateUrl: './langan-scan.page.html',
    styleUrls: ['./langan-scan.page.scss'],
})
export class LanganScanPage implements OnInit {

    constructor(public nav: NavController,
                public webApi: WebApi,
                public actionSheetController: ActionSheetController,
                public alert:Alert
                ) {
    }

    public partslist = null;
    public devID = '';
    public chipID = '';
    public chipName = '';
    public chipType = '';

    ngOnInit() {
        this.devID = 'HHX20200408100917564'
        this.chipID = 'BBO20200408100928597'
    }

    public toNext() {

        if (this.devID == null || this.devID.length == 0) {
            this.alert.presentAlertHint('设备号不能为空')
        } else if (this.chipID == null || this.chipID.length == 0) {
            this.alert.presentAlertHint('芯片号不能为空')
        } else if (this.chipType == null || this.chipType.length == 0) {
            this.alert.presentAlertHint('芯片类型不能为空')
        } else {
            this.nav.navigateForward(['langan-add'], {
                queryParams: {
                    devID: this.devID,
                    chipID: this.chipID,
                    chipType: this.chipType
                }
            })
        }

    }

    public click1() {
        if (this.partslist == null) {
            this.webApi.getAllParts().then((data) => {
                this.partslist = data.data.chipList;
                this.presentActionSheet()
            })
        } else {
            this.presentActionSheet()
        }

    }

    async presentActionSheet() {
        let buttons = []
        for (let i = 0; i < this.partslist.length; i++) {
            let part = this.partslist[i]
            let button = {
                text: part.name,
                handler: () => {
                    console.log('part:' + JSON.stringify(part))
                    this.chipName = part.name;
                    this.chipType = part.modelType;
                }
            }
            buttons.push(button)
        }
        const actionSheet = await this.actionSheetController.create({
            buttons: buttons
        });
        await actionSheet.present();
    }
}
