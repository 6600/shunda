import {Component, Input, OnInit} from '@angular/core';
import {ElementRef} from '@angular/core';
import {Router} from "@angular/router";
import {NavController, ModalController} from "@ionic/angular";
import {WebApi} from "../../../providers/web-api.service";
import {MyLoading} from "../../../providers/my-loading.service";

@Component({
    selector: 'app-search',
    templateUrl: './search.page.html',
    styleUrls: ['./search.page.scss'],
})
export class SearchPage implements OnInit {

    constructor(public el: ElementRef,
                public nav: NavController,
                public modalCtrl: ModalController,
                public webaip: WebApi,
                public router: Router,
                public myLoading: MyLoading) {
    }

    @Input() map;
    public serach_input = '';
    public list = [];

    ngOnInit() {


    }

    public ionchange() {
        console.log('serach_input:' + this.serach_input)
        this.myLoading.show('查询中')
        this.webaip.getAddressEquipmentByUserId(this.serach_input).then((data) => {
            console.log('getAddressEquipmentByUserId:' + JSON.stringify(data))
            if (this.serach_input != '') {
                this.list = data.data.list;
            }
            setTimeout(()=>{
                this.myLoading.hide(),300
            })
        },(error)=>{
            this.myLoading.hide()
        })
    }

    ionViewDidEnter() {


    }

    back() {
        console.log('123123')
        this.dismiss()
    }

    dismiss() {
        // using the injected ModalController this page
        // can "dismiss" itself and optionally pass back data
        this.modalCtrl.dismiss({
            'dismissed': true
        });
    }

    public click(item) {
        console.log('item:' + JSON.stringify(item))
        let type = item.type;
        let id = item.id;
        let address;
        if (type == '1') {
            this.router.navigate(['langan-info'], {queryParams: {id: id}})
        } else if (type == '2') {
            address = item.address;
            let ss = address.split(',');
            let position = [ss[0], ss[1]];
            this.map.setCenter(position);
        }
        this.dismiss();
    }

    clear() {
        this.list = []
    }
}
