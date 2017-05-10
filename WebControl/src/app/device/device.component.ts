import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
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

export class DeviceComponent implements OnInit, OnDestroy {

  // NETPIE
  private microgear: any;
  private deviceForm: Devices;
  private devices = [];

  // Speech API
  private speechState: number;
  public txt_respon: string;

  // FORM
  public groupForm: Groups;
  public groups = [];
  public alert = '';
  public display_door;
  public display_light;

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

  constructor(private speechRecognitionService: SpeechService, private router: Router) {
    this.resetGroupForm();
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

      if(!_self.isEmpty(_self.devices)) {
        const device = _self.devices.find(devices => devices.name === topic_name[2]);

        if (topic_name[3] == 'switch') {
          _self.devices[device.id - 1].door = msg;
        }

        if (topic_name[3] == 'sensor') {
          const sensor = msg.split(':');

          _self.devices[device.id - 1].light = sensor[0];
          _self.devices[device.id - 1].temp = sensor[1];
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
    if(this.groupForm.catagoryName != null) {
      this.groups.push(this.groupForm);
      this.resetGroupForm();

      this.alert = '';
      $('#myModal').modal('hide');
    }
    else this.alert = 'กรุณากรอกชื่อหมวดหมู่';
  }

  removeCatagory(id) {
    const index = this.groups.findIndex(groups => groups.id === id);
    this.groups.splice(index, 1);
  }

  resetGroupForm() {
    this.groupForm = new Groups();
  }

  addDevice(gid) {
    if(this.deviceForm.name != null) {
      const id = this.devices.length + 1;

      this.deviceForm.id = id;
      this.deviceForm.gid = gid;
      this.deviceForm.description = '';
      this.deviceForm.light = 50;
      this.deviceForm.temp = 0;
      this.deviceForm.door = 0;

      this.devices.push(this.deviceForm);
      this.resetDeviceForm();
    }
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
