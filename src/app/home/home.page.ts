import { Component, OnInit } from "@angular/core";
import { ModalController } from "@ionic/angular";
import { SearchPage } from "./search/search.page";
import { ActionSheetController } from "@ionic/angular";
import { WebApi } from "../../providers/web-api.service";
import { UserInfo } from "../../providers/user-info.service";
import { GaodDe } from "../../providers/gaode.service";
import { NavController } from "@ionic/angular";
import { MyLoading } from "../../providers/my-loading.service";
import { Router } from "@angular/router";
import { mark } from "@angular/compiler-cli/src/ngtsc/perf/src/clock";
import { AppAvailability } from "@ionic-native/app-availability/ngx";
import { Platform } from "@ionic/angular";
import { AlertController } from "@ionic/angular";
import { Alert } from "../../providers/alert.service";
import { Geolocation } from "@ionic-native/geolocation/ngx";
import { AndroidPermissions } from "@ionic-native/android-permissions/ngx";
import { Diagnostic} from '@ionic-native/diagnostic/ngx';

declare const AMap: any;
declare var startApp;
declare var cordova: any;

@Component({
  selector: "app-home",
  templateUrl: "home.page.html",
  styleUrls: ["home.page.scss"],
})
export class HomePage implements OnInit {
  public isShow1 = true;
  public isShow2 = false;
  public isShow3 = false;
  public isShow4 = false;
  public serach_input = "";
  public list = [];
  public swpstatus = false;
  public swpstatus1 = false;
  public foottype = 0;
  public msglist = [];
  public poller = null;
  public msgindex = 0;
  public msg = "";
  public inputbk = "";
  public mylng = "";
  public mylat = "";
  public info_lng = "";
  public info_lat = "";
  public info_name = "";
  public distance = "";
  public infostatus: string = "-1";
  public equipmentPosition = [];
  public rc = 0;
  public focus = false;
  public marker1 = null;

  constructor(
    public modalController: ModalController,
    public actionSheetController: ActionSheetController,
    public webApi: WebApi,
    public userInfo: UserInfo,
    public gaode: GaodDe,
    public nav: NavController,
    public myLoading: MyLoading,
    public router: Router,
    public appAvailability: AppAvailability,
    public platform: Platform,
    public alert: Alert,
    public geolocation: Geolocation,
    public androidPermissions: AndroidPermissions,
    private diagnostic: Diagnostic
  ) {}

  public label1;
  public label2;
  public items1 = [
    {
      icon: "../../assets/icon_zhengchang.png",
      label1: "所属栏杆总数",
      number1: 0,
      clazz1: "items1_t1",
      type: "2",
    },
    {
      icon: "../../assets/icon_zhengchang.png",
      label1: "正常总数",
      number1: 0,
      clazz1: "items1_t1",
      type: "0",
    },
    {
      icon: "../../assets/icon_yichangshebei.png",
      label1: "异常总数",
      number1: 0,
      clazz1: "items1_t2",
      type: "1",
    },
  ];
  public range_value = 100;
  public normal_rate: any = 100;
  public exp_rate: any = 0;
  public map;
  public marks: any = [];
  public devid1 = "";
  public devid2 = "";
  public devid3 = "";
  public zoom = 14;
  public timer = null;

  position = "()";

  getPosition() {
    this.geolocation
      .getCurrentPosition()
      .then((resp) => {
        this.position = `(${resp.coords.latitude}, ${resp.coords.longitude})`;
      })
      .catch((error) => {
        this.androidPermissions
          .requestPermissions([
            this.androidPermissions.PERMISSION.ACCESS_COARSE_LOCATION,
            this.androidPermissions.PERMISSION.ACCESS_FINE_LOCATION,
            this.androidPermissions.PERMISSION.ACCESS_LOCATION_EXTRA_COMMANDS,
          ])
          .then((r) => {
            // 申请权限成功
          })
          .catch((err) => {
            //申请权限失败："
          });
      });
  }

  ngOnInit() {
    try {
      this.platform.ready().then(() => {
        if (this.platform.is("ios")) {
          this.diagnostic.isLocationAuthorized().then(res => {
            console.log("🚀 ~ file: home.page.ts1 ~ line 140 ~ HomePage ~ this.diagnostic.isLocationAuthorized ~ res", res)
            if (!res) {
                this.diagnostic.requestLocationAuthorization().then(res => {
                  this.getPosition();
                })
            }
          }).catch(err => {
              console.log(err, 'ge1');
          })
        } else {
          this.getPosition();
        }
      })
    } catch (err) {
      // alert(err) // 可执行
      // alert(123) // 可执行
    } finally {
    }

    //level 10=>常州
    // let test_center=[119.939334,31.688709]
    let map = new AMap.Map("container", {
      resizeEnable: true,
      zoom: this.zoom, //级别
      // viewMode:'3D'//使用3D视图
    });
    map.on("click", this.click2);

    this.gaode.init(map);

    setInterval(() => {
      if (this.msglist.length < 1) {
        return;
      }
      if (this.msgindex > this.msglist.length) {
        this.msgindex = 0;
      }
      this.msg = this.msglist[this.msgindex].content;
    }, 3000);
  }

  toLocat() {
    this.gaode.getPosition((result) => {
      let lng = result.lng;
      let lat = result.lat;
      let country = result.country;
      let province = result.province;
      let city = result.city;
      let district = result.district;
      let township = result.township;
      let street = result.street;
      let streetNumber = result.streetNumber;
      let tt = province + "-" + city + "-" + district + "-" + township;
      console.log("tt:" + tt);
      this.mylat = lat;
      this.mylng = lng;
      if (this.map == null || this.map == undefined) {
        this.nMap(this.mylng, this.mylat);
      }
      // let center = [lng, lat]
      this.label1 = city + district + township;
      this.label2 = city + " " + street + streetNumber;
      console.log("label1:" + this.label1);
      console.log("label2:" + this.label2);
      this.refreshMarker();
    });
  }

  public refreshMarker() {
    let currentCenter = this.map.getCenter();
    let currentZoom = this.map.getZoom();
    let zoom = this.getZoom(currentZoom);
    let longitude = currentCenter.lng;
    let latitude = currentCenter.lat;
    console.log("currentCenter:" + JSON.stringify(currentCenter));
    currentCenter = longitude + "," + latitude;
    this.webApi.getEquipmentLocById(zoom, "100", currentCenter).then((data) => {
      if (this.marks != null && this.marks.length > 0) {
        this.map.remove(this.marks);
      }

      // {"equipmentPosition":[{"ex_address_position":"119.939334,31.688709","ex_address_name":"二院阳湖医院"}]}
      let equipmentPosition = data.data.equipmentPosition;
      this.equipmentPosition = equipmentPosition;
      console.log("equipmentPosition:" + JSON.stringify(equipmentPosition));
      this.map.remove(this.marks);
      this.marks = this.initmarker1(longitude, latitude);
      if (data.data.hasOwnProperty("equipmentPosition")) {
        for (let i = 0; i < equipmentPosition.length; i++) {
          let equip = equipmentPosition[i];
          console.log("equit:" + JSON.stringify(equip));
          let addrs = equip.address.split(",");
          let type = equip.type;
          let id = equip.id;
          // let testaddrs=[119.939334,31.688709];
          //  addrs=testaddrs
          let lng = addrs[0];
          let lat = addrs[1];
          let name = equip.name;
          let marker = new AMap.Marker({
            icon:
              type == "0"
                ? "../../assets/icon_blue.png"
                : "../../assets/icon_red.png",
            position: new AMap.LngLat(lng, lat), // 经纬度对象，也可以是经纬度构成的一维数组[116.39, 39.9]
            title: id,
            zIndex: 100,
          });
          marker.setOffset(new AMap.Pixel(0, 0));
          marker["id"] = id;
          marker["type"] = type;
          marker.on("click", () => {
            this.myLoading.show("");
            setTimeout(() => {
              this.myLoading.hide();
            }, 2000);
            // this.map.remove(this.marks)
            if (this.marker1 != null) {
              // this.marks=this.marks.splice(this.marks.index(this.marker1),1)
              this.map.remove(this.marker1);
              this.marker1 = null;
            }
            this.foottype = 2;
            for (let j = 0; j < this.marks.length; j++) {
              console.log("");
              let mark = this.marks[j];
              // if( mark['type']=='0'){
              //     mark.setIcon('../../assets/icon_blue.png')
              // }else if(mark['type']=='1'){
              //     mark.setIcon('../../assets/icon_red.png')
              // }else if(mark['type']=='3'){
              //     mark.setIcon('../../assets/icon_dibiao.png')
              // }
              // mark.setOffset(new AMap.Pixel(0,0))
              if (
                mark.id == id &&
                (mark["type"] == "0" || mark["type"] == "1")
              ) {
                console.log("markidid:" + id);
                let marker1 = new AMap.Marker({
                  position: new AMap.LngLat(lng, lat), // 经纬度对象，也可以是经纬度构成的一维数组[116.39, 39.9]
                  title: id,
                  zIndex: 1,
                });
                if (mark["type"] == "0") {
                  marker1.setIcon(
                    new AMap.Icon({
                      image: "../../assets/0000.png",
                      size: new AMap.Size(100, 100), //图标大小
                      imageSize: new AMap.Size(100, 100),
                      // offset:new AMap.Pixel(-80,-80)
                    })
                  );
                  marker1.setOffset(new AMap.Pixel(-25, -25));
                } else if (mark["type"] == "1") {
                  // mark.setIcon('../../assets/icon_yichang123.png')
                  marker1.setIcon(
                    new AMap.Icon({
                      image: "../../assets/1111.png",
                      size: new AMap.Size(100, 100), //图标大小
                      imageSize: new AMap.Size(100, 100),
                      // offset:new AMap.Pixel(-80,-80)
                    })
                  );
                  marker1.setOffset(new AMap.Pixel(-25, -25));
                }
                this.marker1 = marker1;
                this.map.add(this.marker1);
                // mark.setIcon(mark.type == '0' ? '../../assets/icon_zhengchang123.png' : '../../assets/icon_yichang123.png')
              }
              console.log("mark.id:" + mark.id);
            }
            this.map.add(this.marks);
            this.pullinfo(id);
          });
          // console.log('marker:' + JSON.stringify(marker));
          this.marks.push(marker);
        }
        // console.log('this.marks:' + JSON.stringify(this.marks));
      }
      this.map.add(this.marks);
    });
  }

  public nMap(lng, lat) {
    let center = [lng, lat];
    this.map = new AMap.Map("container", {
      resizeEnable: true,
      zoom: this.zoom, //级别
      center: center, //中心点坐标
      // viewMode:'3D'//使用3D视图
    });
    this.map.on("moveend", () => {
      console.log("map:move");
      this.refreshMarker();
      // this.toHome();
      // this.update_map_info();
    });
    this.map.on("click", () => {
      console.log("click3");
      this.swpstatus = false;
      this.swpstatus1 = false;
    });

    // this.map.on('zoomend', this.zoom_resize)
    // this.update_map_info();
  }

  public update_map_info() {
    // this.gaode.getPosition((result) => {
    //     let lng = result.lng;
    //     let lat = result.lat
    //     let currentCenter=[lng,lat]
    //     // let currentCenter = this.map.getCenter();
    //     this.gaode.geocoder.getAddress(currentCenter,  (status, result)=> {
    //         if (status === 'complete' && result.info === 'OK') {
    //             // result为对应的地理位置详细信息
    //             console.log('result:' + JSON.stringify(result))
    //             let regeocode = result.regeocode;
    //             console.log('regeocode:' + JSON.stringify(regeocode))
    //             let addressComponent=regeocode.addressComponent
    //             console.log('addressComponent:' + JSON.stringify(addressComponent))
    //             let formattedAddress = regeocode.formattedAddress
    //             console.log('formattedAddress:' + JSON.stringify(formattedAddress))
    //             let country = addressComponent.country;
    //             let province = addressComponent.province;
    //             let city = addressComponent.city;
    //             let district = addressComponent.district;
    //             let township = addressComponent.township;
    //             let street = addressComponent.street;
    //             let streetNumber = addressComponent.streetNumber;
    //             this.label1=city+district+township
    //             this.label2=city+' '+street+streetNumber
    //             console.log('label1:'+this.label1)
    //             console.log('label2:'+this.label2)
    //         }
    //     })
    // })
  }

  public zoom_resize() {
    console.log("map:zoom_resize");
  }

  ionViewDidEnter() {
    // return;
    this.toLocat();
    this.checkMsg();
    this.webApi.getEquipmentNumById().then((data) => {
      console.log("data1:" + JSON.stringify(data));
      let exNum = data.data.exNum;
      let normalNum = data.data.normalNum;
      let sum = exNum + normalNum;
      this.items1[0].number1 = sum;
      this.items1[1].number1 = normalNum;
      this.items1[2].number1 = exNum;
      if (sum == 0) {
        this.range_value = 100;
      } else {
        this.range_value = (normalNum / sum) * 100;
      }
      this.normal_rate = Math.round(this.range_value * 10) / 10;
      this.normal_rate = this.normal_rate.toFixed(1);
      this.exp_rate = 100 - this.normal_rate;
      this.exp_rate = this.exp_rate.toFixed(1);
    });

    if (this.rc == 1) {
      //weixiu
      this.nav.navigateForward("devstatus", {
        queryParams: {
          type: 1,
          equipmentId: this.devid1,
        },
      });
      this.devid1 = "";
    } else if (this.rc == 2) {
      //zijian
      this.nav.navigateForward("devstatus", {
        queryParams: {
          type: 2,
          equipmentId: this.devid1,
        },
      });
    } else if (this.rc == 3) {
      this.nav.navigateForward("langan-add", {
        queryParams: {
          type: 3,
          devID: this.devid1,
        },
      });
    }
    this.rc = 0;
    this.list = [];
  }

  ionViewDidLeave() {
    this.foottype = 0;
    // this.swpstatus1=false
  }

  async presentModal() {
    const modal = await this.modalController.create({
      component: SearchPage,
      animated: true,
      cssClass: "op",
      componentProps: {
        map: this.map,
      },
    });
    return await modal.present();
    // this.presentActionSheet();
  }

  // public toMyInfo() {
  //     this.router.navigate(['myinfo'])
  // }

  public toPrivacy() {
    this.nav.navigateForward("privacy");
    // this.router.navigate(['langan-info'])
  }

  public update_center() {
    this.gaode.geolocation.getCurrentPosition(
      (data) => {},
      (data) => {}
    );
  }

  public toHome() {
    this.foottype = 0;
    this.map = null;
    this.toLocat();
  }

  public getZoom(currentZoom) {
    let zoom = "1";
    if (currentZoom < 10) {
      zoom = "1";
    } else if (currentZoom < 11) {
      zoom = "2";
    } else {
      zoom = "3";
    }
    return zoom;
  }

  public toSearch() {
    if (this.foottype == 1) {
      this.foottype = 0;
    } else {
      this.list = [];
      this.serach_input = "";
      this.foottype = 1;
      this.swpstatus = false;
      this.ionchange();
    }

    // this.isShow1 = !this.isShow1;
    // this.isShow2 = !this.isShow2;
  }

  public toMessage() {
    this.nav.navigateForward("message");
  }

  public toMyDevices(item) {
    let type = item.type;
    this.nav.navigateForward("mydevices", {
      queryParams: {
        type: type,
        sumNum: this.items1[0].number1,
        normalNum: this.items1[1].number1,
        expNum: this.items1[2].number1,
      },
    });
  }

  toScanner() {
    this.rc = 0;
    this.devid1 = "";
    this.nav.navigateForward("scanner", {
      queryParams: {
        type: 1,
        callback: (text, type) => {
          console.log("ss:" + text);
          let ss = text.split(";");
          // this.nav.back()
          console.log("ss:" + ss[0]);
          this.devid1 = ss[0];
          this.rc = type;
        },
      },
    });
  }

  async presentActionSheet1() {
    let buttons = [
      {
        text: "扫码维修",
        handler: () => {
          this.devid1 = "";
          ///////////////////////////
          // this.nav.navigateForward('devstatus',{queryParams:{
          //         type:1,
          //         equipmentId:'861050046109949'
          //     }})
          // return
          //////////////////////////////
          this.nav.navigateForward("scanner", {
            queryParams: {
              type: 1,
              callback: (text) => {
                console.log("ss:" + text);
                let ss = text.split(";");
                // this.nav.back()
                console.log("ss:" + ss[0]);
                this.devid1 = ss[0];
              },
            },
          });
          /////////////////////////////////
        },
      },
      {
        text: "扫码安装",
        handler: () => {
          this.devid3 = "";
          // this.nav.navigateForward('langan-add',{queryParams:{
          //         devID:'ceshi1',
          //     }})
          this.nav.navigateForward("scanner", {
            queryParams: {
              type: 3,
              callback: (text) => {
                let ss = text.split(";");
                this.devid3 = ss[0];
                // this.nav.back()
                // this.nav.back()
                // this.nav.navigateForward('langan-add',{queryParams:{
                //         type:1,
                //         devID:ss[0],
                //     }})
              },
            },
          });
        },
      },
      {
        text: "扫码自检",
        handler: () => {
          this.devid2 = "";
          this.nav.navigateForward("scanner", {
            queryParams: {
              type: 2,
              callback: (text) => {
                let ss = text.split(";");
                this.devid2 = ss[0];
                // this.nav.back()
                // this.nav.back()
                // this.nav.navigateForward('devstatus',{queryParams:{
                //         type:1,
                //         equipmentId:ss[0],
                //     }})
              },
            },
          });
        },
      },
    ];
    const actionSheet = await this.actionSheetController.create({
      mode: "ios",
      buttons: buttons,
    });
    await actionSheet.present();
  }

  public ionchange() {
    this.myLoading.show("查询中");
    console.log("serach_input:" + this.serach_input);
    this.inputbk = this.serach_input;
    this.webApi.getAddressEquipmentByUserId(this.serach_input).then(
      (data) => {
        console.log("getAddressEquipmentByUserId:" + JSON.stringify(data));
        // this.serach_input=this.inputbk
        // if (this.serach_input != '') {
        this.list = data.data.list;
        // }
        setTimeout(() => {
          this.myLoading.hide(), 1000;
        });
        if (this.list.length < 1) {
          this.alert.presentAlertHint("没有查询到匹配的数据");
        }
      },
      (error) => {
        // this.serach_input=this.inputbk
        this.myLoading.hide();
      }
    );
  }

  public change1() {
    // if(this.serach_input==''){
    //     this.inputbk=this.serach_input
    // }
    // this.inputbk=this.serach_input
  }

  public click(item) {
    console.log("item:" + JSON.stringify(item));
    let type = item.type;
    let id = item.id;
    let address;
    this.pullinfo(id);
    if (type == "1") {
      this.foottype = 2;
      this.swpstatus1 = false;
    } else if (type == "2") {
      address = item.address;
      let ss = address.split(",");
      let position = [ss[0], ss[1]];
      this.map.setCenter(position);
    }

    // this.isShow1=false
    // this.isShow2=false
    // this.isShow4=true
    // this.router.navigate(['langan-info'], {queryParams: {id: id}})
    // if (type == '1') {
    //     this.router.navigate(['langan-info'], {queryParams: {id: id}})
    // } else if (type == '2') {
    //     address = item.address;
    //     let ss = address.split(',');
    //     let position = [ss[0], ss[1]];
    //     this.map.setCenter(position);
    // }
  }

  public checkMsg() {
    this.webApi.getUnreadMessage().then((data) => {
      let da = data.data;
      let list = da.list;
      // if (list.length > 0) {
      //     this.isShow3=true
      // }else{
      //     this.isShow3=false
      // }
      this.msglist = da.list;
    });
  }

  clear() {
    // this.list = []
  }

  initmarker1(lng, lat) {
    let markers = [];
    let marker = new AMap.Marker({
      icon: "../../assets/icon_dibiao.png",
      position: new AMap.LngLat(this.mylng, this.mylat), // 经纬度对象，也可以是经纬度构成的一维数组[116.39, 39.9]
      title: "当前位置",
    });
    marker["type"] = "3";

    markers.push(marker);
    return markers;
  }

  public num = 0;

  swipetop() {
    // this.num++
    // if(this.num%2==0){
    //     console.log('top')
    //     console.log('swpstatus1:'+this.swpstatus)
    //     this.swpstatus=!this.swpstatus
    //     console.log('swpstatus2:'+this.swpstatus)
    // }
    this.swpstatus = true;
  }

  swipedown() {
    this.swpstatus = false;
  }

  back() {
    this.isShow1 = true;
    this.isShow2 = false;
  }

  swipeUp(event: any): any {
    this.swpstatus = true;
    console.log("Swipe Up", event);
  }

  swipeDown(event: any): any {
    this.swpstatus = false;
    console.log("Swipe Down", event);
  }

  ///////////////////////////
  public gaodeapp;
  public id;
  public equipmentStatus;
  public label11;
  public items11 = [
    {
      icon: "../../assets/icon_jvli1 (3).png",
      label: "被撞次数",
      value: 0,
      type: 1,
    },
    {
      icon: "../../assets/icon_jvli1 (2).png",
      label: "维修次数",
      value: 0,
      type: 1,
    },
    {
      icon: "../../assets/icon_jvli1 (1).png",
      label: "距离您",
      value: 0,
      type: 2,
    },
  ];

  public items12 = [
    {
      label: "栏杆名称：",
      value: "",
    },
    {
      label: "出厂日期：",
      value: "",
    },
    {
      label: "安全日期：",
      value: "",
    },
    {
      label: "唯一编码：",
      value: "",
    },
  ];

  public items13 = [
    // {
    //     label: 'D123',
    //     value: '',
    // },
    // {
    //     label: 'D123',
    //     value: '',
    // },
  ];

  pullinfo(id) {
    this.info_lng = "";
    this.info_lat = "";
    this.info_name = "";
    this.distance = "";
    this.items11[2].value = 0;
    this.infostatus = "-1";
    this.webApi.getEquipmentInfoByKeyId(id).then((data) => {
      let maintainNum = data.data.maintainNum;
      let impactNum = data.data.impactNum;
      let equipmentDtl = data.data.equipmentDtl;
      let equipmentName = equipmentDtl.equipmentName;
      let deliveryTime = equipmentDtl.deliveryTime;
      let guaranteePeriod = equipmentDtl.guaranteePeriod;
      let equipmentId = equipmentDtl.equipmentId;
      let address = equipmentDtl.address;
      let ss = address.split(",");
      this.info_lng = ss[0];
      this.info_lat = ss[1];
      this.info_name = equipmentName;
      let equipmentStatus = equipmentDtl.equipmentStatus;
      this.infostatus = equipmentStatus;
      console.log("infostatus:" + this.infostatus);
      let impactDtli = data.data.impactDtli;
      this.items11[0].value = impactNum;
      this.items11[1].value = maintainNum;
      this.items12[0].value = equipmentName;
      this.items12[1].value = deliveryTime;
      this.items12[2].value = guaranteePeriod;
      this.items12[3].value = equipmentId;
      this.items13 = [];
      for (let i = 0; i < impactDtli.length; i++) {
        let item = impactDtli[i];
        let label = item.content;
        let value = item.updateDate;
        let tup = {
          label: label,
          value: value,
        };
        this.items13.push(tup);
      }
      let position = address.split(",");
      this.update(position);
      let distance = AMap.GeometryUtil.distance(
        [this.mylng, this.mylat],
        [this.info_lng, this.info_lat]
      );
      if (distance == null || distance == undefined) {
        distance = 0;
      }
      distance = distance / 1000;
      distance = distance.toFixed(2);
      this.items11[2].value = distance;
    });
  }

  public toNav() {
    // alert('调用导航')
    if (this.info_lng.length > 0) {
      this.checkmap();
    }
  }

  public update(position) {
    this.gaode.geocoder.getAddress(position, (status, result) => {
      if (status === "complete" && result.info === "OK") {
        // result为对应的地理位置详细信息
        console.log("result:" + JSON.stringify(result));
        let regeocode = result.regeocode;
        console.log("regeocode:" + JSON.stringify(regeocode));
        let addressComponent = regeocode.addressComponent;
        console.log("addressComponent:" + JSON.stringify(addressComponent));
        let formattedAddress = regeocode.formattedAddress;
        console.log("formattedAddress:" + JSON.stringify(formattedAddress));
        let country = addressComponent.country;
        let province = addressComponent.province;
        let city = addressComponent.city;
        let district = addressComponent.district;
        let township = addressComponent.township;
        let street = addressComponent.street;
        let streetNumber = addressComponent.streetNumber;
        // this.label1=city+district+township
        this.label11 = city + " " + street + streetNumber;
      }
    });
  }

  checkmap() {
    //检测高德地图是否存在
    if (this.platform.is("ios")) {
      this.gaodeapp = "iosamap://";
    } else if (this.platform.is("android")) {
      this.gaodeapp = "com.autonavi.minimap";
    }
    this.appAvailability.check(this.gaodeapp).then(
      (yes: boolean) => {
        //有安装app
        this.gogaodemap();
      },
      (no: boolean) => {
        //没有安装app
        // alert(this.gaodeapp + ' is NOT available')

        this.alert.presentAlertHint("请安装高德地图");
      }
    );
  }

  //跳转高德地图
  gogaodemap() {
    //高德地图参数配置
    var sApp = startApp.set(
      {
        //跳转对应APP
        action: "ACTION_VIEW",
        category: "CATEGORY_DEFAULT",
        type: "text/css",
        package: "com.autonavi.minimap",
        uri:
          "amapuri://route/plan/?sid=&slat=" +
          this.mylat +
          "&slon=" +
          this.mylng +
          "&sname=我的位置" +
          "&did=BGVIS2&dlat=" +
          this.info_lat +
          "&dlon=" +
          this.mylng +
          "&dname=" +
          this.info_name +
          "&dev=0&t=0", //我是选择路径规划然后导航的，当然你也可以直接用导航路径或者其他路径
        // "uri": 'amapuri://navi?sourceApplication= &poiname= &lat=' + this.info_lat + '&lon=' + this.info_lng +
        //     '&dev=1&style=2',
        flags: ["FLAG_ACTIVITY_CLEAR_TOP", "FLAG_ACTIVITY_CLEAR_TASK"],
        intentstart: "startActivity",
      },
      {
        /* extras */ EXTRA_STREAM: "extraValue1",
        extraKey2: "extraValue2",
      }
    );
    sApp.start(
      function () {
        //跳转成功
        // alert("OK");
      },
      function (error) {
        //失败
        this.alert.presentAlertHint(error);
      }
    );
  }

  swipeUp1(event: any): any {
    console.log("Swipe Up", event);
    this.swpstatus1 = true;
    // this.isShow1=false
    // this.isShow2=false
  }

  swipeDown1(event: any): any {
    console.log("Swipe Down", event);
    this.swpstatus1 = false;
    // this.isShow1=false
    // this.isShow2=false
  }

  press() {
    console.log("press");
  }

  blurInput() {
    console.log("ionBlur");
    this.focus = false;
  }
  focusInput() {
    this.focus = true;
    console.log("ionFocus");
  }

  click2() {
    console.log("click2");
    this.swpstatus = false;
    this.swpstatus1 = false;
  }
}
