import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { WebApi } from "../../providers/web-api.service";
import { NavController } from "@ionic/angular";
import { MyLoading } from "../../providers/my-loading.service";
import { MyJpush } from "../../providers/my-jpush.service";
import { UserInfo } from "../../providers/user-info.service";
import { Alert } from "../../providers/alert.service";
import { Storage } from "@ionic/storage";

@Component({
  selector: "app-login",
  templateUrl: "./login.page.html",
  styleUrls: ["./login.page.scss"],
})
export class LoginPage implements OnInit {
  public user = "";
  public passwd = "";
  public photo = "";

  constructor(
    public router: Router,
    public webApi: WebApi,
    public nav: NavController,
    public myLoading: MyLoading,
    public myJpush: MyJpush,
    public userinfo: UserInfo,
    public alert: Alert,
    public storage: Storage
  ) {}

  ngOnInit() {}

  ionViewDidEnter() {
    this.storage.get("lname").then((v) => {
      // v='123'
      this.user = v;
      // this.user='123123'
      console.log(" this.use" + this.user);
    });
    this.storage.get("photo").then((v) => {
      // v='123'
      if (v == "" || v == undefined || v == null) {
        v = "../../assets/icon/favicon.png";
      }
      this.photo = v;
      // this.user='123123'
      console.log(" this.photo" + this.photo);
    });

    // this.storage.get('lpwd').then((v)=>{
    //   this.passwd=v
    // })
  }

  public login() {
    // console.log('user'+this.user)
    // this.user='wmc111'
    // this.user='test111'
    // // // this.passwd='admin'
    // // // this.user='xiaogege'
    // this.user='宋博文经销商'
    // this.passwd='123'
    // this.user='jt1111'

    // this.passwd='123'
    if (this.user == null || this.user.length < 1) {
      this.alert.presentAlertHint("请输入用户名");
    } else if (this.passwd == null || this.passwd.length < 1) {
      this.alert.presentAlertHint("请输入密码");
    } else {
      this.storage.set("lname", this.user);
      this.storage.set("lpwd", this.passwd);
      this.webApi.login(this.user, this.passwd).then((data) => {
        this.myLoading.show("登录中");
        this.webApi.getUserInfo().then(
          () => {
            this.myJpush.setAlias(this.userinfo.loginName);
            console.log("1234");
            setTimeout(() => {
              this.myLoading.hide();
            }, 1000);
            this.nav.navigateRoot("home");
          },
          (error) => {
            setTimeout(() => {
              this.myLoading.hide();
            }, 1000);
          }
        );
      });
    }
  }
}
