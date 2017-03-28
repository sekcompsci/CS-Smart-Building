import { Injectable } from '@angular/core';
import { Device } from './device.model';

@Injectable()
export class DeviceService {

  devices: Device[] = [];

  constructor() { }

  getCatagory() {
    return this.devices;
  }

  addCatagory(device: Device) {
    this.devices.push(device);
  }

  removeCatagory(id) {
    const index = this.devices.findIndex(device => device.id === id);
    this.devices.splice(index, 1);
  }

}
