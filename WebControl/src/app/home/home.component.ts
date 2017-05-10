import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {
  public datetime: any;

  constructor() {
    setTimeout(() => { this.getDateTime(); }, 1000);
  }

  getDateTime() {
    let date: any = new Date;
    let year: any = date.getFullYear();
    let month: any = date.getMonth();
    let d: any = date.getDate();
    let h: any = date.getHours();
    let m: any = date.getMinutes();
    let s: any = date.getSeconds();

    this.datetime = d + '/' + month + '/' + year + ' ' + h + ':' + m + ':' + s;
  }
}
