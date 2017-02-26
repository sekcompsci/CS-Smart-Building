import { Component, OnInit } from '@angular/core';

declare var Microgear: any;

@Component({
  selector: 'app-netpie',
  templateUrl: './netpie.component.html',
  styleUrls: ['./netpie.component.scss']
})
export class NetpieComponent implements OnInit {

  private microgear: any;
  private APPID: string;
  private APPKEY: string;
  private APPSECRET: string;
  private ALIAS: string;

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
      console.log("New message!");
      console.log("from: " + topic);
      console.log("msg: " + msg);
    });

    this.microgear.on('connected', function () {
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

    this.microgear.connect(this.APPID);
  }

}
