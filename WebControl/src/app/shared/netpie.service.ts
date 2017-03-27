import { Injectable } from '@angular/core';
declare const Microgear: any;

@Injectable()
export class NetpieService {

  public door;
  public sensors;

  constructor() {
    const APPID     = 'CSSmartBuilding';
    const APPKEY    = '0EFWZTxu2Lga7Ri';
    const APPSECRET = 'uZHKAJhecrcR5neX0CH5SDySg';
    const ALIAS     = 'myhtml';
    const _self = this;

    const microgear = new Microgear.create({
      key: APPKEY,
      secret: APPSECRET,
      alias: ALIAS
    });

    microgear.on('message', function (topic, msg) {
      if(topic == '/CSSmartBuilding/device01/switch') {
        _self.door = msg;
      }

      if(topic == '/CSSmartBuilding/device01/sensor') {
        var input = msg.split(':');

        _self.sensors = [
          { light: input[0], hum: input[1], temp: input[2] }
        ]
      }
    });

    microgear.on('connected', function () {
      console.log("Microgear is connected!");

      this.useTLS(true);
      this.subscribe("/#");
    });

    microgear.connect(APPID);
  }
}
