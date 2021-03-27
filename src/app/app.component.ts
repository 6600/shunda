import { Component } from "@angular/core";

import { Platform, IonApp } from "@ionic/angular";
import { SplashScreen } from "@ionic-native/splash-screen/ngx";
import { StatusBar } from "@ionic-native/status-bar/ngx";
import { JPush } from "@jiguang-ionic/jpush/ngx";
import { MyJpush } from "../providers/my-jpush.service";
import { HeaderColor } from "@ionic-native/header-color/ngx";
import { Router, NavigationEnd } from "@angular/router";
import { NavController } from "@ionic/angular";
import { Toast } from "@ionic-native/toast/ngx";
import { AppMinimize } from "@ionic-native/app-minimize/ngx";
import { Subscription } from "rxjs";
import { WebApi } from "../providers/web-api.service";
import { HomePage } from "./home/home.page";
import { LoginPage } from "./login/login.page";

@Component({
  selector: "app-root",
  templateUrl: "app.component.html",
  styleUrls: ["app.component.scss"],
  // template:`<ion-nav [root]="rootPage"></ion-nav>`
})
export class AppComponent {
  sideMenuDisabled = true;
  backButtonPressed: boolean = false; //用于判断是否退出
  customBackActionSubscription: Subscription;
  public rootPage: any;

  url: any = "login"; //初始界面的url

  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private myJpush: MyJpush,
    private jpush: JPush,
    private headerColor: HeaderColor,
    private router: Router,
    public navController: NavController, //导航控制器
    public toast: Toast,
    public webApi: WebApi,
  ) {
    this.initializeApp();
  }

  initializeApp() {
    //this.initRouterListen();
    this.platform.ready().then(() => {
      // Platform.isFullScreen = true；
      this.statusBar.styleDefault();
      this.splashScreen.hide();
      // window.setTimeout(() => {
      //
      // }, 500);
      this.jpush.init();
      this.jpush.getRegistrationID().then((res) => {
        console.log(res, "123123");
      });
      this.jpush.setDebugMode(false);

      // this.myJpush.setTags(['user']);
      // this.myJpush.setAlias("android");
      this.statusBar.overlaysWebView(false);
      this.statusBar.backgroundColorByHexString("#49a0de");
      if (this.platform.is("android")) {
        this.headerColor.tint("#49a0de");
      }
      this.registerBackButtonAction(); //注册返回按键事件
      this.keyboardEvent();
    });
  }

  private keyValue: any = false; //判断是否返回上一界面
  registerBackButtonAction() {
    //获取NavController
    this.customBackActionSubscription = this.platform.backButton.subscribe(
      () => {
        if (this.keyValue) {
          this.keyValue = false; //触发返回键操作，当为true时不返回上一界面
          return;
        }
        let url = this.router.url;
        // if (this.serve.get("scan")) { this.serve.set("scan", false); return; }//此处为服务传值
        if (url == "/home" || url == "/login") {
          //判断是否是初始界面
          if (this.backButtonPressed) {
            navigator["app"].exitApp();
            this.backButtonPressed = false; //退出
          } else {
            this.toast
              .show("再按一次退出应用", "1500", "top")
              .subscribe((toast) => {
                console.log(toast);
              });
            this.backButtonPressed = true;
            setTimeout(() => (this.backButtonPressed = false), 1500); //延时器改变退出判断属性
          }
        } else {
          this.navController.pop(); //返回上一界面
        }
      }
    );
  }

  keyboardEvent() {
    //键盘触发
    let that = this;
    window.addEventListener("native.keyboardshow", function () {
      that.keyValue = true; //键盘开启改变属性
    });
    window.addEventListener("native.keyboardhide", function () {
      setTimeout(() => {
        that.keyValue = false;
      }, 500); //延时器
    });
  }
  // initRouterListen() {
  //   this.router.events.subscribe(event => { // 需要放到最后一个执行获取当前界面的url
  //     if (event instanceof NavigationEnd) {
  //       this.url = event.url;
  //     }
  //   });
  // }

  ngOnInit() {
    // token过期，返回主页
    this.webApi
      .init()
      .then((hasLogin) => {
        if (hasLogin) this.navController.navigateRoot(["home"]);
        else this.navController.navigateRoot(["login"]);
      })
      .catch(() => {
        this.navController.navigateRoot(["login"]);
      });
    // this.webApi.getUserInfo().catch(() => { });
  }
}
