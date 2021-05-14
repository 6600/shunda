import { Injectable } from '@angular/core';
import { Headers, Http, Response } from '@angular/http';
// import { Events } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { MyToast } from './my-toast.service';
import { UserInfo } from './user-info.service';
import {Alert} from "./alert.service";

/**
 * 网络接口集合
 */
@Injectable()
export class WebApi {

    // 域名地址
    public API_HOST = 'http://106.12.4.69:8021/jeeplus';
    //public API_HOST = 'http://122.51.162.218:8021/jeeplus';
    // public API_HOST='http://28355l6673.imdo.co'

    // 请求头
    private headers: Headers;
    private token;
    private equipmentpath='/a/equipment'

    public constructor(
        private http: Http,
        // private events: Events,
        private storage: Storage,
        private myToast: MyToast,
        private userInfo: UserInfo,
        private alert:Alert,
    ) {

        // this.login('admin','admin')
    }

    public init(){

        let promise=new Promise((resolve,reject)=>{
            return   this.storage.get('token').then((v)=>{
                this.token=v;
                console.log('token:'+v);
                if(this.token!=null&&this.token!=undefined&&this.token!=''){
                    // this.getUserInfoById();
                    resolve(true)
                }else{
                    resolve(false)
                }
            });
        })
        this.storage.get('userinfo').then((data)=>{
            if(data==undefined||data==null||data==''){
                console.info('test1')
            }else{
                console.log('userinfo:'+JSON.stringify(data))
                let jsondata=JSON.parse(data)
                console.log('userinfo:'+JSON.stringify(this.userInfo.avatar))
                this.userInfo.login(jsondata)
            }

        })
        return promise
    }

    public getEquipmentLocById(zoom:string,multiple:string,center_position:string){
        let body={
            zoom:zoom,
            multiple:multiple,
            centerPosition:center_position,
        }
        return this.post(this.equipmentpath+'/getEquipmentLocById/',body);
    }

    public getEquipmentNumById(){
        let body={}
        return this.post(this.equipmentpath+'/getEquipmentNumById/',body);
    }

    public getUserInfoById(){
        let body={}
        return this.post('/a/member/getUserInfoById',body);
    }

    public updateUserInfoById(body){
        return this.post('/a/member/updateUserInfoById',body);
    }

    public getAddressEquipmentByUserId(name){
        let body={}
        body['name']=name
        return this.post(this.equipmentpath+'/getAddressEquipmentByUserId',body);
    }

    public getMessage(pageNum){
        let body={}
        body['pageNum']=pageNum
        return this.post(this.equipmentpath+'/getMessage',body);
    }

    public updateMessage(id,status){
        let body={}
        body['id']=id
        body['status']=status
        return this.post(this.equipmentpath+'/updateMessage',body);
    }

    public getAccessoriesGallery(pageNum){
        let body={}
        body['pageNum']=pageNum
        // console.log('body'+JSON.stringify(body))
        return this.post('/a/member/getAccessoriesGallery',body);
    }

    public getDealer(type,pageNum){
        let body={}
        body['type']=type
        body['pageNum']=pageNum
        return this.post('/a/member/getDealer',body);
    }

    public getEquipmentInfoByKeyId(id){
        let body={}
        body['id']=id
        return this.post(this.equipmentpath+'/getEquipmentInfoByKeyId',body);
    }

    public getAddressEquipmentByName(type,name){
        let body={}
        body['type']=type
        body['name']=name
        return this.post(this.equipmentpath+'/getAddressEquipmentByName',body);
    }

    public getMaintainLogById(maintainLogId){
        let body={}
        body['maintainLogId']=maintainLogId
        return this.post('/a/member/getMaintainLogById',body);
    }

    public getAbnormalEquipmentListByLoginId(pageNum){
        let body={}
        body['pageNum']=pageNum
        return this.post('/a/member/getAbnormalEquipmentListByLoginId',body);
    }

    public File(files){
       // let url=this.API_HOST+'/a/File/upload'
        let form = new FormData(); // FormData 对象
        form.append("files", files[0]); // 文件对象
        form.append('md5',this.token)
        form.append('accessToken',this.token)
        // form.append('file_name',file_name)
        // let xhr = new XMLHttpRequest();  // XMLHttpRequest 对象
        // xhr.open("post", url, true); //post方式，url为服务器请求地址，true 该参数规定请求是否异步处理。
        // // xhr.onload = uploadComplete; //请求完成
        // // xhr.onerror =  uploadFailed; //请求失败
        // //
        // // xhr.upload.onprogress = progressFunction;//【上传进度调用方法实现】
        // // xhr.upload.onloadstart = function(){//上传开始执行方法
        // //     ot = new Date().getTime();   //设置上传开始时间
        // //     oloaded = 0;//设置上传开始时，以上传的文件大小为0
        // // };
        //
        // xhr.send(form); //开始上传，发送form数据

        return this.post('/a/File/upload',form);
    }

    public activateEquipment(equipmentId,longitudeAndLatitude,moduleId,moduleType,activateTime,theReturnArea,safeOperatingTime){
        let body={}
        body['equipmentCode']=equipmentId
        body['longitudeAndLatitude']=longitudeAndLatitude
        body['moduleId']=moduleId
        body['moduleType']=moduleType
        body['activateTime']=activateTime
        body['theReturnArea']=theReturnArea
        body['safeOperatingTime']=safeOperatingTime
        return this.post('/a/member/activateEquipment',body);
    }

    public getAllParts(){
        let body={}
        return this.post('/a/member/getAllParts',body);
    }

    public getEquipmentInfoById(equipmentId){
        let body={}
        body['equipmentId']=equipmentId
        return this.post('/a//member/getEquipmentInfoById',body);
    }

    public getMaintainLogListById(equipmentId,pageNum){
        let body={}
        body['equipmentId']=equipmentId
        body['pageNum']=pageNum
        return this.post('/a/member/getMaintainLogListById',body);
    }

    public registerEquipment(equipmentId){
        let body={}
        body['equipmentId']=equipmentId
        return this.post('/a/member/registerEquipment',body);
    }

    public selfInspection(equipmentId){
        let body={}
        body['equipmentId']=equipmentId
        return this.post('/a/member/selfInspection',body);
    }
    public deleteInspection(equipmentId){
        let body={}
        body['equipmentId']=equipmentId
        return this.post('/a/member/delEquipment',body);
    }
    public getAllDamageReason(){
        let body={}
        return this.post('/a/equipment/getAllDamageReason',body);
    }

    public maintainEquipment(equipmentCode,isChange,newEquipmentCode,replaceReason,remarks,maintainDate) {
        let body = {}
        body['equipmentCode'] = equipmentCode
        body['isChange'] = isChange
        body['newEquipmentCode'] = newEquipmentCode
        body['replaceReason'] = replaceReason
        body['remarks'] = remarks
        body['maintainDate']=maintainDate
        return this.post('/a/member/maintainEquipment',body);
    }

    public getTraderInfo(){
        let body={}
        return this.post('/a/member/getTradeInfo',body);
    }

    public getUnreadMessage(){
        let body={}
        body['pageNum']=1
        return this.post('/a/equipment/getUnreadMessage',body);
    }

    /**
     * get方法
     * @param path 请求路径
     */
    private get(path: string) {
        let promise = this.http
            .get(this.API_HOST + path, { headers: this.headers })
            .toPromise();

        return this.handleResult(promise);
    }

    /**
     * post方法
     * @param path 请求路径
     * @param body 请求体
     */
    private post(path: string, body: any) {
        body['accessToken']=this.token;
        console.log('body:'+JSON.stringify(body));
        let promise = this.http
            .post(this.API_HOST + path, body, { headers: this.headers })
            .toPromise();

        return this.handleResult(promise);
    }

    /**
     * 处理网络响应结果
     * @param promise 异步响应结果
     */
    private handleResult(promise: Promise<Response>) {
        return promise.then((response: Response) => {
            // 正确：转为json
            let data=response.json();
            //let code=data.code;
            // if(code!=1){
            //     alert(data.msg);
            //     throw response
            // }else{
                return data;
            // }
        }, (error: Response) => {
            // 401错误：token过期
            if (error.status == 401) {
                // this.events.publish('token:expired');
                this.myToast.show('登录状态过期');
                this.logout();
            }
            // 其它错误：网络错误
            else this.myToast.show('网络错误');
            throw error;
        });
    }


    /**
     * 获取用户信息
     */
    public getUserInfo() {
        let promise=new Promise((resolve,reject)=>{
            return this.storage.get('token').then((data) => {
                if (data == null) return;
                else this.userInfo.token = data;
                this.getUserInfoById().then((data)=>{
                    // let memberAddressInfo=data.data.memberAddressInfo;
                    this.userInfo.officeName=data.data.officeName;
                    this.userInfo.phone=data.data.phone;
                    this.userInfo.name=data.data.name;
                    this.userInfo.id=data.data.id;
                    this.userInfo.type=data.data.isType;
                    this.userInfo.loginName=data.data.loginName;
                    // this.storage.set('officeName',  this.userInfo.officeName);
                    // this.storage.set('phone',  this.userInfo.phone);
                    // this.storage.set('name',  this.userInfo.name);
                    // this.storage.set('id',  this.userInfo.id);
                    // this.storage.set('type',  this.userInfo.type);
                    // this.storage.set('loginName',  this.userInfo.loginName);
                    let photoPath=data.data.photoPath;
                    if(photoPath!=null && photoPath !=undefined && photoPath.length>1){
                        console.log('photoPath:'+photoPath)
                        photoPath=photoPath.replace('[','')
                        photoPath=photoPath.replace(']','')
                        photoPath=photoPath.replace("'",'')
                        photoPath=photoPath.replace("'",'')
                        console.log('photoPath:'+photoPath)
                        this.userInfo.avatar=photoPath
                        // this.storage.set('avatar',  this.userInfo.avatar);
                    }
                    console.log('userinfo:'+this.userInfo)
                    this.storage.set('userinfo',  JSON.stringify(this.userInfo));
                    this.storage.set('photo',photoPath)
                    resolve()
                });
            });
        })

        return promise
    }

    /**
     * 登录
     */
    public login(userName: string, password: string) {
        return this.post('/a/member/userLogin', { 'account': userName, 'password': password }).then((data) => {
            if (data.code != '1') {
                this.alert.presentAlertHint('登录失败')
                throw data.message;
            }
            // console.log('data1:'+JSON.stringify(data));
            // {"code":1,"msg":"操作成功","data":{"memberInfoMap":{"phone":"15295053287","loginName":"admin","name":"小哥哥","photoId":"","isType":"0"},"token":"-bb6arf6lhhd4pqjq4k17lmmd99bb07lg"}}
            // this.userInfo.login(data.data);
            this.storage.set('token', data.data.token);
            this.token=data.data.token;
            this.getUserInfo();
            // // // 生成请求头
            // this.headers = new Headers({ 'token': this.userInfo.token });
        });
    }

    /**
     * 注销
     */
    public logout() {
        this.userInfo.logout();
        this.storage.remove('token');
        this.headers = new Headers({});

        return this.get('logout');
    }

    /**
     * 修改密码
     */
    public updateUserPassword(obj: any) {
        return this.post('updateUserPassword', obj);
    }
}
