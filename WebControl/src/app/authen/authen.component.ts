import { Component } from '@angular/core';
import { AuthenService } from './authen.service';

@Component({
  selector: 'app-authen',
  templateUrl: './authen.component.html',
  styleUrls: ['./authen.component.scss']
})
export class AuthenComponent {
  email: string;
  password: string;

  constructor(private authenService: AuthenService) {
    this.email = '';
    this.password = '';
  }

  submitLogin() {
    if (!this.email || !this.password) { return; }

    this.authenService.login(this.email, this.password);
  }
}
