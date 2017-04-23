import { Component, OnInit, OnDestroy } from '@angular/core';
import { SpeechService } from '../shared/speech.service';
import { Device } from './device.model';
declare const Microgear;
declare const $: any;

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

  // Speech API
  private speechState: number;

  // FORM
  private model: Device;
  private devices = [];

  ngOnInit() {
    this.speechSearch();
  }

  ngOnDestroy() {
    if (this.microgear) {
      this.microgear.client.disconnect();
      this.microgear.client = '';
    }

    this.speechRecognitionService.DestroySpeechObject();
  }

  constructor(private speechRecognitionService: SpeechService) {
    this.resetFrom();

    // NETPIE
    const APPID = 'CSSmartBuilding';
    const APPKEY = '0EFWZTxu2Lga7Ri';
    const APPSECRET = 'uZHKAJhecrcR5neX0CH5SDySg';
    const ALIAS = 'WebControl';
    const _self = this;

    this.microgear = new Microgear.create({
      key: APPKEY,
      secret: APPSECRET,
      alias: ALIAS
    });

    this.microgear.on('message', function (topic, msg) {

      if (topic == '/CSSmartBuilding/device01/switch') {
        _self.door = msg;
      }

      if (topic == '/CSSmartBuilding/device01/sensor') {
        var input = msg.split(':');

        _self.sensors = [
          { light: input[0], hum: input[1], temp: input[2] }
        ]
      }
    });

    this.microgear.on('connected', function () {
      console.log('Microgear is connected!');

      this.useTLS(true);
      this.subscribe('/#');
    });

    this.microgear.connect(APPID);

    // Speech API
    this.speechState = 0;
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

  speechOpen() {
    var button = $('.button');
    var mic = button.find('svg');
    var active = $('.active-wrapper');
    var w = $(window);
    var vw = w.innerWidth();
    var vh = w.innerHeight();
    var bw = button.innerWidth();
    var bh = button.innerHeight();
    var s;
    
    mic.hide();

    if (vw > vh) {
        s = vw / bw * 2.5;
      } else {
        s = vh / bh * 2.5;
      }
      var scale = 'scale(' + s + ') translate(-50%,-50%)';

      button.css({
        transform: scale
      });

      button.on('transitionend', function () {
        active.addClass('active');
        $(this).off('transitionend');
      });
  }

  speechClose() {
    var active = $('.active-wrapper');
    var button = $('.button');
    var mic = button.find('svg');

    active.removeClass('active');
    button.removeAttr('style');
    mic.show();
  }

  speechSearch() {
    this.speechRecognitionService.record()
      .subscribe(
      //listener
      (value) => {
        if (this.speechState == 0 && value == 'รับคำสั่ง') {
          this.speechState = 1;
          this.speechOpen();
        } else if (this.speechState == 1) {
          console.log(value);
          this.speechClose();

          this.speechState = 0;
        }
      },
      //errror
      (err) => {
        console.log(err);

        if (err.error == 'no-speech') {
          console.log('--restatring service--');
          this.speechSearch();
        }
      },
      //completion
      () => {
        console.log("--complete--");
        this.speechSearch();
      });
  }

  speechStartClick() {
    this.speechOpen()
    this.speechState = 1;
  }

  speechStopClick() {
    this.speechClose()
    this.speechState = 0;
  }
}
