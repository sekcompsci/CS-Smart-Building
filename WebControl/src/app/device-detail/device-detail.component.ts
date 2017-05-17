import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DeviceService } from '../device/device.service'

@Component({
  selector: 'app-device-detail',
  templateUrl: './device-detail.component.html',
  styleUrls: ['./device-detail.component.scss']
})
export class DeviceDetailComponent {

  private devices = [];

  constructor(private route: ActivatedRoute, private deviceService: DeviceService) {
    const { id } = route.snapshot.params;

    deviceService.getDevice(id)
                 .subscribe(
                   device => {
                     this.devices.push(device);
                   },
                   error => console.error(error)
                 )
  }
}
