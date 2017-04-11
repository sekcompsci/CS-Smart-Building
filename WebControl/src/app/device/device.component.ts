import { Component, OnInit, OnDestroy } from '@angular/core';
import { Device } from './device.model';
declare const Microgear;

@Component({
  selector: 'app-device',
  templateUrl: './device.component.html',
  styleUrls: ['./device.component.scss']
})

export class DeviceComponent {

  // NETPIE
  private microgear: any;
  private door: any;
  private sensors: any;

  ngOnInit() {
    const APPID      = 'CSSmartBuilding';
    const APPKEY     = '0EFWZTxu2Lga7Ri';
    const APPSECRET  = 'uZHKAJhecrcR5neX0CH5SDySg';
    const ALIAS      = 'WebControl';
    const _self      = this;
 
    this.microgear = new Microgear.create({
      key: APPKEY,
      secret: APPSECRET,
      alias: ALIAS
    });
 
    this.microgear.on('message', function (topic, msg) {
 
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
 
    this.microgear.connect(APPID);
  }

  ngOnDestroy() {
    this.microgear.client.disconnect();
    this.microgear.client = '';
  }


  // FORM
  model: Device;
  devices = [];

  constructor() {
    this.resetFrom();
  }

  addCatagory() {
    this.devices.push(this.model);
    console.log(this.model);
    this.resetFrom();
  }

  removeCatagory(id) {
    const index = this.devices.findIndex(device => device.id === id);
    this.devices.splice(index, 1);
  }

  private resetFrom() {
    this.model = new Device();
  }
}
