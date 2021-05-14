import { Component, OnInit } from "@angular/core";
import { NavController } from "@ionic/angular";
import { ActivatedRoute, Router } from "@angular/router";
import { WebApi } from "../../../../providers/web-api.service";
import { Alert } from "../../../../providers/alert.service";
import { UserInfo } from "../../../../providers/user-info.service";

@Component({
  selector: "app-devstatus",
  templateUrl: "./devstatus.page.html",
  styleUrls: ["./devstatus.page.scss"],
})
export class DevstatusPage implements OnInit {
  constructor(
    public nav: NavController,
    public route: ActivatedRoute,
    public webapi: WebApi,
    public router: Router,
    public myalert: Alert,
    public userinfo: UserInfo
  ) {
    const queryParams = this.route.snapshot.queryParams;
    this.equipment_id = queryParams.equipmentId;
    // this.equipment_id='ceshi1'
    this.type = queryParams.type;
  }
  equipment_id;
  equipment_name;
  equipment_loc;
  serial_id;
  manufacturer;
  chuchangshijian;
  workdate;
  equipmentStatus;
  batchNumber;
  type;

  ngOnInit() {
    this.webapi.getEquipmentInfoByKeyId(this.equipment_id).then((data) => {
      let equipmentDtl = data.data.equipmentDtl;
      this.equipment_id = equipmentDtl.equipmentId;
      this.equipment_name = equipmentDtl.equipmentName;
      this.equipment_loc = equipmentDtl.addressName;
      this.serial_id = equipmentDtl.equipmentId;
      this.chuchangshijian = equipmentDtl.deliveryTime;
      this.workdate = equipmentDtl.guaranteePeriod;
      this.manufacturer = equipmentDtl.manufacturer;
      this.equipmentStatus = equipmentDtl.equipmentStatus;
      this.batchNumber = equipmentDtl.batchNumber;
    });
  }

  toRecord() {
    // this.nav.navigateRoot('maintainrecord')
    this.router.navigate(["maintainlist1"], {
      queryParams: {
        equipmentID: this.equipment_id,
        equipname: this.equipment_name,
      },
    });
  }

  towxzhong() {
    this.router.navigate(["weixiuzhong"], {
      queryParams: {
        equipmentID: this.equipment_id,
        equipname: this.equipment_name,
      },
    });
  }
  deleteItem () {
    this.webapi.deleteInspection(this.equipment_id).then((data) => {
      let code = data.code;
      let bts;
      let msg;
      let body = {};
      body["hint"] = "提示";
      if (code == "1") {
        msg = "删除成功";
        bts = [
          {
            text: "返回",
            handler: () => {},
          },
          {
            text: "确定",
            handler: () => {
              this.router.navigate(["home"]);
            },
          },
        ];
      } else {
        body["hint"] = "删除失败";
        msg = data.msg
        bts = [
          {
            text: "返回",
            handler: () => {},
          },
          {
            text: "确定",
            handler: () => {},
          },
        ];
      }
      body["msg"] = msg;
      body["bts"] = bts;
      this.myalert.show(body);
    });
  }
  toZijian() {
    this.webapi.selfInspection(this.equipment_id).then((data) => {
      let code = data.code;

      let body = {};
      let bts;
      let msg;
      body["hint"] = "提示";
      if (code == "1") {
        msg = "自检完成";
        bts = [
          {
            text: "返回",
            handler: () => {},
          },
          {
            text: "确定",
            handler: () => {
              this.router.navigate(["home"]);
            },
          },
        ];
      } else {
        msg = "自检异常";
        bts = [
          {
            text: "返回",
            handler: () => {},
          },
          {
            text: "确定",
            handler: () => {},
          },
        ];
      }
      body["msg"] = msg;
      body["bts"] = bts;
      this.myalert.show(body);
    });
  }

  toBack() {
    this.nav.pop();
  }
}
