import {Injectable} from "@angular/core";
import {MyLoading} from "./my-loading.service";
import {Alert} from "./alert.service";
import { AndroidPermissions } from '@ionic-native/android-permissions/ngx';
declare const AMap:any;
@Injectable()
export class GaodDe{

    public geolocation;
    public geocoder;
    private init1=false
    constructor(private myLoading:MyLoading,
                private alert:Alert,
                public androidPermissions: AndroidPermissions){
        // this.init()
    }

    init(map){
        AMap.plugin('AMap.Geolocation', ()=> {
            this.geolocation = new AMap.Geolocation({
                // 是否使用高精度定位，默认：true
                enableHighAccuracy: false,
                // 设置定位超时时间，默认：无穷大
                maximumAge: 0,
                timeout: 2000,
                noIpLocate:0,
                noGeoLocation:0,
                GeoLocationFirst:true,
                useNative:true,
                // 定位按钮的停靠位置的偏移量，默认：Pixel(10, 20)
                buttonOffset: new AMap.Pixel(10, 20),
                //  定位成功后调整地图视野范围使定位位置及精度范围视野内可见，默认：false
                zoomToAccuracy: true,
                //  定位按钮的排放位置,  RB表示右下
                buttonPosition: 'RB'
            })
            // map.addControl(this.geolocation);
        })

        AMap.plugin('AMap.Geocoder', ()=> {
            this.geocoder = new AMap.Geocoder({
                // city 指定进行编码查询的城市，支持传入城市名、adcode 和 citycode
                city: '010'
            })
        })


        // AMap.event.addListener(this.geolocation, 'complete', onComplete); // 返回定位信息
        // AMap.event.addListener(this.geolocation, 'error', onError);       // 返回定位出错信息
        //
        // function onComplete(obj){
        //     var res = '经纬度：' + obj.position +
        //         '\n精度范围：' + obj.accuracy +
        //         '米\n定位结果的来源：' + obj.location_type +
        //         '\n状态信息：' + obj.info +
        //         '\n地址：' + obj.formattedAddress +
        //         '\n地址信息：' + JSON.stringify(obj.addressComponent, null, 4);
        //     alert(res);
        // }
        //
        // function onError(obj) {
        //     alert(obj.info + '--' + obj.message);
        //     console.log(obj);
        // }
    }

    public getAddress(position=undefined,success=undefined,failure=undefined){
        this.geocoder.getAddress(position,(status,result)=>{
            if (status === 'complete' && result.info === 'OK'){
                if(success!=undefined){
                    success(result)
                }
            }else{
                // alert('网络错误')
            }
        })
    }

    public getPosition(success=undefined,failure=undefined){
        this.myLoading.show()
        this.geolocation.getCurrentPosition((status,result)=>{
            console.log('myLoading.hide')
            this.myLoading.hide()
            if (status === 'complete'&&result.info==='SUCCESS'){

                console.log('result:'+JSON.stringify(result))
                if (success!=undefined){
                    let position=result.position
                    let lng=position.lng
                    let lat=position.lat
                    // let addressComponent=result.addressComponent
                    // let country = addressComponent.country;
                    // let province = addressComponent.province;
                    // let city = addressComponent.city;
                    // let district = addressComponent.district;
                    // let township = addressComponent.township;
                    // let street = addressComponent.street;
                    // let streetNumber = addressComponent.streetNumber;
                    this.linshi1(lng,lat,success)
                }
            }else{
                // alert('网络错误')
            }
        })
    }

    linshi1(lng,lat,callback){
        console.log('linshi1.hide')
        this.geocoder.getAddress([lng,lat],  (status, result)=> {
            if (status === 'complete' && result.info === 'OK') {
                // result为对应的地理位置详细信息
                console.log('result:' + JSON.stringify(result))
                let regeocode = result.regeocode;
                console.log('regeocode:' + JSON.stringify(regeocode))
                let addressComponent=regeocode.addressComponent
                console.log('addressComponent:' + JSON.stringify(addressComponent))
                let formattedAddress = regeocode.formattedAddress
                console.log('formattedAddress:' + JSON.stringify(formattedAddress))
                let country = addressComponent.country;
                let province = addressComponent.province;
                let city = addressComponent.city;
                let district = addressComponent.district;
                let township = addressComponent.township;
                let street = addressComponent.street;
                let streetNumber = addressComponent.streetNumber;
                let nresult={
                    lng:lng,
                    lat:lat,
                    country:country,
                    province:province,
                    city:city,
                    district:district,
                    township:township,
                    street:street,
                    streetNumber:streetNumber
                }
                callback(nresult)
                // this.label1=city+district+township
                // this.label2=city+' '+street+streetNumber
                // console.log('label1:'+this.label1)
                // console.log('label2:'+this.label2)
            }else{
                console.log('status:'+status)
                console.log('result.info:'+result.info)
                // if(!this.init1){
                //     this.androidPermissions.requestPermissions([
                //         this.androidPermissions.PERMISSION.ACCESS_COARSE_LOCATION,
                //         this.androidPermissions.PERMISSION.ACCESS_FINE_LOCATION,
                //         this.androidPermissions.PERMISSION.ACCESS_LOCATION_EXTRA_COMMANDS]).then(r => {
                //         // 申请权限成功
                //     }).catch(err => {
                //         //申请权限失败："
                //     });
                //     this.init1=true
                // }
                this.alert.presentAlertHint('请检查网络和定位权限')

            }
        })
    }



}