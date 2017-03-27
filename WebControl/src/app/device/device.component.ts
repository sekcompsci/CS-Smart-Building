import { Component } from '@angular/core';
import { NetpieService } from '../shared/netpie.service';

@Component({
  selector: 'app-device',
  templateUrl: './device.component.html',
  styleUrls: ['./device.component.scss']
})
export class DeviceComponent {

  netpie: NetpieService;

  constructor() {
  }
}
