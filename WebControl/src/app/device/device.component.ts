import { Component, OnInit, OnDestroy } from '@angular/core';
import { SpeechService } from '../shared/speech.service';
import { Groups } from './group.model';
import { Devices } from './device.module';
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
  private deviceForm: Devices;
  private devices = [];

  // Speech API
  private speechState: number;
  private txt_respon: string;

  // FORM
  private groupForm: Groups;
  private groups = [];

  ngOnInit() {
    this.speechSearch();
  }

  ngOnDestroy() {
    if (this.microgear.client != null) {
      this.microgear.client.disconnect();
      this.microgear.client = null;
    }

    this.speechRecognitionService.DestroySpeechObject();
  }

  constructor(private speechRecognitionService: SpeechService) {
    this.resetGroupFrom();
    this.resetDeviceForm();

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
      const topic_name = topic.split('/');
      console.log(topic_name);

      if(!_self.isEmpty(_self.devices)) {
        const device = _self.devices.find(devices => devices.name === topic_name[2]);
        console.log(device.id);

        if (topic_name[3] == 'switch') {
          _self.devices[device.id - 1].door = msg;
        }

        if (topic_name[3] == 'sensor') {
          const sensor = msg.split(':');

          _self.devices[device.id - 1].light = sensor[0];
          _self.devices[device.id - 1].hum = sensor[1];
          _self.devices[device.id - 1].temp = sensor[2];
        }
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

  isEmpty(obj) {
    // null and undefined are "empty"
    if (obj == null) return true;
    if (obj.length > 0) return false;
    if (obj.length === 0) return true;
    if (typeof obj !== "object") return true;
  }

  addCatagory() {
    this.groups.push(this.groupForm);
    console.log(this.groupForm);
    this.resetGroupFrom();
  }

  removeCatagory(id) {
    const index = this.groups.findIndex(groups => groups.id === id);
    this.groups.splice(index, 1);
  }

  resetGroupFrom() {
    this.groupForm = new Groups();
  }

  addDevice(gid) {
    const id = this.devices.length + 1;

    this.deviceForm.id = id;
    this.deviceForm.gid = gid;
    this.deviceForm.name = 'device' + id;
    this.deviceForm.description = '';
    this.deviceForm.light = 50;
    this.deviceForm.hum = 0;
    this.deviceForm.temp = 0;
    this.deviceForm.door = 0;

    this.devices.push(this.deviceForm);
    console.log(this.deviceForm);
    this.resetDeviceForm();
  }

  removeDevice(id) {
    const index = this.devices.findIndex(devices => devices.id === id);
    this.devices.splice(index, 1);
  }

  resetDeviceForm() {
    this.deviceForm = new Devices;
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
    this.txt_respon = 'เรากำลังฟังอยู่...';
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
          console.log(value);

          if (value == 'reload') {
            window.location.reload(true);

            return
          } else if (value == 'ยกเลิก') {
            this.speechClose();
          }
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
}
