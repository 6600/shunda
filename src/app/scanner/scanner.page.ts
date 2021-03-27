import {Component, OnInit, ElementRef} from '@angular/core';
import {NavController, Platform} from "@ionic/angular";
import {QRScanner, QRScannerStatus} from '@ionic-native/qr-scanner/ngx';
import {IMPORT_PREFIX} from "@angular/compiler-cli/ngcc/src/constants";
import {MyToast} from "../../providers/my-toast.service";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
    selector: 'app-scanner',
    templateUrl: './scanner.page.html',
    styleUrls: ['./scanner.page.scss'],
})
export class ScannerPage implements OnInit {


    lightIcon: string;
    light: boolean;
    frontCamera: boolean;
    scannerClass: boolean;
    type = -1;
    callback
    radiovalue = '1'
    info=''

    constructor(
        private platform: Platform,
        private scanner: QRScanner,
        private router: NavController,
        private router1: Router,
        private route: ActivatedRoute,
        private element: ElementRef,
        private myToast: MyToast,
        private nav: NavController,
    ) {
        const queryParams = this.route.snapshot.queryParams;
        this.type = queryParams.type;
        this.callback = queryParams.callback
        this.info=queryParams.info
        this.lightIcon = 'flash-off';
        // this.modal.showLoading();
        if (this.type == 3) {
            this.radiovalue = '3'
            this.info='add'
        }
    }

    ionViewDidEnter() {
        // this.modal.hideLoading();
        // this.callback('123456830')
        this.scannerClass = true;
        this.startScanner();
        this.scanner.show();
        // this.callback('ceshi',this.type)
    }

    ionViewWillUnload() {

    }

    ngOnDestroy() {
        this.scannerClass = false;
        // this.callback()
        this.destroyScanner();

    }

    closeModal() {
        // this.callback('ceshi1;123')
        this.nav.pop();

        this.destroyScanner();
    }

    toogleLight() {
        this.light = !this.light;

        if (this.light) {
            this.lightIcon = 'flash';
            this.scanner.enableLight();
        } else {
            this.lightIcon = 'flash-off';
            this.scanner.disableLight();
        }
    }

    toggleCamera() {
        this.frontCamera = !this.frontCamera;
        if (this.frontCamera) {
            this.scanner.useFrontCamera();
        } else {
            this.scanner.useBackCamera();
        }
    }

    startScanner() {
        this.platform.ready().then(() => {
            this.scanner.destroy();
            // Optionally request the permission early
            this.scanner.prepare().then((status: QRScannerStatus) => {
                if (status.authorized) {
                    // camera permission was granted
                    // start scanning
                    let scanSub = this.scanner.scan().subscribe((text: string) => {
                        console.log(text);
                        let type = 0
                        if (this.radiovalue == '1') {//扫码自检
                            type = 2
                        } else if (this.radiovalue == '2') {//扫码维修
                            type = 1
                        } else if (this.radiovalue == '3') {//扫码安装
                            type = 3
                        }
                        this.callback(text,type)
                        this.scanner.hide(); // hide camera preview
                        scanSub.unsubscribe(); // stop scanning
                        this.nav.pop();
                        console.log('ss:' + text)
                        let ss = text.split(';')
                        // this.nav.back()
                        // console.log('ss:' + ss[0])
                        // let devid1 = ss[0]


                    });

                } else if (status.denied) {
                    this.scanner.openSettings();

                    // camera permission was permanently denied
                    // you must use QRScanner.openSettings() method to guide the user to the settings page
                    // then they can grant the permission from there
                } else {
                    // permission was denied, but not permanently. You can ask for permission again at a later time.
                    alert('请打开摄像头权限')
                }
            }).catch((e: any) => {
                    // this.modal.toast(e)
                    alert(e)
                }
            );
        });
    }

    destroyScanner() {
        this.scanner.destroy();
        // 这里延迟一秒将html背景色重新设置为白色，否则会变透明，影响视觉效果
        setTimeout(() => {
            (window.document.querySelector('html') as HTMLElement).style.backgroundColor = '#fff';
        }, 1000);
    }

    ngOnInit(): void {
    }

}
