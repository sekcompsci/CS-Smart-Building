import { Component, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { SpeechService } from '../shared/speech.service';
import { DeviceService } from './device.service'
declare const Microgear;
declare const $: any;

@Component({
  selector: 'app-device',
  templateUrl: './device.component.html',
  styleUrls: ['./device.component.scss']
})

export class DeviceComponent implements OnDestroy {

  // NETPIE
  private microgear: any;
  private APPID = 'CSSmartBuilding';
  private APPKEY = '0EFWZTxu2Lga7Ri';
  private APPSECRET = 'uZHKAJhecrcR5neX0CH5SDySg';
  private ALIAS = 'WebControl';

  // Speech API
  private speechState: number;
  public txt_respon: string;

  // FORM
  public devices = [];
  public groups = [];
  public alert = '';
  private display_door;
  private display_light;

  ngOnDestroy() {
    if (this.microgear.client !== null) {
      this.microgear.client.disconnect();
      this.microgear.client = null;
    }

    this.speechRecognitionService.DestroySpeechObject();
  }

  constructor(private speechRecognitionService: SpeechService, private deviceService: DeviceService, private router: Router) {
    deviceService.getAllGroup()
                 .subscribe(
                   groups => {
                    this.groups = groups;
                   },
                   error => console.error(error)
                 );
    
    deviceService.getAllDevice()
                 .subscribe(
                   devices => {
                     this.devices = devices;
                   },
                   error => console.error(error)
                 );

    // NETPIE
    const _self = this;

    this.microgear = new Microgear.create({
      key: this.APPKEY,
      secret: this.APPSECRET,
      alias: this.ALIAS
    });

    this.microgear.on('message', function (topic, msg) {
      if(_self.devices.length < 1) return;

      const topic_name = topic.split('/');
      
      const index = _self.devices.findIndex(devices => devices.name == topic_name[2]);
      if(index < 0) return;

      if (topic_name[3] == 'switch') {
        _self.devices[index].door = msg;
      }

      if (topic_name[3] == 'sensor') {
        const sensor = msg.split(':');

        _self.devices[index].light = sensor[0];
        _self.devices[index].temp = sensor[1];
      }
    });

    this.microgear.on('connected', function () {
      console.log('Microgear is connected!');

      this.useTLS(true);
      this.subscribe('/#');
    });

    this.microgear.connect(this.APPID);

    // Speech API
    this.speechState = 0;
    this.speechSearch();
  }

  isEmpty(obj) {
    // null and undefined are "empty"
    if (obj == null) return true;
    if (obj.length > 0) return false;
    if (obj.length === 0) return true;
    if (typeof obj !== "object") return true;
  }

  addGroup(value) {
    if(value.groupFormName) {
      this.deviceService.createGroup(value.groupFormName, value.groupFormDescription)
                        .subscribe(
                          group => {
                            this.groups.push(group);
                          },
                          error => console.error(error)
                        );

      $('#myModal').modal('hide');
      this.alert = '';
    }
    else this.alert = 'กรุณากรอกชื่อหมวดหมู่';
  }

  removeGroup(id: number) {
    this.deviceService.destroyGroup(id)
                 .subscribe(
                   res => {
                    const index = this.groups.findIndex(groups => groups.gid == res);
                    this.groups.splice(index, 1);
                   },
                   error => console.error(error)
                 );
  }

  addDevice(value, gid) {
    if(!value.deviceName) return;

    this.deviceService.createDevice(value.deviceName, gid)
                      .subscribe(
                        device => {
                          this.devices.push(device);
                        },
                        error => console.error(error)
                      );
  }

  removeDevice(id) {
    const index = this.devices.findIndex(devices => devices.id === id);
    this.devices.splice(index, 1);
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

    this.speechState = 1;
    this.txt_respon = 'คำสั่งของคุณคือ...';
  }

  speechClose() {
    var active = $('.active-wrapper');
    var button = $('.button');
    var mic = button.find('svg');

    active.removeClass('active');
    button.removeAttr('style');
    mic.show();

    this.speechState = 0;
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
          this.txt_respon = value;
          const values = value.split(' ');

          if (values[0] == 'ยกเลิก') {
            this.speechClose();
          } else if (values[0] == 'ตรวจ' && values[1] == 'device') {
            this.router.navigate(['device', values[2]]);
          } else if (values[0] == 'แสดงประตู') {
            this.display_door = 'none';
            this.speechClose();
          } else if (values[0] == 'แสดงไฟ') {
            this.display_light = 'none';
            this.speechClose();
          } else if (values[0] == 'แสดงทั้งหมด') {
            this.display_door = '';
            this.display_light = '';
            this.speechClose();
          } else if (values[0] == 'ย้อนกลับ') {
            this.router.navigate(['device']);
            this.speechClose();
          }
        }
      },
      //errror
      (err) => {
        console.error(err);

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
}
