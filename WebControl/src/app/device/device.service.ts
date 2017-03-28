import { Injectable } from '@angular/core';
import { Device } from './device.model';

@Injectable()
export class DeviceService {

  devices: Device[] = [];

  constructor() { }

  getDevice() {
    return this.devices;
  }

  addDevice(device: Device) {
    this.devices.push(device);
  }

  removeDevice(id) {
    const index = this.devices.findIndex(device => device.id === id);
    this.devices.splice(index, 1);
  }

}
