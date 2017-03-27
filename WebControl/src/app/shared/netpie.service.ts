import { Injectable } from '@angular/core';
declare var Microgear: any;

@Injectable()
export class NetpieService {

  constructor() {
    var APPID     = 'CSSmartBuilding';
    var APPKEY    = '0EFWZTxu2Lga7Ri';
    var APPSECRET = 'uZHKAJhecrcR5neX0CH5SDySg';
    var ALIAS     = 'myhtml';

    var _self = this;

    var microgear = new Microgear.create({
      key: APPKEY,
      secret: APPSECRET,
      alias: ALIAS
    });

    microgear.on('message', function (topic, msg) {
      console.log("New message!");
      console.log("from: " + topic);
      console.log("msg: " + msg);
    });

    microgear.on('connected', function () {
      console.log("Microgear is connected!");

      this.useTLS(true);
      this.subscribe("/#");
    });

    // this.microgear.on('present', function (event) {
    //   console.log(event);
    // });

    // this.microgear.on('absent', function (event) {
    //   console.log(event);
    // });

    microgear.connect(APPID);
  }
}
