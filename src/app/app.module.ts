/*
 * @Author: 周凯
 * @Date: 2020-06-15 15:03:48
 * @LastEditTime: 2020-11-25 22:58:04
 */
import { NgModule } from "@angular/core";
import {
  BrowserModule,
  HAMMER_GESTURE_CONFIG,
} from "@angular/platform-browser";
import { RouteReuseStrategy } from "@angular/router";
import { HttpModule } from "@angular/http";
import { IonicStorageModule } from "@ionic/storage";
import { IonicModule, IonicRouteStrategy } from "@ionic/angular";
import { SplashScreen } from "@ionic-native/splash-screen/ngx";
import { StatusBar } from "@ionic-native/status-bar/ngx";
import { QRScanner } from "@ionic-native/qr-scanner/ngx";
import { ImagePicker } from "@ionic-native/image-picker/ngx";
import { Camera, CameraOptions } from "@ionic-native/camera/ngx";
import { GaodDe } from "../providers/gaode.service";
import { ActionSheetController } from "@ionic/angular";
import { NavController } from "@ionic/angular";
import { NavParams } from "@ionic/angular";
import { AppComponent } from "./app.component";
import { AppRoutingModule } from "./app-routing.module";
import { MyLoading } from "../providers/my-loading.service";
import { WebApi } from "../providers/web-api.service";
import { UserInfo } from "../providers/user-info.service";
import { MyToast } from "../providers/my-toast.service";
import { FileTransfer } from "@ionic-native/file-transfer/ngx";
import { Alert } from "../providers/alert.service";
import { AppAvailability } from "@ionic-native/app-availability/ngx";
import { MyJpush } from "../providers/my-jpush.service";
import { JPush } from "@jiguang-ionic/jpush/ngx";
import { MyHammerConfig } from "../providers/myHammer.config";
import { HeaderColor } from "@ionic-native/header-color/ngx";
import { Toast } from "@ionic-native/toast/ngx";
import { AppMinimize } from "@ionic-native/app-minimize/ngx";
// import {HammerConfig} from "../providers/hammerconfig.service";
// import {HammerGestureConfig} from "@angular/platform-browser";
import { Geolocation } from "@ionic-native/geolocation/ngx";
import { AndroidPermissions } from "@ionic-native/android-permissions/ngx";
// import { UpdatePopover } from '../components/update.component';
import { NativePageTransitions } from "@ionic-native/native-page-transitions/ngx";
import {Diagnostic } from '@ionic-native/diagnostic/ngx';

@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [
    BrowserModule,
    IonicModule.forRoot({
      backButtonText: "", // 配置返回按钮的文字
      // backButtonIcon: '' // 配置返回按钮的图标
    }),
    AppRoutingModule,
    HttpModule,
    IonicStorageModule.forRoot(),
  ],
  providers: [
    Diagnostic,
    NativePageTransitions,
    WebApi,
    MyToast,
    UserInfo,
    StatusBar,
    SplashScreen,
    MyLoading,
    QRScanner,
    ImagePicker,
    Camera,
    GaodDe,
    FileTransfer,
    ActionSheetController,
    NavController,
    NavParams,
    Alert,
    AppAvailability,
    JPush,
    MyJpush,
    HeaderColor,
    Toast,
    AppMinimize,
    Geolocation,
    AndroidPermissions,
    // ImagePickerOriginal,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    { provide: HAMMER_GESTURE_CONFIG, useClass: MyHammerConfig },
    // { provide: HammerGestureConfig, useClass: HammerConfig },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
