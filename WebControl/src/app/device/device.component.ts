import { Component } from '@angular/core';

declare var Microgear: any;

@Component({
  selector: 'app-device',
  templateUrl: './device.component.html',
  styleUrls: ['./device.component.scss']
})
export class DeviceComponent {
  private microgear: any;
  private APPID: string;
  private APPKEY: string;
  private APPSECRET: string;
  private ALIAS: string;

  private door: any;
  private sensors: any;

  constructor() {
    this.APPID = 'CSSmartBuilding';
    this.APPKEY = '0EFWZTxu2Lga7Ri';
    this.APPSECRET = 'uZHKAJhecrcR5neX0CH5SDySg';
    this.ALIAS = 'myhtml';
  }

  ngOnInit() {
    var _self = this;

    this.microgear = new Microgear.create({
      key: this.APPKEY,
      secret: this.APPSECRET,
      alias: this.ALIAS
    });

    this.microgear.on('message', function (topic, msg) {
      // console.log("New message!");
      // console.log("from: " + topic);
      // console.log("msg: " + msg);

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

    this.microgear.on('connected', function () {
      console.log("Microgear is connected!");

      this.useTLS(true);
      this.subscribe("/#");
    });

    this.microgear.connect(this.APPID);
  }
}
